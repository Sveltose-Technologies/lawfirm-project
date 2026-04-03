"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as authService from "../../../services/authService";

export default function CareerOpenings() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selCity, setSelCity] = useState("");
  const [selType, setSelType] = useState("");
  const [selJobCat, setSelJobCat] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [careerRes, cityRes, jobCatRes] = await Promise.all([
          authService.getAllCareers(),
          authService.getAllLocationCities(),
          authService.getAllJobCategories(),
        ]);

        if (careerRes && careerRes.success) {
          setJobs(careerRes.data);
          setFilteredJobs(careerRes.data);
        }

        setCities(cityRes?.data || cityRes || []);
        setJobCategories(jobCatRes?.data || jobCatRes || []);
      } catch (error) {
        console.error("❌ Error fetching dynamic data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper to parse IDs from strings like "[1]" or "1"
  const parseIds = (val) => {
    try {
      if (!val) return [];
      const parsed =
        typeof val === "string" && val.startsWith("[") ? JSON.parse(val) : val;
      return (Array.isArray(parsed) ? parsed : [parsed]).map(String);
    } catch (e) {
      return val ? [String(val)] : [];
    }
  };

  const handleSearch = () => {
    let temp = [...jobs];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      temp = temp.filter(
        (j) =>
          j.jobTitle?.toLowerCase().includes(q) ||
          j.jobCode?.toLowerCase().includes(q),
      );
    }

    if (selCity) {
      temp = temp.filter((j) => String(j.cityId) === String(selCity));
    }

    if (selType && selType !== "All") {
      temp = temp.filter((j) => j.location === selType);
    }

    if (selJobCat) {
      temp = temp.filter((j) => {
        const categoriesInJob = parseIds(j.jobCategoryId);
        return categoriesInJob.includes(String(selJobCat));
      });
    }

    setFilteredJobs(temp);
  };

  const getCategoryName = (id) => {
    const cat = jobCategories.find((c) => String(c.id) === String(id));
    return cat ? cat.jobCategory : "General";
  };

  const dynamicBanner =
    jobs.length > 0 && jobs[0].bannerImage
      ? authService.getImgUrl(jobs[0].bannerImage)
      : "https://www.gtlaw.com/-/media/images/backgrounds/biglaw-redefined-strip.jpg";

  if (loading)
    return <div className="text-center py-5 fw-bold">Loading...</div>;

  return (
    <>
      <Head>
        <title>Career Openings | Lawstick</title>
      </Head>

      <div className="bg-light min-vh-100">
        {/* --- DYNAMIC SEARCH HERO --- */}
        <div
          className="search-banner py-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${dynamicBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="container py-4">
            <div
              className="card shadow-lg border-0 p-4 mx-auto"
              style={{ maxWidth: "950px" }}>
              <div className="row g-3">
                <div className="col-md-9">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 py-2"
                      placeholder="Search job title or keywords"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-dark w-100 fw-bold py-2"
                    onClick={handleSearch}>
                    SEARCH
                  </button>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selCity}
                    onChange={(e) => setSelCity(e.target.value)}>
                    <option value="">All Locations</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.cityName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selType}
                    onChange={(e) => setSelType(e.target.value)}>
                    <option value="">Remote Type</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selJobCat}
                    onChange={(e) => setSelJobCat(e.target.value)}>
                    <option value="">All Categories</option>
                    {jobCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.jobCategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- JOBS LIST --- */}
        <div className="container mt-5 pb-5">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="mb-4 fw-bold text-muted small text-uppercase">
                {filteredJobs.length} Jobs Found
              </h5>

              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => {
                  // Define the job slug inside the map loop
                  const jobSlug = job.jobTitle
                    ?.toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "");

                  return (
                    <div
                      key={job.id}
                      className="card mb-3 p-4 border-0 shadow-sm job-card">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h4
                            className="fw-bold mb-1"
                            style={{ color: "#002855" }}>
                            {job.jobTitle}
                          </h4>
                          <div className="d-flex gap-3 text-muted small mb-2 flex-wrap">
                            <span>
                              <i className="bi bi-geo-alt-fill me-1"></i>
                              {job.address}
                            </span>
                            <span className="badge bg-secondary opacity-75">
                              {job.jobType}
                            </span>
                            <span className="badge bg-info text-dark">
                              {job.location}
                            </span>
                          </div>
                          <p className="text-muted small mb-0">
                            Category:{" "}
                            {getCategoryName(parseIds(job.jobCategoryId)[0])}
                          </p>
                        </div>

                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                          <small className="text-muted d-block mb-2">
                            ID: {job.jobCode}
                          </small>

                          {/* Use legacyBehavior + <a> to fix Link error */}
                          <Link
                            href={`/careers/apply/${jobSlug}?id=${job.id}`}
                            legacyBehavior>
                            <a
                              className="btn btn-outline-warning fw-bold text-uppercase"
                              style={{
                                borderColor: "#cfa144",
                                color: "#cfa144",
                              }}>
                              Apply Now{" "}
                              <i className="bi bi-arrow-right ms-1"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-5 bg-white rounded shadow-sm border">
                  <i className="bi bi-emoji-frown display-4 text-muted"></i>
                  <p className="mt-3 text-muted">
                    No openings found for these filters.
                  </p>
                </div>
              )}
            </div>

            {/* --- SIDEBAR --- */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm p-4 bg-dark text-white rounded-0">
                <h5 className="fw-bold border-bottom border-secondary pb-2 mb-3">
                  Global Presence
                </h5>
                <p className="small opacity-75" style={{ lineHeight: "1.7" }}>
                  With over 50 locations worldwide, Lawstick provides the scale
                  clients need to operate in today's legal marketplace.
                </p>
                <Link href="/locations" legacyBehavior>
                  <a className="text-warning text-decoration-none small fw-bold">
                    View Our Offices{" "}
                    <i className="bi bi-chevron-right ms-1"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .job-card {
          border-left: 5px solid transparent !important;
          transition: 0.3s ease;
        }
        .job-card:hover {
          border-left-color: #cfa144 !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </>
  );
}
