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

  // ✅ FIX: DYNAMIC DATA FETCH (Path corrected based on your JSON)
  useEffect(() => {
    const fetchContactText = async () => {
      try {
        const res = await getContactText();

        // Aapke JSON ke hisaab se path: res.data.data[0]
        // Kyunki res.data axios ka response hai aur uske andar backend ka success/data object hai
        const actualData = res.data?.data || res.data;

        if (Array.isArray(actualData) && actualData.length > 0) {
          setContactText(actualData[0].contactText);
        } else if (actualData?.contactText) {
          setContactText(actualData.contactText);
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
          {/* LEFT SIDEBAR - DYNAMIC CONTENT AREA */}
          <div className="col-lg-5 col-md-12 border-end">
            {/* dynamic text from API rendered here */}
            {contactText ? (
              <div
                className="text-secondary mb-4"
                dangerouslySetInnerHTML={{ __html: contactText }}
              />
            ) : (
              <p className="text-secondary">Loading...</p>
            )}

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
                </a>
                .
              </p>

              <Link href="/careers">
                <a className="btn btn-premium">JOB OPPORTUNITIES</a>
              </Link>
            </div>
          </div>

          {/* FORM SECTION - (UI UNCHANGED) */}
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
