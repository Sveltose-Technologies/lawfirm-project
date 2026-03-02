// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import { createContactInquiry, getAdminId } from "../services/authService";

// function Contact() {
//   const [formData, setFormData] = useState({
//     adminId: "", // Initialized empty, will be set via useEffect
//     firstName: "",
//     lastName: "",
//     email: "",
//     countryCode: "",
//     phoneNumber: "",
//     inquiryType: "",
//     message: "",
//   });

//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [captchaVerified, setCaptchaVerified] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch dynamic adminId on component mount
//   useEffect(() => {
//     const id = getAdminId();
//     if (id) {
//       setFormData((prev) => ({ ...prev, adminId: id }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Phone country code validation logic
//     if (name === "countryCode") {
//       if (value.length <= 4 && /^\+?\d*$/.test(value)) {
//         setFormData({ ...formData, [name]: value });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.adminId) {
//       alert("Session expired. Please log in again.");
//       return;
//     }
//     if (!termsAccepted) {
//       alert("Please accept the disclaimer.");
//       return;
//     }
//     if (!captchaVerified) {
//       alert("Please confirm you are not a robot.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const res = await createContactInquiry(formData);

//       if (res.success) {
//         alert("Message sent successfully!");
//         // Reset form but keep the adminId
//         setFormData({
//           adminId: formData.adminId,
//           firstName: "",
//           lastName: "",
//           email: "",
//           countryCode: "",
//           phoneNumber: "",
//           inquiryType: "",
//           message: "",
//         });
//         setTermsAccepted(false);
//         setCaptchaVerified(false);
//       } else {
//         alert(res.message || "Failed to send message.");
//       }
//     } catch (error) {
//       console.error("Submission Error:", error);
//       alert("Something went wrong. Please try again later.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeadClick = (e) => e.preventDefault();

//   return (
//     <>
//       <Head>
//         <title>Contact Us</title>
//       </Head>

//       {/* HERO SECTION */}
//       <div
//         className="position-relative d-flex align-items-center justify-content-center text-center"
//         style={{ height: "350px" }}>
//         <div
//           className="position-absolute top-0 start-0 w-100 h-100"
//           style={{
//             backgroundImage: `url('/assets/images/banner-img3.png')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             zIndex: -1,
//           }}></div>
//         <div className="container py-5">
//           <h1
//             className="display-3 fw-bold font-serif text-dark"
//             style={{ textShadow: "0px 0px 10px rgba(255,255,255,0.8)" }}>
//             Contact Us
//           </h1>
//         </div>
//       </div>

//       <div className="container py-5">
//         <div className="row g-4">
//           {/* SIDEBAR */}
//           <div className="col-lg-5 col-md-12 border-end">
//             <p className="text-secondary">
//               Thank you for your interest. Please contact our professionals.
//             </p>

//             <div className="mb-4">
//               <p>Complete list of media contacts:</p>
//               <Link href="/media-contacts">
//                 <a className="btn btn-premium">MEDIA CONTACTS</a>
//               </Link>
//             </div>

//             <div>
//               <p>Learn about careers at our firm:</p>
//               <p className="small">
//                 All jobs posted{" "}
//                 <a href="#" onClick={handleDeadClick} className="text-gold">
//                   here
//                 </a>
//                 . Report fraud to{" "}
//                 <a href="mailto:hr@nrlslaw.com" className="text-gold">
//                   hr@nrlslaw.com
//                 </a>
//                 .
//               </p>
//               <Link href="/careers">
//                 <a className="btn btn-premium">JOB OPPORTUNITIES</a>
//               </Link>
//             </div>
//           </div>

//           {/* FORM SECTION */}
//           <div className="col-lg-7 col-md-12">
//             <p className="text-secondary">Please fill out the form below.</p>
//             <form onSubmit={handleSubmit}>
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">First Name*</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     className="form-control"
//                     required
//                     value={formData.firstName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Last Name*</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     className="form-control"
//                     required
//                     value={formData.lastName}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Email*</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="row g-3 mb-3">
//                 <div className="col-md-3">
//                   <label className="form-label">Country Code*</label>
//                   <input
//                     type="text"
//                     name="countryCode"
//                     placeholder="+91"
//                     className="form-control"
//                     required
//                     value={formData.countryCode}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-9">
//                   <label className="form-label">Phone Number*</label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     className="form-control"
//                     required
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Inquiry Type*</label>
//                 <input
//                   type="text"
//                   name="inquiryType"
//                   className="form-control"
//                   placeholder="Your inquiry type"
//                   value={formData.inquiryType}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Message*</label>
//                 <textarea
//                   name="message"
//                   className="form-control"
//                   rows="5"
//                   required
//                   value={formData.message}
//                   onChange={handleChange}></textarea>
//               </div>

//               <div className="form-check mb-3">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="disclaimer"
//                   checked={termsAccepted}
//                   onChange={(e) => setTermsAccepted(e.target.checked)}
//                 />
//                 <label className="form-check-label" htmlFor="disclaimer">
//                   <strong>Note:</strong> Do not send confidential info without
//                   speaking to an attorney.
//                 </label>
//               </div>

//               <div className="form-check mb-3">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="captcha"
//                   checked={captchaVerified}
//                   onChange={() => setCaptchaVerified(!captchaVerified)}
//                 />
//                 <label className="form-check-label" htmlFor="captcha">
//                   I'm not a robot
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-premium"
//                 disabled={submitting}>
//                 {submitting ? "SENDING..." : "SUBMIT"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Contact;
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  createContactInquiry,
  getAdminId,
  getContactText,
} from "../services/authService";

function Contact() {
  const [formData, setFormData] = useState({
    adminId: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    inquiryType: "",
    message: "",
  });

  const [contactText, setContactText] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Set Admin ID
  useEffect(() => {
    const id = getAdminId();
    if (id) {
      setFormData((prev) => ({ ...prev, adminId: id }));
    }
  }, []);

  // ✅ GET Contact Text API
  useEffect(() => {
    const fetchContactText = async () => {
      try {
        const res = await getContactText();

        // API response:
        // {
        //   success: true,
        //   data: [{ contactText: "contactText" }]
        // }

        if (res.success && res.data && res.data.length > 0) {
          setContactText(res.data[0].contactText);
        }
      } catch (error) {
        console.error("Failed to load contact text:", error);
      }
    };

    fetchContactText();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "countryCode") {
      if (value.length <= 4 && /^\+?\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.adminId) {
      alert("Session expired. Please log in again.");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept the disclaimer.");
      return;
    }

    if (!captchaVerified) {
      alert("Please confirm you are not a robot.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await createContactInquiry(formData);

      if (res.success) {
        alert("Message sent successfully!");

        setFormData({
          adminId: formData.adminId,
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phoneNumber: "",
          inquiryType: "",
          message: "",
        });

        setTermsAccepted(false);
        setCaptchaVerified(false);
      } else {
        alert(res.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeadClick = (e) => e.preventDefault();

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>

      <div className="container py-5 mt-5 pt-5">
        <h1 className="display-4 fw-bold font-serif text-dark mb-4">
          Contact Us
        </h1>

        <div className="row g-4">
          {/* LEFT SIDEBAR */}
          <div className="col-lg-5 col-md-12 border-end">
            <p className="text-secondary">
              {contactText ? contactText : "Loading..."}
            </p>

            <div className="mb-4">
              <p>Complete list of media contacts:</p>
              <Link href="/media-contacts">
                <a className="btn btn-premium">MEDIA CONTACTS</a>
              </Link>
            </div>

            <div>
              <p>Learn about careers at our firm:</p>
              <p className="small">
                All jobs posted{" "}
                <a href="#" onClick={handleDeadClick} className="text-gold">
                  here
                </a>
                . Report fraud to{" "}
                <a href="mailto:hr@nrlslaw.com" className="text-gold">
                  hr@nrlslaw.com
                </a>
                .
              </p>

              <Link href="/careers">
                <a className="btn btn-premium">JOB OPPORTUNITIES</a>
              </Link>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="col-lg-7 col-md-12">
            <p className="text-secondary">Please fill out the form below.</p>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="form-label small fw-bold">Email*</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="row g-3 mt-1">
                <div className="col-md-3">
                  <label className="form-label small fw-bold">
                    Country Code*
                  </label>
                  <input
                    type="text"
                    name="countryCode"
                    placeholder="+91"
                    className="form-control"
                    required
                    value={formData.countryCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-9">
                  <label className="form-label small fw-bold">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="form-label small fw-bold">
                  Inquiry Type*
                </label>
                <input
                  type="text"
                  name="inquiryType"
                  className="form-control"
                  placeholder="Your inquiry type"
                  value={formData.inquiryType}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-3">
                <label className="form-label small fw-bold">Message*</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}></textarea>
              </div>

              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="disclaimer"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="disclaimer">
                  <strong>Note:</strong> Do not send confidential info without
                  speaking to an attorney.
                </label>
              </div>

              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="captcha"
                  checked={captchaVerified}
                  onChange={() => setCaptchaVerified(!captchaVerified)}
                />
                <label className="form-check-label small" htmlFor="captcha">
                  I'm not a robot
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-premium mt-4"
                disabled={submitting}>
                {submitting ? "SENDING..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;