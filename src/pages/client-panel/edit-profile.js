import React, { useState } from 'react';
import Head from 'next/head';
import ClientLayout from '../../components/layout/ClientLayout';

export default function EditProfile() {
  const navyColor = '#002147';
  const goldColor = '#de9f57';

  // Form states
  const [profile, setProfile] = useState({
    name: 'Rajesh Malhotra',
    email: 'rajesh.malhotra@example.com',
    phone: '+91 98765 43210'
  });

  return (
    <ClientLayout>
      <Head><title>Edit Profile | Lawstick</title></Head>

      <div className="animate-fade">
        {/* Page Header */}
        <div className="mb-4">
          <h4 className="fw-bold mb-1" style={{ color: navyColor, fontSize: '20px' }}>Edit Profile</h4>
          <p className="text-muted small">Update your personal information and manage membership</p>
        </div>

        <div className="row g-4">
          
          {/* --- SECTION 1: Profile Update, Password, Email/Phone --- */}
          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h6 className="fw-bold mb-4" style={{ color: navyColor }}>Personal Information</h6>
              
              {/* Profile Pic Upload */}
              <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <div className="position-relative">
                  <img 
                    src="/assets/images/attorney1.png" 
                    className="rounded-circle border" 
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                    alt="profile" 
                  />
                  <button className="btn btn-sm btn-dark rounded-circle position-absolute bottom-0 end-0 p-1" style={{ width: '28px', height: '28px' }}>
                    <i className="bi bi-camera-fill" style={{ fontSize: '12px' }}></i>
                  </button>
                </div>
                <div className="ms-4">
                  <p className="mb-1 fw-bold small">Profile Picture</p>
                  <p className="text-muted x-small mb-0">JPG, GIF or PNG. Max size 2MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">EMAIL ADDRESS</label>
                  <input type="email" className="form-control rounded-3 py-2 border-light-gray" style={{fontSize: '14px'}} defaultValue={profile.email} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">PHONE NUMBER</label>
                  <input type="text" className="form-control rounded-3 py-2 border-light-gray" style={{fontSize: '14px'}} defaultValue={profile.phone} />
                </div>
                
                <hr className="my-4 opacity-50" />
                
                <h6 className="fw-bold mb-2" style={{ color: navyColor, fontSize: '15px' }}>Security Settings</h6>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">CURRENT PASSWORD</label>
                  <input type="password" placeholder="••••••••" className="form-control rounded-3 py-2 border-light-gray" style={{fontSize: '14px'}} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">NEW PASSWORD</label>
                  <input type="password" placeholder="New Password" className="form-control rounded-3 py-2 border-light-gray" style={{fontSize: '14px'}} />
                </div>

                <div className="col-12 mt-4 text-end">
                  <button className="btn text-white px-4 py-2 rounded-3 fw-bold shadow-sm" style={{ backgroundColor: navyColor, fontSize: '14px' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: Subscription & Membership --- */}
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0" style={{ color: navyColor }}>Subscription Plan</h6>
                <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: '11px' }}>Active</span>
              </div>

              {/* Membership Card UI */}
              <div className="p-3 rounded-4 mb-4 text-white shadow-sm" style={{ background: `linear-gradient(45deg, ${navyColor}, #003366)` }}>
                <p className="small mb-1 opacity-75">Current Running Membership</p>
                <h4 className="fw-bold mb-3">Premium Plan</h4>
                <div className="d-flex justify-content-between align-items-end">
                  <div>
                    <p className="x-small mb-0 opacity-75">Expiry Date</p>
                    <p className="fw-bold mb-0" style={{ fontSize: '14px' }}>31 Dec, 2024</p>
                  </div>
                  <i className="bi bi-shield-check display-6 opacity-25"></i>
                </div>
              </div>

              <h6 className="fw-bold mb-3 small" style={{ color: navyColor }}>Membership Features:</h6>
              <ul className="list-unstyled mb-4">
                {['Unlimited Case Updates', 'Direct Attorney Chat', 'Secure Document Storage', 'Priority Support'].map((feat, idx) => (
                  <li key={idx} className="small mb-2 d-flex align-items-center text-muted">
                    <i className="bi bi-check-circle-fill text-success me-2"></i> {feat}
                  </li>
                ))}
              </ul>

              <button className="btn btn-outline-dark w-100 rounded-3 py-2 fw-bold" style={{ fontSize: '14px', borderColor: '#ddd' }}>
                <i className="bi bi-arrow-repeat me-2"></i> Renew Subscription
              </button>
            </div>

            {/* Support Box */}
            <div className="card border-0 rounded-4 p-4 text-center" style={{ backgroundColor: '#fcf6ef', border: '1px dashed #de9f57 !important' }}>
               <i className="bi bi-headset mb-2 fs-3" style={{ color: goldColor }}></i>
               <h6 className="fw-bold mb-1" style={{ fontSize: '14px' }}>Need help?</h6>
               <p className="text-muted x-small mb-0">Contact our support team for subscription queries.</p>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .border-light-gray { border-color: #f1f1f1 !important; }
        .x-small { font-size: 11px; }
        .form-control:focus {
          border-color: ${navyColor} !important;
          box-shadow: none;
        }
        .btn:hover { opacity: 0.9; transform: translateY(-1px); transition: 0.2s; }
      `}</style>
    </ClientLayout>
  );
}