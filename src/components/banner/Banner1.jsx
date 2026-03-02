// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   getAllHomeBanners,
//   getAllHomeData,
//   getAllLogoTypes, // Isse hum samjhenge kaunsa banner hai
//   getImgUrl,
// } from "../../services/authService";

// function Banner1() {
//   const [heroData, setHeroData] = useState(null);
//   const [homeContent, setHomeContent] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   function Banner1() {
//   const [heroStatsStart, setHeroStatsStart] = useState(false);
//   const [footerStatsStart, setFooterStatsStart] = useState(false);

//   const heroStatsRef = useRef(null);
//   const footerStatsRef = useRef(null);

// const CountUp = ({ end, duration = 2000, start }) => {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     if (!start) return;
//     let startTime = null;
//     const finalValue = parseInt(end.toString().replace(/,/g, ""), 10);
//     const animate = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
//       const easeOutQuad = progress * (2 - progress);
//       setCount(Math.floor(easeOutQuad * finalValue));
//       if (progress < 1) requestAnimationFrame(animate);
//     };
//     requestAnimationFrame(animate);
//   }, [start, end, duration]);
//   return <>{count.toLocaleString()}</>;
// };
//   useEffect(() => {
//     const createObserver = (ref, setStart) => {
//       const observer = new IntersectionObserver(
//         ([entry]) => { if (entry.isIntersecting) setStart(true); },
//         { threshold: 0.1 }
//       );
//       if (ref.current) observer.observe(ref.current);
//       return observer;
//     };

//     const obs1 = createObserver(heroStatsRef, setHeroStatsStart);
//     const obs2 = createObserver(footerStatsRef, setFooterStatsStart);

//     return () => { obs1.disconnect(); obs2.disconnect(); };
//   }, []);

//   useEffect(() => {
//     setMounted(true);

//     const fetchData = async () => {
//       try {
//         // 1. Saare data types aur banners mangwayein
//         const [typesRes, bannersRes, dataRes] = await Promise.all([
//           getAllLogoTypes(),
//           getAllHomeBanners(),
//           getAllHomeData(),
//         ]);

//         const types = typesRes.data?.data || [];
//         const allBanners = bannersRes.data?.data || [];
//         const homeSections = dataRes.data?.data || [];

//         // 2. LOGIC: "banner" waale type ki ID nikalein
//         const bannerTypeObj = types.find(
//           (t) => t.type.toLowerCase() === "banner",
//         );

//         if (bannerTypeObj) {

//           const filteredBanners = allBanners.filter(
//             (b) => Number(b.typeId) === Number(bannerTypeObj.id),
//           );

//           if (filteredBanners.length > 0) {
//             const latestBanner = filteredBanners.sort((a, b) => b.id - a.id)[0];
//             setHeroData(latestBanner);
//           }
//         }

//         // 4. Home Sections (first, second, third, fourth)
//         if (homeSections.length > 0) {
//           setHomeContent(homeSections[0]);
//         }
//       } catch (error) {
//         console.error("Data loading error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       {/* SECTION 1: HERO */}
//       <div
//         className="banner-section"
//         style={{
//           "--banner-bg": heroData?.image
//             ? `url(${getImgUrl(heroData.image)})`
//             : 'url("/assets/images/bg/banner1-bg.png")',
//         }}>
//         <div className="container banner-content px-3">
//           <div className="row justify-content-center m-0">
//             <div className="col-lg-10 text-center">
//               <div className="py-3 dynamic-hero-text">
//                 {heroData?.textEditor && heroData.textEditor !== "<p></p>" ? (
//                   <div
//                     dangerouslySetInnerHTML={{ __html: heroData.textEditor }}
//                   />
//                 ) : (
//                   <h1 className="text-white">Global Legal Excellence</h1>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           NEW SECTION: HERO STATS BAR (Premium Blue Design)
//       ========================================= */}
//       {/* Blue Background added via CSS class 'hero-stats-bar' */}
// <div className="hero-stats-bar" style={{ marginTop: '30px' }} ref={heroStatsRef}>
//         <div className="container">
//           <div className="row text-center m-0">
//             {/* Item 1 */}
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//   <h2 className="text-gold fw-bold mb-0 display-6">
//     <CountUp end="2500" start={heroStatsStart} />+
//   </h2>              <p className="text-white small mb-0 text-uppercase tracking-wide">
//                 Consultations
//               </p>
//             </div>

//             {/* Item 2 */}
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0 display-6">98%</h2>
//               <p className="text-white small mb-0 text-uppercase tracking-wide">
//                 Success Rate
//               </p>
//             </div>

//             {/* Item 3 */}
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0 display-6">20+</h2>
//               <p className="text-white small mb-0 text-uppercase tracking-wide">
//                 Years Experience
//               </p>
//             </div>

//             {/* Item 4 */}
//             <div className="col-6 col-md-3 py-4">
//               <h2 className="text-gold fw-bold mb-0 display-6">35+</h2>
//               <p className="text-white small mb-0 text-uppercase tracking-wide">
//                 Attorneys
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* HOME SECTIONS (first to fourth) */}
//       {[
//         {
//           img: "firstImage",
//           txt: "firstTextEditor",
//           bg: "bg-light",
//           rev: false,
//         },
//         {
//           img: "secondImage",
//           txt: "secondTextEditor",
//           bg: "bg-white",
//           rev: true,
//         },
//         {
//           img: "thirdImage",
//           txt: "thirdTextEditor",
//           bg: "bg-light",
//           rev: false,
//         },
//         {
//           img: "fourthImage",
//           txt: "fourthTextEditor",
//           bg: "bg-white",
//           rev: true,
//         },
//       ].map((sec, idx) => (
//         <div key={idx} className={`py-5 ${sec.bg}`}>
//           <div className="container px-3">
//             <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
//               <div
//                 className={`col-lg-6 ${sec.rev ? "order-lg-2 order-1" : ""}`}>
//                 <img
//                   src={
//                     homeContent?.[sec.img]
//                       ? getImgUrl(homeContent[sec.img])
//                       : `/assets/images/banner-img${idx + 1}.png`
//                   }
//                   className="w-100 h-100 object-fit-cover"
//                   style={{ minHeight: "420px" }}
//                   alt=""
//                 />
//               </div>
//               <div
//                 className={`col-lg-6 d-flex align-items-center p-4 p-lg-5 ${sec.rev ? "order-lg-1 order-2" : ""}`}>
//                 <div className="dynamic-content-fix w-100">
//                   {homeContent?.[sec.txt] && (
//                     <div
//                       dangerouslySetInnerHTML={{ __html: homeContent[sec.txt] }}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* FOOTER STATS */}
//       <div className="stats-section py-4">
//         <div className="container text-center">
//           <h2 className="text-white mb-3">Global scale with street smarts.</h2>
//           <div className="row mt-4">
//             <div className="col-md-3 col-6">
//               <h3>800+</h3>
//               <p className="text-gold">Rankings</p>
//             </div>
//             <div className="col-md-3 col-6">
//               <h3>60+</h3>
//               <p className="text-gold">Languages</p>
//             </div>
//             <div className="col-md-3 col-6">
//               <h3>15</h3>
//               <p className="text-gold">Countries</p>
//             </div>
//             <div className="col-md-3 col-6">
//               <h3>51</h3>
//               <p className="text-gold">Locations</p>
//             </div>
//             <div className="row mt-4 pt-3 m-0">
//               <div className="col-12 text-center">
//                 <Link href="/location" passHref>
//                   <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
//                     Explore Locations
//                   </a>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         /* CONTENT CUT FIX */
//         .dynamic-content-fix {
//           width: 100% !important;
//           max-width: 100% !important;
//           word-wrap: break-word !important;
//           overflow-wrap: break-word !important;
//         }

//         .dynamic-content-fix * {
//           white-space: normal !important;
//           word-break: break-word !important;
//           max-width: 100% !important;
//           background-color: transparent !important;
//         }

//         .dynamic-content-fix h2,
//         .dynamic-content-fix h1 {
//           font-size: clamp(1.8rem, 4vw, 2.4rem) !important;
//           color: #00415a !important;
//           font-family: serif !important;
//           margin-bottom: 20px !important;
//           line-height: 1.2;
//         }

//         .dynamic-content-fix p {
//           font-size: 1.1rem !important;
//           color: #444 !important;
//           line-height: 1.6;
//         }

//         .dynamic-hero-text h1 {
//           font-size: 3.5rem !important;
//           font-weight: 800;
//           color: white !important;
//         }
//         .dynamic-hero-text p {
//           font-size: 1.25rem !important;
//           color: white !important;
//         }

//         .card-shadow {
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
//           border-radius: 12px;
//         }
//         .object-fit-cover {
//           object-fit: cover;
//         }
//         .text-gold {
//           color: #c5a059 !important;
//         }
//         .border-end-custom {
//           border-right: 1px solid rgba(255, 255, 255, 0.1);
//         }
//       `}</style>
//     </>
//   );
// }

// export default Banner1;

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  getAllHomeBanners,
  getAllHomeData,
  getAllLogoTypes,
  getImgUrl,
} from "../../services/authService";

const CountUp = ({ end, duration = 2000, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    const finalValue = parseInt(end.toString().replace(/[^0-9]/g, ""), 10);

    // If parsing fails or value is 0, don't animate
    if (isNaN(finalValue) || finalValue === 0) {
      setCount(end);
      return;
    }

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Fast easing: Power2.out
      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.floor(easeOutQuad * finalValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(finalValue);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return <>{count.toLocaleString()}</>;
};

function Banner1() {
  const [heroData, setHeroData] = useState(null);
  const [homeContent, setHomeContent] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [heroStatsStart, setHeroStatsStart] = useState(false);
  const [footerStatsStart, setFooterStatsStart] = useState(false);

  const heroStatsRef = useRef(null);
  const footerStatsRef = useRef(null);
useEffect(() => {
  const createObserver = (ref, setStart) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger if intersecting or if already visible
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setStart(true);
        }
      },
      {
        threshold: 0, // Detects even 1 pixel of the element
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return observer;
  };

  const obs1 = createObserver(heroStatsRef, setHeroStatsStart);
  const obs2 = createObserver(footerStatsRef, setFooterStatsStart);

  // Fallback: Trigger animation if user is already at the top
  const timer = setTimeout(() => {
    setHeroStatsStart(true);
  }, 1000);

  return () => {
    obs1.disconnect();
    obs2.disconnect();
    clearTimeout(timer);
  };
}, []);
  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const [typesRes, bannersRes, dataRes] = await Promise.all([
          getAllLogoTypes(),
          getAllHomeBanners(),
          getAllHomeData(),
        ]);

        const types = typesRes.data?.data || [];
        const allBanners = bannersRes.data?.data || [];
        const homeSections = dataRes.data?.data || [];

        const bannerTypeObj = types.find(
          (t) => t.type.toLowerCase() === "banner",
        );

        if (bannerTypeObj) {
          const filteredBanners = allBanners.filter(
            (b) => Number(b.typeId) === Number(bannerTypeObj.id),
          );
          if (filteredBanners.length > 0) {
            const latestBanner = filteredBanners.sort((a, b) => b.id - a.id)[0];
            setHeroData(latestBanner);
          }
        }

        if (homeSections.length > 0) {
          setHomeContent(homeSections[0]);
        }
      } catch (error) {
        console.error("Data loading error:", error);
      }
    };
    fetchData();
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className="banner-section"
        style={{
          "--banner-bg": heroData?.image
            ? `url(${getImgUrl(heroData.image)})`
            : 'url("/assets/images/bg/banner1-bg.png")',
        }}>
        <div className="container banner-content px-3">
          <div className="row justify-content-center m-0">
            <div className="col-lg-10 text-center">
              <div className="py-3 dynamic-hero-text">
                {heroData?.textEditor && heroData.textEditor !== "<p></p>" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: heroData.textEditor }}
                  />
                ) : (
                  <h1 className="text-white">Global Legal Excellence</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-stats-bar"
        style={{ marginTop: "30px" }}
        ref={heroStatsRef}>
        <div className="container">
          <div className="row text-center m-0">
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">
                <CountUp end="2500" start={heroStatsStart} />+
              </h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Consultations
              </p>
            </div>
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">
                <CountUp end="98" start={heroStatsStart} />%
              </h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Success Rate
              </p>
            </div>
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">
                <CountUp end="20" start={heroStatsStart} />+
              </h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Years Experience
              </p>
            </div>
            <div className="col-6 col-md-3 py-4">
              <h2 className="text-gold fw-bold mb-0 display-6">
                <CountUp end="35" start={heroStatsStart} />+
              </h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Attorneys
              </p>
            </div>
          </div>
        </div>
      </div>

      {[
        {
          img: "firstImage",
          txt: "firstTextEditor",
          bg: "bg-light",
          rev: false,
        },
        {
          img: "secondImage",
          txt: "secondTextEditor",
          bg: "bg-white",
          rev: true,
        },
        {
          img: "thirdImage",
          txt: "thirdTextEditor",
          bg: "bg-light",
          rev: false,
        },
        {
          img: "fourthImage",
          txt: "fourthTextEditor",
          bg: "bg-white",
          rev: true,
        },
      ].map((sec, idx) => (
        <div key={idx} className={`py-5 ${sec.bg}`}>
          <div className="container px-3">
            <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
              <div
                className={`col-lg-6 ${sec.rev ? "order-lg-2 order-1" : ""}`}>
                <img
                  src={
                    homeContent?.[sec.img]
                      ? getImgUrl(homeContent[sec.img])
                      : `/assets/images/banner-img${idx + 1}.png`
                  }
                  className="w-100 h-100 object-fit-cover"
                  style={{ minHeight: "420px" }}
                  alt=""
                />
              </div>
              <div
                className={`col-lg-6 d-flex align-items-center p-4 p-lg-5 ${
                  sec.rev ? "order-lg-1 order-2" : ""
                }`}>
                <div className="dynamic-content-fix w-100">
                  {homeContent?.[sec.txt] && (
                    <div
                      dangerouslySetInnerHTML={{ __html: homeContent[sec.txt] }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* FOOTER STATS */}
      <div className="stats-section py-4">
        <div className="container text-center">
          <h2 className="text-white mb-3">Global scale with street smarts.</h2>
          <div className="row mt-4">
            <div className="col-md-3 col-6">
              <h3>800+</h3>
              <p className="text-gold">Rankings</p>
            </div>
            <div className="col-md-3 col-6">
              <h3>60+</h3>
              <p className="text-gold">Languages</p>
            </div>
            <div className="col-md-3 col-6">
              <h3>15</h3>
              <p className="text-gold">Countries</p>
            </div>
            <div className="col-md-3 col-6">
              <h3>51</h3>
              <p className="text-gold">Locations</p>
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
      </div>

      <style jsx global>{`
        .dynamic-content-fix {
          width: 100% !important;
          max-width: 100% !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        .dynamic-content-fix * {
          white-space: normal !important;
          word-break: break-word !important;
          max-width: 100% !important;
          background-color: transparent !important;
        }
        .dynamic-content-fix h2,
        .dynamic-content-fix h1 {
          font-size: clamp(1.8rem, 4vw, 2.4rem) !important;
          color: #00415a !important;
          font-family: serif !important;
          margin-bottom: 20px !important;
          line-height: 0.6;
        }
        .dynamic-content-fix p {
          font-size: 1.1rem !important;
          color: #444 !important;
          line-height: 1.6;
        }
        .dynamic-hero-text h1 {
          font-size: 3.5rem !important;
          font-weight: 800;
          color: white !important;
        }
        .dynamic-hero-text p {
          font-size: 1.25rem !important;
          color: white !important;
        }
        .card-shadow {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
          border-radius: 12px;
        }
        .object-fit-cover {
          object-fit: cover;
        }
        .text-gold {
          color: #c5a059 !important;
        }
        .border-end-custom {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}

export default Banner1;