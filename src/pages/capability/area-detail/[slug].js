//capability/area-detail/[slug].js

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  getAllCapabilitySubCategories, 
  getAllSubcategoryCMS, 
  getAllNews, 
  IMG_URL 
} from "../../../services/authService";

export default function SubCategoryDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [relatedSubcategories, setRelatedSubcategories] = useState([]);
  const [relatedCapabilities, setRelatedCapabilities] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [subCmsData, setSubCmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("News"); // Image ke hisaab se default tab

  const createSlug = (text) => {
    if (!text) return '';
    return text.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
  };

  const cleanHTML = (html) => html ? html.replace(/&nbsp;/g, ' ') : "";

  useEffect(() => {
    if (!slug) return;

    async function fetchSubCategoryData() {
      setLoading(true);
      try {
        const [subRes, cmsRes, newsRes] = await Promise.all([
          getAllCapabilitySubCategories(),
          getAllSubcategoryCMS(),
          getAllNews()
        ]);

        if (subRes?.data) {
          const allSubs = subRes.data;
          const selected = allSubs.find(item => createSlug(item.subcategoryName) === slug);

          if (selected) {
            setSelectedCategory(selected);
            if (cmsRes?.success && cmsRes.data) {
              const matchedCMS = cmsRes.data.find(cms => Number(cms.subcategoryId) === Number(selected.id));
              setSubCmsData(matchedCMS || null);
            }
            const focusItems = allSubs.filter(item => item.categoryName === selected.categoryName && item.id !== selected.id);
            setRelatedSubcategories(focusItems);
            const otherCats = allSubs.filter(item => item.categoryName !== selected.categoryName);
            const uniqueCapabilities = [...new Map(otherCats.map((item) => [item.categoryName, item])).values()];
            setRelatedCapabilities(uniqueCapabilities.slice(0, 10));
          }
        }
        if (newsRes?.success || newsRes?.status) {
          setNewsList(newsRes.data || []);
        }
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    }
    fetchSubCategoryData();
  }, [slug]);

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-warning"></div></div>;
  if (!selectedCategory) return null;

  const bannerUrl = selectedCategory.bannerImage?.startsWith("uploads")
    ? `${IMG_URL}/${selectedCategory.bannerImage}` : selectedCategory.bannerImage;

  return (
    <>
      <Head>
        <title>{selectedCategory.subcategoryName} | Core Law</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </Head>

      {/* --- HERO SECTION --- */}
      <div 
        className="d-flex align-items-center justify-content-center text-center text-white" 
        style={{ 
          height: '420px', 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerUrl})`, 
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}
      >
        <div className="container">
          <h1 className="display-3 mb-5 fw-normal" style={{ fontFamily: 'serif' }}>{selectedCategory.subcategoryName}</h1>
          <div className="d-flex justify-content-center gap-3">
             <button onClick={() => router.back()} className="btn rounded-0 px-4 py-2 fw-bold text-white border border-white" style={{ fontSize: '0.75rem' }}>&lt; BACK</button>
             <Link href="/attorneys">
               <a className="btn rounded-0 px-4 py-2 fw-bold text-white border border-white" style={{ fontSize: '0.75rem' }}>MEET THE TEAM &gt;</a>
             </Link>
          </div>
        </div>
      </div>

      {/* --- MAIN BODY SECTION --- */}
      <div className="container py-5">
        <div className="row g-5">
          

          {/* Content Area */}
          <div className="col-lg-9 ps-5">
            <div className="mb-5 ps-5" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginLeft:"80px                                                                        " }}>
              {subCmsData ? (
                <div dangerouslySetInnerHTML={{ __html: cleanHTML(subCmsData.content || subCmsData.textEditorContent) }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: cleanHTML(selectedCategory.description) }} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- NEWS SECTION (DARK) --- */}
      <div className="py-5" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="container py-4">
          <div className="row justify-content-end">
            <div className="col-lg-9">
              <h2 className="display-5 text-white mb-5" style={{ fontFamily: 'serif' }}>News, Insights & Events</h2>
              
              <div className="d-flex flex-wrap border-bottom border-secondary mb-5 pb-0 gap-4">
                 {["News", "Insights"].map((tab) => (
                   <span 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`fw-bold pb-2 cursor-pointer ${activeTab === tab ? "text-info border-bottom border-3 border-info" : "text-white-50"}`}
                    style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                   >
                     {tab}
                   </span>
                 ))}
              </div>

              <div className="row">
                {newsList.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="col-12 mb-5">
                    <div className="small fw-bold text-white-50 mb-2">
                       {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })} <span className="mx-2">|</span> PRESS RELEASE
                    </div>
                    
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="col-lg-9 p-0">
                        <Link href={`/news/${createSlug(item.title)}`}>
                          <a className="text-decoration-none"><h3 style={{ color: '#be9144', fontFamily: 'serif', fontWeight: '500' }}>{item.title}</h3></a>
                        </Link>
                      </div>
                      <div className="d-none d-md-flex align-items-center text-white-50 small mt-2">
                        <div style={{ width: '40px', height: '1px', backgroundColor: '#444', marginRight: '10px' }}></div>
                        <span>14 min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4"><a href="#" className="text-decoration-none fw-bold" style={{ color: '#00a3e0' }}>View More +</a></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RELATED CAPABILITIES SECTION --- */}
      <div className="container py-5 mt-5">
        <div className="row justify-content-end">
          <div className="col-lg-9">
            <h3 className="display-4 mb-5" style={{ fontFamily: 'serif', color: 'black', fontWeight: '300', marginRight : "50px"}}>Related Capabilities</h3>
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {relatedCapabilities.map((cap) => (
                <div key={cap.id} className="col d-flex align-items-baseline">
                  <span style={{ color: '#a67c33', marginRight: '10px' }}>•</span>
                  <Link href={`/capability/${createSlug(cap.categoryName)}`}>
                    <a className="text-decoration-none" style={{ color: '#a67c33', fontSize: '0.95rem' }}>{cap.categoryName}</a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}