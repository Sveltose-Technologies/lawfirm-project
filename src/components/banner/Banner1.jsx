import Link from 'next/link';
import React from 'react';
import Greenberg from '../home-contend/Greenberg';

function Banner1() {
  
  const handleDeadClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* =========================================
          SECTION 1: MAIN HERO BANNER
      ========================================= */}
      <div className="banner-section">
        <div className="container banner-content px-3">
          <div className="row justify-content-center m-0">
            <div className="col-lg-10 text-center">
              
              <div className="py-3">
                <h1 className="text-white mb-3">
                  Global Legal Excellence
                </h1>
                <p className="lead text-white-50 mb-0 px-2">
                  Defining the future of law with integrity, innovation, and impact.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          NEW SECTION: HERO STATS BAR (Premium Blue Design)
      ========================================= */}
      {/* Blue Background added via CSS class 'hero-stats-bar' */}
 <div className="hero-stats-bar" style={{ marginTop: '30px' }}>
        <div className="container">
          <div className="row text-center m-0">
            
            {/* Item 1 */}
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">2,500+</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">Consultations</p>
            </div>

            {/* Item 2 */}
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">98%</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">Success Rate</p>
            </div>

            {/* Item 3 */}
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">20+</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">Years Experience</p>
            </div>

            {/* Item 4 */}
            <div className="col-6 col-md-3 py-4">
              <h2 className="text-gold fw-bold mb-0 display-6">35+</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">Attorneys</p>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 2: IN MEMORIAM
      ========================================= */}
      <div id="memoriam" className="memoriam-section py-4">
        <div className="container py-lg-4 px-3">
          <div className="row align-items-center m-0">

            <div className="col-lg-5 mb-4 mb-lg-0 text-center text-lg-start">
              <img
                src="/assets/images/banner-img2.png"
                alt="Larry J. Hoffman"
                className="img-fluid memoriam-img shadow"
              />
            </div>

            <div className="col-lg-7 ps-lg-5">
              <h2 className="mb-3 font-serif">In Memoriam: Larry J. Hoffman</h2>
               <p className="text-secondary mb-4">
               It is with a heavy heart that we announce the passing of Larry J. Hoffman, one of Greenberg Traurig&apos;s co-founders.
              </p>
             <p className="text-secondary mb-4">
                Larry&apos;s strategic vision and business acumen set the blueprint for a global law firm.
              </p>
               
             <a href="#" onClick={handleDeadClick} className="btn-premium">
                 IN MEMORIAM 
                </a>
            </div> 
{/* IN MEMORIAM */}
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 3: MISSION
      ========================================= */}
      <div className="mission-section py-4 bg-white">
        <div className="container text-center py-lg-3 px-3">
          <div className="row justify-content-center m-0">
            <div className="col-lg-9">

              <h2 className="mb-3 text-dark">Adapt. Act. Advance.</h2>
               <p className="text-secondary mb-4">
              In a rapidly changing world, having the right legal partner makes a vital difference. At Greenberg Traurig, we help clients master uncertainty through proactive legal strategies, skilled counsel, and access to vast resources worldwide.
              </p>

              <div className="d-flex justify-content-center gap-3">
                <a href="#" onClick={handleDeadClick} className="btn-premium">
                   LEARN MORE
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 4: HUB
      ========================================= */}
      <div className="featured-hubs py-4 bg-light">
        <div className="container px-3">
          <div className="row g-0 card-shadow">
            
            <div className="col-lg-6">
              <div className="h-100">
                <img
                  src="/assets/images/banner-img3.png"
                  alt="White House"
                  className="img-cover"
                />
              </div>
            </div>

            <div className="col-lg-6 d-flex align-items-center p-4">
              <div>
                <h2 className="mb-3 font-serif text-blue">
                  Executive Order and <br /> Presidential Actions Hub
                </h2>
                <p className="mb-4 text-secondary">
                  President Donald Trump has opened his second term with more than 100 executive orders, proclamations and memorandums. These executive actions will have broad legal and economic impacts on public and private sector entities.
                </p>
                
                <a href="#" onClick={handleDeadClick} className="btn-premium">
                  EXPLORE HUB
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 5: CTA
      ========================================= */}
      <div className="cta-section py-4 bg-white">
        <div className="container px-3">
          <div className="row g-0 card-shadow bg-light">
            
            <div className="col-lg-6 d-flex align-items-center p-4 order-lg-1 order-2">
              <div>
                <h2 className="mb-3 font-serif text-blue">
                  Corporate Transparency Act <br /> Task Force
                </h2>

                <p className="text-secondary mb-4">
                   On Jan. 1, 2024, the Corporate Transparency Act (CTA) took effect, requiring non-exempt U.S. entities and non-exempt foreign entities registered to do business in the United States to submit beneficial ownership information (BOI) reports.
                </p>

                <a href="#" onClick={handleDeadClick} className="btn-premium">
                  LEARN MORE
                </a>
              </div>
            </div>

            <div className="col-lg-6 order-lg-2 order-1">
              <div className="h-100">
                <img 
                  src="/assets/images/banner-img4.png" 
                  alt="Abstract Architecture" 
                  className="img-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Greenberg />

      {/* =========================================
          SECTION 7: STATS (Footer Stats) - SPACE REDUCED
      ========================================= */}
      {/* Changed py-4 or py-5 to py-3 for less space */}
      <div className="stats-section py-3"> 
        <div className="container py-2 px-3">

          <div className="row text-center mb-3 justify-content-center m-0">
            <div className="col-lg-8">
              <h2 className="mb-1">Global scale with street smarts.</h2>
              <p className="lead text-white-50 mb-0" style={{ fontSize: '1rem' }}>
                With 51 locations, Greenberg Traurig&apos;s global network provides the platform clients need.
              </p>
            </div>
          </div>

          <div className="row text-center gy-3 gx-md-5 mt-2 justify-content-center m-0">
            <div className="col-lg-3 col-6 border-right-custom">
              <h3>800+</h3>
              <p className="text-gold fw-bold text-uppercase small mb-0">Chambers Rankings</p>
            </div>
            <div className="col-lg-3 col-6 border-right-custom">
              <h3>60+</h3>
              <p className="text-gold fw-bold text-uppercase small mb-0">Languages Spoken</p>
            </div>
            <div className="col-lg-3 col-6 border-right-custom">
              <h3>15</h3>
              <p className="text-gold fw-bold text-uppercase small mb-0">Countries</p>
            </div>
            <div className="col-lg-3 col-6">
              <h3>51</h3>
              <p className="text-gold fw-bold text-uppercase small mb-0">Locations</p>
            </div>
          </div>

     
          <div className="row mt-4 pt-3 m-0">
  <div className="col-12 text-center">
    <Link href="/location" passHref>
      <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
        Explore Locations
      </a>
    </Link>
  </div>
</div>
 
        </div>
      </div>
    </>
  );
}

export default Banner1;