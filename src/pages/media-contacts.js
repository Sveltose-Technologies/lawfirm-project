// import React from 'react';
// import Head from 'next/head';
// import Link from 'next/link';

// function MediaContacts() {

//   const theme = {
//     textDark: '#000000',
//     textGray: '#333333',
//     borderGray: '#cccccc',
//     accentGold: '#C5A059',
//     btnBorder: '#003366',
//     bgLight: '#fdfdfd',
//   };

//   const contacts = [
//     {
//       name: "XYZ",
//       title: "Managing Director/Chief Marketing Officer",
//       phone: "XYZ",
//       email: "xyz@example.com"
//     },
//     {
//       name: "XYZ",
//       title: "Chief Communications Officer",
//       phone: "XYZ",
//       email: "xyz@example.com"
//     },
//     {
//       name: "XYZ",
//       title: "Director of Media Relations & Communications",
//       phone: "XYZ",
//       email: "xyz@example.com"
//     },
//     {
//       name: "XYZ",
//       title: "Director of Marketing and Business Development",
//       phone: "XYZ",
//       email: "xyz@example.com"
//     },
//     {
//       name: "XYZ",
//       title: "Director of Marketing and Business Development - London",
//       phone: "XYZ",
//       email: "xyz@example.com"
//     },
//     {
//       name: "XYZ",
//       title: "Regional Marketing Director - Germany",
//       phone: "XYZ",
//       email: "xyz@example.com"
//     }
//   ];

//   return (
//     <>
//       <Head>
//         <title>Media Contacts | Law Firm</title>
//       </Head>

//       {/* HERO BANNER */}
//       <div className="media-hero position-relative d-flex align-items-center justify-content-center text-center">
//         <div
//           className="hero-bg"
//           style={{
//             backgroundImage: `url('/assets/images/banner-img3.png')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: -1
//           }}
//         ></div>

//         <div className="container py-5">
//           <h1
//             className="display-3 fw-bold text-dark font-serif mt-5 pt-5"
//             style={{ textShadow: '0px 0px 10px rgba(255,255,255,0.8)' }}
//           >
//             Media Contacts
//           </h1>
//         </div>
//       </div>

//       <div className="container py-5 mb-5">
//         <div className="row">
//           <div className="col-lg-8">
//             <p className="mb-5 lead" style={{ color: theme.textGray }}>
//               Please contact the following individuals with media inquiries.
//             </p>

//             {contacts.map((contact, index) => (
//               <div key={index} className="mb-5 contact-block">
//                 <h3 className="font-serif fw-bold mb-1 contact-name">
//                   {contact.name}
//                 </h3>

//                 <p className="mb-2 text-secondary" style={{ fontSize: '1.05rem' }}>
//                   {contact.title}
//                 </p>

//                 <div className="contact-details">
//                   <p className="mb-1 text-dark">{contact.phone}</p>
//                   <p className="mb-0">
//                     <span className="text-gold-link">
//                       {contact.email}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             ))}

//             <Link href="/contact">
//               <a className="btn-outline-custom  text-decoration-none d-inline-block">
//                 BACK TO CONTACT
//               </a>
//             </Link>

//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .font-serif {
//           font-family: "Times New Roman", Times, serif;
//         }

//         .media-hero {
//           height: 400px;
//         }

//         .text-gold-link {
//           color: ${theme.accentGold};
//           text-decoration: underline;
//           font-weight: bold;
//         }

//         .btn-outline-custom {
//           background: transparent;
//           border: 2px solid ${theme.btnBorder};
//           color: ${theme.btnBorder};
//           padding: 12px 25px;
//           font-size: 0.9rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           transition: all 0.3s;
//         }

//         .btn-outline-custom:hover {
//           background-color: ${theme.btnBorder};
//           color: #fff;
//         }

//         /* NAME FONT SIZE REDUCED */
//         .contact-name {
//           font-size: 1.5rem;
//           color: ${theme.textDark};
//         }

//         @media (max-width: 768px) {
//           .media-hero {
//             height: 300px;
//           }

//           .display-3 {
//             font-size: 2.5rem;
//           }

//           .contact-name {
//             font-size: 1.3rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// export default MediaContacts;

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import * as authService from "../services/authService";

function MediaContacts() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    textDark: "#000000",
    textGray: "#333333",
    borderGray: "#cccccc",
    accentGold: "#C5A059",
    btnBorder: "#003366",
    bgLight: "#fdfdfd",
  };

  useEffect(() => {
    fetchMediaData();
  }, []);

  const fetchMediaData = async () => {
    try {
      setLoading(true);
      const res = await authService.getAllContacts();
      if (res.success) {
        const inquiries = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        // Optional: Filter only media inquiries if necessary, or show all
        setDataList(inquiries);
      }
    } catch (error) {
      console.error("Error fetching media contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Media Contacts | Law Firm</title>
      </Head>

      <div className="container py-5 mt-5 mb-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold text-dark font-serif mb-4">
              Media Contacts
            </h1>

            <p className="mb-5 lead" style={{ color: theme.textGray }}>
              Below is the list of inquiries and contact requests received.
            </p>

            {loading ? (
              <p>Loading contacts...</p>
            ) : dataList.length === 0 ? (
              <p>No media inquiries found.</p>
            ) : (
              dataList.map((contact, index) => (
                <div key={contact.id || index} className="mb-5 contact-block">
                  <h3 className="font-serif fw-bold mb-1 contact-name">
                    {contact.firstName} {contact.lastName}
                  </h3>

                  <p
                    className="mb-2 text-secondary"
                    style={{ fontSize: "1.05rem", fontWeight: "bold" }}>
                    Type: {contact.inquiryType || "General Inquiry"}
                  </p>
                  <p className="mb-1 text-dark">
                    <strong>Country Code :</strong>
                    {contact.countryCode}
                  </p>
                  <div className="contact-details">
                    <p className="mb-1 text-dark">
                      <strong>Phone :</strong>
                      {contact.phoneNumber}
                    </p>

                    <p className="mb-1">
                      <strong>Email:</strong>{" "}
                      <span className="text-gold-link">{contact.email}</span>
                    </p>
                    <p
                      className="mb-0 text-muted italic"
                      style={{
                        fontSize: "0.95rem",
                        borderLeft: `3px solid ${theme.accentGold}`,
                        paddingLeft: "10px",
                        marginTop: "10px",
                      }}>
                      " {contact.message} "
                    </p>
                  </div>
                </div>
              ))
            )}

            <Link href="/contact-us">
              <a className="btn-outline-custom text-decoration-none d-inline-block mt-4">
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

        .contact-name {
          font-size: 1.5rem;
          color: ${theme.textDark};
          text-transform: capitalize;
        }

        .contact-block {
          border-bottom: 1px solid #eee;
          padding-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.2rem;
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