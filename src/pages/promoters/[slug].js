

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllPromoters, IMG_URL } from "../../services/authService";

export default function PromoterDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

  useEffect(() => {
    if (!router.isReady) return;
    getAllPromoters().then((res) => {
      if (res?.success) {
        const found = res.data.find(
          (item) => createSlug(item.personName) === slug,
        );
        setPerson(found);
      }
      setLoading(false);
    });
  }, [slug, router.isReady]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="spinner-border text-muted" role="status"></div>
      </div>
    );

  if (!person)
    return (
      <div className="container py-5 text-center vh-100 d-flex flex-column justify-content-center">
        <h2 className="fw-bold">Profile Not Found</h2>
        <button
          className="btn btn-dark mt-3 rounded-0 px-4 mx-auto"
          onClick={() => router.push("/promoters")}>
          BACK TO PROMOTERS
        </button>
      </div>
    );

  const bannerImg = person.bannerImage
    ? `${IMG_URL}/${person.bannerImage}`
    : "/assets/images/promoter-banner.png";

  return (
    <div className="bg-white min-vh-100">
      {/* Universal Banner Section */}
      <div
        className="universal-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content text-center">
          <h1 className="display-4 fw-bold text-uppercase">
            {person.personName}
          </h1>
          <p className="lead text-uppercase tracking-wider opacity-75">
            {person.designation}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Left Column: Profile Image & Back Button */}
          <div className="col-lg-4">
            <div className="profile-detail-img-box shadow-sm">
              <img
                src={`${IMG_URL}/${person.personImage}`}
                alt={person.personName}
              />
            </div>

            <div className="mt-4">
              <button
                className="btn btn-outline-custom w-100 py-2 text-uppercase small"
                onClick={() => router.push("/promoters")}>
                &larr; Back to Team
              </button>
            </div>
          </div>

          {/* Right Column: Biography Details */}
          <div className="col-lg-8">
            <div className="biography-section">
              <h3 className="biography-heading">Biography</h3>
              <div
                className="rich-text-content fs-5"
                dangerouslySetInnerHTML={{ __html: person.specialization }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}