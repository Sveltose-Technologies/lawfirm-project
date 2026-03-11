"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getAllNews,
  getAllCapabilityCategories,
  getAllLocationCities,
  getImgUrl,
} from "../../services/authService";

export default function NewsDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [newsItem, setNewsItem] = useState(null);
  const [socialLinks, setSocialLinks] = useState({});
  const [capabilities, setCapabilities] = useState([]);
  const [offices, setOffices] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATIC PROFESSIONALS DATA ---
  const [professionals] = useState([
    { id: 1, name: "Lori G. Cohen" },
    { id: 2, name: "Steven Bainbridge" },
    { id: 3, name: "Jeffrey A. Chester" },
    { id: 4, name: "Clive Jones" },
    { id: 5, name: "Paweł Piotrowski" },
    { id: 6, name: "Guillermo Sánchez Chao" },
    { id: 7, name: "Junko Suetomi" },
    { id: 8, name: "Luis Jorge Akle Arronte" },
    { id: 9, name: "David Argueta" },
    { id: 10, name: "Stella (Sun Hye) Bae" },
  ]);

  // Standard Slug Creator (Must match your [slug].js logic)
  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/&/g, "and") // handles & symbols
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  const cleanHTML = (html) => (html ? html.replace(/&nbsp;/g, " ") : "");

  // useEffect(() => {
  //   async function fetchPageData() {
  //     if (!slug) return;
  //     setLoading(true);
  //     try {
  //       const [newsRes, catRes, cityRes] = await Promise.all([
  //         getAllNews(),
  //         getAllCapabilityCategories(),
  //         getAllLocationCities(),
  //       ]);

  //       const allNews = newsRes?.data || [];
  //       const matched = allNews.find((item) => createSlug(item.title) === slug);
  //       if (matched) {
  //         setNewsItem(matched);
  //         setRelatedNews(
  //           allNews.filter((n) => n.id !== matched.id).slice(0, 3),
  //         );
  //       }

  //       setCapabilities(catRes?.data || []);
  //       setOffices(cityRes?.data || cityRes || []);
  //     } catch (err) {
  //       console.error("Error fetching news detail data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchPageData();
  // }, [slug]);
  useEffect(() => {
    async function fetchPageData() {
      if (!slug) return;
      setLoading(true);

      try {
        const [newsRes, catRes, cityRes] = await Promise.all([
          getAllNews(),
          getAllCapabilityCategories(),
          getAllLocationCities(),
        ]);

        const allNews = newsRes?.data || [];

        const matched = allNews.find((item) => createSlug(item.title) === slug);

        if (matched) {
          setNewsItem(matched);

          try {
            const parsedLinks = matched?.socialLinks
              ? JSON.parse(matched.socialLinks)
              : {};

            setSocialLinks(parsedLinks);
          } catch (error) {
            console.log("Invalid socialLinks JSON");
          }

          setRelatedNews(
            allNews.filter((n) => n.id !== matched.id).slice(0, 3),
          );
        }

        setCapabilities(catRes?.data || []);
        setOffices(cityRes?.data || cityRes || []);
      } catch (err) {
        console.error("Error fetching news detail data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPageData();
  }, [slug]);
  if (loading)
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-dark"></div>
      </div>
    );
  if (!newsItem)
    return (
      <div className="p-5 text-center">
        <h3>Article not found.</h3>
      </div>
    );

  return (
    <>
      <Head>
        <title>{newsItem.title} | Law Firm News</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      <div className="bg-white min-vh-100">
        {/* --- HEADER SECTION --- */}
        <div
          className="py-5"
          style={{ backgroundColor: "#2d2d2d", color: "#fff" }}>
          <div className="container">
            <div
              className="small text-uppercase mb-3 opacity-75 fw-bold"
              style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
              {new Date(newsItem.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              | PRESS RELEASE
            </div>
            <h1
              className="display-5 fw-bold mb-5 font-serif"
              style={{ lineHeight: "1.2" }}>
              {newsItem.title}
            </h1>

            <div className="row g-4 mt-2">
              {/* 1. Related Professionals (Static Links) */}
              <div className="col-lg-4">
                <span
                  className="text-uppercase fw-bold d-block mb-2"
                  style={{ fontSize: "0.65rem", color: "#999" }}>
                  Related Professionals
                </span>
                <div className="header-list-container">
                  {professionals.map((p, i) => (
                    <React.Fragment key={p.id}>
                      <Link href="/attorneys">
                        <a className="text-decoration-none list-link">
                          {p.name}
                        </a>
                      </Link>
                      {i < professionals.length - 1 && (
                        <span className="mx-1 text-muted">.</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 2. Capabilities (Dynamic Slugs) */}
              <div className="col-lg-4 border-start border-secondary border-opacity-25">
                <span
                  className="text-uppercase fw-bold d-block mb-2"
                  style={{ fontSize: "0.65rem", color: "#999" }}>
                  Capabilities
                </span>
                <div className="header-list-container">
                  {capabilities.map((c, i) => (
                    <React.Fragment key={c.id}>
                      {/* Navigates to /capability/[slug] */}
                      <Link href={`/capability/${createSlug(c.categoryName)}`}>
                        <a className="text-decoration-none list-link">
                          {c.categoryName}
                        </a>
                      </Link>
                      {i < capabilities.length - 1 && (
                        <span className="mx-1 text-muted">.</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 3. Offices (Dynamic Slugs) */}
              <div className="col-lg-4 border-start border-secondary border-opacity-25">
                <span
                  className="text-uppercase fw-bold d-block mb-2"
                  style={{ fontSize: "0.65rem", color: "#999" }}>
                  Offices
                </span>
                <div className="header-list-container">
                  {offices.map((o, i) => (
                    <React.Fragment key={o.id}>
                      {/* Navigates to /location/[slug] */}
                      <Link href={`/location/${createSlug(o.cityName)}`}>
                        <a className="text-decoration-none list-link">
                          {o.cityName}
                        </a>
                      </Link>
                      {i < offices.length - 1 && (
                        <span className="mx-1 text-muted">.</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="container py-5 mt-4">
          <div className="row">
            <div className="col-lg-1 d-none d-lg-block">
              <div className="sticky-top" style={{ top: "120px" }}>
                <p
                  className="small fw-bold text-uppercase text-muted mb-3"
                  style={{ fontSize: "0.6rem" }}>
                  Share
                </p>
                <div
                  className="d-flex flex-column gap-4 fs-5"
                  style={{ color: "#666" }}>
                  <i
                    className="bi bi-linkedin icon-hover"
                    onClick={() =>
                      window.open(socialLinks?.linkedin, "_blank")
                    }></i>
                  <i
                    className="bi bi-twitter-x icon-hover"
                    onClick={() =>
                      window.open(socialLinks?.twitter, "_blank")
                    }></i>
                  <i
                    className="bi bi-facebook icon-hover"
                    onClick={() =>
                      window.open(socialLinks?.facebook, "_blank")
                    }></i>
                  {/* <i className="bi bi-envelope icon-hover"></i> */}
                  <i
                    className="bi bi-printer icon-hover"
                    onClick={() => window.print()}></i>
                </div>
              </div>
            </div>

            <div className="col-lg-8 offset-lg-1">
              <div className="article-main-text">
                <p
                  className="fw-bold mb-4"
                  style={{ fontSize: "1.1rem", color: "#000" }}>
                  NEW YORK –{" "}
                  {new Date(newsItem.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  – {newsItem.title}.
                </p>
                <div
                  className="content-render"
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: "1.8",
                    color: "#333",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(newsItem.textEditor || newsItem.content),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div
          className="py-5 mt-5"
          style={{ backgroundColor: "#fcfcfc", borderTop: "1px solid #eee" }}>
          <div className="container">
            {/* <h2
              className="display-6 mb-5 font-serif fw-bold"
              style={{ color: "#2d2d2d" }}>
              You May Also Be Interested In:
            </h2> */}
            <div className="row">
              {relatedNews.map((item) => (
                <div key={item.id} className="col-12 border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className="small text-uppercase fw-bold text-muted"
                      style={{ fontSize: "0.7rem" }}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      | PRESS RELEASE
                    </span>
                    <span
                      className="small text-muted text-uppercase"
                      style={{ fontSize: "0.65rem" }}>
                      — 1 min read
                    </span>
                  </div>
                  <Link href={`/news/${createSlug(item.title)}`}>
                    <a className="text-decoration-none">
                      <h4
                        className="fw-bold font-serif item-title-hover"
                        style={{ color: "#a67c33" }}>
                        {item.title}
                      </h4>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap");
        .font-serif {
          font-family: "Playfair Display", Georgia, serif;
        }
        .header-list-container {
          line-height: 1.6;
          font-size: 0.82rem;
          max-height: 120px;
          overflow-y: auto;
        }
        .list-link {
          color: #be9144;
          transition: 0.2s;
        }
        .list-link:hover {
          color: #fff !important;
          text-decoration: underline !important;
        }
        .icon-hover {
          cursor: pointer;
          transition: 0.2s;
        }
        .icon-hover:hover {
          color: #be9144;
        }
        .content-render p {
          margin-bottom: 1.5rem;
        }
        .item-title-hover:hover {
          text-decoration: underline !important;
        }
      `}</style>
    </>
  );
}
