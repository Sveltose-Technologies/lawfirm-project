
// // import React, { useState, useEffect } from 'react';
// // import Head from 'next/head';
// // import { useRouter } from 'next/router';
// // import AttorneyLayout from '../../components/layout/AttorneyLayout';

// // export default function Appointments() {
// //   const router = useRouter();
// //   const { selectedUser, openModal, actionType } = router.query;

// //   // 1. New Appointment State (Latest date at top - Descending)
// //   const [appointments, setAppointments] = useState([
// //     { id: 2, attorney: 'Adv. Tasnia Sharin', type: 'Civil', title: 'Property Dispute', date: '2025-01-12', time: '02:00 PM', reason: 'Client Meeting', doc: '📁', status: 'Scheduled' },
// //     { id: 1, attorney: 'Adv. Tasnia Sharin', type: 'Criminal', title: 'State vs Sharma', date: '2025-01-05', time: '10:30 AM', reason: 'Evidence Discussion', doc: '📁', status: 'Scheduled' },
// //   ]);

// //   // 2. Appointment History State (View Mode Only - Descending)
// //   const [history, setHistory] = useState([
// //     { id: 101, attorney: 'Adv. Tasnia Sharin', type: 'Family', title: 'Divorce Case', date: '2024-12-15', time: '11:00 AM', reason: 'Final Hearing', doc: '📄', status: 'Completed' },
// //   ]);

// //   // Modal State
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({ attorney: 'Adv. Tasnia Sharin', type: '', title: '', date: '', time: '', reason: '', status: 'Scheduled' });
// //   const [editId, setEditId] = useState(null);

// //   // Effect to handle navigation back from Organization Users List
// //   useEffect(() => {
// //     if (openModal === 'true' && selectedUser) {
// //       setFormData(prev => ({ ...prev, reason: `Meeting with ${selectedUser}` }));
// //       setShowModal(true);
// //       if (actionType === 'edit') setEditId(Date.now()); // Mocking edit state
// //     }
// //   }, [openModal, selectedUser, actionType]);

// //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   // Add or Re-schedule Appointment logic
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (editId) {
// //       setAppointments(appointments.map(app => app.id === editId ? { ...formData, id: editId } : app));
// //     } else {
// //       // Adding to top (Descending)
// //       setAppointments([{ ...formData, id: Date.now(), doc: '📁' }, ...appointments]);
// //     }
// //     setShowModal(false);
// //     setEditId(null);
// //     router.replace('/attorney-panel/appointments', undefined, { shallow: true }); // Clear query params
// //   };

// //   // ACTION 4: Cancel Appointment
// //   const handleCancel = (id) => {
// //     if (confirm("Are you sure you want to cancel this appointment?")) {
// //       setAppointments(appointments.filter(app => app.id !== id));
// //     }
// //   };

// //   // ACTION 3: Navigate to Org Users List (For New or Re-schedule)
// //   const navigateToOrgUsers = (type = 'new') => {
// //     router.push(`/attorney-panel/organization-users?action=${type}`);
// //   };

// //   return (
// //     <AttorneyLayout>
// //       <Head><title>Lawstick | Appointment History</title></Head>

// //       <div className="container-fluid px-0">
// //         <div className="card border-0 shadow-sm rounded-4 p-3 p-md-5 bg-white w-100">
          
// //           <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
// //             <h3 className="fw-bold mb-0" style={{ fontFamily: 'serif', color: '#002147', fontSize: '26px' }}>Appointment History</h3>
// //             <button 
// //               className="btn text-white px-4 rounded-pill fw-bold" 
// //               style={{ backgroundColor: '#002147', fontSize: '15px' }} 
// //               onClick={() => navigateToOrgUsers('new')}
// //             >
// //               <i className="bi bi-plus-lg me-2"></i> New Appointment
// //             </button>
// //           </div>

// //           {/* 1. NEW APPOINTMENT TABLE (Active Actions) */}
// //           <div className="mb-5">
// //             <h5 className="fw-bold mb-4" style={{ color: '#002147', fontSize: '18px' }}>New Appointment</h5>
// //             <div className="table-responsive border rounded-3">
// //               <table className="table table-hover align-middle mb-0">
// //                 <thead style={{ backgroundColor: '#fcf6ef' }}>
// //                   <tr className="text-nowrap" style={{ color: '#002147', fontSize: '14px' }}>
// //                     <th className="py-3 px-3">Attorney Name</th>
// //                     <th>Case Type</th><th>Case Title</th><th>Date</th><th>Time</th><th>Reason</th><th>Document</th><th>Status</th><th className="text-center">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody style={{ fontSize: '14px' }}>
// //                   {appointments.length > 0 ? appointments.map((app) => (
// //                     <tr key={app.id} className="text-nowrap border-bottom">
// //                       <td className="px-3 py-3 fw-bold">{app.attorney}</td>
// //                       <td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td>{app.time}</td>
// //                       <td><small className="text-muted">{app.reason}</small></td>
// //                       <td className="text-center">{app.doc}</td>
// //                       <td><span className="badge bg-success-subtle text-success border border-success-subtle px-3">{app.status}</span></td>
// //                       <td className="text-center">
// //                         <div className="d-flex gap-2 justify-content-center">
// //                             <button className="btn btn-sm btn-outline-primary" onClick={() => navigateToOrgUsers('edit')}>Re-schedule</button>
// //                             <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(app.id)}>Cancel</button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   )) : <tr><td colSpan="9" className="text-center py-4 text-muted">No Active Appointments</td></tr>}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>

// //           {/* 2. APPOINTMENTS HISTORY TABLE (View Mode Only) */}
// //           <div>
// //             <h5 className="fw-bold mb-4" style={{ color: '#6c757d', fontSize: '18px' }}>Appointments History</h5>
// //             <div className="table-responsive border rounded-3">
// //               <table className="table align-middle mb-0" style={{ backgroundColor: '#f8f9fa' }}>
// //                 <thead style={{ backgroundColor: '#e9ecef' }}>
// //                   <tr className="text-nowrap" style={{ color: '#002147', fontSize: '14px' }}>
// //                     <th className="py-3 px-3">Attorney Name</th>
// //                     <th>Case Type</th><th>Case Title</th><th>Date</th><th>Time</th><th>Reason</th><th>Document</th><th>Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody style={{ fontSize: '14px', color: '#6c757d' }}>
// //                   {history.map((app) => (
// //                     <tr key={app.id} className="text-nowrap border-bottom">
// //                       <td className="px-3 py-3">{app.attorney}</td>
// //                       <td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td>{app.time}</td>
// //                       <td>{app.reason}</td><td className="text-center">{app.doc}</td>
// //                       <td><span className="badge bg-secondary-subtle text-secondary px-3">{app.status}</span></td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- POPUP MODAL --- */}
// //       {showModal && (
// //         <div className="modal-overlay">
// //           <div className="modal-card border-0 shadow-lg">
// //             <div className="p-4 d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: '#002147' }}>
// //               <h5 className="mb-0 fw-bold">{editId ? 'Re-schedule Appointment' : 'New Appointment'}</h5>
// //               <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
// //             </div>

// //             <div className="p-4 bg-white">
// //               <form onSubmit={handleSubmit}>
// //                 <div className="row g-3">
// //                   <div className="col-md-6">
// //                     <label className="form-label fw-bold small">Case Type</label>
// //                     <input type="text" name="type" className="form-control" placeholder="Criminal, Civil etc." value={formData.type} onChange={handleChange} required />
// //                   </div>
// //                   <div className="col-md-6">
// //                     <label className="form-label fw-bold small">Case Title</label>
// //                     <input type="text" name="title" className="form-control" placeholder="Case Name" value={formData.title} onChange={handleChange} required />
// //                   </div>
// //                   <div className="col-md-6">
// //                     <label className="form-label fw-bold small">Date</label>
// //                     <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
// //                   </div>
// //                   <div className="col-md-6">
// //                     <label className="form-label fw-bold small">Time</label>
// //                     <input type="time" name="time" className="form-control" value={formData.time} onChange={handleChange} required />
// //                   </div>
// //                   <div className="col-12">
// //                     <label className="form-label fw-bold small">Reason</label>
// //                     <textarea name="reason" className="form-control" rows="3" placeholder="Description..." value={formData.reason} onChange={handleChange} required></textarea>
// //                   </div>
// //                 </div>

// //                 <div className="mt-4 d-flex gap-2">
// //                   <button type="submit" className="btn text-white w-100 fw-bold py-2" style={{ backgroundColor: '#002147' }}>
// //                     {editId ? 'Update Appointment' : 'Schedule Appointment'}
// //                   </button>
// //                   <button type="button" className="btn btn-light border w-100 fw-bold py-2" onClick={() => setShowModal(false)}>
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         .modal-overlay {
// //           position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
// //           background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(3px);
// //           display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px;
// //         }
// //         .modal-card { width: 100%; max-width: 600px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); animation: zoomIn 0.3s ease; overflow: hidden; }
// //         @keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
// //         .table th { font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
// //         .form-control:focus { border-color: #de9f57; box-shadow: none; }
// //         :global(.container-fluid) { max-width: 100% !important; }
// //         .badge { font-weight: 600; font-size: 11px; }
// //       `}</style>
// //     </AttorneyLayout>
// //   );
// // }

// // import React, { useState, useEffect } from 'react';
// // import Head from 'next/head';
// // import { useRouter } from 'next/router';
// // import AttorneyLayout from '../../components/layout/AttorneyLayout';

// // export default function Appointments() {
// //   const router = useRouter();
// //   const { selectedUser, openModal } = router.query;

// //   // --- DATA STATES ---
// //   const [appointments, setAppointments] = useState([
// //     { id: 2, attorney: 'Adv. Tasnia Sharin', type: 'Civil', title: 'Property Dispute', date: '2025-01-12', time: '02:00 PM', reason: 'Client Meeting', doc: '📁', status: 'Scheduled' },
// //     { id: 1, attorney: 'Adv. Tasnia Sharin', type: 'Criminal', title: 'State vs Sharma', date: '2025-01-05', time: '10:30 AM', reason: 'Evidence Discussion', doc: '📁', status: 'Scheduled' },
// //   ]);

// //   const [history, setHistory] = useState([
// //     { id: 101, attorney: 'Adv. Tasnia Sharin', type: 'Family', title: 'Divorce Case', date: '2024-12-15', time: '11:00 AM', reason: 'Final Hearing', doc: '📄', status: 'Completed' },
// //   ]);

// //   // --- PAGINATION STATES ---
// //   const [pageApp, setPageApp] = useState(1);
// //   const [pageHistory, setPageHistory] = useState(1);
// //   const itemsPerPage = 5;

// //   // --- MODAL & FORM STATES ---
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({ attorney: 'Adv. Tasnia Sharin', type: '', title: '', date: '', time: '', reason: '', status: 'Scheduled' });
// //   const [editId, setEditId] = useState(null);

// //   // --- TIME CONVERSION HELPERS (Important Fix) ---
  
// //   // 1. Convert '02:00 PM' to '14:00' (For Input field)
// //   const formatTimeTo24 = (time12h) => {
// //     if (!time12h) return "";
// //     const [time, modifier] = time12h.split(' ');
// //     let [hours, minutes] = time.split(':');
// //     if (hours === '12') hours = '00';
// //     if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
// //     return `${String(hours).padStart(2, '0')}:${minutes}`;
// //   };

// //   // 2. Convert '14:00' to '02:00 PM' (For Saving to State)
// //   const formatTimeTo12 = (time24h) => {
// //     if (!time24h) return "";
// //     let [hours, minutes] = time24h.split(':');
// //     const modifier = hours >= 12 ? 'PM' : 'AM';
// //     hours = hours % 12 || 12;
// //     return `${String(hours).padStart(2, '0')}:${minutes} ${modifier}`;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     // Agar time change ho raha hai, to use 12h format mein convert karke save karein
// //     if (name === "time") {
// //       setFormData({ ...formData, time: formatTimeTo12(value) });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (editId) {
// //       setAppointments(appointments.map(app => app.id === editId ? { ...formData, id: editId, doc: '📁' } : app));
// //     } else {
// //       setAppointments([{ ...formData, id: Date.now(), doc: '📁' }, ...appointments]);
// //       setPageApp(1);
// //     }
// //     closeModal();
// //   };

// //   const handleCancel = (id) => {
// //     if (window.confirm("Are you sure?")) setAppointments(appointments.filter(app => app.id !== id));
// //   };

// //   const handleEdit = (app) => {
// //     setEditId(app.id);
// //     setFormData({ ...app });
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setEditId(null);
// //     setFormData({ attorney: 'Adv. Tasnia Sharin', type: '', title: '', date: '', time: '', reason: '', status: 'Scheduled' });
// //   };

// //   // --- PAGINATION LOGIC ---
// //   const currentAppItems = appointments.slice((pageApp - 1) * itemsPerPage, pageApp * itemsPerPage);
// //   const currentHistoryItems = history.slice((pageHistory - 1) * itemsPerPage, pageHistory * itemsPerPage);

// //   return (
// //     <AttorneyLayout>
// //       <Head><title>Lawstick | Appointment History</title></Head>

// //       <div className="container-fluid px-0">
// //         <div className="card border-0 shadow-sm rounded-4 p-3 p-md-5 bg-white w-100">
// //           <div className="d-flex justify-content-between align-items-center mb-5">
// //             <h3 className="fw-bold mb-0" style={{ color: '#002147' }}>Appointment Management</h3>
// //             <button className="btn text-white px-4 rounded-pill fw-bold" style={{ backgroundColor: '#002147' }} onClick={() => setShowModal(true)}>
// //               <i className="bi bi-plus-lg me-2"></i> New Appointment
// //             </button>
// //           </div>

// //           {/* Active Appointments Table */}
// //           <div className="mb-5">
// //             <h5 className="fw-bold mb-4">Active Appointments</h5>
// //             <div className="table-responsive border rounded-3 mb-3">
// //               <table className="table table-hover align-middle mb-0">
// //                 <thead style={{ backgroundColor: '#fcf6ef' }}>
// //                   <tr style={{ color: '#002147', fontSize: '14px' }}>
// //                     <th className="py-3 px-3">Attorney</th><th>Type</th><th>Title</th><th>Date</th><th>Time</th><th>Reason</th><th>Status</th><th className="text-center">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody style={{ fontSize: '14px' }}>
// //                   {currentAppItems.map((app) => (
// //                     <tr key={app.id}>
// //                       <td className="px-3 fw-bold">{app.attorney}</td>
// //                       <td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td className="fw-bold">{app.time}</td>
// //                       <td><small>{app.reason}</small></td>
// //                       <td><span className="badge bg-success-subtle text-success px-3">{app.status}</span></td>
// //                       <td className="text-center">
// //                         <button className="btn btn-sm btn-outline-primary border-0 me-2" onClick={() => handleEdit(app)}><i className="bi bi-pencil-square"></i></button>
// //                         <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleCancel(app.id)}><i className="bi bi-trash"></i></button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //             <PaginationBar current={pageApp} total={Math.ceil(appointments.length/itemsPerPage)} count={appointments.length} onPageChange={setPageApp} />
// //           </div>

// //           {/* History Table */}
// //           <div>
// //             <h5 className="fw-bold mb-4 text-muted">History Logs</h5>
// //             <div className="table-responsive border rounded-3 mb-3">
// //               <table className="table align-middle mb-0 bg-light">
// //                 <thead><tr style={{ fontSize: '14px' }}><th className="py-3 px-3">Attorney</th><th>Type</th><th>Title</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
// //                 <tbody style={{ fontSize: '14px' }}>
// //                   {currentHistoryItems.map((app) => (
// //                     <tr key={app.id}>
// //                       <td className="px-3">{app.attorney}</td><td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td>{app.time}</td>
// //                       <td><span className="badge bg-secondary-subtle text-secondary px-3">{app.status}</span></td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //             <PaginationBar current={pageHistory} total={Math.ceil(history.length/itemsPerPage)} count={history.length} onPageChange={setPageHistory} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- MODAL --- */}
// //       {showModal && (
// //         <div className="modal-overlay">
// //           <div className="modal-card">
// //             <div className="p-4 d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: '#002147' }}>
// //               <h5 className="mb-0 fw-bold">{editId ? 'Edit Appointment' : 'New Appointment'}</h5>
// //               <button className="btn-close btn-close-white" onClick={closeModal}></button>
// //             </div>
// //             <div className="p-4 bg-white">
// //               <form onSubmit={handleSubmit}>
// //                 <div className="row g-3">
// //                   <div className="col-md-6"><label className="fw-bold small">Case Title</label><input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required /></div>
// //                   <div className="col-md-6"><label className="fw-bold small">Date</label><input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required /></div>
                  
// //                   {/* TIME INPUT FIX: Value ko 24h format mein convert karke dikhana hai */}
// //                   <div className="col-md-6">
// //                     <label className="fw-bold small">Time (AM/PM will show in browser)</label>
// //                     <input 
// //                       type="time" 
// //                       name="time" 
// //                       className="form-control" 
// //                       value={formatTimeTo24(formData.time)} 
// //                       onChange={handleChange} 
// //                       required 
// //                     />
// //                   </div>

// //                   <div className="col-12"><label className="fw-bold small">Reason</label><textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleChange} required></textarea></div>
// //                 </div>
// //                 <div className="mt-4 d-flex gap-2">
// //                   <button type="submit" className="btn text-white w-100 fw-bold py-2" style={{ backgroundColor: '#002147' }}>Save</button>
// //                   <button type="button" className="btn btn-light border w-100 fw-bold py-2" onClick={closeModal}>Cancel</button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; }
// //         .modal-card { width: 100%; max-width: 550px; background: white; border-radius: 15px; overflow: hidden; }
// //         .form-control:focus { border-color: #de9f57; box-shadow: none; }
// //       `}</style>
// //     </AttorneyLayout>
// //   );
// // }

// // function PaginationBar({ current, total, count, onPageChange }) {
// //   return (
// //     <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
// //       <div className="text-muted small">Total: {count}</div>
// //       <nav>
// //         <ul className="pagination pagination-sm mb-0">
// //           <li className={`page-item ${current === 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => onPageChange(current - 1)}>Prev</button></li>
// //           <li className="page-item active"><span className="page-link" style={{backgroundColor:'#002147'}}>{current} of {total || 1}</span></li>
// //           <li className={`page-item ${current === total || total === 0 ? 'disabled' : ''}`}><button className="page-link" onClick={() => onPageChange(current + 1)}>Next</button></li>
// //         </ul>
// //       </nav>
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import AttorneyLayout from '../../components/layout/AttorneyLayout';

// export default function Appointments() {
//   const router = useRouter();

//   // --- DATA STATES ---
//   const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
//   const [showModal, setShowModal] = useState(false);
  
//   // Form State
//   const [formData, setFormData] = useState({
//     attorney: '', type: 'Civil', title: '', date: '', time: '', reason: '', doc: '📁', status: 'Scheduled'
//   });

//   // Active Appointments
//   const [appointments, setAppointments] = useState([
//     { id: 2, attorney: 'Adv. Tasnia Sharin', type: 'Civil', title: 'Property Dispute', date: '2025-01-15', time: '02:00 PM', reason: 'Client Meeting', doc: '📁', status: 'Scheduled' },
//     { id: 1, attorney: 'Adv. Tasnia Sharin', type: 'Criminal', title: 'State vs Sharma', date: '2025-01-05', time: '10:30 AM', reason: 'Evidence Discussion', doc: '📁', status: 'Scheduled' },
//   ]);

//   // History State (View Only)
//   const [history, setHistory] = useState([
//     { id: 101, attorney: 'Adv. Tasnia Sharin', type: 'Family', title: 'Divorce Case', date: '2024-12-15', time: '11:00 AM', reason: 'Final Hearing', doc: '📄', status: 'Completed' },
//   ]);

//   // --- HANDLERS ---
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSaveAppointment = (e) => {
//     e.preventDefault();
//     // Naya appointment list mein add karna
//     const newEntry = { ...formData, id: Date.now() };
//     setAppointments([newEntry, ...appointments]); // Naya hamesha top par (Descending order)
//     setShowModal(false);
//     setFormData({ attorney: '', type: 'Civil', title: '', date: '', time: '', reason: '', doc: '📁', status: 'Scheduled' });
//   };

//   const handleReschedule = (app) => {
//     // Re-schedule click par Discussion page ya organization users par bhej sakte hain
//     if (window.confirm("Do you want to navigate to Organization Users to re-schedule?")) {
//         router.push('/organization-users');
//     }
//   };

//   const handleCancel = (id) => {
//     if (window.confirm("Are you sure you want to cancel?")) {
//       const filtered = appointments.filter(a => a.id !== id);
//       const cancelledItem = appointments.find(a => a.id === id);
//       setAppointments(filtered);
//       setHistory([{ ...cancelledItem, status: 'Cancelled' }, ...history]);
//     }
//   };

//   // --- SORTING (Latest Date First) ---
//   const sortedApps = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));
//   const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));

//   // --- CALENDAR LOGIC ---
//   const [currDate, setCurrDate] = useState(new Date());
//   const renderCalendar = () => {
//     const year = currDate.getFullYear();
//     const month = currDate.getMonth();
//     const startDay = new Date(year, month, 1).getDay();
//     const totalDays = new Date(year, month + 1, 0).getDate();
//     const days = [];

//     for (let i = 0; i < startDay; i++) days.push(<div key={`e-${i}`} className="cal-day empty"></div>);
//     for (let d = 1; d <= totalDays; d++) {
//       const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
//       const hasApp = appointments.some(a => a.date === dStr);
//       days.push(
//         <div key={d} className="cal-day" onClick={() => { setFormData({...formData, date: dStr}); setShowModal(true); }}>
//           <span className="d-num">{d}</span>
//           {hasApp && <div className="dot"></div>}
//         </div>
//       );
//     }
//     return days;
//   };

//   return (
//     <AttorneyLayout>
//       <Head><title>Appointment History | Lawstick</title></Head>

//       <div className="container-fluid px-0">
//         <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          
//           {/* TOP HEADER */}
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
//             <h3 className="fw-bold mb-0" style={{ color: '#002147' }}>Appointment History</h3>
//             <div className="d-flex gap-2 align-items-center">
//               <div className="btn-group p-1 bg-light rounded-pill">
//                 <button className={`btn rounded-pill px-4 ${viewMode === 'list' ? 'btn-white shadow-sm' : 'btn-light border-0'}`} onClick={() => setViewMode('list')}>List</button>
//                 <button className={`btn rounded-pill px-4 ${viewMode === 'calendar' ? 'btn-white shadow-sm' : 'btn-light border-0'}`} onClick={() => setViewMode('calendar')}>Calendar</button>
//               </div>
//               <button className="btn text-white px-4 rounded-pill fw-bold" style={{ backgroundColor: '#002147' }} onClick={() => setShowModal(true)}>
//                 <i className="bi bi-plus-lg me-2"></i> New Appointment
//               </button>
//             </div>
//           </div>

//           {viewMode === 'list' ? (
//             <>
//               {/* 1. NEW APPOINTMENT TABLE (Active) */}
//               <div className="mb-5">
//                 <h5 className="fw-bold mb-3" style={{color: '#de9f57'}}>Active Schedules</h5>
//                 <div className="table-responsive border rounded-3">
//                   <table className="table table-hover align-middle mb-0">
//                     <thead style={{ backgroundColor: '#fcf6ef', color: '#002147' }}>
//                       <tr className="small fw-bold">
//                         <th className="py-3 px-3">ATTORNEY NAME</th><th>CASE TYPE</th><th>CASE TITLE</th><th>DATE</th><th>TIME</th><th>REASON</th><th>DOC</th><th>STATUS</th><th className="text-center">ACTIONS</th>
//                       </tr>
//                     </thead>
//                     <tbody className="small">
//                       {sortedApps.map(app => (
//                         <tr key={app.id}>
//                           <td className="px-3 fw-bold">{app.attorney}</td>
//                           <td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td>{app.time}</td>
//                           <td>{app.reason}</td><td className="text-center">{app.doc}</td>
//                           <td><span className="badge bg-success-subtle text-success px-3">{app.status}</span></td>
//                           <td className="text-center">
//                             <button className="btn btn-sm text-primary border-0" onClick={() => handleReschedule(app)}><i className="bi bi-pencil-square"></i></button>
//                             <button className="btn btn-sm text-danger border-0" onClick={() => handleCancel(app.id)}><i className="bi bi-trash"></i></button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* 2. APPOINTMENTS HISTORY TABLE (View Only) */}
//               <div>
//                 <h5 className="fw-bold mb-3 text-muted">Past History (View Only)</h5>
//                 <div className="table-responsive border rounded-3 shadow-sm">
//                   <table className="table align-middle mb-0 bg-light">
//                     <thead>
//                       <tr className="small text-muted" style={{backgroundColor: '#f8f9fa'}}>
//                         <th className="py-3 px-3">ATTORNEY NAME</th><th>CASE TYPE</th><th>CASE TITLE</th><th>DATE</th><th>TIME</th><th>REASON</th><th>DOC</th><th>STATUS</th>
//                       </tr>
//                     </thead>
//                     <tbody className="small">
//                       {sortedHistory.map(app => (
//                         <tr key={app.id}>
//                           <td className="px-3">{app.attorney}</td><td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td>{app.time}</td>
//                           <td>{app.reason}</td><td className="text-center">{app.doc}</td>
//                           <td><span className="badge bg-secondary-subtle text-secondary px-3">{app.status}</span></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           ) : (
//             /* CALENDAR VIEW */
//             <div className="calendar-box border rounded-4 overflow-hidden shadow-sm">
//               <div className="p-3 d-flex justify-content-between align-items-center text-white" style={{backgroundColor:'#002147'}}>
//                 <button className="btn btn-sm btn-outline-light" onClick={() => setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth()-1))}>Prev</button>
//                 <h5 className="mb-0 fw-bold">{currDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
//                 <button className="btn btn-sm btn-outline-light" onClick={() => setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth()+1))}>Next</button>
//               </div>
//               <div className="calendar-grid">
//                 {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="grid-head">{d}</div>)}
//                 {renderCalendar()}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- NEW APPOINTMENT MODAL (POPUP) --- */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-card shadow-lg animate-in">
//             <div className="modal-header-custom p-4 text-white d-flex justify-content-between" style={{backgroundColor:'#002147'}}>
//               <h5 className="mb-0 fw-bold">Schedule New Appointment</h5>
//               <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
//             </div>
//             <form onSubmit={handleSaveAppointment} className="p-4">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="small fw-bold">Attorney Name</label>
//                   <input type="text" name="attorney" className="form-control" placeholder="Enter name" value={formData.attorney} onChange={handleInputChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="small fw-bold">Case Type</label>
//                   <select name="type" className="form-select" value={formData.type} onChange={handleInputChange}>
//                     <option value="Civil">Civil</option>
//                     <option value="Criminal">Criminal</option>
//                     <option value="Family">Family</option>
//                     <option value="Corporate">Corporate</option>
//                   </select>
//                 </div>
//                 <div className="col-12">
//                   <label className="small fw-bold">Case Title</label>
//                   <input type="text" name="title" className="form-control" placeholder="Property Dispute / Divorce Case" value={formData.title} onChange={handleInputChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="small fw-bold">Date</label>
//                   <input type="date" name="date" className="form-control" value={formData.date} onChange={handleInputChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="small fw-bold">Time</label>
//                   <input type="time" name="time" className="form-control" onChange={(e) => setFormData({...formData, time: e.target.value})} required />
//                 </div>
//                 <div className="col-12">
//                   <label className="small fw-bold">Reason for Appointment</label>
//                   <textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleInputChange} required></textarea>
//                 </div>
//                 <div className="col-12">
//                   <label className="small fw-bold">Document (Optional)</label>
//                   <input type="file" className="form-control" />
//                 </div>
//               </div>
//               <div className="mt-4 d-flex gap-2">
//                 <button type="submit" className="btn text-white flex-grow-1 fw-bold py-2" style={{backgroundColor:'#002147'}}>Save Appointment</button>
//                 <button type="button" className="btn btn-light border flex-grow-1 py-2" onClick={() => setShowModal(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; }
//         .modal-card { background: white; width: 100%; max-width: 600px; border-radius: 15px; overflow: hidden; }
//         .btn-white { background: white; color: #002147; border: 1px solid #ddd; }
//         .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); background: #eee; gap: 1px; }
//         .grid-head { background: #fcf6ef; padding: 10px; text-align: center; font-weight: bold; font-size: 12px; }
//         .cal-day { background: white; min-height: 90px; padding: 10px; cursor: pointer; position: relative; }
//         .cal-day:hover { background: #f8f9fa; }
//         .cal-day.empty { background: #fdfdfd; cursor: default; }
//         .d-num { font-weight: bold; color: #555; }
//         .dot { width: 8px; height: 8px; background: #de9f57; border-radius: 50%; position: absolute; bottom: 10px; right: 10px; }
//         .animate-in { animation: slideUp 0.3s ease-out; }
//         @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//       `}</style>
//     </AttorneyLayout>
//   );
// }


import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AttorneyLayout from '../../components/layout/AttorneyLayout';
// Global Pagination import kiya
import { PaginationBar } from '../../common/GlobalComponents';

export default function Appointments() {
  const router = useRouter();

  // --- DATA STATES ---
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [showModal, setShowModal] = useState(false);
  
  // --- PAGINATION STATES ---
  const [pageApp, setPageApp] = useState(1);
  const [pageHistory, setPageHistory] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const [formData, setFormData] = useState({
    attorney: '', type: 'Civil', title: '', date: '', time: '', reason: '', doc: '📁', status: 'Scheduled'
  });

  // Active Appointments
  const [appointments, setAppointments] = useState([
    { id: 2, attorney: 'Adv. Tasnia Sharin', type: 'Civil', title: 'Property Dispute', date: '2025-01-15', time: '02:00 PM', reason: 'Client Meeting', doc: '📁', status: 'Scheduled' },
    { id: 1, attorney: 'Adv. Tasnia Sharin', type: 'Criminal', title: 'State vs Sharma', date: '2025-01-05', time: '10:30 AM', reason: 'Evidence Discussion', doc: '📁', status: 'Scheduled' },
  ]);

  // History State (View Only)
  const [history, setHistory] = useState([
    { id: 101, attorney: 'Adv. Tasnia Sharin', type: 'Family', title: 'Divorce Case', date: '2024-12-15', time: '11:00 AM', reason: 'Final Hearing', doc: '📄', status: 'Completed' },
  ]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    const newEntry = { ...formData, id: Date.now() };
    setAppointments([newEntry, ...appointments]); 
    setShowModal(false);
    setFormData({ attorney: '', type: 'Civil', title: '', date: '', time: '', reason: '', doc: '📁', status: 'Scheduled' });
  };

  const handleReschedule = (app) => {
    if (window.confirm("Do you want to navigate to Organization Users to re-schedule?")) {
        router.push('/organization-users');
    }
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel?")) {
      const filtered = appointments.filter(a => a.id !== id);
      const cancelledItem = appointments.find(a => a.id === id);
      setAppointments(filtered);
      setHistory([{ ...cancelledItem, status: 'Cancelled' }, ...history]);
    }
  };

  // --- SORTING & PAGINATION LOGIC ---
  const sortedApps = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));
  const currentAppItems = sortedApps.slice((pageApp - 1) * itemsPerPage, pageApp * itemsPerPage);

  const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
  const currentHistoryItems = sortedHistory.slice((pageHistory - 1) * itemsPerPage, pageHistory * itemsPerPage);

  // --- CALENDAR LOGIC ---
  const [currDate, setCurrDate] = useState(new Date());
  const renderCalendar = () => {
    const year = currDate.getFullYear();
    const month = currDate.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < startDay; i++) days.push(<div key={`e-${i}`} className="cal-day empty"></div>);
    for (let d = 1; d <= totalDays; d++) {
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const hasApp = appointments.some(a => a.date === dStr);
      days.push(
        <div key={d} className="cal-day" onClick={() => { setFormData({...formData, date: dStr}); setShowModal(true); }}>
          <span className="d-num">{d}</span>
          {hasApp && <div className="dot"></div>}
        </div>
      );
    }
    return days;
  };

  return (
    <AttorneyLayout>
      <Head><title>Appointment History | Lawstick</title></Head>

      <div className="container-fluid px-0">
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          
          {/* TOP HEADER */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h4 className="fw-bold mb-0" style={{ color: '#002147' }}>Appointment History</h4>
            <div className="d-flex gap-2 align-items-center">
              <div className="btn-group p-1 bg-light rounded-pill">
                <button className={`btn rounded-pill px-4 ${viewMode === 'list' ? 'btn-white shadow-sm' : 'btn-light border-0'}`} onClick={() => setViewMode('list')}>List</button>
                <button className={`btn rounded-pill px-4 ${viewMode === 'calendar' ? 'btn-white shadow-sm' : 'btn-light border-0'}`} onClick={() => setViewMode('calendar')}>Calendar</button>
              </div>
              <button className="btn text-white  rounded-pill fw-bold" style={{ backgroundColor: '#002147' }} onClick={() => setShowModal(true)}>
                <i className="bi bi-plus-lg"></i> New Appointment
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <>
              {/* 1. NEW APPOINTMENT TABLE (Active) */}
              <div className="mb-5">
                <h5 className="fw-bold mb-3" style={{color: '#de9f57'}}>Active Schedules</h5>
                <div className="table-responsive border rounded-3 overflow-hidden">
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ backgroundColor: '#fcf6ef', color: '#002147' }}>
                      <tr className="small fw-bold">
                        <th className="py-3 px-3">ATTORNEY NAME</th><th>CASE TYPE</th><th>CASE TITLE</th><th>DATE</th><th>TIME</th><th>REASON</th><th>DOC</th><th>STATUS</th><th className="text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {currentAppItems.map(app => (
                        <tr key={app.id}>
                          <td className="px-3 fw-bold">{app.attorney}</td>
                          <td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td>{app.time}</td>
                          <td>{app.reason}</td><td className="text-center">{app.doc}</td>
                          <td><span className="badge bg-success-subtle text-success px-3">{app.status}</span></td>
                          <td className="text-center">
                            <button className="btn btn-sm text-primary border-0" onClick={() => handleReschedule(app)}><i className="bi bi-pencil-square"></i></button>
                            <button className="btn btn-sm text-danger border-0" onClick={() => handleCancel(app.id)}><i className="bi bi-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationBar 
                    current={pageApp} 
                    total={Math.ceil(appointments.length / itemsPerPage)} 
                    onPageChange={setPageApp} 
                  />
                </div>
              </div>

              {/* 2. APPOINTMENTS HISTORY TABLE (View Only) */}
              <div>
                <h5 className="fw-bold mb-3 text-muted">Past History (View Only)</h5>
                <div className="table-responsive border rounded-3 shadow-sm overflow-hidden">
                  <table className="table align-middle mb-0 bg-light">
                    <thead>
                      <tr className="small text-muted" style={{backgroundColor: '#f8f9fa'}}>
                        <th className="py-3 px-3">ATTORNEY NAME</th><th>CASE TYPE</th><th>CASE TITLE</th><th>DATE</th><th>TIME</th><th>REASON</th><th>DOC</th><th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {currentHistoryItems.map(app => (
                        <tr key={app.id}>
                          <td className="px-3">{app.attorney}</td><td>{app.type}</td><td>{app.title}</td><td>{app.date}</td><td>{app.time}</td>
                          <td>{app.reason}</td><td className="text-center">{app.doc}</td>
                          <td><span className="badge bg-secondary-subtle text-secondary px-3">{app.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationBar 
                    current={pageHistory} 
                    total={Math.ceil(history.length / itemsPerPage)} 
                    onPageChange={setPageHistory} 
                  />
                </div>
              </div>
            </>
          ) : (
            /* CALENDAR VIEW */
            <div className="calendar-box border rounded-4 overflow-hidden shadow-sm">
              <div className="p-3 d-flex justify-content-between align-items-center text-white" style={{backgroundColor:'#002147'}}>
                <button className="btn btn-sm btn-outline-light" onClick={() => setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth()-1))}>Prev</button>
                <h5 className="mb-0 fw-bold">{currDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
                <button className="btn btn-sm btn-outline-light" onClick={() => setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth()+1))}>Next</button>
              </div>
              <div className="calendar-grid">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="grid-head">{d}</div>)}
                {renderCalendar()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- NEW APPOINTMENT MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card shadow-lg animate-in">
            <div className="modal-header-custom p-4 text-white d-flex justify-content-between" style={{backgroundColor:'#002147'}}>
              <h5 className="mb-0 fw-bold">Schedule New Appointment</h5>
              <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
            </div>
            <form onSubmit={handleSaveAppointment} className="p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="small fw-bold">Attorney Name</label>
                  <input type="text" name="attorney" className="form-control" placeholder="Enter name" value={formData.attorney} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold">Case Type</label>
                  <select name="type" className="form-select" value={formData.type} onChange={handleInputChange}>
                    <option value="Civil">Civil</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Family">Family</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="small fw-bold">Case Title</label>
                  <input type="text" name="title" className="form-control" placeholder="Property Dispute / Divorce Case" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold">Date</label>
                  <input type="date" name="date" className="form-control" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold">Time</label>
                  <input type="time" name="time" className="form-control" onChange={(e) => setFormData({...formData, time: e.target.value})} required />
                </div>
                <div className="col-12">
                  <label className="small fw-bold">Reason for Appointment</label>
                  <textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleInputChange} required></textarea>
                </div>
                <div className="col-12">
                  <label className="small fw-bold">Document (Optional)</label>
                  <input type="file" className="form-control" />
                </div>
              </div>
              <div className="mt-4 d-flex gap-2">
                <button type="submit" className="btn text-white flex-grow-1 fw-bold py-2" style={{backgroundColor:'#002147'}}>Save Appointment</button>
                <button type="button" className="btn btn-light border flex-grow-1 py-2" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .modal-card { background: white; width: 100%; max-width: 600px; border-radius: 15px; overflow: hidden; }
        .btn-white { background: white; color: #002147; border: 1px solid #ddd; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); background: #eee; gap: 1px; }
        .grid-head { background: #fcf6ef; padding: 10px; text-align: center; font-weight: bold; font-size: 12px; }
        .cal-day { background: white; min-height: 90px; padding: 10px; cursor: pointer; position: relative; }
        .cal-day:hover { background: #f8f9fa; }
        .cal-day.empty { background: #fdfdfd; cursor: default; }
        .d-num { font-weight: bold; color: #555; }
        .dot { width: 8px; height: 8px; background: #de9f57; border-radius: 50%; position: absolute; bottom: 10px; right: 10px; }
        .animate-in { animation: slideUp 0.3s ease-out; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </AttorneyLayout>
  );
}