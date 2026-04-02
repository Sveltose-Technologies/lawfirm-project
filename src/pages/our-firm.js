
import React, { useEffect, useState } from "react";
import { getAllOurFirm, IMG_URL } from "../services/authService";

function OurFirm() {
  const [firmData, setFirmData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirmData = async () => {
      try {
        const res = await getAllOurFirm();
        const dataArray = res?.data || [];
        if (Array.isArray(dataArray) && dataArray.length > 0) {
          setFirmData(dataArray[0]);
        }
      } catch (err) {
        console.error("Error fetching firm data:", err);
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
        <div className="spinner-border text-gold"></div>
      </div>
    );

  if (!firmData)
    return <div className="text-center py-5 my-5">No firm data available.</div>;

  return (
    <div className="bg-white mt-5 pt-4">
      {/* 1. Hero Banner - Using your Global .universal-banner class */}
      <section
        className="universal-banner"
        style={{
          backgroundImage: `url('${getFullImg(firmData.bannerImage)}')`,
        }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content text-center">
          <h1 className="display-4 fw-bold mb-2 text-uppercase font-serif text-white">
            Our Firm
          </h1>
        </div>
      </section>

      {/* 2. Innovation Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-0">
            {/* Text column: Stacks bottom on mobile, left on desktop */}
            <div className="col-md-6 pe-md-5 order-2 order-md-1">
              <div className="dynamic-content-fix">
                <span className="text-gold fw-bold text-uppercase small mb-2 d-block">
                  Innovation
                </span>
                <div
                  className="text-muted"
                  dangerouslySetInnerHTML={{
                    __html: firmData.innovationContent,
                  }}
                />
              </div>
            </div>

            {/* Image column: Stacks top on mobile, right on desktop */}
            <div className="col-md-6 order-1 order-md-2 mb-4 mb-md-0">
              <img
                src={getFullImg(firmData.innovationImage)}
                className="img-fluid w-100 shadow-sm img-cover rounded"
                alt="Innovation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. People Section (Reversed) */}
      <section className="py-5 bg-light-gray">
        <div className="container">
          <div className="row align-items-center g-0">
            {/* Image column: Stacks top on mobile, left on desktop */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={getFullImg(firmData.peopleImage)}
                className="img-fluid w-100 shadow-sm img-cover rounded"
                alt="People"
              />
            </div>

            {/* Text column: Stacks bottom on mobile, right on desktop */}
            <div className="col-md-6 ps-md-5">
              <div className="dynamic-content-fix">
                <span className="text-gold fw-bold text-uppercase small mb-2 d-block">
                  Our People
                </span>
                <div
                  className="text-muted"
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
              <div className="dynamic-content-fix">
                <span className="text-gold fw-bold text-uppercase small mb-2 d-block">
                  Our History
                </span>
                <div
                  className="text-muted"
                  dangerouslySetInnerHTML={{ __html: firmData.historyContent }}
                />
              </div>
            </div>
            <div className="col-md-6 order-1 order-md-2 mb-4 mb-md-0">
              <img
                src={getFullImg(firmData.historyImage)}
                className="img-fluid w-100 shadow-sm img-cover rounded"
                alt="History"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurFirm;