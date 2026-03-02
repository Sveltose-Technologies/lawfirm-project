

import React, { useState, useEffect } from 'react';
import { getAllAwards, IMG_URL } from '../services/authService';

function AwardsAccolades() {
  // --- States ---
  const [allAwards, setAllAwards] = useState([]); // Master data (Backup)
  const [filteredData, setFilteredData] = useState([]); // Display data
  const [uniqueYears, setUniqueYears] = useState([]); // Dynamic years for dropdown
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    presenter: '', // Organization
    recipient: '', // Person Name
    year: ''       // Selected Year
  });

  // --- 1. Fetch Data from API ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAwards();
        if (res && res.success) {
          const data = res.data || [];
          setAllAwards(data);
          setFilteredData(data);

          // DYNAMIC YEARS LOGIC: 
          // Backend data se saare saal nikal kar unhe unique (duplicate hatana) aur sort (descending) karna
          const years = data
            .map(item => item.year)
            .filter(year => year) // null ya empty hatane ke liye
            .sort((a, b) => b - a); // Latest year pehle
          
          const uniqueY = [...new Set(years)]; // Set se duplicates hat gaye
          setUniqueYears(uniqueY);
        }
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- 2. Handle Input Change ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // --- 3. Frontend Filtering Logic ---
  const handleSearch = (e) => {
    if (e) e.preventDefault();

    const results = allAwards.filter((item) => {
      const matchPresenter = (item.organization || "").toLowerCase().includes(filters.presenter.toLowerCase().trim());
      const matchRecipient = (item.personName || "").toLowerCase().includes(filters.recipient.toLowerCase().trim());
      const matchYear = filters.year === "" ? true : (item.year || "").toString() === filters.year;

      return matchPresenter && matchRecipient && matchYear;
    });
    setFilteredData(results);
  };

  // --- 4. Handle Reset Logic ---
  const handleReset = () => {
    setFilters({ presenter: '', recipient: '', year: '' });
    setFilteredData(allAwards); // Wapis sara data dikhao
  };

  // Banner Image Logic (Object-fit Cover fix)
  const bannerImg = allAwards.length > 0 && allAwards[0].bannerImage 
                    ? `${IMG_URL}/${allAwards[0].bannerImage}` 
                    : '/assets/images/our-firm4.png';

  if (loading) return <div className="p-5 text-center">Loading Awards...</div>;

  return (
    <>
      {/* ==========================================================================
          1. BANNER SECTION (Image Fix: backgroundSize: cover)
      ========================================================================== */}
      <div className="inner-banner-section" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bannerImg}')`, 
          padding: '120px 0', 
          backgroundSize: 'cover',       // Image pichkegi nahi
          backgroundPosition: 'center',   // Image center focus rahegi
          backgroundRepeat: 'no-repeat',
          textAlign: 'center',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
      }}>
          <div className="container">
              <h1 className="text-white display-4 fw-bold font-serif">Awards & Accolades</h1>
              <p className="text-white lead">Recognizing Excellence in Legal Practice</p>
          </div>
      </div>

      {/* ==========================================================================
          2. SEARCH & FILTER SECTION (Dynamic Dropdown)
      ========================================================================== */}
      <div className="container py-5">
        
        <div className="card shadow-sm border-0 mb-5" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card-body p-4">
                {/* <h5 className="mb-4 fw-bold" style={{ color: '#0a1c38' }}>
                    <i className="bi bi-search me-2" style={{ color: '#CFA167' }}></i>
                    Filter Accolades
                </h5> */}
                <form onSubmit={handleSearch}>
                    <div className="row g-3">
                        
                        {/* Presenter / Organization */}
                        <div className="col-md-3">
                            <label className="form-label fw-bold small text-muted">Organization</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search Organization..." 
                                name="presenter"
                                value={filters.presenter}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Person Name */}
                        <div className="col-md-3">
                            <label className="form-label fw-bold small text-muted">Person Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search Recipient..." 
                                name="recipient"
                                value={filters.recipient}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* DYNAMIC YEAR DROPDOWN */}
                        <div className="col-md-3">
                            <label className="form-label fw-bold small text-muted">Year</label>
                            <select 
                                className="form-select" 
                                name="year"
                                value={filters.year}
                                onChange={handleInputChange}
                            >
                                <option value="">All Years</option>
                                {uniqueYears.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        {/* Search & Reset Buttons */}
                        <div className="col-md-3 d-flex align-items-end">
                            <button type="submit" className="btn text-white w-50 me-2 shadow-sm" style={{ backgroundColor: '#0a1c38' }}>Search</button>
                            <button type="button" onClick={handleReset} className="btn btn-outline-secondary w-50 shadow-sm">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        {/* ==========================================================================
            3. DATA TABLE SECTION
        ========================================================================== */}
        <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="text-white" style={{ backgroundColor: '#0a1c38' }}>
                    <tr>
                        <th className="py-3 ps-3">Year</th>
                        <th className="py-3">Organization</th>
                        <th className="py-3">Award Title</th>
                        <th className="py-3">Recipient</th>
                        <th className="py-3">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <tr key={row.id}>
                                <td className="ps-3 fw-bold" style={{ color: '#CFA167' }}>{row.year}</td>
                                <td className="fw-semibold">{row.organization}</td>
                                <td>
                                    <span className="badge bg-light text-dark border p-2">
                                        {row.awardTitle}
                                    </span>
                                </td>
                                <td>{row.personName}</td>
                                <td className="text-muted small">
                                    <div dangerouslySetInnerHTML={{ __html: row.details }} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-5">
                                <h5 className="text-muted">No records found matching your criteria.</h5>
                                <button className="btn btn-link" onClick={handleReset}>Clear All Filters</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>

      <style jsx>{`
        .font-serif { font-family: "Georgia", serif; }
        .inner-banner-section { width: 100%; }
        .table thead th { letter-spacing: 0.5px; text-transform: uppercase; font-size: 0.85rem; }
      `}</style>
    </>
  )
}

export default AwardsAccolades;