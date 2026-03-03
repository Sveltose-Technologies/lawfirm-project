"use client";
import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as authService from "../../services/authService";

function LocationDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [city, setCity] = useState(null);
  const [cms, setCms] = useState(null);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("News");
  const [loading, setLoading] = useState(true);

  const createItemSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  const fetchData = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      const [cityRes, cmsRes, newsRes, eventRes] = await Promise.all([
        authService.getAllLocationCities(),
        authService.getAllLocationCMS(),
        authService.getAllNews(),
        authService.getAllEvents(),
      ]);

      const allCities = cityRes?.data || cityRes || [];

      const foundCity = allCities.find((c) => {
        const currentCitySlug = createItemSlug(c.cityName);
        return currentCitySlug === slug;
      });

      if (foundCity) {
        setCity(foundCity);
        const currentCityId = Number(foundCity.id);

        console.log("Found City Data:", foundCity);

        const parseToNumbers = (data) => {
          if (!data) return [];
          let arr = [];
          try {
            if (Array.isArray(data)) {
              arr = data;
            } else if (typeof data === "string") {
              const parsed = JSON.parse(data);
              arr = Array.isArray(parsed) ? parsed : [parsed];
            }
          } catch (e) {
            arr = [data];
          }
          return arr.map((id) => Number(id));
        };

        const rawCms = cmsRes?.data || cmsRes;
        const cmsArray = Array.isArray(rawCms) ? rawCms : [];
        const foundCMS = cmsArray.find(
          (c) => Number(c.cityId) === currentCityId,
        );
        setCms(foundCMS);

        const allNews = newsRes?.data || newsRes || [];
        const locationNews = allNews.filter((n) => {
          const ids = parseToNumbers(n.cityId);
          return ids.includes(currentCityId);
        });
        setFilteredNews(locationNews);

        const allEvents = eventRes?.data || eventRes || [];
        const locationEvents = allEvents.filter((e) => {
          const ids = parseToNumbers(e.cityIds || e.cityId);
          return ids.includes(currentCityId);
        });
        setFilteredEvents(locationEvents);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || !city)
    return <div className="text-center py-5">Loading Office Details...</div>;

  const displayData = activeTab === "News" ? filteredNews : filteredEvents;

  return (
    <>
      <Head>
        <title>{city.cityName} Office | Core Law</title>
      </Head>

      {/* --- HERO SECTION --- */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${authService.getImgUrl(city.image)})`,
        }}>
        <div className="container text-center text-white">
          <h1 className="hero-title">{city.cityName}</h1>
          <div className="hero-address-block">
            <p className="mb-1 fw-bold">Core Law, P.A.</p>
            <p className="mb-1" style={{ whiteSpace: "pre-line" }}>
              {city.address}
            </p>
            <p className="mb-1">Phone: {city.phoneNo}</p>
            {city.faxNo && <p className="mb-0">Fax: {city.faxNo}</p>}
          </div>
          <div className="mt-4">
            <Link href="/attorneys">
              <a className="btn-gt-outline text-decoration-none">
                MEET THE TEAM &gt;
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div
              className="cms-rich-text"
              dangerouslySetInnerHTML={{
                __html:
                  city?.content ||
                  cms?.content ||
                  `<p class="text-muted">Explore our professional legal services in ${city.cityName}.</p>`,
              }}
            />
          </div>
        </div>
      </div>

      {/* --- NEWS & EVENTS SECTION --- */}
      <div className="dark-news-section">
        <div className="container">
          <h2 className="section-title-white mb-5">News & Events</h2>

          <div className="news-tabs mb-4 d-flex gap-4 border-bottom border-secondary">
            {["News", "Events"].map((tab) => (
              <span
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}>
                {tab.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="news-list">
            {displayData.length > 0 ? (
              displayData.map((item, idx) => (
                <div key={idx} className="news-row py-4 ">
                  <div className="row align-items-center">
                    <div className="col-md-9">
                      <p className="news-date-type mb-1">
                        {new Date(
                          item.date || item.startDate || item.createdAt,
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        <span className="ms-3 text-info">
                          | {activeTab.toUpperCase()}
                        </span>
                      </p>
                      <Link
                        href={`/${activeTab.toLowerCase()}/${createItemSlug(item.title)}`}>
                        <a className="text-decoration-none">
                          <h4 className="news-heading">{item.title}</h4>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 text-md-end text-secondary small">
                      <hr className="d-inline-block w-25 me-2 border-secondary" />
                      {activeTab === "News" ? "1 min read" : "View Details"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted py-5 text-center">
                No {activeTab.toLowerCase()} available for this location.
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          height: 450px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .hero-title {
          font-size: 4rem;
          font-family: "Georgia", serif;
          margin-bottom: 20px;
        }
        .hero-address-block {
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .btn-gt-outline {
          background: transparent;
          border: 1px solid white;
          color: white;
          padding: 10px 25px;
          font-weight: bold;
          font-size: 0.8rem;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-gt-outline:hover {
          background: white;
          color: black;
        }
        .cms-rich-text {
          font-size: 1.15rem;
          line-height: 1.9;
          color: #333;
        }
        .dark-news-section {
          background: #1a1a1a;
          padding: 80px 0;
          color: white;
        }
        .section-title-white {
          font-family: "Georgia", serif;
          font-size: 2.5rem;
        }
        .tab-item {
          cursor: pointer;
          color: #888;
          font-weight: bold;
          font-size: 0.9rem;
          padding-bottom: 10px;
          position: relative;
        }
        .tab-item.active {
          color: #00bcd4;
        }
        .tab-item.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: #00bcd4;
        }
        .news-date-type {
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 1px;
          opacity: 0.8;
        }
        .news-heading {
          color: #de9f57;
          font-family: "Georgia", serif;
          font-size: 1.6rem;
          margin: 10px 0;
          transition: 0.2s;
        }
        .news-heading:hover {
          color: #fff;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

export default LocationDetail;
