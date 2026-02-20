

import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AttorneysPage() {
  const router = useRouter();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  const [activeFilter, setActiveFilter] = useState(null);

  const gtGold = "#c5a353";
  const gtDark = "#222222"; 
  const gtBlue = "#5baed5";

  const filters = ["Capability", "Location", "Admission", "Education", "Language"];

  return (
    <main className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section 
        className="position-relative d-flex align-items-center justify-content-center text-center" 
        style={{ 
          backgroundImage: "url('data:image/jpeg;base64,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')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          height: '350px' 
        }}
      >
        <div className="container mt-5">
          <p className="h4 fw-normal mb-1">One firm. One team.</p>
          <p className="h4 fw-normal">Put our experience in your corner.</p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION */}
      <section className="container-fluid g-0" style={{ backgroundColor: gtGold }}>
        <div className="row g-0">
          <div className="col-lg-5 p-4 p-md-5">
            <h2 className="mb-4 d-flex align-items-center border-bottom border-dark pb-2">
              <input 
                type="text" 
                className="form-control bg-transparent border-0 fs-3 p-0 shadow-none text-dark fw-light" 
                placeholder="Search Professionals By Name" 
              />
              <i className="bi bi-search fs-3"></i>
            </h2>
            <div className="d-flex gap-4">
              <div className="form-check">
                <input className="form-check-input border-dark bg-dark" type="radio" name="stype" defaultChecked id="name" />
                <label className="form-check-label fw-bold" htmlFor="name">Search By Name</label>
              </div>
              <div className="form-check">
                <input className="form-check-input border-dark" type="radio" name="stype" id="keyword" />
                <label className="form-check-label fw-bold" htmlFor="keyword">Search By Keyword</label>
              </div>
            </div>
          </div>

          <div 
            className="col-lg-7 p-4 p-md-5 d-flex align-items-center"
            style={{ 
              backgroundColor: gtDark, 
              clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
              marginLeft: '-60px'
            }}
          >
            <div className="ps-5 ms-4">
                <p className="text-white fw-bold fs-4 mb-3">Filter Professionals by:</p>
                <div className="d-flex flex-wrap gap-x-4 gap-y-2">
                {filters.map((item) => (
                    <button 
                        key={item}
                        onClick={() => setActiveFilter(item)}
                        className={`btn btn-link text-decoration-none fw-bold fs-5 p-0 d-flex align-items-center ${activeFilter === item ? 'text-warning' : 'text-white'}`}
                    >
                    {item} 
                    <i className={`bi bi-chevron-${activeFilter === item ? 'down' : 'right'} ms-2 fs-6 opacity-75`}></i>
                    </button>
                ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SELECT DROPDOWN (ONLY SHOWS ON CLICK) */}
      {activeFilter && (
        <section className="container mt-5">
            <div className="p-1" style={{ border: `1px solid ${gtGold}` }}>
                <select className="form-select border-0 shadow-none fs-5 py-2 rounded-0 bg-light">
                    <option defaultValue>Select a {activeFilter}</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
        </section>
      )}

      {/* 3. ALPHABET NAVIGATION (Redirects to [slug].js) */}
      <div className="container py-5 mt-4">
        <div className="d-flex justify-content-between overflow-auto pb-2 border-bottom">
          {alphabet.map((char) => (
            <button 
              key={char} 
              onClick={() => router.push(`/attorneys/${char.toLowerCase()}`)}
              className="btn btn-link text-decoration-none text-dark fw-bold fs-3 px-1 border-0" 
              style={{ fontFamily: 'serif', letterSpacing: '2px' }}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* 4. STATS BOX */}
      <section className="container mb-5 shadow p-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-4 p-5 text-center text-white" style={{ backgroundColor: gtBlue }}>
            <div className="display-2 fw-bold">51</div>
            <p className="h5 fw-normal">Offices Worldwide</p>
          </div>
          <div className="col-md-8 p-5 text-center text-white bg-dark">
             <div className="display-2 fw-bold">800+</div>
             <p className="h5 fw-normal">Chambers Rankings Globally</p>
          </div>
        </div>
      </section>

    </main>
  );
}