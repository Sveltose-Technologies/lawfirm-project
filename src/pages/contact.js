
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createContactInquiry } from '../services/authService';

function Contact() {
  const [formData, setFormData] = useState({
    adminId: 3,
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    inquiryType: '',
    message: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'countryCode' && value.length <= 4 && (/^\+?\d*$/.test(value))) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) { alert("Please accept the disclaimer."); return; }
    if (!captchaVerified) { alert("Please confirm you are not a robot."); return; }

    console.log("Submitting Form:", formData);
    setSubmitting(true);
    try {
      const res = await createContactInquiry(formData);
      console.log("API Response:", res);
      if (res.success) {
        alert("Message sent successfully!");
        setFormData({ adminId:3, firstName:'', lastName:'', email:'', countryCode:'', phoneNumber:'', inquiryType:'', message:'' });
        setTermsAccepted(false);
        setCaptchaVerified(false);
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeadClick = (e) => e.preventDefault();

  return (
    <>
      <Head><title>Contact Us</title></Head>

      {/* HERO */}
      <div className="position-relative d-flex align-items-center justify-content-center text-center" style={{ height: '350px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          backgroundImage: `url('/assets/images/banner-img3.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}></div>
        <div className="container py-5">
          <h1 className="display-3 fw-bold font-serif text-dark" style={{ textShadow: '0px 0px 10px rgba(255,255,255,0.8)' }}>
            Contact Us
          </h1>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">

          {/* Sidebar */}
          <div className="col-lg-5 col-md-12 border-end">
            <p className="text-secondary">
              Thank you for your interest. Please contact our professionals.
            </p>

            <div className="mb-4">
              <p>Complete list of media contacts:</p>
              <Link href="/media-contacts"><a className="btn btn-premium">MEDIA CONTACTS</a></Link>
            </div>

            <div>
              <p>Learn about careers at our firm:</p>
              <p className="small">
                All jobs posted <a href="#" onClick={handleDeadClick} className="text-gold">here</a>.
                Report fraud to <a href="mailto:hr@nrlslaw.com" className="text-gold">hr@nrlslaw.com</a>.
              </p>
              <Link href="/careers"><a className="btn btn-premium">JOB OPPORTUNITIES</a></Link>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7 col-md-12">
            <p className="text-secondary">Please fill out the form below.</p>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First Name*</label>
                  <input type="text" name="firstName" className="form-control" required value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name*</label>
                  <input type="text" name="lastName" className="form-control" required value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email*</label>
                <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-3">
                  <label className="form-label">Country Code*</label>
                  <input type="text" name="countryCode" placeholder="+91" className="form-control" required value={formData.countryCode} onChange={handleChange} />
                </div>
                <div className="col-md-9">
                  <label className="form-label">Phone Number*</label>
                  <input type="tel" name="phoneNumber" className="form-control" required value={formData.phoneNumber} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Inquiry Type*</label>
                <input type="text" name="inquiryType" className="form-control" placeholder="Your inquiry type" value={formData.inquiryType} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Message*</label>
                <textarea name="message" className="form-control" rows="5" required value={formData.message} onChange={handleChange}></textarea>
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="disclaimer" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <label className="form-check-label" htmlFor="disclaimer">
                  <strong>Note:</strong> Do not send confidential info without speaking to an attorney.
                </label>
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="captcha" checked={captchaVerified} onChange={() => setCaptchaVerified(!captchaVerified)} />
                <label className="form-check-label" htmlFor="captcha">I'm not a robot</label>
              </div>

              <button type="submit" className="btn btn-premium" disabled={submitting}>
                {submitting ? 'SENDING...' : 'SUBMIT'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default Contact;
