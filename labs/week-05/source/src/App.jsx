// import { Route, Routes } from 'react-router-dom';
// import DashboardPage from './pages/DashboardPage.jsx';
// import AppLayout from './pages/AppLayout.jsx';
// import AboutPage from './pages/AboutPage.jsx'

// function App() {
//   return (

//     <Routes>
//       <Routes element={<AppLayout />}>
//         <Routes element={<AboutPage />} path="about" />
//       </Routes>
//     </Routes>

//   );
//   // return (
//   //   <>
//   //     <AppHeader />
//   //     <main className="container page-content">
//   //       <DashboardPage />
//   //       {/* <section>
//   //         <div className="page-heading"><div><p className="eyebrow dark">CP00 · WEEK04 REGRESSION</p><h1>Campus Service Request</h1><p>ตรวจ add, filter, delete และ validation ก่อน refactor</p></div></div>
//   //         {notice && <p className="notice" role="status">{notice}</p>}
//   //         <SummaryPanel summary={summary} />
//   //         <div className="workspace-grid">
//   //           <section className="panel form-panel"><RequestForm onAddRequest={handleAdd} /></section>
//   //           <section className="panel" aria-labelledby="request-list-title">
//   //             <div className="section-heading"><h2 id="request-list-title">รายการคำร้อง</h2><FilterBar value={statusFilter} onFilterChange={setStatusFilter} /></div>
//   //             <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} />
//   //           </section>
//   //         </div>
//   //       </section> */}
//   //     </main>
//   //     {/* TODO 5A-CP01: ย้ายงานของ Dashboard ออกไปที่ DashboardPage.jsx */}
//   //     {/* TODO 5A-CP02: เปลี่ยนทั้งไฟล์เป็น <Routes> ที่มี AppLayout เป็นกรอบ */}
//   //   </>
//   // );
// }


import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import AppLayout from './pages/AppLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NewRequestPage from './pages/NewRequestPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RequestDetailPage from './pages/RequestDetailPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route element={<NewRequestPage />} path="requests/new" />
        <Route element={<RequestDetailPage />} path="requests/:requestId" />
        <Route element={<AboutPage />} path="about" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
