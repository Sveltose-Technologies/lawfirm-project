
"use client";

import { useState, useEffect, useRef } from "react";
import {
  signupUser,
  signupAttorney,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  adminLogin,
  adminForgotPassword,
  adminVerifyOtp,
  adminResetPassword,
} from "../services/authService";
import { toastService } from "../utils/toast";

export default function UnifiedAuthPage() {
  const [view, setView] = useState("login");
  const [userRole, setUserRole] = useState("Client");
  const [isLoading, setIsLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (view === "verify" && timer > 0) {
      timerRef.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [view, timer]);

  const startTimer = () => {
    setTimer(60);
    setCanResend(false);
  };

  const generateCaptcha = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let res = "";
    for (let i = 0; i < 6; i++)
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    setGeneratedCaptcha(res);
  };

  useEffect(() => {
    if (view === "signup") generateCaptcha();
  }, [view]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      if (res && (res.success || res.token || res.client || res.attorney)) {
        handleLoginSuccess(res);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      try {
        let adminRes = await adminLogin(formData.email, formData.password);
        if (adminRes.success || adminRes.data?.token) {
          handleLoginSuccess({ ...adminRes, role: "admin" });
        }
      } catch (adminErr) {
        toastService.error("Invalid Email or Password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (res) => {
    const token =
      res.token || res.client?.token || res.attorney?.token || res.data?.token;
    if (token) localStorage.setItem("token", token);
    let role =
      res.role ||
      res.client?.role ||
      res.attorney?.role ||
      res.data?.role ||
      "client";
    const finalRole = role.toLowerCase();
    localStorage.setItem("role", finalRole);
    toastService.success("Login Successful");
    if (finalRole === "admin") window.location.href = "/admin-panel";
    else if (finalRole === "attorney") window.location.href = "/attorney-panel";
    else window.location.href = "/client-panel";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword)
      return toastService.error("Passwords do not match");
    if (captchaInput.toUpperCase() !== generatedCaptcha)
      return toastService.error("Invalid Captcha");

    setIsLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.repeatPassword,
      };

      if (userRole === "Attorney") {
        await signupAttorney(payload);
      } else {
        await signupUser(payload);
      }

      toastService.success(`${userRole} registered successfully!`);
      setView("login");
    } catch (err) {
      toastService.error(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgot = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      let result = await forgotPassword({ email: formData.email });
      if (result.success) {
        setView("verify");
        startTimer();
        toastService.success("OTP Sent");
      } else {
        let adminRes = await adminForgotPassword(formData.email);
        if (adminRes.success) {
          setUserRole("Admin");
          setView("verify");
          startTimer();
          toastService.success("Admin OTP Sent");
        } else {
          toastService.error("Email not found");
        }
      }
    } catch (err) {
      toastService.error("Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light-gray">
      <div
        className="card shadow-lg border-0 auth-card"
        style={{ borderTop: "5px solid #002147" }}>
        <div className="card-body p-4">
          {view === "login" && (
            <div className="fade-in">
              <h3 className="text-center fw-bold text-blue mb-1">
                Welcome Back
              </h3>
              <p className="text-center text-muted small mb-4">
                Please sign in to continue
              </p>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="small fw-bold">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label className="small fw-bold">Password *</label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    className="form-control"
                    onChange={handleInput}
                    required
                  />
                  <span
                    className="pass-toggle text-gold fw-bold"
                    onClick={() => setShowPass(!showPass)}>
                    {showPass ? "HIDE" : "SHOW"}
                  </span>
                </div>
                <div className="text-end mb-3">
                  <span
                    className="text-gold small fw-bold cursor-pointer"
                    onClick={() => setView("forgot")}>
                    Forgot Password?
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn bg-blue text-white w-100 fw-bold mb-3"
                  disabled={isLoading}>
                  LOG IN
                </button>
                <p className="text-center small">
                  New User?{" "}
                  <span
                    className="text-gold fw-bold cursor-pointer"
                    onClick={() => setView("signup")}>
                    Create Account
                  </span>
                </p>
              </form>
            </div>
          )}

          {view === "signup" && (
            <div className="fade-in">
              <h4 className="text-center fw-bold text-blue mb-3">
                Create Account
              </h4>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <button
                  type="button"
                  className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === "Client" ? "bg-blue text-white" : "btn-outline-secondary"}`}
                  onClick={() => setUserRole("Client")}>
                  Client
                </button>
                <button
                  type="button"
                  className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === "Attorney" ? "bg-blue text-white" : "btn-outline-secondary"}`}
                  onClick={() => setUserRole("Attorney")}>
                  Attorney
                </button>
              </div>
              <form onSubmit={handleSignup}>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="small fw-bold">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="small fw-bold">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="small fw-bold">Password *</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold">Confirm *</label>
                    <input
                      type="password"
                      name="repeatPassword"
                      className="form-control"
                      onChange={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small fw-bold">Security Code *</label>
                  <div className="d-flex gap-2">
                    <div
                      className="bg-blue text-white px-3 py-1 rounded small fw-bold cursor-pointer"
                      onClick={generateCaptcha}>
                      {generatedCaptcha}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Code"
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn bg-blue text-white w-100 fw-bold mb-3"
                  disabled={isLoading}>
                  REGISTER
                </button>
                <p className="text-center small">
                  Has Account?{" "}
                  <span
                    className="text-gold fw-bold cursor-pointer"
                    onClick={() => setView("login")}>
                    Sign In
                  </span>
                </p>
              </form>
            </div>
          )}

          {view === "verify" && (
            <div className="fade-in text-center">
              <h4 className="fw-bold text-blue">Verify OTP</h4>
              <p className="small text-muted mb-4">
                Enter OTP sent to your email
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  try {
                    let result =
                      userRole === "Admin"
                        ? await adminVerifyOtp(formData.email, otpInput)
                        : await verifyOtp({
                            email: formData.email,
                            otp: otpInput,
                          });
                    if (result.success) {
                      setView("reset");
                      toastService.success("OTP verified");
                    } else {
                      toastService.error("Invalid OTP");
                    }
                  } catch (err) {
                    toastService.error("Invalid OTP");
                  } finally {
                    setIsLoading(false);
                  }
                }}>
                <input
                  type="text"
                  className="form-control text-center mb-4 fs-4 fw-bold"
                  maxLength="6"
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn bg-blue text-white w-100 fw-bold py-2 mb-3"
                  disabled={isLoading}>
                  VERIFY OTP
                </button>
                <div className="small">
                  {canResend ? (
                    <span
                      className="text-gold fw-bold cursor-pointer"
                      onClick={handleForgot}>
                      Resend OTP
                    </span>
                  ) : (
                    <span>
                      Resend in <b className="text-blue">{timer}s</b>
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {view === "reset" && (
            <div className="fade-in">
              <h4 className="text-center fw-bold text-blue mb-4">
                New Password
              </h4>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (formData.newPassword !== formData.confirmPassword)
                    return toastService.error("Passwords do not match");
                  setIsLoading(true);
                  try {
                    let result =
                      userRole === "Admin"
                        ? await adminResetPassword(
                            formData.email,
                            formData.newPassword,
                            formData.confirmPassword,
                          )
                        : await resetPassword({
                            email: formData.email,
                            newPassword: formData.newPassword,
                            confirmPassword: formData.confirmPassword,
                          });
                    if (result.success) {
                      toastService.success("Password updated!");
                      setView("login");
                    } else {
                      toastService.error("Failed to reset");
                    }
                  } catch (err) {
                    toastService.error("Failed to reset");
                  } finally {
                    setIsLoading(false);
                  }
                }}>
                <div className="mb-3 position-relative">
                  <label className="small fw-bold">New Password *</label>
                  <input
                    type={showNewPass ? "text" : "password"}
                    name="newPassword"
                    size="sm"
                    className="form-control"
                    onChange={handleInput}
                    required
                  />
                  <span
                    className="pass-toggle text-gold fw-bold"
                    onClick={() => setShowNewPass(!showNewPass)}>
                    {showNewPass ? "HIDE" : "SHOW"}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="small fw-bold">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    onChange={handleInput}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-blue text-white w-100 fw-bold py-2"
                  disabled={isLoading}>
                  UPDATE PASSWORD
                </button>
              </form>
            </div>
          )}

          {view === "forgot" && (
            <div className="fade-in">
              <h4 className="text-center fw-bold text-blue mb-4">
                Reset Password
              </h4>
              <form onSubmit={handleForgot}>
                <div className="mb-3">
                  <label className="small fw-bold">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="name@example.com"
                    onChange={handleInput}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-blue text-white w-100 fw-bold py-2"
                  disabled={isLoading}>
                  SEND OTP
                </button>
                <p className="text-center mt-3 small">
                  <span
                    className="text-gold fw-bold cursor-pointer"
                    onClick={() => setView("login")}>
                    Back to Login
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .bg-blue { background-color: #002147 !important; }
        .text-blue { color: #002147 !important; }
        .text-gold { color: #EEBB5D !important; }
        .auth-card { width: 100%; max-width: 380px; }
        .cursor-pointer { cursor: pointer; }
        .pass-toggle { position: absolute; right: 10px; top: 32px; font-size: 10px; cursor: pointer; z-index: 10; }
        .fade-in { animation: fadeIn 0.4s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}