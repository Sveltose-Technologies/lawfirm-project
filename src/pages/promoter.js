
import React, { useState, useEffect } from 'react';
import { getAllPromoters , IMG_URL } from '../services/authService'
function Promoters() {
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPromoters().then(res => {
      if (res?.success) setPromoters(res.data);
      setLoading(false);
    });
  }, []);

  const bannerImg = promoters.length > 0 && promoters[0].bannerImage 
                    ? `${IMG_URL}/${promoters[0].bannerImage}` : '/assets/images/promoter-banner.png';

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <>
      <div className="banner" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bannerImg})`, 
          padding: '100px 0', backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center'
      }}>
        <h1 className="text-white display-4 fw-bold">Our Team</h1>
      </div>

      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {promoters.map((p) => (
            <div className="col-lg-3 col-md-6 text-center" key={p.id}>
              <div className="profile-container mb-3">
                <img src={`${IMG_URL}/${p.personImage}`} className="profile-img" alt={p.personName} />
              </div>
              <h4 className="fw-bold mb-1">{p.personName}</h4>
              <p className="text-muted small mb-3" style={{ minHeight: '40px' }}>{p.designation}</p>
              <button className="btn-gt">Know more</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          width: 100%;
          max-width: 240px;
          height: 280px;
          margin: 0 auto;
          border: 1px solid #000;
          overflow: hidden;
        }
        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top; /* Face fix: Isse head nahi katega */
        }
        .btn-gt {
          background-color: #A35233; color: #fff; border: none; padding: 8px 20px; font-weight: 600;
        }
      `}</style>
    </>
  );
}
export default Promoters;