import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  getAllCareers,
  getAllLocationCities,
  getAllCapabilityCategories,
  getImgUrl,
} from "../../services/authService";

export default function CareerOpenings() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selCity, setSelCity] = useState("");
  const [selType, setSelType] = useState("");
  const [selCat, setSelCat] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [careerRes, cityRes, catRes] = await Promise.all([
          getAllCareers(),
          getAllLocationCities(),
          getAllCapabilityCategories(),
        ]);

        if (careerRes && careerRes.success) {
          setJobs(careerRes.data);
          setFilteredJobs(careerRes.data);
        }
        setCities(cityRes?.data || []);
        setCategories(catRes?.data || []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    let temp = [...jobs];

    // 1. Keywords filter
    if (searchQuery) {
      temp = temp.filter(
        (j) =>
          j.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.jobCode.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    // 2. City Filter
    if (selCity) {
      temp = temp.filter((j) =>
        j.address.toLowerCase().includes(selCity.toLowerCase()),
      );
    }
    // 3. Remote Type Filter
    if (selType) {
      temp = temp.filter((j) => j.location === selType);
    }
    // 4. Category Filter
    if (selCat) {
      temp = temp.filter(
        (j) => j.categoryName === selCat || j.category === selCat,
      );
    }

    setFilteredJobs(temp);
  };

  const dynamicBanner =
    jobs.length > 0 && jobs[0].bannerImage
      ? getImgUrl(jobs[0].bannerImage)
      : "https://www.gtlaw.com/-/media/images/backgrounds/biglaw-redefined-strip.jpg";

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <>
      <Head>
        <title>Search Jobs | Lawstick</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      <div className="bg-light min-vh-100">
        {/* --- DYNAMIC HERO BANNER UI --- */}
        <div
          className="search-banner"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${dynamicBanner})`,
          }}>
          <div className="container">
            <div
              className="card shadow-lg border-0 p-4 mx-auto"
              style={{ maxWidth: "950px" }}>
              <div className="row g-3">
                <div className="col-md-9">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 py-2"
                      placeholder="Search for jobs or keywords"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-warning w-100 fw-bold py-2"
                    style={{
                      backgroundColor: "#cfa144",
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={handleSearch}>
                    SEARCH
                  </button>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selCity}
                    onChange={(e) => setSelCity(e.target.value)}>
                    <option value="">Distance or Location</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.cityName}>
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
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="All">All</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selCat}
                    onChange={(e) => setSelCat(e.target.value)}>
                    <option value="">Job Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.categoryName}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 pb-5">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="mb-4 fw-bold text-muted">
                {filteredJobs.length} JOBS FOUND
              </h5>

              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="card mb-3 p-4 border-0 shadow-sm job-card">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5
                          className="fw-bold mb-1"
                          style={{ color: "#002855" }}>
                          {job.jobTitle}
                        </h5>
                        <div className="d-flex gap-3 text-muted small mb-2 flex-wrap">
                          <span>
                            <i className="bi bi-geo-alt me-1"></i> {job.address}
                          </span>
                          <span>
                            <i className="bi bi-briefcase me-1"></i>{" "}
                            {job.jobType}
                          </span>
                          <span>
                            <i className="bi bi-laptop me-1"></i> {job.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className="text-muted small d-block">
                          ID: {job.jobCode}
                        </span>
                        <button
                          className="btn btn-link text-decoration-none p-0 fw-bold"
                          style={{ color: "#cfa144" }}
                          onClick={() => {
                            // Slug generation from title
                            const slug = job.jobTitle
                              .toLowerCase()
                              .replace(/ /g, "-");
                            router.push(`/careers/apply/${slug}`);
                          }}>
                          Apply Now <i className="bi bi-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                    <div className="text-muted small mt-2">
                      Posted on:{" "}
                      {new Date(
                        job.createdAt || job.postDate,
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-5 bg-white rounded shadow-sm border">
                  <p className="mb-0 text-muted">
                    No jobs found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm p-4 mb-4">
                <h6 className="fw-bold border-bottom pb-2 mb-3">About Us</h6>
                <p className="small text-muted" style={{ lineHeight: "1.6" }}>
                  <strong>Global scale with street smarts.</strong> With 50+
                  locations, Lawstick provides the platform clients need to
                  operate in today's legal marketplace.
                </p>
                <a
                  href="#"
                  className="text-decoration-none small fw-bold"
                  style={{ color: "#cfa144" }}>
                  Read More <i className="bi bi-chevron-down"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .search-banner {
          padding: 80px 0;
          background-size: cover;
          background-position: center;
          margin-bottom: 20px;
        }
        .job-card {
          border-left: 5px solid transparent !important;
          transition: 0.3s;
          border-radius: 4px;
        }
        .job-card:hover {
          border-left-color: #cfa144 !important;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>
    </>
  );
}
