import React, { useState, useRef } from 'react';
import Head from 'next/head';
import AttorneyLayout from '../../components/layout/AttorneyLayout';

export default function EditProfile() {
  const [profileComplete, setProfileComplete] = useState(75);
  const [barIdFile, setBarIdFile] = useState(null);
  const fileInputRef = useRef(null);

  const subscription = {
    planName: 'Premium Gold Membership',
    expiryDate: '31st Dec 2026',
    status: 'Active',
    features: ['Unlimited Case Management', '50GB Storage', 'Priority Support', 'Client Chat']
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBarIdFile(e.target.files[0].name);
      setProfileComplete(90); // Progress bar badhane ke liye
    }
  };

  return (
    <AttorneyLayout>
      <Head><title>Lawstick | Edit Profile</title></Head>
      <div className="container-fluid px-0">
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white w-100">
          <div className="mb-5">
            <h3 className="fw-bold mb-1" style={{ fontFamily: 'serif', color: '#002147', fontSize: '26px' }}>Edit Profile</h3>
            <p className="text-muted" style={{ fontSize: '15px' }}>Subscription & KYC Verification</p>
          </div>

          <div className="row g-4">
            {/* Subscription Section */}
            <div className="col-lg-5">
              <div className="p-4 rounded-4 border h-100" style={{ backgroundColor: '#fcf6ef' }}>
                <h5 className="fw-bold mb-4 text-navy">Membership Details</h5>
                <div className="card border-0 shadow rounded-4 p-4 mb-4 text-white" style={{ background: '#002147' }}>
                   <p className="small mb-1 opacity-75">Current Plan</p>
                   <h4 className="fw-bold">{subscription.planName}</h4>
                   <hr />
                   <div className="d-flex justify-content-between align-items-center">
                      <small>Expiry: {subscription.expiryDate}</small>
                      <span className="badge bg-success rounded-pill">ACTIVE</span>
                   </div>
                </div>
                <button className="btn btn-dark w-100 fw-bold rounded-pill py-2" style={{backgroundColor: '#de9f57', border:'none'}}>RENEW PLAN</button>
              </div>
            </div>

            {/* KYC Upload Section */}
            <div className="col-lg-7">
              <div className="p-4 rounded-4 border bg-white h-100">
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="fw-bold text-navy">KYC Documents</h5>
                  <span className="fw-bold text-warning">{profileComplete}% Done</span>
                </div>
                <div className="progress mb-4" style={{ height: '8px' }}>
                  <div className="progress-bar bg-warning" style={{ width: `${profileComplete}%` }}></div>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold small">Bar Council ID Card (Upload)</label>
                    <div 
                      className="upload-box p-4 border rounded-3 text-center bg-light" 
                      onClick={() => fileInputRef.current.click()}
                      style={{ borderStyle: 'dashed', cursor: 'pointer' }}
                    >
                      <i className={`bi ${barIdFile ? 'bi-check-circle-fill text-success' : 'bi-cloud-arrow-up text-navy'} fs-2`}></i>
                      <p className="mb-0 fw-bold mt-2" style={{fontSize:'14px'}}>{barIdFile || "Click to upload ID Card"}</p>
                      <input type="file" ref={fileInputRef} className="d-none" onChange={handleFileChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Govt ID</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">Address Proof</label>
                    <input type="file" className="form-control" />
                  </div>
                </div>
                <button className="btn btn-dark mt-4 px-5 rounded-pill fw-bold" style={{backgroundColor:'#002147'}}>SUBMIT KYC</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AttorneyLayout>
  );
}