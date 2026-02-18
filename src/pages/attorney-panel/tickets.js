

// import React, { useState } from 'react';
// import Head from 'next/head';
// import AttorneyLayout from '../../components/layout/AttorneyLayout';

// export default function TicketManagement() {
//   // --- DYNAMIC STATE FOR TICKETS ---
//   const [tickets, setTickets] = useState([
//     { id: 'TIC-9901', title: 'Login Issue', reason: 'Technical Support', priority: 'High', description: 'Unable to login to the portal since morning.', status: 'Open', notes: 'Checking with IT team' },
//     { id: 'TIC-8842', title: 'Case Document Upload', reason: 'General Inquiry', priority: 'Medium', description: 'How to upload multiple files at once?', status: 'Resolved', notes: 'Resolved over call' },
//     { id: 'TIC-7721', title: 'Payment Failed', reason: 'Billing', priority: 'High', description: 'Amount deducted but invoice not generated.', status: 'Open', notes: 'Verifying with bank' },
//     { id: 'TIC-6650', title: 'App Crash', reason: 'Technical Support', priority: 'Low', description: 'App closes when opening attachments.', status: 'Open', notes: 'Assigned to dev team' },
//     { id: 'TIC-5541', title: 'Profile Update', reason: 'Account Support', priority: 'Medium', description: 'Wrong address on profile.', status: 'Resolved', notes: 'Updated by staff' },
//     { id: 'TIC-4432', title: 'Hearing Alert', reason: 'General Inquiry', priority: 'Low', description: 'Not getting SMS alerts.', status: 'Open', notes: 'Checking SMS gateway' },
//   ]);

//   // --- PAGINATION STATES ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // --- MODAL & FORM STATES ---
//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '', reason: '', priority: 'Low', description: ''
//   });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   // --- ACTION: CREATE / EDIT (SUBMIT) ---
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editId) {
//       // EDIT LOGIC: Update existing ticket in state
//       setTickets(tickets.map(t => t.id === editId ? { ...t, ...formData } : t));
//     } else {
//       // CREATE LOGIC: Add new ticket at the top
//       const newTicket = {
//         id: `TIC-${Math.floor(1000 + Math.random() * 9000)}`,
//         ...formData,
//         status: 'Open',
//         notes: 'Waiting for response'
//       };
//       setTickets([newTicket, ...tickets]);
//       setCurrentPage(1); // Go to page 1 to see new ticket
//     }
//     closeModal();
//   };

//   // --- ACTION: DELETE ---
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this ticket?")) {
//       const updatedTickets = tickets.filter(t => t.id !== id);
//       setTickets(updatedTickets);
      
//       // Pagination Fix: Agar current page khali ho jaye to piche jayein
//       const totalPagesAfterDelete = Math.ceil(updatedTickets.length / itemsPerPage);
//       if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
//         setCurrentPage(totalPagesAfterDelete);
//       }
//     }
//   };

//   // --- ACTION: OPEN EDIT MODAL ---
//   const openEdit = (ticket) => {
//     setEditId(ticket.id);
//     setFormData({
//       title: ticket.title,
//       reason: ticket.reason,
//       priority: ticket.priority,
//       description: ticket.description
//     });
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditId(null);
//     setFormData({ title: '', reason: '', priority: 'Low', description: '' });
//   };

//   // --- PAGINATION LOGIC ---
//   const totalPages = Math.ceil(tickets.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <AttorneyLayout>
//       <Head><title>Lawstick | Ticket Management</title></Head>

//       <div className="container-fluid px-0">
//         <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white w-100">
          
//           {/* Header */}
//           <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
//             <div>
//               <h3 className="fw-bold mb-1" style={{ fontFamily: 'serif', color: '#002147', fontSize: '26px' }}>Ticket Management</h3>
//               <p className="text-muted mb-0" style={{fontSize: '15px'}}>Create support tickets and track your history.</p>
//             </div>
//             <button className="btn text-white px-4 rounded-pill fw-bold shadow-sm" style={{ backgroundColor: '#002147' }} onClick={() => setShowModal(true)}>
//               <i className="bi bi-plus-circle me-2"></i> Create Ticket
//             </button>
//           </div>

//           <h5 className="fw-bold mb-4" style={{ color: '#002147', fontSize: '18px' }}>Ticket History</h5>
          
//           {/* Table */}
//           <div className="table-responsive border rounded-3 mb-4">
//             <table className="table table-hover align-middle mb-0">
//               <thead style={{ backgroundColor: '#fcf6ef' }}>
//                 <tr className="text-nowrap" style={{ color: '#002147', fontSize: '14px' }}>
//                   <th className="py-3 px-4">Ticket ID</th>
//                   <th>Ticket Title</th>
//                   <th>Reason</th>
//                   <th>Priority</th>
//                   <th>Status</th>
//                   <th>Description</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody style={{ fontSize: '14px', color: '#444' }}>
//                 {currentItems.length > 0 ? currentItems.map((t) => (
//                   <tr key={t.id} className="text-nowrap border-bottom">
//                     <td className="px-4 py-3 fw-bold" style={{color: '#002147'}}>{t.id}</td>
//                     <td>{t.title}</td>
//                     <td>{t.reason}</td>
//                     <td><span className={`badge px-2 border ${t.priority === 'High' ? 'text-danger border-danger' : t.priority === 'Medium' ? 'text-warning border-warning' : 'text-info border-info'}`}>{t.priority}</span></td>
//                     <td><span className={`badge px-3 rounded-pill ${t.status === 'Open' ? 'bg-primary-subtle text-primary' : 'bg-success-subtle text-success'}`}>{t.status}</span></td>
//                     <td><small className="text-muted">{t.description.substring(0, 30)}...</small></td>
//                     <td className="text-center">
//                       <button className="btn btn-sm btn-outline-primary border-0 me-1" onClick={() => openEdit(t)} title="Edit"><i className="bi bi-pencil-square fs-6"></i></button>
//                       <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(t.id)} title="Delete"><i className="bi bi-trash3 fs-6"></i></button>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr><td colSpan="7" className="text-center py-5">No tickets found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* --- PAGINATION BAR --- */}
//           {tickets.length > 0 && (
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-2">
//               <div className="text-muted small fw-bold">
//                 Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, tickets.length)} of {tickets.length} tickets
//               </div>

//               {/* Page indicator */}
//               <div className="badge border text-dark fw-bold px-3 py-2 rounded-pill shadow-sm bg-white" style={{ fontSize: '12px' }}>
//                 <span style={{ color: '#002147' }}>Page {currentPage}</span> 
//                 <span className="mx-2 text-muted">of</span> 
//                 <span style={{ color: '#de9f57' }}>{totalPages || 1}</span>
//               </div>

//               <nav>
//                 <ul className="pagination pagination-sm mb-0 gap-1">
//                   <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                     <button className="page-link border rounded-circle" onClick={() => paginate(currentPage - 1)}><i className="bi bi-chevron-left"></i></button>
//                   </li>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                       <button className="page-link border rounded-3 px-3 mx-1" onClick={() => paginate(i + 1)} style={{ backgroundColor: currentPage === i + 1 ? '#002147' : '#fff', color: currentPage === i + 1 ? 'white' : '#002147' }}>{i + 1}</button>
//                     </li>
//                   ))}
//                   <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
//                     <button className="page-link border rounded-circle" onClick={() => paginate(currentPage + 1)}><i className="bi bi-chevron-right"></i></button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- CREATE/EDIT MODAL --- */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-card border-0 shadow-lg">
//             <div className="p-4 d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: '#002147' }}>
//               <h5 className="mb-0 fw-bold">{editId ? 'Edit Ticket' : 'Create Support Ticket'}</h5>
//               <button className="btn-close btn-close-white" onClick={closeModal}></button>
//             </div>
//             <div className="p-4 bg-white">
//               <form onSubmit={handleSubmit}>
//                 <div className="row g-3">
//                   <div className="col-12"><label className="form-label fw-bold small">Ticket Title</label><input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required /></div>
//                   <div className="col-md-6"><label className="form-label fw-bold small">Reason</label><input type="text" name="reason" className="form-control" value={formData.reason} onChange={handleChange} required /></div>
//                   <div className="col-md-6"><label className="form-label fw-bold small">Priority</label><select name="priority" className="form-select" value={formData.priority} onChange={handleChange}><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option></select></div>
//                   <div className="col-12"><label className="form-label fw-bold small">Description / Notes</label><textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleChange} required></textarea></div>
//                 </div>
//                 <div className="mt-4 d-flex gap-2">
//                   <button type="submit" className="btn text-white w-100 fw-bold py-2" style={{ backgroundColor: '#002147' }}>{editId ? 'Update Ticket' : 'Submit Ticket'}</button>
//                   <button type="button" className="btn btn-light border w-100 fw-bold py-2" onClick={closeModal}>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
//         .modal-card { width: 100%; max-width: 600px; background: white; border-radius: 15px; overflow: hidden; animation: zoomIn 0.3s ease; }
//         @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         .page-link { color: #002147; font-weight: bold; cursor: pointer; }
//         .page-item.disabled .page-link { color: #ccc; cursor: not-allowed; }
//         :global(.container-fluid) { max-width: 100% !important; }
//       `}</style>
//     </AttorneyLayout>
//   );
// }

import React, { useState } from 'react';
import Head from 'next/head';
import AttorneyLayout from '../../components/layout/AttorneyLayout';
// Global Pagination import kiya
import { PaginationBar } from '../../common/GlobalComponents';

export default function TicketManagement() {
  // --- DYNAMIC STATE FOR TICKETS ---
  const [tickets, setTickets] = useState([
    { id: 'TIC-9901', title: 'Login Issue', reason: 'Technical Support', priority: 'High', description: 'Unable to login to the portal since morning.', status: 'Open', notes: 'Checking with IT team' },
    { id: 'TIC-8842', title: 'Case Document Upload', reason: 'General Inquiry', priority: 'Medium', description: 'How to upload multiple files at once?', status: 'Resolved', notes: 'Resolved over call' },
    { id: 'TIC-7721', title: 'Payment Failed', reason: 'Billing', priority: 'High', description: 'Amount deducted but invoice not generated.', status: 'Open', notes: 'Verifying with bank' },
    { id: 'TIC-6650', title: 'App Crash', reason: 'Technical Support', priority: 'Low', description: 'App closes when opening attachments.', status: 'Open', notes: 'Assigned to dev team' },
    { id: 'TIC-5541', title: 'Profile Update', reason: 'Account Support', priority: 'Medium', description: 'Wrong address on profile.', status: 'Resolved', notes: 'Updated by staff' },
    { id: 'TIC-4432', title: 'Hearing Alert', reason: 'General Inquiry', priority: 'Low', description: 'Not getting SMS alerts.', status: 'Open', notes: 'Checking SMS gateway' },
  ]);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- MODAL & FORM STATES ---
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', reason: '', priority: 'Low', description: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setTickets(tickets.map(t => t.id === editId ? { ...t, ...formData } : t));
    } else {
      const newTicket = {
        id: `TIC-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        status: 'Open',
        notes: 'Waiting for response'
      };
      setTickets([newTicket, ...tickets]);
      setCurrentPage(1);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      setTickets(tickets.filter(t => t.id !== id));
    }
  };

  const openEdit = (ticket) => {
    setEditId(ticket.id);
    setFormData({
      title: ticket.title,
      reason: ticket.reason,
      priority: ticket.priority,
      description: ticket.description
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ title: '', reason: '', priority: 'Low', description: '' });
  };

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const currentItems = tickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AttorneyLayout>
      <Head><title>Ticket Management | Lawstick</title></Head>

      <div className="container-fluid px-0">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h4 className="fw-bold m-0" style={{ color: '#002147', fontSize: '22px' }}>Ticket Management</h4>
            <p className="text-muted small mb-0" style={{ fontSize: '14px' }}>Create support tickets and track your history.</p>
          </div>
          <button 
            className="btn btn-navy rounded-pill px-4 fw-bold shadow-sm" 
            style={{ fontSize: '15px' }} 
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-lg me-2"></i> Create Ticket
          </button>
        </div>

        {/* Table Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="p-4 border-bottom bg-light">
            <h6 className="fw-bold m-0" style={{ color: '#002147', fontSize: '16px' }}>Ticket History</h6>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: '#fcf6ef' }}>
                <tr className="text-nowrap" style={{ color: '#002147', fontSize: '13px' }}>
                  <th className="py-3 px-4">TICKET ID</th>
                  <th>TITLE</th>
                  <th>REASON</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th>DESCRIPTION</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '14px' }}>
                {currentItems.map((t) => (
                  <tr key={t.id} className="border-bottom">
                    <td className="px-4 py-3 fw-bold" style={{color: '#002147'}}>{t.id}</td>
                    <td>{t.title}</td>
                    <td>{t.reason}</td>
                    <td>
                      <span className={`badge px-2 border ${t.priority === 'High' ? 'text-danger border-danger' : t.priority === 'Medium' ? 'text-warning border-warning' : 'text-info border-info'}`} style={{fontSize: '11px'}}>
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge px-3 rounded-pill ${t.status === 'Open' ? 'bg-primary-subtle text-primary' : 'bg-success-subtle text-success'}`} style={{fontSize: '11px'}}>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted text-truncate d-inline-block" style={{maxWidth: '150px'}}>
                        {t.description}
                      </small>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <i className="bi bi-pencil-square text-primary" style={{cursor:'pointer'}} onClick={() => openEdit(t)}></i>
                        <i className="bi bi-trash text-danger" style={{cursor:'pointer'}} onClick={() => handleDelete(t.id)}></i>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-5 text-muted">No tickets found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <PaginationBar 
            current={currentPage} 
            total={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>

      {/* --- CREATE/EDIT MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card animate-slide shadow-lg">
            <div className="p-4 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#002147' }}>
              <h5 className="mb-0 fw-bold" style={{ fontSize: '18px' }}>{editId ? 'Edit Ticket' : 'Create Support Ticket'}</h5>
              <button className="btn-close btn-close-white" onClick={closeModal}></button>
            </div>
            <div className="p-4 bg-white overflow-auto" style={{ maxHeight: '80vh' }}>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="label-custom">Ticket Title</label>
                    <input type="text" name="title" className="form-control" placeholder="Brief subject" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="label-custom">Reason</label>
                    <input type="text" name="reason" className="form-control" placeholder="Technical, Billing, etc." value={formData.reason} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="label-custom">Priority</label>
                    <select name="priority" className="form-select" value={formData.priority} onChange={handleChange}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="label-custom">Description / Notes</label>
                    <textarea name="description" className="form-control" rows="4" placeholder="Describe your issue in detail..." value={formData.description} onChange={handleChange} required></textarea>
                  </div>
                </div>
                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-navy w-100 fw-bold py-2">
                    {editId ? 'Update Ticket' : 'Submit Ticket'}
                  </button>
                  <button type="button" className="btn btn-light border w-100 fw-bold py-2" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .btn-navy { background-color: #002147; color: white; border: none; transition: 0.3s; }
        .btn-navy:hover { background-color: #001630; color: white; }
        .label-custom { font-weight: bold; color: #6c757d; font-size: 13px; margin-bottom: 5px; display: block; }
        
        .modal-overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
          background: rgba(0,0,0,0.6); z-index: 9999; 
          display: flex; align-items: center; justify-content: center; padding: 15px;
        }
        .modal-card { background: white; width: 100%; max-width: 550px; border-radius: 20px; overflow: hidden; }
        
        .animate-slide { animation: slideUp 0.3s ease-out; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        :global(.container-fluid) { max-width: 100% !important; }
        .badge { font-weight: 600; }
        .scroll-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </AttorneyLayout>
  );
}