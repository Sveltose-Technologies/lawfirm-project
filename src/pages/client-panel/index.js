
// import React from 'react';
// import Head from 'next/head';
// import ClientLayout from '../../components/layout/ClientLayout';

// export default function ClientDashboard() {
//   return (
//     <ClientLayout>
//       <Head><title>Dashboard | Client</title></Head>
      
//       <div className="animate-fade pt-5">
//         <h4 className="fw-bold mb-4" style={{ color: '#002147', fontSize: '22px' }}>Dashboard</h4>

//         {/* --- STATS --- */}
//         <div className="row g-3 mb-4">
//           {[{ n: '34', l: 'Total Appointment', i: 'bi-calendar-check', c: 'success' },
//             { n: '2', l: 'Pending Cases', i: 'bi-arrow-down-up', c: 'secondary' },
//             { n: '8', l: 'Total Cases', i: 'bi-hammer', c: 'primary' }
//           ].map((s, idx) => (
//             <div key={idx} className="col-12 col-md-4">
//               <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 bg-white">
//                 <div className="d-flex align-items-center justify-content-center mb-2">
//                   <div className={`bg-${s.c}-subtle rounded-circle p-2 d-flex align-items-center justify-content-center`} style={{width: '40px', height: '40px'}}>
//                     <i className={`bi ${s.i} text-${s.c} fs-5`}></i>
//                   </div>
//                   <span className="ms-2 text-muted fw-bold" style={{fontSize: '14px'}}>{s.l}</span>
//                 </div>
//                 <h1 className="fw-bold m-0" style={{ fontSize: '42px', color: s.c === 'primary' ? '#002147' : '' }}>{s.n}</h1>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="row g-4">
//           {/* Main Column */}
//           <div className="col-12 col-lg-8">
//             <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
//                <h6 className="fw-bold mb-4" style={{ color: '#002147', fontSize: '15px' }}>Upcoming Schedule & Deadlines</h6>
//                {[
//                  { t: 'Document Submission', d: '30 Dec 2025', p: 'High' },
//                  { t: 'Fee Payment', d: '05 Jan 2026', p: 'Medium' }
//                ].map((item, i) => (
//                  <div key={i} className="d-flex justify-content-between align-items-center py-3 border-bottom border-light">
//                    <div><h6 className="mb-0 fw-bold" style={{fontSize: '15px'}}>{item.t}</h6><small className="text-muted">{item.d}</small></div>
//                    <span className={`badge rounded-pill ${item.p === 'High' ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info'}`} style={{fontSize: '12px'}}>{item.p}</span>
//                  </div>
//                ))}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="col-12 col-lg-4">
//             <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
//               <h6 className="fw-bold mb-3" style={{fontSize: '15px'}}>Quick Links</h6>
//               <div className="row g-2">
//                 {['Files', 'Billing', 'Help', 'Cases'].map((link, i) => (
//                   <div key={i} className="col-6">
//                     <div className="p-3 border rounded-3 text-center cursor-pointer quick-link">
//                       <i className="bi bi-link-45deg d-block fs-4 text-warning"></i>
//                       <span className="fw-bold" style={{fontSize: '12px'}}>{link}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`.quick-link:hover { border-color: #de9f57; background: #fffaf5; cursor: pointer; transition: 0.3s; }`}</style>
//     </ClientLayout>
//   );
// }

import React from 'react';
import ClientLayout from '../../components/layout/ClientLayout';

export default function ClientDashboard() {
  return (
    <ClientLayout>
      <div className="animate-fade">
        <h4 className="fw-bold mb-4" style={{ color: '#002147', fontSize: '20px' }}>Dashboard Overview</h4>

        <div className="row g-3">
          {/* Stats Cards - Stacked on Mobile, 3 in a row on Desktop */}
          {[{ n: '34', l: 'Appointments', c: '#28a745' },
            { n: '02', l: 'Pending Cases', c: '#6c757d' },
            { n: '08', l: 'Total Cases', c: '#002147' }
          ].map((s, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white h-100">
                <span className="text-muted small fw-bold text-uppercase">{s.l}</span>
                <h1 className="fw-bold my-2" style={{ color: s.c, fontSize: '36px' }}>{s.n}</h1>
                <div className="progress mx-auto" style={{ height: '4px', width: '40px' }}>
                  <div className="progress-bar" style={{ backgroundColor: s.c, width: '100%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="row mt-4 g-4">
          <div className="col-12 col-lg-7">
             <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <h6 className="fw-bold text-navy mb-4">Upcoming Schedule</h6>
                <div className="p-5 text-center bg-light rounded-4">
                   <i className="bi bi-calendar-x text-muted fs-1 opacity-25"></i>
                   <p className="text-muted small mt-2">No Upcoming Dates Found</p>
                </div>
             </div>
          </div>
          <div className="col-12 col-lg-5">
             <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h6 className="fw-bold text-navy mb-3">Quick Actions</h6>
                <div className="row g-2">
                   {['Upload Files', 'View Bills', 'Cases', 'Help'].map(btn => (
                     <div key={btn} className="col-6">
                        <button className="btn btn-outline-light text-dark border p-3 w-100 rounded-3 small fw-bold">
                           <span style={{fontSize: '11px'}}>{btn}</span>
                        </button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}