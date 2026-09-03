import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import useManualReload from '../hooks/useManualReload.js';
import {
  deleteRequest, getRequests, resetRequests, updateRequestStatus,
} from '../services/requestService.js';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') ?? '';
  const [reloadKey, reload] = useManualReload();
  const [loadState, setLoadState] = useState('idle');
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // B2.1: State สำหรับข้อความค้นหา
  const [searchTerm, setSearchTerm] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoadState('loading');
    setErrorMessage('');
    setNotice('');

    getRequests({
      scenario,
      onRecovery: (message) => { if (!ignore) setNotice(message); },
    }).then((data) => {
      if (ignore) return;
      setRequests(data);
      setLoadState('success');
    }).catch((error) => {
      if (ignore) return;
      setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      setLoadState('error');
    });

    return () => { ignore = true; };
  }, [scenario, reloadKey]);

  // คำนวณ summary เพื่อส่งให้ SummaryPanel
  const summary = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'pending').length,
      'in-progress': requests.filter((r) => r.status === 'in-progress').length,
      completed: requests.filter((r) => r.status === 'completed').length,
    };
  }, [requests]);

  // B2.2 & B2.3: กรองคำร้องตามสถานะและคำค้นหา
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        (req.requestType ?? '').toLowerCase().includes(term) ||
        (req.location ?? '').toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [requests, statusFilter, searchTerm]);

  // 🟢 B3.2: เพิ่ม Handler สำหรับรับเรื่องเปลี่ยนสถานะเป็น in-progress
  async function handleAcknowledge(requestId) {
    try {
      const nextRequests = updateRequestStatus(requestId, 'in-progress');
      setRequests(nextRequests); // อัปเดต state หลักเพื่อ re-render และบันทึกลง persistent storage
      setNotice(`รับเรื่องคำร้อง ${requestId} แล้ว`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'รับเรื่องไม่สำเร็จ');
    }
  }

  function handleRetry() {
    if (scenario) setSearchParams({});
    else reload();
  }

  async function handleDelete(requestId) {
    try {
      const nextRequests = deleteRequest(requestId);
      setRequests(nextRequests);
      setNotice(`ลบคำร้อง ${requestId} แล้ว`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'ลบคำร้องไม่สำเร็จ');
    }
  }

  async function handleReset() {
    if (!window.confirm('ต้องการคืนข้อมูลตัวอย่างเริ่มต้นหรือไม่?')) return;
    try {
      setRequests(await resetRequests());
      setStatusFilter('all');
      setSearchTerm('');
      setNotice('คืนข้อมูลตัวอย่างเริ่มต้นแล้ว');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'คืนข้อมูลไม่สำเร็จ');
    }
  }

  return (
    <section data-testid="page-dashboard">
      <div className="page-heading">
        <div><p className="eyebrow dark">ROUTED + PERSISTENT</p><h1>Dashboard</h1><p>ติดตามคำร้องจาก URL, Service Layer และ browser storage</p></div>
        <button className="button secondary" data-testid="reset-button" type="button" onClick={handleReset}>Reset Demo Data</button>
      </div>
      {scenario && <p className="lab-scenario" role="status">LAB test scenario: {scenario}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}
      {loadState === 'loading' && <LoadingState />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={handleRetry} />}
      {loadState === 'success' && requests.length === 0 && (
        <section className="state-card" data-testid="empty-state">
          <h2>ยังไม่มีคำร้อง</h2><p>เริ่มสร้างคำร้องแรกของคุณได้เลย</p><Link className="button primary inline" to="/requests/new">สร้างคำร้องใหม่</Link>
        </section>
      )}
      {loadState === 'success' && requests.length > 0 && (
        <>
          <SummaryPanel summary={summary} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            </div>

            {/* B2.1: ช่องรับ Input ค้นหา */}
            <input
              type="text"
              placeholder="ค้นหาจากประเภทหรือสถานที่"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* B2.4 & B3.2: แสดงรายการการ์ด พร้อมส่ง prop onAcknowledge={handleAcknowledge} */}
            {filteredRequests.length === 0 ? (
              <p className="empty-message" style={{ padding: '1rem 0', color: '#666' }}>
                ไม่พบคำร้องที่ตรงกับการค้นหา
              </p>
            ) : (
              <RequestList
                requests={filteredRequests}
                onDeleteRequest={handleDelete}
                onAcknowledge={handleAcknowledge} // 🟢 B3.2: ส่งฟังก์ชัน handleAcknowledge ให้ RequestList
              />
            )}
          </section>
        </>
      )}
    </section>
  );
}

export default DashboardPage;