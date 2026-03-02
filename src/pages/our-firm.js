import React, { useEffect, useState } from "react";
import { getAllOurFirm, IMG_URL } from "../services/authService";

function OurFirm() {
  const [firmData, setFirmData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirmData = async () => {
      try {
        const res = await getAllOurFirm();
        console.log("🚀 OurFirm Response:", res);

        const dataArray = res?.data || [];
        if (Array.isArray(dataArray) && dataArray.length > 0) {
          setFirmData(dataArray[0]);
          console.log("✅ Firm Data Set:", dataArray[0]);
        } else {
          console.warn("⚠️ No valid firm data received:", res);
        }
      } catch (err) {
        console.error("❌ Error fetching firm data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirmData();
  }, []);

  const getFullImg = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${IMG_URL}/${path}`;
  };

  if (loading)
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (!firmData)
    return <div className="text-center py-5 my-5">No firm data available.</div>;

  return (
    <div
      className="bg-white"
      style={{ marginTop: "70px", overflowX: "hidden" }}>
      {/* 1. Hero Banner */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white w-100"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${getFullImg(firmData.bannerImage)}')`,
          height: "40vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="container">
          <h1
            className="display-4 fw-bold mb-2 text-uppercase"
            style={{ fontFamily: "serif" }}>
            Our Firm
          </h1>
          <div
            className="mx-auto bg-warning mb-3"
            style={{ width: "60px", height: "2px" }}></div>
          <p className="lead fs-4">Culture. Commitment. Engagement.</p>
        </div>
      </section>

      {/* 2. Innovation Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-0">
            <div className="col-md-6 pe-md-5 order-2 order-md-1">
              <div className="dynamic-content-wrap">
                <span className="text-warning fw-bold text-uppercase small mb-2 d-block">
                  Innovation
                </span>
               

                <div
                  className="text-muted custom-content-style"
                  dangerouslySetInnerHTML={{
                    __html: firmData.innovationContent,
                  }}
                />
              </div>
            </div>

            <div className="col-md-6 order-1 order-md-2">
              <img
                src={getFullImg(firmData.innovationImage)}
                className="img-fluid w-100 shadow-sm"
                style={{
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                alt="Innovation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. People Section (Reversed) */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-0">
            <div className="col-md-6">
              <img
                src={getFullImg(firmData.peopleImage)}
                className="img-fluid w-100 shadow-sm"
                style={{
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                alt="People"
              />
            </div>

            <div className="col-md-6 ps-md-5">
              <div className="dynamic-content-wrap">
                <span className="text-warning fw-bold text-uppercase small mb-2 d-block">
                  Our People
                </span>
               
                <div
                  className="text-muted custom-content-style"
                  dangerouslySetInnerHTML={{ __html: firmData.peopleContent }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. History Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-0">
            <div className="col-md-6 pe-md-5 order-2 order-md-1">
              <div className="dynamic-content-wrap">
                <span className="text-warning fw-bold text-uppercase small mb-2 d-block">
                  Our History
                </span>
               
                <div
                  className="text-muted custom-content-style"
                  dangerouslySetInnerHTML={{ __html: firmData.historyContent }}
                />
              </div>
            </div>
            <div className="col-md-6 order-1 order-md-2">
              <img
                src={getFullImg(firmData.historyImage)}
                className="img-fluid w-100 shadow-sm"
                style={{
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                alt="History"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CSS Fixes for Content Overlap and Spacing */}
      <style>{`
        .dynamic-content-wrap {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        
        .custom-content-style {
          text-align: left; /* Gaps hatane ke liye justify se left kiya */
          font-size: 1.05rem;
          line-height: 1.6;
          word-wrap: break-word;
          overflow-wrap: break-word;
          word-break: normal;
        }

        .custom-content-style p {
          margin-bottom: 1rem;
          max-width: 100%;
        }

        @media (max-width: 768px) {
          img { height: 300px !important; margin-bottom: 20px; }
          .ps-md-5, .pe-md-5 { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}

export default OurFirm;
