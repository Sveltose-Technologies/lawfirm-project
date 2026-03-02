// // // // // FILE: pages/events/index.js
// // // // import React, { useState, useMemo } from 'react';
// // // // import Link from 'next/link';
// // // // import Head from 'next/head';

// // // // // --- DATA SOURCE ---
// // // // export const eventsData = [
// // // //   {
// // // //     id: 1,
// // // //     title: "26th Annual Berkeley - Stanford Advanced Patent Law Institute",
// // // //     date: "2025-12-04",
// // // //     time: "09:00 AM - 05:00 PM",
// // // //     location: "Stanford, CA, USA",
// // // //     type: "Conference",
// // // //     relatedProfessionals: ["Caroline K. Abbott"],
// // // //     topic: "Intellectual Property",
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     title: "Reconfiguration of Amparo in Mexico: Business Implications",
// // // //     date: "2025-12-04",
// // // //     time: "02:00 PM - 04:00 PM",
// // // //     location: "Virtual / Webinar",
// // // //     type: "Webinar",
// // // //     relatedProfessionals: ["Jacob M. Abdo"],
// // // //     topic: "International Law",
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     title: "Patent Litigation Trends in MedTech",
// // // //     date: "2025-12-10",
// // // //     time: "12:00 PM - 01:00 PM ET",
// // // //     location: "Online",
// // // //     type: "Webinar",
// // // //     relatedProfessionals: ["Darren J. Abernethy"],
// // // //     topic: "MedTech",
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 4,
// // // //     title: "Renewables M&A and Tax Equity Markets Preview",
// // // //     date: "2025-12-15",
// // // //     time: "02:00 PM - 03:00 PM ET",
// // // //     location: "New York, NY",
// // // //     type: "Seminar",
// // // //     relatedProfessionals: ["Charles J. Abrams"],
// // // //     topic: "Energy & Tax",
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 5,
// // // //     title: "Builders Association Holiday Party & Awards",
// // // //     date: "2025-12-20",
// // // //     time: "06:00 PM - 10:00 PM",
// // // //     location: "Miami, FL",
// // // //     type: "Networking",
// // // //     relatedProfessionals: ["Ejim Peter Achi"],
// // // //     topic: "Real Estate",
// // // //     registrationLink: "/register"
// // // //   }
// // // // ];

// // // // export default function EventsPage() {
// // // //   const theme = {
// // // //     primaryBlue: '#002855',
// // // //     accentGold: '#cfa144',
// // // //     white: '#ffffff',
// // // //     lightGray: '#f8f9fa'
// // // //   };

// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [filters, setFilters] = useState({ location: 'All', topic: 'All' });

// // // //   const locations = ['All', ...new Set(eventsData.map(e => e.location))].sort();
// // // //   const topics = ['All', ...new Set(eventsData.map(e => e.topic))].sort();

// // // //   const filteredEvents = useMemo(() => {
// // // //     return eventsData.filter(event => {
// // // //       if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
// // // //       if (filters.location !== 'All' && event.location !== filters.location) return false;
// // // //       if (filters.topic !== 'All' && event.topic !== filters.topic) return false;
// // // //       return true;
// // // //     });
// // // //   }, [searchTerm, filters]);

// // // //   const getDayMonth = (dateStr) => {
// // // //     const date = new Date(dateStr);
// // // //     return {
// // // //       day: date.getDate(),
// // // //       month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
// // // //       year: date.getFullYear()
// // // //     };
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <Head>
// // // //         <title>Events | Core Law</title>
// // // //       </Head>

// // // //       <div style={{ backgroundColor: theme.primaryBlue, padding: '100px 0', textAlign: 'center' }}>
// // // //         <div className="container">
// // // //           <h1 className="text-white display-4 fw-bold font-serif">Events & Webinars</h1>
// // // //           <p className="text-white lead">Connect with our legal experts.</p>
// // // //         </div>
// // // //       </div>

// // // //       <div className="py-5 bg-white">
// // // //         <div className="container">
// // // //           {/* Filters */}
// // // //           <div className="row mb-5 g-3">
// // // //             <div className="col-md-4">
// // // //               <input type="text" className="form-control" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // //             </div>
// // // //             <div className="col-md-3">
// // // //               <select className="form-select" value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}>
// // // //                 {locations.map(l => <option key={l} value={l}>{l}</option>)}
// // // //               </select>
// // // //             </div>
// // // //             <div className="col-md-3">
// // // //               <select className="form-select" value={filters.topic} onChange={(e) => setFilters({...filters, topic: e.target.value})}>
// // // //                 {topics.map(t => <option key={t} value={t}>{t}</option>)}
// // // //               </select>
// // // //             </div>
// // // //             <div className="col-md-2">
// // // //                 <button className="btn btn-outline-danger w-100" onClick={() => {setSearchTerm(''); setFilters({location:'All', topic:'All'})}}>Reset</button>
// // // //             </div>
// // // //           </div>

// // // //           {/* List */}
// // // //           <div className="row g-4">
// // // //             {filteredEvents.length > 0 ? filteredEvents.map((event) => {
// // // //                const dateObj = getDayMonth(event.date);
// // // //                return (
// // // //                 <div className="col-12" key={event.id}>
// // // //                    <div className="card border-0 shadow-sm overflow-hidden">
// // // //                       <div className="row g-0">
// // // //                          <div className="col-md-2 bg-light text-center p-3 d-flex flex-column justify-content-center align-items-center border-end">
// // // //                             <h2 className="fw-bold mb-0 text-primary display-5">{dateObj.day}</h2>
// // // //                             <span className="text-uppercase fw-bold text-muted">{dateObj.month}</span>
// // // //                             <small>{dateObj.year}</small>
// // // //                          </div>
// // // //                          <div className="col-md-10">
// // // //                             <div className="card-body p-4">
// // // //                                <span className="badge bg-secondary mb-2">{event.type}</span>
// // // //                                <h3 className="card-title mb-2">
// // // //                                   {/* Link Fix for dynamic routing */}
// // // //                                   <Link href={`/events/${event.id}`} passHref>
// // // //                                     <span className="text-decoration-none text-dark hover-gold" style={{cursor: 'pointer'}}>{event.title}</span>
// // // //                                   </Link>
// // // //                                </h3>
// // // //                                <p className="text-muted mb-2"><i className="bi bi-geo-alt-fill text-warning me-2"></i>{event.location}</p>
// // // //                                <div className="d-flex justify-content-between align-items-center mt-3">
// // // //                                   <Link href={`/events/${event.id}`} passHref>
// // // //                                      <span className="text-primary fw-bold text-decoration-none" style={{cursor: 'pointer'}}>View Details →</span>
// // // //                                   </Link>
// // // //                                   {/* Using prefetch=false to stop console 404s for register page */}
// // // //                                   <Link href={event.registrationLink} prefetch={false} passHref>
// // // //                                      <a className="btn btn-primary btn-sm px-4">Register</a>
// // // //                                   </Link>
// // // //                                </div>
// // // //                             </div>
// // // //                          </div>
// // // //                       </div>
// // // //                    </div>
// // // //                 </div>
// // // //                );
// // // //             }) : (
// // // //                 <div className="text-center py-5"><h4>No events found.</h4></div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <style jsx>{` .hover-gold:hover { color: ${theme.accentGold} !important; } `}</style>
// // // //     </>
// // // //   );
// // // // }




// // // // import React, { useState, useMemo } from 'react';
// // // // import Link from 'next/link';
// // // // import Head from 'next/head';

// // // // // --- DATA ---
// // // // export const eventsData = [
// // // //   {
// // // //     id: 1,
// // // //     date: "2025-12-04",
// // // //     time: "09:00 AM",
// // // //     title: "26th Annual Berkeley - Stanford Advanced Patent Law Institute",
// // // //     topic: "Intellectual Property",
// // // //     type: "Conference",
// // // //     location: "Stanford, CA",
// // // //     professionals: ["Caroline K. Abbott"],
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     date: "2025-12-04",
// // // //     time: "02:00 PM",
// // // //     title: "Reconfiguration of Amparo in Mexico: Business Implications",
// // // //     topic: "International Law",
// // // //     type: "Webinar",
// // // //     location: "Online",
// // // //     professionals: ["Jacob M. Abdo"],
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     date: "2025-12-10",
// // // //     time: "12:00 PM",
// // // //     title: "Patent Litigation Trends in MedTech",
// // // //     topic: "MedTech",
// // // //     type: "Webinar",
// // // //     location: "Online",
// // // //     professionals: ["Darren J. Abernethy"],
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 4,
// // // //     date: "2025-12-15",
// // // //     time: "02:00 PM",
// // // //     title: "Renewables M&A and Tax Equity Markets Preview",
// // // //     topic: "Energy & Tax",
// // // //     type: "Seminar",
// // // //     location: "New York, NY",
// // // //     professionals: ["Charles J. Abrams"],
// // // //     registrationLink: "/register"
// // // //   },
// // // //   {
// // // //     id: 5,
// // // //     date: "2025-12-20",
// // // //     time: "06:00 PM",
// // // //     title: "Builders Association Holiday Party & Awards",
// // // //     topic: "Real Estate",
// // // //     type: "Networking",
// // // //     location: "Miami, FL",
// // // //     professionals: ["Ejim Peter Achi"],
// // // //     registrationLink: "/register"
// // // //   }
// // // // ];

// // // // export default function EventsPage() {
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [filterLocation, setFilterLocation] = useState('All');
// // // //   const locations = ['All', ...new Set(eventsData.map(e => e.location))].sort();

// // // //   const filteredEvents = useMemo(() => {
// // // //     return eventsData.filter(event => {
// // // //       const matchSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
// // // //       const matchLocation = filterLocation === 'All' || event.location === filterLocation;
// // // //       return matchSearch && matchLocation;
// // // //     });
// // // //   }, [searchTerm, filterLocation]);

// // // //   const handlePrint = () => { if (typeof window !== 'undefined') window.print(); };
// // // //   const shareUrl = "https://corelaw.com/events";

// // // //   return (
// // // //     <>
// // // //       <Head>
// // // //         <title>Events & Webinars | Core Law</title>
// // // //       </Head>

// // // //       {/* BANNER */}
// // // //       <div className="inner-banner" style={{
// // // //          backgroundColor: '#002855', 
// // // //          padding: '120px 0', 
// // // //          textAlign: 'center',
// // // //          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(assets/images/event-banner.png)',
// // // //          backgroundSize: 'cover'
// // // //       }}>
// // // //          <div className="container">
// // // //             <span className="text-warning text-uppercase letter-spacing-2 fw-bold">Connect With Us</span>
// // // //             <h1 className="text-white display-4 fw-bold mt-2">Events Calendar</h1>
// // // //          </div>
// // // //       </div>

// // // //       {/* SEARCH BAR (Floating) */}
// // // //       <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
// // // //          <div className="card shadow-lg border-0 p-4 rounded-3">
// // // //             <div className="row g-3 align-items-end">
// // // //                <div className="col-md-6">
// // // //                   <label className="fw-bold small text-muted">SEARCH</label>
// // // //                   <input type="text" className="form-control" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // //                </div>
// // // //                <div className="col-md-4">
// // // //                   <label className="fw-bold small text-muted">LOCATION</label>
// // // //                   <select className="form-select" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
// // // //                      {locations.map(l => <option key={l} value={l}>{l}</option>)}
// // // //                   </select>
// // // //                </div>
// // // //                <div className="col-md-2">
// // // //                   <button className="btn btn-dark w-100" onClick={() => {setSearchTerm(''); setFilterLocation('All')}}>Reset</button>
// // // //                </div>
// // // //             </div>
// // // //          </div>
// // // //       </div>

// // // //       {/* EVENTS GRID (CARDS) */}
// // // //       <div className="container py-5 mt-3">
// // // //          <div className="row g-4">
// // // //             {filteredEvents.length > 0 ? filteredEvents.map((event) => {
// // // //                const day = new Date(event.date).getDate();
// // // //                const month = new Date(event.date).toLocaleString('default', { month: 'short' });
// // // //                const year = new Date(event.date).getFullYear();

// // // //                return (
// // // //                   <div key={event.id} className="col-lg-4 col-md-6">
// // // //                      <div className="card h-100 border-0 shadow-sm hover-card overflow-hidden">
                        
// // // //                         {/* 1. Top Section: Date & Type */}
// // // //                         <div className="card-header bg-white border-0 p-4 pb-0 d-flex justify-content-between align-items-start">
// // // //                            <div className="date-box text-center rounded p-2 text-white shadow-sm" style={{backgroundColor: '#0a1c38', minWidth: '70px'}}>
// // // //                               <span className="d-block text-uppercase small" style={{opacity: 0.8}}>{month}</span>
// // // //                               <span className="d-block display-6 fw-bold">{day}</span>
// // // //                               <span className="d-block small">{year}</span>
// // // //                            </div>
// // // //                            <span className="badge bg-light text-dark border px-3 py-2">{event.type}</span>
// // // //                         </div>

// // // //                         {/* 2. Body: Content */}
// // // //                         <div className="card-body p-4 pt-3 d-flex flex-column">
// // // //                            <span className="text-warning small fw-bold text-uppercase mb-2">{event.topic}</span>
// // // //                            <h5 className="card-title fw-bold mb-3">
// // // //                               <Link href={`/events/${event.id}`}>
// // // //                                  <a className="text-decoration-none text-dark hover-gold">{event.title}</a>
// // // //                               </Link>
// // // //                            </h5>
                           
// // // //                            <div className="mt-auto">
// // // //                               <div className="d-flex align-items-center mb-2 text-muted small">
// // // //                                  <i className="bi bi-clock me-2 text-warning"></i> {event.time}
// // // //                               </div>
// // // //                               <div className="d-flex align-items-center mb-3 text-muted small">
// // // //                                  <i className="bi bi-geo-alt-fill me-2 text-warning"></i> {event.location}
// // // //                               </div>
// // // //                               <div className="border-top pt-3 text-muted small">
// // // //                                  <strong>Speaker:</strong> {event.professionals[0]}
// // // //                               </div>
// // // //                            </div>
// // // //                         </div>

// // // //                         {/* 3. Footer: Actions */}
// // // //                         <div className="card-footer bg-light border-0 p-3 d-flex justify-content-between align-items-center">
// // // //                            <div className="d-flex gap-3">
// // // //                               <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank"  rel="noopener noreferrer" className="text-secondary hover-icon"><i className="bi bi-facebook"></i></a>
// // // //                               <a href={`https://linkedin.com/shareArticle?url=${shareUrl}`} target="_blank"  rel="noopener noreferrer" className="text-secondary hover-icon"><i className="bi bi-linkedin"></i></a>
// // // //                               <i className="bi bi-printer text-secondary hover-icon" style={{cursor: 'pointer'}} onClick={handlePrint}></i>
// // // //                            </div>
                           
// // // //                            <Link href={`/events/${event.id}`}>
// // // //                               <a className="btn btn-sm text-white px-4 fw-bold" style={{backgroundColor: '#de9f57', borderRadius: '20px'}}>Register</a>
// // // //                            </Link>
// // // //                         </div>

// // // //                      </div>
// // // //                   </div>
// // // //                );
// // // //             }) : (
// // // //                <div className="col-12 text-center py-5">
// // // //                   <h3 className="text-muted">No events found.</h3>
// // // //                </div>
// // // //             )}
// // // //          </div>
// // // //       </div>

// // // //       <style jsx>{`
// // // //         .letter-spacing-2 { letter-spacing: 2px; }
// // // //         .hover-card {
// // // //             transition: transform 0.3s ease, box-shadow 0.3s ease;
// // // //         }
// // // //         .hover-card:hover {
// // // //             transform: translateY(-5px);
// // // //             box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
// // // //         }
// // // //         .hover-gold:hover {
// // // //             color: #de9f57 !important;
// // // //             transition: color 0.2s;
// // // //         }
// // // //         .hover-icon:hover {
// // // //             color: #0a1c38 !important;
// // // //             transform: scale(1.2);
// // // //             transition: all 0.2s;
// // // //         }
// // // //       `}</style>
// // // //     </>
// // // //   );
// // // // }


// // // import React, { useState, useMemo } from 'react';
// // // import Link from 'next/link';
// // // import Head from 'next/head';

// // // // --- DATA ---
// // // // Aap is data ko ek alag file (e.g., data/eventsData.js) mein bhi rakh sakte hain agar chahein.
// // // export const eventsData = [
// // //   {
// // //     id: 1,
// // //     date: "2025-12-04",
// // //     time: "09:00 AM",
// // //     title: "26th Annual Berkeley - Stanford Advanced Patent Law Institute",
// // //     topic: "Intellectual Property",
// // //     type: "Conference",
// // //     location: "Stanford, CA",
// // //     professionals: ["Caroline K. Abbott"],
// // //     registrationLink: "/register"
// // //   },
// // //   {
// // //     id: 2,
// // //     date: "2025-12-04",
// // //     time: "02:00 PM",
// // //     title: "Reconfiguration of Amparo in Mexico: Business Implications",
// // //     topic: "International Law",
// // //     type: "Webinar",
// // //     location: "Online",
// // //     professionals: ["Jacob M. Abdo"],
// // //     registrationLink: "/register"
// // //   },
// // //   {
// // //     id: 3,
// // //     date: "2025-12-10",
// // //     time: "12:00 PM",
// // //     title: "Patent Litigation Trends in MedTech",
// // //     topic: "MedTech",
// // //     type: "Webinar",
// // //     location: "Online",
// // //     professionals: ["Darren J. Abernethy"],
// // //     registrationLink: "/register"
// // //   },
// // //   {
// // //     id: 4,
// // //     date: "2025-12-15",
// // //     time: "02:00 PM",
// // //     title: "Renewables M&A and Tax Equity Markets Preview",
// // //     topic: "Energy & Tax",
// // //     type: "Seminar",
// // //     location: "New York, NY",
// // //     professionals: ["Charles J. Abrams"],
// // //     registrationLink: "/register"
// // //   },
// // //   {
// // //     id: 5,
// // //     date: "2025-12-20",
// // //     time: "06:00 PM",
// // //     title: "Builders Association Holiday Party & Awards",
// // //     topic: "Real Estate",
// // //     type: "Networking",
// // //     location: "Miami, FL",
// // //     professionals: ["Ejim Peter Achi"],
// // //     registrationLink: "/register"
// // //   }
// // // ];

// // // export default function EventsPage() {
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [filterLocation, setFilterLocation] = useState('All');
// // //   const locations = ['All', ...new Set(eventsData.map(e => e.location))].sort();

// // //   const filteredEvents = useMemo(() => {
// // //     return eventsData.filter(event => {
// // //       const matchSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
// // //       const matchLocation = filterLocation === 'All' || event.location === filterLocation;
// // //       return matchSearch && matchLocation;
// // //     });
// // //   }, [searchTerm, filterLocation]);

// // //   const handlePrint = () => { if (typeof window !== 'undefined') window.print(); };
// // //   const shareUrl = "https://corelaw.com/events";

// // //   return (
// // //     <>
// // //       <Head>
// // //         <title>Events & Webinars | Core Law</title>
// // //       </Head>

// // //       {/* BANNER */}
// // //       <div className="inner-banner" style={{
// // //          backgroundColor: '#002855', 
// // //          padding: '120px 0', 
// // //          textAlign: 'center',
// // //          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images/event-banner.png)',
// // //          backgroundSize: 'cover'
// // //       }}>
// // //          <div className="container">
// // //             <span className="text-warning text-uppercase letter-spacing-2 fw-bold">Connect With Us</span>
// // //             <h1 className="text-white display-4 fw-bold mt-2">Events Calendar</h1>
// // //          </div>
// // //       </div>

// // //       {/* SEARCH BAR (Floating) */}
// // //       <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
// // //          <div className="card shadow-lg border-0 p-4 rounded-3">
// // //             <div className="row g-3 align-items-end">
// // //                <div className="col-md-6">
// // //                   <label className="fw-bold small text-muted">SEARCH</label>
// // //                   <input type="text" className="form-control" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //                </div>
// // //                <div className="col-md-4">
// // //                   <label className="fw-bold small text-muted">LOCATION</label>
// // //                   <select className="form-select" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
// // //                      {locations.map(l => <option key={l} value={l}>{l}</option>)}
// // //                   </select>
// // //                </div>
// // //                <div className="col-md-2">
// // //                   <button className="btn btn-dark w-100" onClick={() => {setSearchTerm(''); setFilterLocation('All')}}>Reset</button>
// // //                </div>
// // //             </div>
// // //          </div>
// // //       </div>

// // //       {/* EVENTS GRID (CARDS) */}
// // //       <div className="container py-5 mt-3">
// // //          <div className="row g-4">
// // //             {filteredEvents.length > 0 ? filteredEvents.map((event) => {
// // //                const day = new Date(event.date).getDate();
// // //                const month = new Date(event.date).toLocaleString('default', { month: 'short' });
// // //                const year = new Date(event.date).getFullYear();

// // //                return (
// // //                   <div key={event.id} className="col-lg-4 col-md-6">
// // //                      <div className="card h-100 border-0 shadow-sm hover-card overflow-hidden">
                        
// // //                         {/* 1. Top Section: Date & Type */}
// // //                         <div className="card-header bg-white border-0 p-4 pb-0 d-flex justify-content-between align-items-start">
// // //                            <div className="date-box text-center rounded p-2 text-white shadow-sm" style={{backgroundColor: '#0a1c38', minWidth: '70px'}}>
// // //                               <span className="d-block text-uppercase small" style={{opacity: 0.8}}>{month}</span>
// // //                               <span className="d-block display-6 fw-bold">{day}</span>
// // //                               <span className="d-block small">{year}</span>
// // //                            </div>
// // //                            <span className="badge bg-light text-dark border px-3 py-2">{event.type}</span>
// // //                         </div>

// // //                         {/* 2. Body: Content */}
// // //                         <div className="card-body p-4 pt-3 d-flex flex-column">
// // //                            <span className="text-warning small fw-bold text-uppercase mb-2">{event.topic}</span>
// // //                            <h5 className="card-title fw-bold mb-3">
// // //                               <Link href={`/events/${event.id}`}>
// // //                                  <a className="text-decoration-none text-dark hover-gold">{event.title}</a>
// // //                               </Link>
// // //                            </h5>
                           
// // //                            <div className="mt-auto">
// // //                               <div className="d-flex align-items-center mb-2 text-muted small">
// // //                                  <i className="bi bi-clock me-2 text-warning"></i> {event.time}
// // //                               </div>
// // //                               <div className="d-flex align-items-center mb-3 text-muted small">
// // //                                  <i className="bi bi-geo-alt-fill me-2 text-warning"></i> {event.location}
// // //                               </div>
// // //                               <div className="border-top pt-3 text-muted small">
// // //                                  <strong>Speaker:</strong> {event.professionals[0]}
// // //                               </div>
// // //                            </div>
// // //                         </div>

// // //                         {/* 3. Footer: Actions */}
// // //                         <div className="card-footer bg-light border-0 p-3 d-flex justify-content-between align-items-center">
// // //                            <div className="d-flex gap-3">
// // //                               <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank"  rel="noopener noreferrer" className="text-secondary hover-icon"><i className="bi bi-facebook"></i></a>
// // //                               <a href={`https://linkedin.com/shareArticle?url=${shareUrl}`} target="_blank"  rel="noopener noreferrer" className="text-secondary hover-icon"><i className="bi bi-linkedin"></i></a>
// // //                               <i className="bi bi-printer text-secondary hover-icon" style={{cursor: 'pointer'}} onClick={handlePrint}></i>
// // //                            </div>
                           
// // //                            <Link href={`/events/${event.id}`}>
// // //                               <a className="btn btn-sm text-white px-4 fw-bold" style={{backgroundColor: '#de9f57', borderRadius: '20px'}}>Register</a>
// // //                            </Link>
// // //                         </div>

// // //                      </div>
// // //                   </div>
// // //                );
// // //             }) : (
// // //                <div className="col-12 text-center py-5">
// // //                   <h3 className="text-muted">No events found.</h3>
// // //                </div>
// // //             )}
// // //          </div>
// // //       </div>

// // //       <style jsx>{`
// // //         .letter-spacing-2 { letter-spacing: 2px; }
// // //         .hover-card {
// // //             transition: transform 0.3s ease, box-shadow 0.3s ease;
// // //         }
// // //         .hover-card:hover {
// // //             transform: translateY(-5px);
// // //             box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
// // //         }
// // //         .hover-gold:hover {
// // //             color: #de9f57 !important;
// // //             transition: color 0.2s;
// // //         }
// // //         .hover-icon:hover {
// // //             color: #0a1c38 !important;
// // //             transform: scale(1.2);
// // //             transition: all 0.2s;
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // }


// // import React, { useState, useEffect } from 'react';
// // import Head from 'next/head';
// // import Link from 'next/link';

// // import { 
// //   getAllEvents, 
// //   getAllCapabilitySubCategories, 
// //   getAllLocationCities,
// //   IMG_URL 
// // } from '../../services/authService';

// // function EventsIndex() {
// //   const [eventsList, setEventsList] = useState([]);
// //   const [capabilities, setCapabilities] = useState([]);
// //   const [locations, setLocations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [mounted, setMounted] = useState(false);

// //   // --- Filter States ---
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [activeFilterTab, setActiveFilterTab] = useState(null); 
// //   const [filters, setFilters] = useState({ capability: '', location: '', date: '', topic: '' });

// //   const createSlug = (text) => text?.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

// //   useEffect(() => {
// //     setMounted(true);
// //     const fetchEventsData = async () => {
// //       setLoading(true);
// //       try {
// //         const [eventRes, capRes, locRes] = await Promise.all([
// //           // In APIs ko apne backend ke hisab se adjust karein
// //           getAllEvents ? getAllEvents() : { status: true, data: [] }, 
// //           getAllCapabilitySubCategories(),
// //           getAllLocationCities()
// //         ]);

// //         if (eventRes?.status) setEventsList(eventRes.data);
// //         if (capRes?.success) setCapabilities(capRes.data?.data || capRes.data || []);
// //         if (locRes?.success) setLocations(locRes.data || []);
// //       } catch (error) {
// //         console.error("Fetch Error:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchEventsData();
// //   }, []);

// //   if (!mounted) return null;

// //   // --- Filter Logic ---
// //   const filteredEvents = eventsList.filter(item => {
// //     const matchesSearch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
// //     let matchesCap = filters.capability ? JSON.parse(item.capabilityCategoryId || "[]").includes(Number(filters.capability)) : true;
// //     let matchesLoc = filters.location ? JSON.parse(item.cityId || "[]").includes(Number(filters.location)) : true;
// //     let matchesDate = filters.date ? item.date === filters.date : true;
// //     return matchesSearch && matchesCap && matchesLoc && matchesDate;
// //   });

// //   return (
// //     <div className="bg-white">
// //       <Head>
// //         <title>Events | Core Law</title>
// //         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
// //       </Head>

// //       {/* ================= HERO SECTION ================= */}
// //       <section className="py-5 text-center bg-white border-bottom">
// //         <div className="container py-lg-5">
// //           <h1 className="font-serif display-1 mb-3">Events</h1>
// //           <p className="lead mb-0 text-secondary fs-4">Opportunities for us to connect.</p>
// //         </div>
// //       </section>

// //       {/* ================= FILTER SECTION (Dark/Slant Style) ================= */}
// //       <section className="border-top" style={{ backgroundColor: 'var(--text-dark)', borderTop: '5px solid var(--primary-gold)' }}>
// //         <div className="container">
// //           <div className="row align-items-center py-4 g-4">
// //             {/* Search Box */}
// //             <div className="col-lg-5">
// //               <div className="d-flex align-items-center border-bottom border-secondary pb-2">
// //                 <input 
// //                   type="text" 
// //                   placeholder="Search Events By Keyword" 
// //                   className="bg-transparent border-0 text-white w-100 outline-none shadow-none fs-5"
// //                   style={{ outline: 'none' }}
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                 />
// //                 <i className="bi bi-search text-gold fs-5"></i>
// //               </div>
// //             </div>

// //             {/* Filter Tabs */}
// //             <div className="col-lg-7">
// //               <div className="d-flex flex-wrap justify-content-lg-end align-items-center gap-3 text-white">
// //                 <span className="fw-bold d-none d-md-block" style={{ color: '#94cce9' }}>Filter Events by:</span>
// //                 <div className="d-flex flex-wrap gap-3">
// //                   {[
// //                     { label: 'Date', key: 'date' },
// //                     { label: 'Location', key: 'location' },
// //                     { label: 'Capability', key: 'capability' }
// //                   ].map((tab) => (
// //                     <span 
// //                       key={tab.key}
// //                       onClick={() => setActiveFilterTab(activeFilterTab === tab.key ? null : tab.key)}
// //                       className="cursor-pointer text-uppercase small fw-bold"
// //                       style={{ color: activeFilterTab === tab.key ? 'var(--primary-gold)' : 'white', cursor: 'pointer' }}
// //                     >
// //                       {tab.label} <i className={`bi bi-chevron-${activeFilterTab === tab.key ? 'up' : 'down'} ms-1`}></i>
// //                     </span>
// //                   ))}
// //                   <span className="text-uppercase small fw-bold opacity-50">Topic <i className="bi bi-chevron-right ms-1"></i></span>
// //                   <span className="text-uppercase small fw-bold opacity-50">Professional <i className="bi bi-chevron-right ms-1"></i></span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* DYNAMIC SELECT DROPDOWNS */}
// //           {activeFilterTab && (
// //             <div className="row pb-4 animate__animated animate__fadeIn">
// //               <div className="col-12">
// //                 {activeFilterTab === 'capability' && (
// //                   <select 
// //                     className="form-select rounded-0 border-gold shadow-none bg-white py-2" 
// //                     value={filters.capability} 
// //                     onChange={(e) => { setFilters({...filters, capability: e.target.value}); setActiveFilterTab(null); }}
// //                   >
// //                     <option value="">Select a Capability</option>
// //                     {capabilities.map(cap => <option key={cap.id} value={cap.id}>{cap.subcategoryName}</option>)}
// //                   </select>
// //                 )}
// //                 {activeFilterTab === 'location' && (
// //                   <select 
// //                     className="form-select rounded-0 border-gold shadow-none bg-white py-2" 
// //                     value={filters.location} 
// //                     onChange={(e) => { setFilters({...filters, location: e.target.value}); setActiveFilterTab(null); }}
// //                   >
// //                     <option value="">Select a Location</option>
// //                     {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.cityName}</option>)}
// //                   </select>
// //                 )}
// //                 {activeFilterTab === 'date' && (
// //                   <div className="d-flex gap-2">
// //                     <input type="date" className="form-control rounded-0 border-gold shadow-none w-auto" value={filters.date} onChange={(e) => setFilters({...filters, date: e.target.value})} />
// //                     <button className="btn btn-warning rounded-0 px-4 fw-bold" onClick={() => {setFilters({...filters, date: ''}); setActiveFilterTab(null);}}>RESET</button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       {/* ================= UPCOMING EVENTS LIST ================= */}
// //       <section className="container py-5 min-vh-100">
// //         <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
// //           <h2 className="fw-bold mb-0">Upcoming Events</h2>
// //           <button className="btn btn-outline-dark rounded-0 px-4 fw-bold small">SUBSCRIBE</button>
// //         </div>

// //         {loading ? (
// //           <div className="text-center py-5"><div className="spinner-border text-gold"></div></div>
// //         ) : filteredEvents.length > 0 ? (
// //           filteredEvents.map((item) => (
// //             <div key={item.id} className="news-item border-bottom py-4 mb-3">
// //               <div className="row align-items-start g-3">
// //                 <div className="col-md-10">
// //                   <div className="d-flex align-items-center gap-2 mb-2 small fw-bold text-uppercase">
// //                     <span>{item.date}</span>
// //                     <span className="border-start ps-2 text-muted">EVENT</span>
// //                   </div>
// //                   <Link href={`/events/${item.id}`}>
// //                     <a className="d-block text-decoration-none">
// //                       <h3 className="font-serif text-gold mb-2 h2">{item.title}</h3>
// //                     </a>
// //                   </Link>
// //                   <p className="text-secondary mb-0 fw-bold">{item.locationName || "Location TBD"}</p>
// //                 </div>
// //                 {/* Separator Line */}
// //                 <div className="col-md-2 text-md-end text-muted small mt-md-4">
// //                   <span className="d-none d-md-inline-block border-top me-2" style={{ width: '30px', verticalAlign: 'middle' }}></span>
// //                   {item.readTime || "1 min read"}
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="text-center py-5">
// //             <h3 className="text-muted">No upcoming events found.</h3>
// //             <p onClick={() => setFilters({capability:'', location:'', date:'', topic:''})} className="text-gold cursor-pointer">Clear all filters</p>
// //           </div>
// //         )}

// //         <div className="text-center mt-5">
// //            <button className="btn btn-link text-dark fw-bold text-decoration-none fs-5">View More +</button>
// //         </div>
// //       </section>

// //       {/* ================= STAY CONNECTED ================= */}
// //       <section className="py-5" style={{ backgroundColor: '#94cce9' }}>
// //         <div className="container py-4 text-dark">
// //           <h2 className="fw-bold mb-5">Stay Connected</h2>
// //           <div className="row g-5">
// //             <div className="col-md-12 mb-4">
// //               <h5 className="fw-bold mb-2 fs-4">Greenberg Traurig Blogs</h5>
// //               <p className="mb-3 text-dark opacity-75 w-50">Stay informed about legal and regulatory developments that impact your business.</p>
// //               <button className="btn btn-outline-dark rounded-0 px-4 py-2 fw-bold small">VIEW OUR BLOGS</button>
// //             </div>
// //             <div className="col-md-12 mb-4">
// //               <h5 className="fw-bold mb-2 fs-4">Follow Greenberg Traurig on Social Media</h5>
// //               <p className="mb-3 text-dark opacity-75 w-50">Stay current with the latest legal insights, news, and GT happenings.</p>
// //               <button className="btn btn-outline-dark rounded-0 px-4 py-2 fw-bold small">SOCIAL MEDIA LIBRARY</button>
// //             </div>
// //             <div className="col-md-12">
// //               <h5 className="fw-bold mb-2 fs-4">Subscribe to Greenberg Traurig's Podcasts</h5>
// //               <p className="mb-3 text-dark opacity-75 w-50">Stay up to date on the latest legal trends with our podcast series.</p>
// //               <button className="btn btn-outline-dark rounded-0 px-4 py-2 fw-bold small">GREENBERG TRAURIG PODCASTS</button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // export default EventsIndex;


// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import { 
//   getAllEvents, 
//   getAllCapabilitySubCategories, 
//   getAllLocationCities,
//   IMG_URL 
// } from '../../services/authService';

// function EventsIndex() {
//   const [eventsList, setEventsList] = useState([]);
//   const [capabilities, setCapabilities] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilterTab, setActiveFilterTab] = useState(null); 
//   const [filters, setFilters] = useState({ capability: '', location: '', date: '' });

//   useEffect(() => {
//     setMounted(true);
//     const fetchEventsData = async () => {
//       setLoading(true);
//       try {
//         const [eventRes, capRes, locRes] = await Promise.all([
//           getAllEvents(), 
//           getAllCapabilitySubCategories(),
//           getAllLocationCities()
//         ]);

//         console.log("Events Raw Data:", eventRes); // Debugging

//         if (eventRes?.success) {
//             setEventsList(eventRes.data);
//         }
//         if (capRes?.success) setCapabilities(capRes.data?.data || capRes.data || []);
//         if (locRes?.success) setLocations(locRes.data || []);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEventsData();
//   }, []);

//   if (!mounted) return null;

//   // --- Fixed Filter Logic ---
//   const filteredEvents = eventsList.filter(item => {
//     const matchesSearch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    
//     // API data fix: capabilityCategoryId is number, cityIds is array
//     let matchesCap = filters.capability ? Number(item.capabilityCategoryId) === Number(filters.capability) : true;
//     let matchesLoc = filters.location ? item.cityIds?.includes(Number(filters.location)) : true;
    
//     // Date formatting for comparison
//     let itemDate = item.startDate ? item.startDate.split('T')[0] : '';
//     let matchesDate = filters.date ? itemDate === filters.date : true;

//     return matchesSearch && matchesCap && matchesLoc && matchesDate;
//   });

//   // Top Banner Image (Using first event's image or a fallback)
//   const topBanner = eventsList.length > 0 ? `${IMG_URL}/uploads/${eventsList[0].bannerImage}` : null;

//   return (
//     <div className="bg-white">
//       <Head>
//         <title>Events | Core Law</title>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
//       </Head>

//       {/* ================= HERO SECTION WITH API IMAGE ================= */}
//       <section 
//         className="py-5 text-center position-relative" 
//         style={{ 
//             backgroundImage: topBanner ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${topBanner})` : 'none',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             minHeight: '400px',
//             display: 'flex',
//             alignItems: 'center',
//             color: topBanner ? 'white' : 'black'
//         }}
//       >
//         <div className="container py-lg-5 position-relative">
//           <h1 className="font-serif display-1 mb-3">Events</h1>
//           <p className="lead mb-0 fs-4">Opportunities for us to connect.</p>
//         </div>
//       </section>

//       {/* ================= FILTER SECTION ================= */}
//       <section className="border-top" style={{ backgroundColor: '#1a1a1a', borderTop: '5px solid #c5a059' }}>
//         <div className="container">
//           <div className="row align-items-center py-4 g-4">
//             <div className="col-lg-5">
//               <div className="d-flex align-items-center border-bottom border-secondary pb-2">
//                 <input 
//                   type="text" 
//                   placeholder="Search Events By Keyword" 
//                   className="bg-transparent border-0 text-white w-100 outline-none shadow-none fs-5"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <i className="bi bi-search text-warning fs-5"></i>
//               </div>
//             </div>

//             <div className="col-lg-7">
//               <div className="d-flex flex-wrap justify-content-lg-end align-items-center gap-3 text-white">
//                 <span className="fw-bold d-none d-md-block" style={{ color: '#94cce9' }}>Filter Events by:</span>
//                 <div className="d-flex flex-wrap gap-3">
//                   {[
//                     { label: 'Date', key: 'date' },
//                     { label: 'Location', key: 'location' },
//                     { label: 'Capability', key: 'capability' }
//                   ].map((tab) => (
//                     <span 
//                       key={tab.key}
//                       onClick={() => setActiveFilterTab(activeFilterTab === tab.key ? null : tab.key)}
//                       className="cursor-pointer text-uppercase small fw-bold"
//                       style={{ color: activeFilterTab === tab.key ? '#c5a059' : 'white', cursor: 'pointer' }}
//                     >
//                       {tab.label} <i className={`bi bi-chevron-${activeFilterTab === tab.key ? 'up' : 'down'} ms-1`}></i>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* DYNAMIC DROPDOWNS */}
//           {activeFilterTab && (
//             <div className="row pb-4">
//               <div className="col-12">
//                 {activeFilterTab === 'capability' && (
//                   <select 
//                     className="form-select rounded-0" 
//                     value={filters.capability} 
//                     onChange={(e) => { setFilters({...filters, capability: e.target.value}); setActiveFilterTab(null); }}
//                   >
//                     <option value="">Select a Capability</option>
//                     {capabilities.map(cap => <option key={cap.id} value={cap.id}>{cap.subcategoryName}</option>)}
//                   </select>
//                 )}
//                 {activeFilterTab === 'location' && (
//                   <select 
//                     className="form-select rounded-0" 
//                     value={filters.location} 
//                     onChange={(e) => { setFilters({...filters, location: e.target.value}); setActiveFilterTab(null); }}
//                   >
//                     <option value="">Select a Location</option>
//                     {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.cityName}</option>)}
//                   </select>
//                 )}
//                 {activeFilterTab === 'date' && (
//                   <div className="d-flex gap-2">
//                     <input type="date" className="form-control rounded-0 w-auto" value={filters.date} onChange={(e) => setFilters({...filters, date: e.target.value})} />
//                     <button className="btn btn-warning rounded-0" onClick={() => {setFilters({...filters, date: ''}); setActiveFilterTab(null);}}>RESET</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ================= UPCOMING EVENTS LIST ================= */}
//       <section className="container py-5 min-vh-100">
//         <h2 className="fw-bold mb-5 border-bottom pb-3">Upcoming Events</h2>

//         {loading ? (
//           <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
//         ) : filteredEvents.length > 0 ? (
//           filteredEvents.map((item) => (
//             <div key={item.id} className="news-item border-bottom py-4 mb-3">
//               <div className="row align-items-center">
//                 <div className="col-md-2 mb-3 mb-md-0">
//                    {/* Thumbnail image if exists */}
//                    <img 
//                     src={`${IMG_URL}/uploads/${item.bannerImage}`} 
//                     alt={item.title} 
//                     className="img-fluid rounded shadow-sm"
//                     style={{ maxHeight: '100px', width: '100%', objectFit: 'cover' }}
//                     onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
//                    />
//                 </div>
//                 <div className="col-md-8">
//                   <div className="d-flex align-items-center gap-2 mb-2 small fw-bold text-uppercase">
//                     <span className="text-primary">{new Date(item.startDate).toLocaleDateString()}</span>
//                     <span className="border-start ps-2 text-muted">EVENT</span>
//                   </div>
//                   <Link href={`/events/${item.id}`}>
//                     <a className="text-decoration-none">
//                       <h3 className="text-dark mb-2 h4 hover-gold">{item.title}</h3>
//                     </a>
//                   </Link>
//                   <p className="text-secondary small mb-0">
//                     <i className="bi bi-geo-alt-fill me-1"></i>
//                     {item.locationName || "Virtual / To Be Decided"}
//                   </p>
//                 </div>
//                 <div className="col-md-2 text-md-end">
//                    <Link href={`/events/${item.id}`}>
//                      <button className="btn btn-sm btn-outline-dark rounded-0">LEARN MORE</button>
//                    </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-5">
//             <h3 className="text-muted">No upcoming events found.</h3>
//             <button onClick={() => setFilters({capability:'', location:'', date:''})} className="btn btn-link text-warning">Clear all filters</button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default EventsIndex;

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  getAllEvents, 
  getAllCapabilitySubCategories, 
  getAllLocationCities,
  IMG_URL 
} from '../../services/authService';

function EventsIndex() {
  const [eventsList, setEventsList] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState(null); 
  const [filters, setFilters] = useState({ capability: '', location: '', date: '' });

  // 1. Slug banane ke liye function
  const createSlug = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  useEffect(() => {
    setMounted(true);
    const fetchEventsData = async () => {
      setLoading(true);
      try {
        const [eventRes, capRes, locRes] = await Promise.all([
          getAllEvents(), 
          getAllCapabilitySubCategories(),
          getAllLocationCities()
        ]);

        if (eventRes?.success) {
            setEventsList(eventRes.data);
        }
        if (capRes?.success) setCapabilities(capRes.data?.data || capRes.data || []);
        if (locRes?.success) setLocations(locRes.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsData();
  }, []);

  if (!mounted) return null;

  // --- Filter Logic ---
  const filteredEvents = eventsList.filter(item => {
    const matchesSearch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCap = filters.capability ? Number(item.capabilityCategoryId) === Number(filters.capability) : true;
    let matchesLoc = filters.location ? item.cityIds?.includes(Number(filters.location)) : true;
    let itemDate = item.startDate ? item.startDate.split('T')[0] : '';
    let matchesDate = filters.date ? itemDate === filters.date : true;

    return matchesSearch && matchesCap && matchesLoc && matchesDate;
  });

  // Top Banner logic (Hero section ke liye)
  const topBanner = eventsList.length > 0 ? `${IMG_URL}/uploads/${eventsList[0].bannerImage}` : null;

  return (
    <div className="bg-white">
      <Head>
        <title>Events | Core Law</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </Head>

      {/* ================= HERO SECTION ================= */}
      <section 
        className="py-5 text-center position-relative" 
        style={{ 
            backgroundImage: topBanner ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${topBanner})` : 'none',
            backgroundColor: '#222',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '350px',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            marginTop: '40px'
        }}
      >
        <div className="container py-lg-5 position-relative pt-2">
          <h1 className="display-2 mb-3 fw-bold " style={{ fontFamily: 'Georgia, serif' }}>Events</h1>
          <p className="lead mb-0 fs-4 opacity-75">Opportunities for us to connect and share expertise.</p>
        </div>
      </section>

      {/* ================= FILTER SECTION ================= */}
      <section className="border-top" style={{ backgroundColor: '#111', borderTop: '5px solid #c5a059' }}>
        <div className="container">
          <div className="row align-items-center py-4 g-4">
            <div className="col-lg-5">
              <div className="d-flex align-items-center border-bottom border-secondary pb-2">
                <input 
                  type="text" 
                  placeholder="Search Events..." 
                  className="bg-transparent border-0 text-white w-100 outline-none shadow-none fs-5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="bi bi-search text-warning fs-5"></i>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="d-flex flex-wrap justify-content-lg-end align-items-center gap-4 text-white">
                <span className="fw-bold d-none d-md-block" style={{ color: '#94cce9' }}>Filter by:</span>
                {['Date', 'Location', 'Capability'].map((label) => (
                  <span 
                    key={label}
                    onClick={() => setActiveFilterTab(activeFilterTab === label.toLowerCase() ? null : label.toLowerCase())}
                    className="cursor-pointer text-uppercase small fw-bold"
                    style={{ color: activeFilterTab === label.toLowerCase() ? '#c5a059' : 'white', cursor: 'pointer' }}
                  >
                    {label} <i className={`bi bi-chevron-${activeFilterTab === label.toLowerCase() ? 'up' : 'down'} ms-1`}></i>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {activeFilterTab && (
            <div className="row pb-4">
              <div className="col-12">
                {activeFilterTab === 'capability' && (
                  <select className="form-select rounded-0" value={filters.capability} onChange={(e) => { setFilters({...filters, capability: e.target.value}); setActiveFilterTab(null); }}>
                    <option value="">All Capabilities</option>
                    {capabilities.map(cap => <option key={cap.id} value={cap.id}>{cap.subcategoryName || cap.categoryName}</option>)}
                  </select>
                )}
                {activeFilterTab === 'location' && (
                  <select className="form-select rounded-0" value={filters.location} onChange={(e) => { setFilters({...filters, location: e.target.value}); setActiveFilterTab(null); }}>
                    <option value="">All Locations</option>
                    {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.cityName}</option>)}
                  </select>
                )}
                {activeFilterTab === 'date' && (
                  <div className="d-flex gap-2">
                    <input type="date" className="form-control rounded-0 w-auto" value={filters.date} onChange={(e) => setFilters({...filters, date: e.target.value})} />
                    <button className="btn btn-warning rounded-0 fw-bold" onClick={() => {setFilters({...filters, date: ''}); setActiveFilterTab(null);}}>RESET</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= UPCOMING EVENTS LIST (NO IMAGES) ================= */}
      <section className="container py-5 min-vh-100">
        <h2 className="fw-bold mb-5 border-bottom pb-3" style={{ fontFamily: 'Georgia, serif' }}>Upcoming Events</h2>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((item) => {
            const dynamicCityNames = item.cityIds
              ?.map(id => locations.find(loc => Number(loc.id) === Number(id))?.cityName)
              .filter(Boolean).join(", ");

            // Generate Slug from Title
            const eventSlug = createSlug(item.title);

            return (
              <div key={item.id} className="event-row border-bottom py-4 mb-2 transition-all">
                <div className="row align-items-center">
                  <div className="col-md-10">
                    <div className="d-flex align-items-center gap-2 mb-2 small fw-bold text-uppercase">
                      <span className="text-primary">
                        {new Date(item.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-muted opacity-50">•</span>
                      <span className="text-muted">EVENT</span>
                    </div>
                    {/* Navigation using Slug */}
                    <Link href={`/events/${eventSlug}`}>
                      <a className="text-decoration-none">
                        <h3 className="text-dark mb-2 h4 hover-gold" style={{ fontFamily: 'Georgia, serif' }}>{item.title}</h3>
                      </a>
                    </Link>
                    <p className="text-secondary mb-0">
                      <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                      {dynamicCityNames || item.locationName || "Virtual / To Be Decided"}
                    </p>
                  </div>
                  <div className="col-md-2 text-md-end mt-3 mt-md-0">
                    {/* Navigation using Slug */}
                    <Link href={`/events/${eventSlug}`}>
                      <a className="btn btn-sm btn-outline-dark rounded-0 px-4 fw-bold">DETAILS</a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-5">
            <h3 className="text-muted">No upcoming events found matching your criteria.</h3>
          </div>
        )}
      </section>

      <style jsx>{`
        .hover-gold:hover { color: #c5a059 !important; transition: 0.3s; }
        .event-row:hover { background-color: #fcfcfc; padding-left: 10px; border-left: 4px solid #c5a059; }
        .transition-all { transition: all 0.3s ease; }
        .form-select:focus { border-color: #c5a059; box-shadow: none; }
      `}</style>
    </div>
  );
}

export default EventsIndex;