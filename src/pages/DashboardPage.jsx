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
  
  // 🟢 B2.1: State สำหรับข้อความค้นหา
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

  // ✅ คำนวณ summary เพื่อส่งให้ SummaryPanel (แก้ ReferenceError และ บั๊ก 2)
  const summary = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'pending').length,
      'in-progress': requests.filter((r) => r.status === 'in-progress').length,
      completed: requests.filter((r) => r.status === 'completed').length, // 🟢 ใช้ 'completed' เพื่อแก้บั๊ก 2
    };
  }, [requests]);

  // ✅ แก้ไข บั๊ก 3 & บั๊ก 6: รวม filteredRequests เป็นตัวเดียว และกรองตาม statusFilter ให้ถูกต้อง
  // 🟢 B2.2: กรองข้อมูลตามประเภท (requestType) หรือสถานที่ (location)
  // 🟢 B2.3: กรองแบบทำงานร่วมกันทั้งตัวกรองสถานะ (statusFilter) และคำค้นหา (searchTerm)
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // 1. เช็คสถานะ
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;

      // 2. เช็คคำค้นหา (ประเภท หรือ สถานที่)
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        (req.requestType ?? '').toLowerCase().includes(term) ||
        (req.location ?? '').toLowerCase().includes(term);

      // ต้องตรงทั้งสองเงื่อนไข (ทำงานซ้อนกัน)
      return matchesStatus && matchesSearch;
    });
  }, [requests, statusFilter, searchTerm]);

  function handleRetry() {
    if (scenario) setSearchParams({});
    else reload();
  }

  // ✅ แก้ไข บั๊ก 5: เรียก deleteRequest และ setRequests อัปเดต state หลักทันที
  async function handleDelete(requestId) {
    try {
      const nextRequests = deleteRequest(requestId);
      setRequests(nextRequests); // 🟢 อัปเดต state หลัก ทำให้แผงสรุปลดจำนวนลงทันที
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
      setSearchTerm(''); // 🟢 แก้ไขเป็น setSearchTerm ให้ตรงกับ state ที่ประกาศ
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
            {/* 🟢 B2.1: วางช่อง <input> ค้นหา ตรงนี้ */}
            <input
              type="text"
              placeholder="ค้นหาจากประเภทหรือสถานที่"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* 🟢 B2.4: ถ้าค้นหาไม่พบให้แสดงข้อความ ไม่พบคำร้องที่ตรงกับการค้นหา */}
            {filteredRequests.length === 0 ? (
              <p className="empty-message" style={{ padding: '1rem 0', color: '#666' }}>
                ไม่พบคำร้องที่ตรงกับการค้นหา
              </p>
            ) : (
            {/* TODO B3: ส่ง onAcknowledge={handleAcknowledge} ให้ RequestList */}
            <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} />
          </section>
        </>
      )}
    </section>
  );
}

export default DashboardPage;