import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  getAttorneylanguages,
  getAllAttorneys,
  getAllCapabilityCategories,
  getAllLocationCities,
  getAllAdmissions,
  getAllEducations,
  getImgUrl,
  getAllProfessionals,
} from "../../services/authService";

export default function AttorneysPage() {
  const router = useRouter();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Data States
  const [attorneys, setAttorneys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [bannerData, setBannerData] = useState(null);

  // Filter States
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(5);

  const gtGold = "#c5a353";
  const gtDark = "#1a1a1a";
  const gtBlue = "#5baed5";

  // Slug helper for links
  const createSlug = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const createNameSlug = (fname, lname) => {
    if (!fname) return "";
    const name = `${fname} ${lname || ""}`;
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attRes, catRes, cityRes, langRes, admRes, eduRes, profRes] =
          await Promise.all([
            getAllAttorneys(),
            getAllCapabilityCategories(),
            getAllLocationCities(),
            getAttorneylanguages(),
            getAllAdmissions(),
            getAllEducations(),
            getAllProfessionals(),
          ]);

        setAttorneys(attRes?.attorneys || attRes?.data || []);
        setCategories(catRes?.data || []);
        setCities(cityRes?.data || []);
        setLanguages(langRes?.data?.data || langRes?.data || []);

        const admList = admRes?.data || admRes || [];
        setAdmissions(admList.filter((a) => a.admission !== null));

        const eduList = eduRes?.data || eduRes || [];
        setEducations(eduList.filter((e) => e.education !== null));

        const profData = profRes?.data || profRes || [];
        if (profData.length > 0) {
          setBannerData(profData[0]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredAttorneys = useMemo(() => {
    return attorneys.filter((attr) => {
      const matchesLetter =
        !selectedLetter ||
        attr?.firstName?.toUpperCase().startsWith(selectedLetter);

      const fullName =
        `${attr.firstName || ""} ${attr.lastName || ""}`.toLowerCase();
      const cityObj = cities.find((c) => String(c.id) === String(attr.city));
      const catObj = categories.find(
        (c) => String(c.id) === String(attr.categoryId),
      );
      const cityName = (cityObj?.cityName || "").toLowerCase();
      const categoryName = (catObj?.categoryName || "").toLowerCase();

      const matchesSearch =
        searchQuery === "" ||
        fullName.includes(searchQuery.toLowerCase()) ||
        cityName.includes(searchQuery.toLowerCase()) ||
        categoryName.includes(searchQuery.toLowerCase());

      const matchesDropdown =
        !filterValue ||
        (activeFilter === "Capability" &&
          String(attr.categoryId) === String(filterValue)) ||
        (activeFilter === "Location" &&
          String(attr.city) === String(filterValue)) ||
        (activeFilter === "Language" && attr.language === filterValue) ||
        (activeFilter === "Admission" && attr.admission === filterValue) ||
        (activeFilter === "Education" && attr.education === filterValue);

      return matchesLetter && matchesSearch && matchesDropdown;
    });
  }, [
    attorneys,
    selectedLetter,
    searchQuery,
    activeFilter,
    filterValue,
    cities,
    categories,
  ]);

  return (
    <main className="bg-white min-vh-100">
      <section
        className="position-relative d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${
            getImgUrl(bannerData?.bannerImage) ||
            "/assets/images/attorney-banner.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
        }}>
        <div className="container">
          <h1
            style={{
              color: "#ffffff",
              fontSize: "80px",
              fontWeight: "bold",
            }}
            dangerouslySetInnerHTML={{
              __html: bannerData?.textEditor || bannerData?.texteditor,
            }}
          />
        </div>
      </section>

      {/* 2. SEARCH & DYNAMIC FILTERS SECTION */}
      <section style={{ backgroundColor: gtGold }}>
        <div className="row g-0">
          <div className="col-lg-5 p-5 border-end border-dark border-opacity-10">
            <div className="d-flex align-items-center border-bottom border-dark pb-2">
              <input
                type="text"
                className="form-control bg-transparent border-0 fs-3 p-0 shadow-none text-dark"
                placeholder="Search Professionals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="bi bi-search fs-3 text-dark"></i>
            </div>
          </div>
          <div
            className="col-lg-7 p-5 text-white d-flex align-items-center"
            style={{
              backgroundColor: "#222",
              clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0% 100%)",
              marginLeft: "-40px",
            }}>
            <div className="ps-5">
              <p className="fw-bold mb-3 small opacity-75">
                Filter Professionals by:
              </p>
              <div className="d-flex flex-wrap gap-4">
                {[
                  "Capability",
                  "Location",
                  "Admission",
                  "Education",
                  "Language",
                ].map((f) => (
                  <span
                    key={f}
                    className={`cursor-pointer small fw-bold ${activeFilter === f ? "text-warning" : "text-white"}`}
                    onClick={() => {
                      setActiveFilter(f);
                      setFilterValue("");
                    }}>
                    {f} <i className="bi bi-chevron-down ms-1"></i>
                  </span>
                ))}
              </div>
              {activeFilter && (
                <div className="mt-3">
                  <select
                    className="form-select bg-dark text-white border-secondary small"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}>
                    <option value="">Select {activeFilter}</option>
                    {activeFilter === "Capability" &&
                      categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.categoryName}
                        </option>
                      ))}
                    {activeFilter === "Location" &&
                      cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
                    {activeFilter === "Language" &&
                      languages.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.name}
                        </option>
                      ))}
                    {activeFilter === "Admission" &&
                      admissions.map((a, i) => (
                        <option key={i} value={a.admission}>
                          {a.admission}
                        </option>
                      ))}
                    {activeFilter === "Education" &&
                      educations.map((e, i) => (
                        <option key={i} value={e.education}>
                          {e.education}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALPHABET BAR */}
      <div
        className="bg-light border-bottom sticky-top shadow-sm"
        style={{ top: "70px", zIndex: 100 }}>
        <div className="container py-3 d-flex justify-content-between overflow-auto">
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => {
                setSelectedLetter(char);
                setLimit(5);
              }}
              className={`btn btn-link text-decoration-none fw-bold fs-4 px-2 ${selectedLetter === char ? "text-warning" : "text-dark"}`}
              style={{ fontFamily: "serif" }}>
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* 4. ATTORNEY RESULTS LIST */}
      {(selectedLetter || searchQuery || filterValue) && (
        <section
          className="py-5"
          style={{ backgroundColor: gtDark, minHeight: "450px" }}>
          <div className="container text-white">
            <div className="d-flex justify-content-between border-bottom border-secondary pb-3 mb-5">
              <h4 className="mb-0">
                Results —{" "}
                <span className="text-warning">{filteredAttorneys.length}</span>
              </h4>
            </div>
            <div className="row">
              {filteredAttorneys.slice(0, limit).map((attr) => {
                const cityObj = cities.find(
                  (c) => String(c.id) === String(attr.city),
                );
                const catObj = categories.find(
                  (c) => String(c.id) === String(attr.categoryId),
                );
                const cityName = cityObj?.cityName || "Global Office";
                const categoryName = catObj?.categoryName || "PROFESSIONAL";
                const attorneySlug = createNameSlug(
                  attr.firstName,
                  attr.lastName,
                );

                return (
                  <div
                    key={attr.id}
                    className="col-12 mb-2 border-bottom border-secondary pb-4 pt-4">
                    <div className="row g-4 position-relative">
                      <div className="col-md-2">
                        <Link href={`/attorneys/${attorneySlug}`}>
                          <img
                            src={getImgUrl(attr.profileImage)}
                            className="img-fluid border border-secondary"
                            style={{
                              width: "100%",
                              height: "190px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            alt={attr.firstName}
                          />
                        </Link>
                      </div>
                      <div className="col-md-7">
                        <Link href={`/attorneys/${attorneySlug}`}>
                          <h2
                            style={{
                              color: gtGold,
                              fontFamily: "serif",
                              cursor: "pointer",
                            }}>
                            {attr.firstName} {attr.lastName}
                          </h2>
                        </Link>
                        <div className="d-flex align-items-center mb-3">
                          <span className="small text-info text-uppercase fw-bold">
                            {attr.servicesOffered || "General Practice"}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="mb-1">
                            <a
                              href={`mailto:${attr.email}`}
                              className="text-decoration-none small"
                              style={{ color: gtBlue }}>
                              {attr.email}
                            </a>
                          </div>
                          <div>
                            <a
                              href={`tel:${attr.phoneCell}`}
                              className="text-decoration-none small"
                              style={{ color: gtBlue }}>
                              {attr.phoneCell}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 d-flex flex-column justify-content-between text-end text-white">
                        {/* City Link added here */}
                        <div className="small fw-bold">
                          <Link href={`/location/${createSlug(cityName)}`}>
                            <a className="text-info text-decoration-none cursor-pointer">
                              {cityName}
                            </a>
                          </Link>
                        </div>
                        <div className="mt-auto">
                          {/* Category Link added here */}
                          <Link
                            href={`/capability/${createSlug(categoryName)}`}>
                            <a
                              className="d-inline-block border text-white text-uppercase px-4 py-2 small fw-bold text-decoration-none cursor-pointer"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "1px",
                                border: "1px solid #5baed5",
                              }}>
                              {categoryName}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {limit < filteredAttorneys.length && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => setLimit(limit + 5)}>
                  View More
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
