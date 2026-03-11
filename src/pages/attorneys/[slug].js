import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Updated Data with Local Image Path
const attorneyList = [
  {
    id: 1,
    name: "Greta Habib",
    role: "SHAREHOLDER",
    email: "Greta.Habib@gtlaw.com",
    phone: "+971 (0) 50 641 2088",
    location: "Dubai",
    practice: "CORPORATE",
    img: "/assets/images/attorney1.png",
  },
  {
    id: 2,
    name: "Dr. Lukas Hackmann",
    role: "SENIOR ASSOCIATE",
    email: "Lukas.Hackmann@gtlaw.com",
    phone: "+49 30.700.171.202",
    location: "Berlin",
    practice: "CORPORATE",
    img: "/assets/images/attorney1.png",
  },
  {
    id: 3,
    name: "Fatin F. Haddad",
    role: "OF COUNSEL",
    email: "haddadf@gtlaw.com",
    phone: "+1 518.689.1437",
    location: "Albany",
    practice: "CORPORATE",
    img: "/assets/images/attorney1.png",
  },
  {
    id: 4,
    name: "Elizabeth Ross Hadley",
    role: "SHAREHOLDER",
    email: "Elizabeth.Hadley@gtlaw.com",
    phone: "+1 512.320.7227",
    location: "Austin",
    practice: "GOVERNMENT LAW & POLICY",
    img: "/assets/images/attorney1.png",
  },
  {
    id: 5,
    name: "Sebastian Haimerl",
    role: "ASSOCIATE",
    email: "Sebastian.Haimerl@gtlaw.com",
    phone: "+49 30.700.171.112",
    location: "Berlin",
    practice: "CORPORATE",
    img: "/assets/images/attorney1.png",
  },
];

export default function AttorneySlugPage() {
  const router = useRouter();
  const { slug } = router.query;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // New State for Profile Detail View
  const [selectedAttorney, setSelectedAttorney] = useState(null);

  // Reset detail view when slug (alphabet letter) changes
  useEffect(() => {
    setSelectedAttorney(null);
  }, [slug]);

  const filteredAttorneys = attorneyList.filter((a) =>
    a.name.toLowerCase().startsWith(slug?.toLowerCase()),
  );

  const gtGold = "#c1a152";
  const gtDark = "#333333";
  const gtSkyBlue = "#5baed5";

  // --- PROFILE DETAIL VIEW (Matches your image) ---
  if (selectedAttorney) {
    return (
      <main className="bg-white min-vh-100 font-sans">
        {/* Profile Hero Section (Dark) */}
        <section
          style={{ backgroundColor: gtDark }}
          className="text-white pt-5 pb-3">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-4 text-center pt-3">
                <img
                  src={selectedAttorney.img}
                  alt="Profile"
                  className="img-fluid"
                  style={{
                    borderBottom: `8px solid ${gtGold}`,
                    maxHeight: "400px",
                  }}
                />
              </div>
              <div className="col-md-8 mb-4">
                <button
                  onClick={() => setSelectedAttorney(null)}
                  className="btn btn-sm btn-outline-light rounded-0 text-uppercase fw-bold mb-4">
                  ← Back to Results
                </button>
                <h1
                  className="display-4 fw-bold border-top pt-4 mb-2"
                  style={{ fontFamily: "serif" }}>
                  {selectedAttorney.name}
                </h1>
                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      backgroundColor: gtGold,
                    }}
                    className="me-2"></div>
                  <span className="text-uppercase fw-bold small tracking-widest">
                    {selectedAttorney.role}
                  </span>
                </div>
                <p className="mb-4">
                  <a
                    href={`mailto:${selectedAttorney.email}`}
                    className="text-decoration-none"
                    style={{ color: gtGold }}>
                    {selectedAttorney.email}
                  </a>
                </p>

                <div className="row text-uppercase small fw-bold">
                  <div className="col-md-3">
                    <div style={{ color: gtGold }} className="mb-1">
                      {selectedAttorney.location}
                    </div>
                    <div className="fw-normal">{selectedAttorney.phone}</div>
                  </div>
                  <div className="col-md-3 border-start border-secondary ps-4">
                    <div style={{ color: gtGold }} className="mb-1">
                      New York
                    </div>
                    <div className="fw-normal">T +1 212.801.9200</div>
                  </div>
                  <div className="col-md-3 border-start border-secondary ps-4">
                    <div style={{ color: gtGold }} className="mb-1">
                      São Paulo ›
                    </div>
                    <div className="fw-normal">T +55 11 3521.7049</div>
                  </div>
                </div>
                {/* <div className="text-end mt-4 small">
                  <span className="mx-2" style={{ color: gtSkyBlue }}>Card | PDF | Print | Share +</span>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Profile Tabs & Content Area */}
        <section className="container py-5">
          <div className="row">
            {/* <div className="col-md-3 d-none d-md-block">
              {['Profile', 'Capabilities', 'Experience', 'Recognition & Leadership', 'Credentials', 'News, Insights & Events'].map((item, idx) => (
                <button key={idx} className={`btn w-100 text-start text-uppercase fw-bold py-3 px-3 rounded-0 border-bottom mb-1 ${idx === 0 ? 'bg-warning' : 'bg-light'}`} style={{ fontSize: '11px', letterSpacing: '1px' }}>
                  {item}
                </button>
              ))}
              <button className="btn btn-outline-dark w-100 rounded-0 mt-4 py-2 text-uppercase fw-bold small">Expand All</button>
            </div> */}

            <div
              className="col-md-9 ps-md-5 text-dark"
              style={{ lineHeight: "1.8" }}>
              <p>
                With a practice that spans nearly 30 years,{" "}
                {selectedAttorney.name.split(" ")[0]} has represented clients on
                high-profile mergers and acquisitions, joint ventures, project
                financings, and corporate restructurings across Ibero-America
                and the Caribbean...
              </p>
              <p
                className="text-center mt-4 fw-bold"
                style={{ color: gtSkyBlue }}>
                Read More +
              </p>

              <div className="mt-5 border-top pt-5">
                <h2
                  className="display-6 fw-bold mb-4"
                  style={{ fontFamily: "serif" }}>
                  Capabilities
                </h2>
                <div className="d-flex flex-wrap gap-3">
                  {[
                    "Corporate",
                    "Infrastructure",
                    "Mergers & Acquisitions",
                    "Latin America Practice",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="text-decoration-underline"
                      style={{ color: gtGold }}>
                      {tag}
                      {i < 3 && " |"}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4">
                <h2
                  className="display-6 fw-bold mb-4"
                  style={{ fontFamily: "serif" }}>
                  Experience
                </h2>
                {[
                  "Mergers & Acquisitions",
                  "Joint Ventures",
                  "Corporate Representation",
                  "Project Finance",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center py-3 border-top border-bottom">
                    <span className="h5 mb-0 fw-bold" style={{ color: gtGold }}>
                      {item}
                    </span>
                    <i
                      className="bi bi-plus fs-2"
                      style={{ color: gtSkyBlue }}></i>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-top">
                <h2
                  className="display-6 fw-bold mb-4"
                  style={{ fontFamily: "serif" }}>
                  Credentials
                </h2>
                <div className="row small">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-uppercase mb-3">Education</h6>
                    <ul className="list-unstyled opacity-75">
                      <li className="mb-2">
                        J.D., New York University School of Law, 1998
                      </li>
                      <li>
                        B.S., Finance, with honors, University of Florida, 1994
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold text-uppercase mb-3">Admissions</h6>
                    <ul className="list-unstyled opacity-75">
                      <li className="mb-2">Florida | New York</li>
                      <li>Licensed as a foreign legal consultant in Brazil</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom News Section (Dark) */}
        <section className="bg-dark text-white py-5 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <h2
                  className="display-5 border-bottom pb-4 mb-4"
                  style={{ fontFamily: "serif" }}>
                  News, Insights & Events
                </h2>
              </div>
              <div className="col-md-9 ps-md-5">
                <div className="mb-5 d-flex gap-4 border-bottom border-secondary pb-3">
                  {["Featured", "News", "Insights", "Past Events"].map(
                    (tab, i) => (
                      <span
                        key={i}
                        className={`fw-bold text-uppercase small ${i === 0 ? "text-white border-bottom border-white pb-3" : "text-secondary"}`}>
                        {tab}
                      </span>
                    ),
                  )}
                </div>
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="mb-5 border-bottom border-secondary pb-4">
                    <div className="small text-uppercase opacity-50 mb-2">
                      September 11, 2024 · Press Release
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <h3 className="h4" style={{ color: gtGold }}>
                          Greenberg Traurig Continues Strategic Growth in Latin
                          America...
                        </h3>
                      </div>
                      <div className="col-md-2 text-md-end opacity-50 small">
                        2 min read
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-5">
                  <span
                    style={{ color: gtSkyBlue }}
                    className="fw-bold cursor-pointer">
                    View More +
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // --- ORIGINAL LIST VIEW (Unchanged) ---
  return (
    <main className="bg-white overflow-hidden min-vh-100">
      {/* 1. TOP ALPHABET NAV */}
      <div className="container py-4 border-bottom">
        <div className="d-flex justify-content-between overflow-auto pb-2">
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => router.push(`/attorneys/${char.toLowerCase()}`)}
              className={`btn btn-link text-decoration-none fw-bold fs-3 px-2 border-0 ${slug === char.toLowerCase() ? "text-warning" : "text-dark"}`}
              style={{ fontFamily: "serif", letterSpacing: "2px" }}>
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* 2. RESULTS LIST SECTION */}
      <section className="container mt-5 bg-white">
        <div className="d-flex justify-content-between align-items-end border-bottom border-dark pb-3 mb-5">
          <div>
            <span
              className="display-5 fw-light"
              style={{ fontFamily: "serif" }}>
              Results —{" "}
            </span>
            <span className="display-5 fw-bold" style={{ fontFamily: "serif" }}>
              {filteredAttorneys.length}
            </span>
            <div className="mt-2 small text-uppercase">
              <span className="fw-bold">Search Criteria:</span>
              <span className="ms-2 text-warning fw-bold">
                {slug?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="text-uppercase small fw-bold">
            Sort By: <span className="text-secondary">Position | </span>
            <span className="text-warning">Alphabetical</span>
          </div>
        </div>

        <div className="pb-5">
          {filteredAttorneys.length > 0 ? (
            filteredAttorneys.map((attorney) => (
              <div
                key={attorney.id}
                className="row g-0 py-5 border-bottom align-items-start">
                <div className="col-auto">
                  <img
                    src={attorney.img}
                    alt={attorney.name}
                    style={{
                      width: "160px",
                      height: "180px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedAttorney(attorney)} // Navigate to detail
                  />
                </div>
                <div className="col ps-4">
                  <h2
                    className="text-warning mb-1"
                    style={{
                      fontFamily: "serif",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedAttorney(attorney)} // Navigate to detail
                  >
                    {attorney.name}
                  </h2>
                  <div className="small fw-bold text-secondary mb-3 tracking-widest">
                    {attorney.role}
                  </div>
                  <div className="mb-1">
                    <a
                      href={`mailto:${attorney.email}`}
                      className="text-decoration-none text-primary small fw-bold">
                      {attorney.email}
                    </a>
                  </div>
                  <div className="text-dark small">{attorney.phone}</div>
                </div>
                <div className="col-auto text-end h-100 d-flex flex-column justify-content-between">
                  <div className="text-primary small fw-bold">
                    {attorney.location}
                  </div>
                  <div className="mt-5 pt-5">
                    <span className="border border-dark px-3 py-2 small fw-bold text-uppercase d-inline-block">
                      {attorney.practice}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-5 text-center text-muted h4">
              No professionals found starting with "{slug?.toUpperCase()}"
            </div>
          )}
        </div>
      </section>

      <div className="container pb-5">
        <button
          onClick={() => router.push("/attorneys")}
          className="btn btn-dark rounded-0 px-4 py-2">
          ← BACK TO SEARCH
        </button>
      </div>
    </main>
  );
}
