
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllPromoters, IMG_URL } from "../../services/authService";

export default function Promoters() {
  const router = useRouter();
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(true);

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

  useEffect(() => {
    getAllPromoters().then((res) => {
      if (res?.success) setPromoters(res.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-muted" role="status"></div>
      </div>
    );

  const bannerImg = promoters[0]?.bannerImage
    ? `${IMG_URL}/${promoters[0].bannerImage}`
    : "/assets/images/promoter-banner.png";

  return (
    <div className="bg-light-gray min-vh-100">
      {/* Universal Banner - Used for all pages */}
      <div
        className="universal-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content text-center">
          <h3 className="display-4 fw-bold text-uppercase tracking-wider">
            Our Promoters
          </h3>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {promoters.map((p) => (
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={p.id}>
              <div className="custom-card-wrapper shadow-sm">
                {/* Fixed Image Box - No Blur/Stretch */}
                <div className="img-fixed-container">
                  <img src={`${IMG_URL}/${p.personImage}`} alt={p.personName} />
                </div>

                {/* Content Area */}
                <div className="p-3 text-center flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="fw-bold mb-1 text-dark text-uppercase">
                      {p.personName}
                    </h6>
                    <p className="text-muted small mb-3">{p.designation}</p>
                  </div>

                  {/* Universal Button */}
                  <button
                    className="btn btn-primary-custom text-uppercase"
                    onClick={() =>
                      router.push(`/promoters/${createSlug(p.personName)}`)
                    }>
                    VIEW PROFILE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}