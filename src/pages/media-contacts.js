import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function MediaContacts() {

  const theme = {
    textDark: '#000000',
    textGray: '#333333',
    borderGray: '#cccccc',
    accentGold: '#C5A059',
    btnBorder: '#003366',
    bgLight: '#fdfdfd',
  };

  const contacts = [
    {
      name: "XYZ",
      title: "Managing Director/Chief Marketing Officer",
      phone: "XYZ",
      email: "xyz@example.com"
    },
    {
      name: "XYZ",
      title: "Chief Communications Officer",
      phone: "XYZ",
      email: "xyz@example.com"
    },
    {
      name: "XYZ",
      title: "Director of Media Relations & Communications",
      phone: "XYZ",
      email: "xyz@example.com"
    },
    {
      name: "XYZ",
      title: "Director of Marketing and Business Development",
      phone: "XYZ",
      email: "xyz@example.com"
    },
    {
      name: "XYZ",
      title: "Director of Marketing and Business Development - London",
      phone: "XYZ",
      email: "xyz@example.com"
    },
    {
      name: "XYZ",
      title: "Regional Marketing Director - Germany",
      phone: "XYZ",
      email: "xyz@example.com"
    }
  ];

  return (
    <>
      <Head>
        <title>Media Contacts | Law Firm</title>
      </Head>

      {/* HERO BANNER */}
      <div className="media-hero position-relative d-flex align-items-center justify-content-center text-center">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url('/assets/images/banner-img3.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
          }}
        ></div>

        <div className="container py-5">
          <h1
            className="display-3 fw-bold text-dark font-serif mt-5 pt-5"
            style={{ textShadow: '0px 0px 10px rgba(255,255,255,0.8)' }}
          >
            Media Contacts
          </h1>
        </div>
      </div>

      <div className="container py-5 mb-5">
        <div className="row">
          <div className="col-lg-8">
            <p className="mb-5 lead" style={{ color: theme.textGray }}>
              Please contact the following individuals with media inquiries.
            </p>

            {contacts.map((contact, index) => (
              <div key={index} className="mb-5 contact-block">
                <h3 className="font-serif fw-bold mb-1 contact-name">
                  {contact.name}
                </h3>

                <p className="mb-2 text-secondary" style={{ fontSize: '1.05rem' }}>
                  {contact.title}
                </p>

                <div className="contact-details">
                  <p className="mb-1 text-dark">{contact.phone}</p>
                  <p className="mb-0">
                    <span className="text-gold-link">
                      {contact.email}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            <Link href="/contact">
              <a className="btn-outline-custom  text-decoration-none d-inline-block">
                BACK TO CONTACT
              </a>
            </Link>

          </div>
        </div>
      </div>

      <style jsx>{`
        .font-serif {
          font-family: "Times New Roman", Times, serif;
        }

        .media-hero {
          height: 400px;
        }

        .text-gold-link {
          color: ${theme.accentGold};
          text-decoration: underline;
          font-weight: bold;
        }

        .btn-outline-custom {
          background: transparent;
          border: 2px solid ${theme.btnBorder};
          color: ${theme.btnBorder};
          padding: 12px 25px;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s;
        }

        .btn-outline-custom:hover {
          background-color: ${theme.btnBorder};
          color: #fff;
        }

        /* NAME FONT SIZE REDUCED */
        .contact-name {
          font-size: 1.5rem;
          color: ${theme.textDark};
        }

        @media (max-width: 768px) {
          .media-hero {
            height: 300px;
          }

          .display-3 {
            font-size: 2.5rem;
          }

          .contact-name {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
}

export default MediaContacts;
