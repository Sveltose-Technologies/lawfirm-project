import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Careers = () => {
  // Theme Colors
  const colors = {
    navy: '#002855',
    gold: '#cfa144',
    lightBlue: '#5fbce3',
    textDark: '#333',
    white: '#ffffff'
  };

  return (
    <>
      <Head>
        <title>Careers | Impact. Opportunity. Culture. Growth.</title>
      </Head>

      <div className="careers-page">
        
        {/* --- HERO SECTION --- */}
        <section className="hero-section">
          <div className="container text-center">
            <h1 className="display-3 fw-bold font-serif mb-3">Careers</h1>
            <p className="lead mb-5 ls-1">Impact. Opportunity. Culture. Growth.</p>
            <Link href="/careers/openings">
              <a className="btn-dark-lg">VIEW OPENINGS AND APPLY</a>
            </Link>
          </div>
        </section>

        {/* --- LAW STUDENTS SECTION (Gold Background) --- */}
        <section className="career-row">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-lg-6 bg-gold d-flex align-items-center position-relative">
                <div className="content-box">
                  <h2 className="section-title">Law Students</h2>
                  <p className="section-text">
                    With our broad geographic and practice platform, law students will find wide-ranging professional 
                    opportunities as they start their legal careers at Core Law. We use creativity to educate – and 
                    ultimately empower – our new attorneys. In addition to our mentoring programs, we provide our 
                    new associates with high-level training in client management, business development, collaboration, 
                    and cultural skills.
                  </p>
                  <div className="button-group">
                    <button className="btn-outline-white">ASIA</button>
                    <button className="btn-outline-white">EUROPE</button>
                    <button className="btn-outline-white">LATIN AMERICA</button>
                    <button className="btn-outline-white mt-2">UNITED STATES</button>
                  </div>
                </div>
                <div className="arrow-right" style={{ borderLeftColor: colors.gold }}></div>
              </div>
              <div className="col-lg-6">
                <div className="image-box" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800")' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ATTORNEYS SECTION (White Background) --- */}
        <section className="career-row flex-row-reverse">
          <div className="container-fluid p-0">
            <div className="row g-0 flex-row-reverse">
              <div className="col-lg-6 bg-white d-flex align-items-center position-relative">
                <div className="content-box text-dark">
                  <h2 className="section-title text-gold">Attorneys</h2>
                  <p className="section-text">
                    Our global platform provides our experienced attorneys with unique professional opportunities as 
                    they grow their legal careers. Core Law values and promotes inclusion and empowers attorneys 
                    at all levels to shape their own paths to success. With sound financial management and a culture 
                    of entrepreneurship and collaboration, our attorneys are positioned to deliver both the quality 
                    and value that our clients seek, today and in the future.
                  </p>
                  <div className="button-group">
                    <button className="btn-outline-dark">ASIA</button>
                    <button className="btn-outline-dark">EUROPE</button>
                    <button className="btn-outline-dark">LATIN AMERICA</button>
                    <button className="btn-outline-dark mt-2">UNITED STATES</button>
                  </div>
                </div>
                <div className="arrow-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="image-box" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800")' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROFESSIONAL STAFF SECTION (Light Blue Background) --- */}
        <section className="career-row">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-lg-6 bg-blue d-flex align-items-center position-relative">
                <div className="content-box">
                  <h2 className="section-title">Professional Staff</h2>
                  <p className="section-text">
                    We offer a supportive, stimulating environment that encourages the qualities we value most: 
                    collaboration, professionalism, determination, inclusion, and trust. We believe in promoting both 
                    professional and personal growth, along with pride of ownership, for every Core Law employee.
                    <br /><br />
                    <i>*Images on this page are not Core Law employees.</i>
                  </p>
                  <div className="button-group">
                    <button className="btn-outline-white">EUROPE</button>
                    <button className="btn-outline-white">UNITED STATES</button>
                  </div>
                </div>
                <div className="arrow-right" style={{ borderLeftColor: colors.lightBlue }}></div>
              </div>
              <div className="col-lg-6">
                <div className="image-box" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800")' }}></div>
              </div>
            </div>
          </div>
        </section>

    

      </div>

      <style jsx>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .ls-1 { letter-spacing: 1px; }
        
        /* Hero Section */
        .hero-section {
          background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500');
          background-size: cover;
          background-position: center;
          padding: 150px 0;
          color: white;
        }
        .btn-dark-lg {
          background: #000;
          color: #fff;
          padding: 15px 30px;
          text-decoration: none;
          font-weight: bold;
          font-size: 0.9rem;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        .btn-dark-lg:hover { background: ${colors.gold}; }

        /* Row Layouts */
        .career-row { min-height: 500px; }
        .bg-gold { background-color: ${colors.gold}; color: white; }
        .bg-white { background-color: ${colors.white}; color: ${colors.navy}; }
        .bg-blue { background-color: ${colors.lightBlue}; color: white; }
        
        .content-box { padding: 10% 15%; }
        .section-title { font-family: serif; font-size: 2.5rem; margin-bottom: 20px; }
        .section-text { line-height: 1.6; font-size: 1rem; margin-bottom: 30px; }
        
        .image-box {
          height: 100%;
          min-height: 500px;
          background-size: cover;
          background-position: center;
        }

        /* Buttons Style */
        .button-group { display: flex; flex-wrap: wrap; gap: 10px; }
        .btn-outline-white {
          background: transparent;
          border: 1.5px solid white;
          color: white;
          padding: 8px 15px;
          font-weight: bold;
          font-size: 0.8rem;
          transition: 0.3s;
        }
        .btn-outline-white:hover { background: white; color: ${colors.gold}; }
        
        .btn-outline-dark {
          background: transparent;
          border: 1.5px solid ${colors.gold};
          color: #000;
          padding: 8px 15px;
          font-weight: bold;
          font-size: 0.8rem;
          transition: 0.3s;
        }
        .btn-outline-dark:hover { background: ${colors.gold}; color: white; }

        /* Arrows Logic */
        .arrow-right {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-left: 20px solid white;
          z-index: 10;
        }
        .arrow-left {
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-right: 20px solid white;
          z-index: 10;
        }

        /* Locations List */
        .locations-list { background: #000; color: #888; }
        .location-text { 
          color: ${colors.gold}; 
          max-width: 900px; 
          margin: 0 auto; 
          line-height: 2;
          font-size: 0.9rem;
        }
        .disclaimer { font-size: 0.75rem; color: #555; }

        @media (max-width: 991px) {
          .content-box { padding: 40px 20px; }
          .arrow-right, .arrow-left { display: none; }
        }
      `}</style>
    </>
  );
};

export default Careers;