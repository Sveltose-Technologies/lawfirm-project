


import React, { useState } from 'react';
import Head from 'next/head';

function Careers() {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [locationType, setLocationType] = useState('All'); 
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('talent'); 

  // --- THEME ---
  const theme = {
    primaryBlue: '#002855',
    accentGold: '#cfa144',
    textDark: '#212529',
    bgLight: '#f8f9fa'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { searchTerm, location, category, locationType });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Application Submitted Successfully!');
  };

  return (
    <>
      <Head>
        <title>Careers | Join Our Team</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ overflowX: 'hidden' }}>
        
        {/* HERO BANNER */}
        <div className="career-banner d-flex align-items-center">
          <div className="overlay"></div>
          <div className="container position-relative z-1 text-center">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <span className="text-gold text-uppercase fw-bold ls-2 d-block mb-2">Join Our Team</span>
                <h1 className="text-white display-4 display-md-3 fw-bold mt-2 mb-4 font-serif">
                  Impact. Opportunity. <span className="text-gold">Growth.</span>
                </h1>
                <p className="text-white lead mb-5 opacity-75 mx-auto px-3" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
                  Build a career that matters. We empower you to shape your own path to success in a collaborative global environment.
                </p>
                
                <a href="#search-section" className="btn-gold text-decoration-none me-3">
                  View Openings
                </a>
                <a href="#apply-forms" className="btn-gold-outline text-decoration-none">
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH SECTION */}
        <div id="search-section" className="bg-light border-bottom position-relative pb-5">
          <div className="container">
             <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                   <div className="card shadow-lg border-0 p-4 rounded-3 search-card-responsive">
                      <h4 className="fw-bold mb-4 text-center" style={{color: theme.primaryBlue}}>Search Jobs</h4>
                      
                      <form onSubmit={handleSearch}>
                          <div className="row g-3">
                              <div className="col-12 col-md-4">
                                  <label className="form-label fw-bold small text-muted">Keywords</label>
                                  <input 
                                      type="text" 
                                      className="form-control" 
                                      placeholder="e.g. Associate, Paralegal" 
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                  />
                              </div>

                              <div className="col-12 col-md-4">
                                  <label className="form-label fw-bold small text-muted">Location / Distance</label>
                                  <input 
                                      type="text" 
                                      className="form-control" 
                                      placeholder="City, State or Zip" 
                                      value={location}
                                      onChange={(e) => setLocation(e.target.value)}
                                  />
                              </div>

                              <div className="col-12 col-md-4">
                                  <label className="form-label fw-bold small text-muted">Job Category</label>
                                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                      <option value="All">All Categories</option>
                                      <option value="Legal">Legal</option>
                                      <option value="Administrative">Administrative</option>
                                      <option value="IT">IT & Support</option>
                                      <option value="Finance">Finance</option>
                                  </select>
                              </div>

                              <div className="col-12 col-md-8">
                                  <label className="form-label fw-bold small text-muted">Work Type</label>
                                  <div className="d-flex flex-wrap gap-3 pt-2">
                                      {['Onsite', 'Hybrid', 'Remote'].map((type) => (
                                          <div className="form-check" key={type}>
                                              <input 
                                                  className="form-check-input" 
                                                  type="radio" 
                                                  name="workType" 
                                                  id={type} 
                                                  checked={locationType === type}
                                                  onChange={() => setLocationType(type)}
                                              />
                                              <label className="form-check-label" htmlFor={type}>{type}</label>
                                          </div>
                                      ))}
                                      <div className="form-check">
                                          <input className="form-check-input" type="radio" name="workType" id="allTypes" checked={locationType === 'All'} onChange={() => setLocationType('All')} />
                                          <label className="form-check-label" htmlFor="allTypes">All</label>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-12 col-md-4 d-grid align-items-end">
                                  <button type="submit" className="btn btn-dark fw-bold py-2 mt-3 mt-md-0" style={{backgroundColor: theme.primaryBlue}}>
                                      Search
                                  </button>
                              </div>
                          </div>
                      </form>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* APPLICATION PORTAL */}
        <div id="apply-forms" className="py-5" style={{ backgroundColor: '#fff' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-6 fw-bold font-serif" style={{color: theme.primaryBlue}}>Application Portal</h2>
                    <p className="text-muted">Choose your path below</p>
                    
                    <div className="d-inline-flex p-1 bg-light rounded-pill border mt-3">
                        <button 
                            onClick={() => setActiveTab('talent')}
                            className={`btn rounded-pill px-4 fw-bold ${activeTab === 'talent' ? 'btn-blue' : 'text-muted'}`}
                        >
                            Join Talent Community
                        </button>
                        <button 
                            onClick={() => setActiveTab('internship')}
                            className={`btn rounded-pill px-4 fw-bold ${activeTab === 'internship' ? 'btn-blue' : 'text-muted'}`}
                        >
                            Internship Application
                        </button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow border-0 p-4 p-md-5">
                            
                            {/* FORM 1: TALENT COMMUNITY */}
                            {activeTab === 'talent' && (
                                <form onSubmit={handleFormSubmit}>
                                    <h4 className="fw-bold mb-4 pb-2 border-bottom" style={{color: theme.accentGold}}>Join Our Talent Community</h4>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small">First Name</label>
                                            <input type="text" className="form-control" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small">Last Name</label>
                                            <input type="text" className="form-control" required />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label fw-bold small">Email Address</label>
                                            <input type="email" className="form-control" required />
                                        </div>
                                        
                                        <div className="col-md-4">
                                            <label className="form-label fw-bold small">Phone Device Type</label>
                                            <select className="form-select" required>
                                                <option value="">Select...</option>
                                                <option value="Mobile">Mobile</option>
                                                <option value="Landline">Landline</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label fw-bold small">Country Code</label>
                                            <input type="text" className="form-control" placeholder="+91" required />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label fw-bold small">Phone Number</label>
                                            <input type="tel" className="form-control" required />
                                        </div>

                                        <div className="col-12 mt-4">
                                            <label className="form-label fw-bold small">Upload Resume/CV</label>
                                            <p className="small text-muted mb-2">Accepted formats: DOC, PDF, TXT (Max 5MB)</p>
                                            <input type="file" className="form-control" accept=".doc,.docx,.pdf,.txt" required />
                                        </div>
                                        
                                        <div className="col-12 mt-4">
                                            <button type="submit" className="btn btn-gold w-100 py-2">Submit Profile</button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* FORM 2: INTERNSHIP */}
                            {activeTab === 'internship' && (
                                <form onSubmit={handleFormSubmit}>
                                    <h4 className="fw-bold mb-4 pb-2 border-bottom" style={{color: theme.accentGold}}>Apply for Internship</h4>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small">First Name</label>
                                            <input type="text" className="form-control" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small">Last Name</label>
                                            <input type="text" className="form-control" required />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label fw-bold small">Email ID</label>
                                            <input type="email" className="form-control" required />
                                        </div>
                                        <div className="col-md-8">
                                            <label className="form-label fw-bold small">Law College / University Name</label>
                                            <input type="text" className="form-control" required />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-bold small">Pass Year</label>
                                            <input type="number" className="form-control" placeholder="YYYY" required />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-bold small">Months of Internship</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light">From</span>
                                                <input type="month" className="form-control" required />
                                                <span className="input-group-text bg-light">To</span>
                                                <input type="month" className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-bold small">Description / Statement of Purpose</label>
                                            <textarea className="form-control" rows="4" placeholder="Why do you want to intern with us?" required></textarea>
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="form-label fw-bold small">Upload Resume</label>
                                            <input type="file" className="form-control" accept=".pdf,.doc,.docx" required />
                                        </div>

                                        <div className="col-12 mt-4">
                                            <button type="submit" className="btn btn-gold w-100 py-2">Apply for Internship</button>
                                        </div>
                                    </div>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>

      <style jsx>{`
        .text-gold { color: ${theme.accentGold}; }
        .career-banner {
          position: relative;
          background-image: url(/assets/images/our-firm4.png);
          background-size: cover;
          background-position: center;
          min-height: 500px;
          padding: 100px 0;
          color: white;
        }
        .career-banner .overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(0,40,85,0.9), rgba(0,40,85,0.7));
        }
        .font-serif { font-family: 'Playfair Display', serif; }
        .ls-2 { letter-spacing: 2px; }
        .btn-gold {
          background-color: ${theme.accentGold};
          color: #fff; border: none; padding: 12px 35px; font-weight: 600; text-transform: uppercase;
        }
        .btn-gold-outline {
            border: 2px solid ${theme.accentGold}; color: ${theme.accentGold}; padding: 10px 33px; font-weight: 600; text-transform: uppercase; background: transparent;
        }
        .btn-blue { background-color: ${theme.primaryBlue}; color: white; }
        .search-card-responsive { margin-top: -80px; }

        @media (max-width: 991px) {
            .career-banner { min-height: auto; padding: 120px 0 60px 0; }
            .search-card-responsive { margin-top: 20px; }
        }
      `}</style>
    </>
  );
}

export default Careers;