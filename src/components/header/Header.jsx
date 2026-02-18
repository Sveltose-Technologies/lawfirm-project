





import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Dropdown States
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  
  const router = useRouter();

  // --- Logic Functions ---

  const handleMouseEnter = (type) => {
    if (window.innerWidth > 1199) {
      if (type === 'about') setMobileDropdownOpen(true);
      if (type === 'lang') setLanguageDropdownOpen(true);
    }
  };

  const handleMouseLeave = (type) => {
    if (window.innerWidth > 1199) {
      if (type === 'about') setMobileDropdownOpen(false);
      if (type === 'lang') setLanguageDropdownOpen(false);
    }
  };

  const toggleDropdownMobile = (e, type) => {
    e.preventDefault();
    if (type === 'about') setMobileDropdownOpen(!mobileDropdownOpen);
    if (type === 'lang') setLanguageDropdownOpen(!languageDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      setMobileDropdownOpen(false);
      setLanguageDropdownOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setMobileDropdownOpen(false);
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => router.pathname === path ? 'active-link' : '';
  const isParentActive = (childPaths) => childPaths.includes(router.pathname) ? 'active-link' : '';

  return (
    <>
      <style jsx global>{`
        /* =========================================
           EXISTING STYLES
           ========================================= */

        /* Logo Fix */
        .navbar-brand { flex-shrink: 0 !important; min-width: 140px; margin-right: 20px; }
        .login-btn-item { flex-shrink: 0 !important; margin-left: 15px !important; }

        /* Mobile Dropdown Fix */
        @media (max-width: 1199px) {
            .dropdown-menu.show {
                position: static !important;
                float: none !important;
                width: 100% !important;
                background: transparent !important;
                border: none !important;
                padding-left: 20px !important;
                display: block !important;
            }
            .dropdown-item {
                color: rgba(255,255,255,0.8) !important;
            }
            .dropdown-item:hover {
                background: transparent !important;
                color: #fff !important;
            }
        }

        .navbar-nav { align-items: center; }
        
        @media (max-width: 1199px) {
           .navbar-nav { align-items: flex-start !important; }
           .login-btn-item { margin-left: 0 !important; margin-top: 10px; }
        }
      `}</style>

      <header className={`fixed-top w-100 header-main ${isSticky ? 'header-sticky' : 'header-normal'}`}>
        <nav className="navbar navbar-expand-xl navbar-dark p-2">
          <div className="container-fluid px-3 px-lg-4">
            
            <Link href="/">
              <a className="navbar-brand p-0 m-0 d-flex align-items-center">
                <img src="/assets/images/brand-logo.png" alt="Logo" width="50" height="40" className="brand-logo" style={{ objectFit: 'contain' }} />
              </a>



              
            </Link>

            <button className="navbar-toggler shadow-none" type="button" onClick={() => setIsOpen(!isOpen)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="mainNav">
              
              <ul className="navbar-nav ms-auto align-items-xl-center">
                
                <li className="nav-item">
                  <Link href="/"><a className={`nav-link ${isActive('/')}`}>Home</a></Link>
                </li>

                {/* --- ABOUT US DROPDOWN --- */}
                <li 
                  className="nav-item dropdown"
                  onMouseEnter={() => handleMouseEnter('about')} 
                  onMouseLeave={() => handleMouseLeave('about')} 
                >
                  <a 
                    className={`nav-link dropdown-toggle ${isParentActive(['/our-firm', '/awards-ccolades', '/promoters'])}`}
                    href="#" 
                    onClick={(e) => toggleDropdownMobile(e, 'about')} 
                    role="button" 
                    aria-expanded={mobileDropdownOpen}
                  >
                    About
                  </a>
                  <ul className={`dropdown-menu ${mobileDropdownOpen ? 'show' : ''}`}>
                    <li><Link href="/our-firm"><a className="dropdown-item">Our Firm</a></Link></li>
                    <li><Link href="/award"><a className="dropdown-item">Awards & Accolades</a></Link></li>
                    <li><Link href="/promoters"><a className="dropdown-item">Promoters</a></Link></li>
                  </ul>
                </li>

                <li className="nav-item"><Link href="/attorneys"><a className={`nav-link ${isActive('/attorneys')}`}>Professionals</a></Link></li>
                <li className="nav-item"><Link href="/capability"><a className={`nav-link ${isActive('/capability')}`}>Capabilities</a></Link></li>
                <li className="nav-item"><Link href="/news"><a className={`nav-link ${isActive('/news')}`}>News</a></Link></li>
                <li className="nav-item"><Link href="/careers"><a className={`nav-link ${isActive('/careers')}`}>Careers</a></Link></li>

                <li className="nav-item"><Link href="/events"><a className={`nav-link ${isActive('/events')}`}>Events</a></Link></li>
                <li className="nav-item"><Link href="/location"><a className={`nav-link ${isActive('/location')}`}>Locations</a></Link></li>

                <li className="nav-item"><Link href="/contact"><a className={`nav-link ${isActive('/contact')}`}>Contact Us</a></Link></li>

                {/* --- LANGUAGE DROPDOWN (Static UI) --- */}
                <li 
                  className="nav-item dropdown ms-xl-1"
                  onMouseEnter={() => handleMouseEnter('lang')}
                  onMouseLeave={() => handleMouseLeave('lang')}
                >
                  <a 
                    className="nav-link dropdown-toggle" 
                    href="#" 
                    onClick={(e) => toggleDropdownMobile(e, 'lang')}
                    role="button"
                    style={{ minWidth: '50px', textAlign: 'center' }}
                  >
                    <i className="fas fa-globe me-1"></i> EN
                  </a>
                   <ul className={`dropdown-menu ${languageDropdownOpen ? 'show' : ''}`} style={{ right: 0, left: 'auto' }}>
    <li><button className="dropdown-item" >English</button></li>
    <li><button className="dropdown-item" >Hindi (हिंदी)</button></li>
    <li><button className="dropdown-item">Telugu (తెలుగు)</button></li>
    <li><button className="dropdown-item">Tamil (தமிழ்)</button></li>
    <li><button className="dropdown-item">Marathi (मराठी)</button></li>
    <li><button className="dropdown-item" >Malayalam (മലയാളം)</button></li>
    <li><button className="dropdown-item" >Urdu (اردو)</button></li>
    <li><button className="dropdown-item" >Punjabi (ਪੰਜਾਬੀ)</button></li>
    <li><button className="dropdown-item" >Gujarati (ગુજરાતી)</button></li>
  </ul>
                </li>

                {/* LOGIN BUTTON */}
               <li className="nav-item ms-xl-3">
                  <Link href="/login-signup">
                    <a className="btn btn-custom">
                      Login/Signup
                    </a>
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </header>
      
      <div className="header-spacer"></div>
    </>
  );
}

export default Header;