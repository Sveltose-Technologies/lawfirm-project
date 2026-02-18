// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { signupUser, loginUser, forgotPassword, verifyOtp, resetPassword } from '../services/authService';
// // // import { toastService } from '../utils/toast';

// // // export default function UnifiedAuthPage() {
// // //   const [view, setView] = useState('login');
// // //   const [userRole, setUserRole] = useState('Client');
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   const [showPass, setShowPass] = useState(false);
// // //   const [showNewPass, setShowNewPass] = useState(false);
// // //   const [timer, setTimer] = useState(60);
// // //   const [canResend, setCanResend] = useState(false);
// // //   const timerRef = useRef(null);

// // //   const [generatedCaptcha, setGeneratedCaptcha] = useState('');
// // //   const [captchaInput, setCaptchaInput] = useState('');
// // //   const [otpInput, setOtpInput] = useState('');

// // //   const [formData, setFormData] = useState({
// // //     firstName: '', lastName: '', email: '',
// // //     password: '', repeatPassword: '',
// // //     newPassword: '', confirmPassword: '',
// // //     terms: false
// // //   });

// // //   // ⏱️ OTP Timer Logic
// // //   useEffect(() => {
// // //     if (view === 'verify' && timer > 0) {
// // //       timerRef.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
// // //     } else if (timer === 0) {
// // //       setCanResend(true);
// // //       clearInterval(timerRef.current);
// // //     }
// // //     return () => clearInterval(timerRef.current);
// // //   }, [view, timer]);

// // //   const startTimer = () => { setTimer(60); setCanResend(false); };

// // //   // 🔐 Captcha Logic
// // //   const generateCaptcha = () => {
// // //     const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// // //     let res = '';
// // //     for (let i = 0; i < 6; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
// // //     setGeneratedCaptcha(res);
// // //   };

// // //   useEffect(() => { if (view === 'signup') generateCaptcha(); }, [view]);

// // //   const handleInput = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
// // //   };

// // //   // 🚀 Actions
// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);
// // //     try {
// // //       const res = await loginUser({ email: formData.email, password: formData.password });
// // //       const token = res.token || res.client?.token;
// // //       if (res.message === 'Login successful' || token) {
// // //         if (token) localStorage.setItem('token', token);
// // //         const role = (res.role || res.client?.role || userRole).toLowerCase();
// // //         localStorage.setItem('role', role);
// // //         toastService.success('Login Successful');
// // //         window.location.href = role === 'attorney' ? '/attorney-panel' : '/client-panel';
// // //       }
// // //     } catch (err) { toastService.error(err.message || 'Login failed'); } finally { setIsLoading(false); }
// // //   };

// // //   const handleSignup = async (e) => {
// // //     e.preventDefault();
// // //     if (formData.password !== formData.repeatPassword) return toastService.error('Passwords do not match');
// // //     if (captchaInput.toUpperCase() !== generatedCaptcha) return toastService.error('Invalid Captcha');
// // //     setIsLoading(true);
// // //     try {
// // //       await signupUser({ ...formData, role: userRole.toLowerCase(), confirmPassword: formData.repeatPassword });
// // //       toastService.success('Account created!'); setView('login');
// // //     } catch (err) { toastService.error(err.message); } finally { setIsLoading(false); }
// // //   };

// // //   const handleForgot = async (e) => {
// // //     if (e) e.preventDefault();
// // //     setIsLoading(true);
// // //     try {
// // //       await forgotPassword({ email: formData.email });
// // //       setView('verify'); startTimer();
// // //       toastService.success('OTP Sent');
// // //     } catch (err) { toastService.error(err.message); } finally { setIsLoading(false); }
// // //   };

// // //   return (
// // //     <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light-gray">
// // //       <div className="card shadow-lg border-0 auth-card" style={{ borderTop: '5px solid var(--primary-blue)' }}>
// // //         <div className="card-body p-4">

// // //           {/* LOGIN VIEW */}
// // //           {view === 'login' && (
// // //             <div className="fade-in">
// // //               <h3 className="text-center fw-bold text-blue mb-1">Welcome Back</h3>
// // //               <p className="text-center text-muted small mb-4">Please sign in to continue</p>
// // //               <form onSubmit={handleLogin}>
// // //                 <div className="mb-3">
// // //                   <label className="form-label fw-bold small">Email ID <span className="text-danger">*</span></label>
// // //                   <input type="email" name="email" className="form-control form-control-sm" onChange={handleInput} required />
// // //                 </div>
// // //                 <div className="mb-3 position-relative">
// // //                   <label className="form-label fw-bold small">Password <span className="text-danger">*</span></label>
// // //                   <input type={showPass ? "text" : "password"} name="password" className="form-control form-control-sm" onChange={handleInput} required />
// // //                   <span className="pass-toggle text-gold fw-bold" onClick={() => setShowPass(!showPass)}>
// // //                     {showPass ? 'HIDE' : 'SHOW'}
// // //                   </span>
// // //                 </div>
// // //                 <div className="text-end mb-3">
// // //                   <span className="text-gold small fw-bold cursor-pointer" onClick={() => setView('forgot')}>Forgot Password?</span>
// // //                 </div>
// // //                 <button type="submit" className="btn bg-blue text-white w-100 fw-bold mb-3" disabled={isLoading}>LOG IN</button>
// // //                 <p className="text-center small">New User? <span className="text-gold fw-bold cursor-pointer" onClick={() => setView('signup')}>Create Account</span></p>
// // //               </form>
// // //             </div>
// // //           )}

// // //           {/* SIGNUP VIEW */}
// // //           {view === 'signup' && (
// // //             <div className="fade-in">
// // //               <h4 className="text-center fw-bold text-blue mb-3">Create Account</h4>
// // //               <div className="d-flex justify-content-center gap-2 mb-3">
// // //                 <button type="button" className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === 'Client' ? 'bg-blue text-white' : 'btn-outline-secondary'}`} onClick={() => setUserRole('Client')}>Client</button>
// // //                 <button type="button" className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === 'Attorney' ? 'bg-blue text-white' : 'btn-outline-secondary'}`} onClick={() => setUserRole('Attorney')}>Attorney</button>
// // //               </div>
// // //               <form onSubmit={handleSignup}>
// // //                 <div className="row g-2 mb-2">
// // //                   <div className="col-6">
// // //                     <label className="small fw-bold">First Name <span className="text-danger">*</span></label>
// // //                     <input type="text" name="firstName" className="form-control form-control-sm" onChange={handleInput} required />
// // //                   </div>
// // //                   <div className="col-6">
// // //                     <label className="small fw-bold">Last Name <span className="text-danger">*</span></label>
// // //                     <input type="text" name="lastName" className="form-control form-control-sm" onChange={handleInput} required />
// // //                   </div>
// // //                 </div>
// // //                 <div className="mb-2">
// // //                   <label className="small fw-bold">Email ID <span className="text-danger">*</span></label>
// // //                   <input type="email" name="email" className="form-control form-control-sm" onChange={handleInput} required />
// // //                 </div>
// // //                 <div className="row g-2 mb-2">
// // //                   <div className="col-6">
// // //                     <label className="small fw-bold">Password <span className="text-danger">*</span></label>
// // //                     <input type="password" name="password" className="form-control form-control-sm" onChange={handleInput} required />
// // //                   </div>
// // //                   <div className="col-6">
// // //                     <label className="small fw-bold">Confirm <span className="text-danger">*</span></label>
// // //                     <input type="password" name="repeatPassword" className="form-control form-control-sm" onChange={handleInput} required />
// // //                   </div>
// // //                 </div>
// // //                 <div className="mb-3">
// // //                   <label className="small fw-bold">Security Code <span className="text-danger">*</span></label>
// // //                   <div className="d-flex gap-2">
// // //                     <div className="bg-blue text-white px-3 py-1 rounded small fw-bold cursor-pointer" onClick={generateCaptcha}>{generatedCaptcha}</div>
// // //                     <input type="text" className="form-control form-control-sm" placeholder="Enter Code" onChange={(e) => setCaptchaInput(e.target.value)} required />
// // //                   </div>
// // //                 </div>
// // //                 <button type="submit" className="btn bg-blue text-white w-100 fw-bold mb-3">REGISTER</button>
// // //                 <p className="text-center small">Has Account? <span className="text-gold fw-bold cursor-pointer" onClick={() => setView('login')}>Sign In</span></p>
// // //               </form>
// // //             </div>
// // //           )}

// // //           {/* VERIFY OTP VIEW */}
// // //           {view === 'verify' && (
// // //             <div className="fade-in text-center">
// // //               <h4 className="fw-bold text-blue">Verify OTP</h4>
// // //               <p className="small text-muted mb-4">Enter OTP sent to your email</p>
// // //               <form onSubmit={async (e) => { e.preventDefault(); try { await verifyOtp({ email: formData.email, otp: otpInput }); setView('reset'); } catch { toastService.error('Invalid OTP'); } }}>
// // //                 <input type="text" className="form-control text-center mb-4 fs-4 fw-bold" maxLength="6" onChange={(e) => setOtpInput(e.target.value)} required />
// // //                 <button type="submit" className="btn bg-blue text-white w-100 fw-bold py-2 mb-3">VERIFY OTP</button>
// // //                 <div className="small">
// // //                   {canResend ? <span className="text-gold fw-bold cursor-pointer" onClick={handleForgot}>Resend OTP</span> : <span>Resend in <b className="text-blue">{timer}s</b></span>}
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           )}

// // //           {/* RESET PASSWORD VIEW */}
// // //           {view === 'reset' && (
// // //             <div className="fade-in">
// // //               <h4 className="text-center fw-bold text-blue mb-4">New Password</h4>
// // //               <form onSubmit={async (e) => { e.preventDefault(); try { await resetPassword({ email: formData.email, newPassword: formData.newPassword, confirmPassword: formData.confirmPassword }); toastService.success('Updated!'); setView('login'); } catch (err) { toastService.error(err.message); } }}>
// // //                 <div className="mb-3 position-relative">
// // //                   <label className="small fw-bold">New Password <span className="text-danger">*</span></label>
// // //                   <input type={showNewPass ? "text" : "password"} name="newPassword" size="sm" className="form-control" onChange={handleInput} required />
// // //                   <span className="pass-toggle text-gold fw-bold" onClick={() => setShowNewPass(!showNewPass)}> {showNewPass ? 'HIDE' : 'SHOW'} </span>
// // //                 </div>
// // //                 <div className="mb-4">
// // //                   <label className="small fw-bold">Confirm Password <span className="text-danger">*</span></label>
// // //                   <input type="password" name="confirmPassword" className="form-control" onChange={handleInput} required />
// // //                 </div>
// // //                 <button type="submit" className="btn bg-blue text-white w-100 fw-bold py-2">UPDATE PASSWORD</button>
// // //               </form>
// // //             </div>
// // //           )}

// // //           {/* FORGOT PASSWORD VIEW */}
// // //           {view === 'forgot' && (
// // //             <div className="fade-in">
// // //               <h4 className="text-center fw-bold text-blue mb-3">Reset Password</h4>
// // //               <form onSubmit={handleForgot}>
// // //                 <div className="mb-3">
// // //                   <label className="small fw-bold">Email ID <span className="text-danger">*</span></label>
// // //                   <input type="email" name="email" className="form-control" placeholder="name@example.com" onChange={handleInput} required />
// // //                 </div>
// // //                 <button type="submit" className="btn bg-blue text-white w-100 fw-bold py-2">SEND OTP</button>
// // //                 <p className="text-center mt-3 small"><span className="text-gold fw-bold cursor-pointer" onClick={() => setView('login')}>Back to Login</span></p>
// // //               </form>
// // //             </div>
// // //           )}

// // //         </div>
// // //       </div>

// // //       <style>{`
// // //         .auth-card { width: 100%; max-width: 380px; }
// // //         .cursor-pointer { cursor: pointer; }
// // //         .pass-toggle { position: absolute; right: 10px; top: 32px; font-size: 10px; cursor: pointer; }
// // //         .fade-in { animation: fadeIn 0.4s ease-in; }
// // //         @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import {
// //   signupUser,
// //   loginUser,
// //   forgotPassword,
// //   verifyOtp,
// //   resetPassword,
// //   adminLogin,
// //   adminForgotPassword,
// //   adminVerifyOtp,
// //   adminResetPassword,
// // } from "../services/authService";
// // import { toastService } from "../utils/toast";

// // export default function UnifiedAuthPage() {
// //   const [view, setView] = useState("login");
// //   const [userRole, setUserRole] = useState("Client"); // 'Client', 'Attorney', or 'Admin'
// //   const [isLoading, setIsLoading] = useState(false);

// //   const [showPass, setShowPass] = useState(false);
// //   const [showNewPass, setShowNewPass] = useState(false);
// //   const [timer, setTimer] = useState(60);
// //   const [canResend, setCanResend] = useState(false);
// //   const timerRef = useRef(null);

// //   const [generatedCaptcha, setGeneratedCaptcha] = useState("");
// //   const [captchaInput, setCaptchaInput] = useState("");
// //   const [otpInput, setOtpInput] = useState("");

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //     repeatPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //     terms: false,
// //   });

// //   // ⏱️ OTP Timer Logic
// //   useEffect(() => {
// //     if (view === "verify" && timer > 0) {
// //       timerRef.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
// //     } else if (timer === 0) {
// //       setCanResend(true);
// //       clearInterval(timerRef.current);
// //     }
// //     return () => clearInterval(timerRef.current);
// //   }, [view, timer]);

// //   const startTimer = () => {
// //     setTimer(60);
// //     setCanResend(false);
// //   };

// //   // 🔐 Captcha Logic
// //   const generateCaptcha = () => {
// //     const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// //     let res = "";
// //     for (let i = 0; i < 6; i++)
// //       res += chars.charAt(Math.floor(Math.random() * chars.length));
// //     setGeneratedCaptcha(res);
// //   };

// //   useEffect(() => {
// //     if (view === "signup") generateCaptcha();
// //   }, [view]);

// //   const handleInput = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
// //   };

// //   // 🚀 Login Action
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     // --- ADMIN API LOGIC ---
// //     if (userRole === "Admin") {
// //       try {
// //         const res = await adminLogin(formData.email, formData.password);
// //         if (res.success) {
// //           localStorage.setItem(
// //             "token",
// //             res.data?.token || res.data?.admin?.token,
// //           );
// //           localStorage.setItem("role", "admin");
// //           localStorage.setItem("isLoggedIn", "true");
// //           toastService.success("Admin Login Successful");
// //           window.location.href = "/admin-panel";
// //         } else {
// //           toastService.error(res.message || "Invalid Admin Credentials");
// //         }
// //       } catch (err) {
// //         toastService.error(err.message || "Login failed");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //       return;
// //     }

// //     // --- CLIENT / ATTORNEY API LOGIC ---
// //     try {
// //       const res = await loginUser({
// //         email: formData.email,
// //         password: formData.password,
// //       });
// //       const token = res.token || res.client?.token;
// //       if (res.message === "Login successful" || token) {
// //         if (token) localStorage.setItem("token", token);
// //         const role = (res.role || res.client?.role || userRole).toLowerCase();
// //         localStorage.setItem("role", role);
// //         toastService.success("Login Successful");
// //         window.location.href =
// //           role === "attorney" ? "/attorney-panel" : "/client-panel";
// //       }
// //     } catch (err) {
// //       toastService.error(err.message || "Login failed");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     if (formData.password !== formData.repeatPassword)
// //       return toastService.error("Passwords do not match");
// //     if (captchaInput.toUpperCase() !== generatedCaptcha)
// //       return toastService.error("Invalid Captcha");
// //     setIsLoading(true);
// //     try {
// //       await signupUser({
// //         ...formData,
// //         role: userRole.toLowerCase(),
// //         confirmPassword: formData.repeatPassword,
// //       });
// //       toastService.success("Account created!");
// //       setView("login");
// //     } catch (err) {
// //       toastService.error(err.message);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleForgot = async (e) => {
// //     if (e) e.preventDefault();
// //     setIsLoading(true);
// //     try {
// //       let result;
// //       if (userRole === "Admin") {
// //         result = await adminForgotPassword(formData.email);
// //       } else {
// //         result = await forgotPassword({ email: formData.email });
// //       }

// //       if (result.success || result.message) {
// //         setView("verify");
// //         startTimer();
// //         toastService.success(result.message || "OTP Sent");
// //       } else {
// //         toastService.error(result.message || "Failed to send OTP");
// //       }
// //     } catch (err) {
// //       toastService.error(err.message || "Failed to send OTP");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light-gray">
// //       <div
// //         className="card shadow-lg border-0 auth-card"
// //         style={{ borderTop: "5px solid #002147" }}>
// //         <div className="card-body p-4">
// //           {/* LOGIN VIEW */}
// //           {view === "login" && (
// //             <div className="fade-in">
// //               <h3 className="text-center fw-bold text-blue mb-1">
// //                 Welcome Back
// //               </h3>
// //               <p className="text-center text-muted small mb-4">
// //                 Please sign in to continue
// //               </p>

// //               {/* Role Selection Tabs */}
// //               <div className="d-flex justify-content-center gap-2 mb-4">
// //                 <button
// //                   type="button"
// //                   className={`btn btn-sm px-3 rounded-pill fw-bold ${userRole === "Client" ? "bg-blue text-white" : "btn-outline-secondary"}`}
// //                   onClick={() => setUserRole("Client")}>
// //                   Client
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className={`btn btn-sm px-3 rounded-pill fw-bold ${userRole === "Attorney" ? "bg-blue text-white" : "btn-outline-secondary"}`}
// //                   onClick={() => setUserRole("Attorney")}>
// //                   Attorney
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className={`btn btn-sm px-3 rounded-pill fw-bold ${userRole === "Admin" ? "bg-blue text-white" : "btn-outline-secondary"}`}
// //                   onClick={() => setUserRole("Admin")}>
// //                   Admin
// //                 </button>
// //               </div>

// //               <form onSubmit={handleLogin}>
// //                 <div className="mb-3">
// //                   <label className="form-label fw-bold small">
// //                     Email ID <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     className="form-control form-control-sm"
// //                     onChange={handleInput}
// //                     placeholder={
// //                       userRole === "Admin" ? "admin@lawfirm.com" : "Enter email"
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div className="mb-3 position-relative">
// //                   <label className="form-label fw-bold small">
// //                     Password <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     type={showPass ? "text" : "password"}
// //                     name="password"
// //                     className="form-control form-control-sm"
// //                     onChange={handleInput}
// //                     required
// //                   />
// //                   <span
// //                     className="pass-toggle text-gold fw-bold"
// //                     onClick={() => setShowPass(!showPass)}>
// //                     {showPass ? "HIDE" : "SHOW"}
// //                   </span>
// //                 </div>
// //                 {userRole !== "Admin" && (
// //                   <div className="text-end mb-3">
// //                     <span
// //                       className="text-gold small fw-bold cursor-pointer"
// //                       onClick={() => setView("forgot")}>
// //                       Forgot Password?
// //                     </span>
// //                   </div>
// //                 )}
// //                 <button
// //                   type="submit"
// //                   className="btn bg-blue text-white w-100 fw-bold mb-3"
// //                   disabled={isLoading}>
// //                   {isLoading
// //                     ? "PLEASE WAIT..."
// //                     : `LOG IN AS ${userRole.toUpperCase()}`}
// //                 </button>
// //                 {userRole !== "Admin" && (
// //                   <p className="text-center small">
// //                     New User?{" "}
// //                     <span
// //                       className="text-gold fw-bold cursor-pointer"
// //                       onClick={() => setView("signup")}>
// //                       Create Account
// //                     </span>
// //                   </p>
// //                 )}
// //               </form>
// //             </div>
// //           )}

// //           {/* SIGNUP VIEW */}
// //           {view === "signup" && (
// //             <div className="fade-in">
// //               <h4 className="text-center fw-bold text-blue mb-3">
// //                 Create Account
// //               </h4>
// //               <div className="d-flex justify-content-center gap-2 mb-3">
// //                 <button
// //                   type="button"
// //                   className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === "Client" ? "bg-blue text-white" : "btn-outline-secondary"}`}
// //                   onClick={() => setUserRole("Client")}>
// //                   Client
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === "Attorney" ? "bg-blue text-white" : "btn-outline-secondary"}`}
// //                   onClick={() => setUserRole("Attorney")}>
// //                   Attorney
// //                 </button>
// //               </div>
// //               <form onSubmit={handleSignup}>
// //                 <div className="row g-2 mb-2">
// //                   <div className="col-6">
// //                     <label className="small fw-bold">
// //                       First Name <span className="text-danger">*</span>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="firstName"
// //                       className="form-control form-control-sm"
// //                       onChange={handleInput}
// //                       required
// //                     />
// //                   </div>
// //                   <div className="col-6">
// //                     <label className="small fw-bold">
// //                       Last Name <span className="text-danger">*</span>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="lastName"
// //                       className="form-control form-control-sm"
// //                       onChange={handleInput}
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="mb-2">
// //                   <label className="small fw-bold">
// //                     Email ID <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     className="form-control form-control-sm"
// //                     onChange={handleInput}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="row g-2 mb-2">
// //                   <div className="col-6">
// //                     <label className="small fw-bold">
// //                       Password <span className="text-danger">*</span>
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       className="form-control form-control-sm"
// //                       onChange={handleInput}
// //                       required
// //                     />
// //                   </div>
// //                   <div className="col-6">
// //                     <label className="small fw-bold">
// //                       Confirm <span className="text-danger">*</span>
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="repeatPassword"
// //                       className="form-control form-control-sm"
// //                       onChange={handleInput}
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="mb-3">
// //                   <label className="small fw-bold">
// //                     Security Code <span className="text-danger">*</span>
// //                   </label>
// //                   <div className="d-flex gap-2">
// //                     <div
// //                       className="bg-blue text-white px-3 py-1 rounded small fw-bold cursor-pointer"
// //                       onClick={generateCaptcha}>
// //                       {generatedCaptcha}
// //                     </div>
// //                     <input
// //                       type="text"
// //                       className="form-control form-control-sm"
// //                       placeholder="Enter Code"
// //                       onChange={(e) => setCaptchaInput(e.target.value)}
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <button
// //                   type="submit"
// //                   className="btn bg-blue text-white w-100 fw-bold mb-3"
// //                   disabled={isLoading}>
// //                   REGISTER
// //                 </button>
// //                 <p className="text-center small">
// //                   Has Account?{" "}
// //                   <span
// //                     className="text-gold fw-bold cursor-pointer"
// //                     onClick={() => setView("login")}>
// //                     Sign In
// //                   </span>
// //                 </p>
// //               </form>
// //             </div>
// //           )}

// //           {/* बाकी VIEWS (Verify, Reset, Forgot) आपके पुराने कोड जैसे ही काम करेंगे */}
// //           {view === "verify" && (
// //             <div className="fade-in text-center">
// //               <h4 className="fw-bold text-blue">Verify OTP</h4>
// //               <p className="small text-muted mb-2">
// //                 Enter OTP sent to your email
// //               </p>
// //               <p className="small text-muted mb-4">
// //                 Account:{" "}
// //                 <span className="fw-bold text-primary">{userRole}</span>
// //               </p>
// //               <form
// //                 onSubmit={async (e) => {
// //                   e.preventDefault();
// //                   setIsLoading(true);
// //                   try {
// //                     let result;
// //                     if (userRole === "Admin") {
// //                       result = await adminVerifyOtp(formData.email, otpInput);
// //                     } else {
// //                       result = await verifyOtp({
// //                         email: formData.email,
// //                         otp: otpInput,
// //                       });
// //                     }

// //                     if (result.success || result.message) {
// //                       setView("reset");
// //                       toastService.success(result.message || "OTP verified");
// //                     } else {
// //                       toastService.error(result.message || "Invalid OTP");
// //                     }
// //                   } catch (err) {
// //                     toastService.error(err.message || "Invalid OTP");
// //                   } finally {
// //                     setIsLoading(false);
// //                   }
// //                 }}>
// //                 <input
// //                   type="text"
// //                   className="form-control text-center mb-4 fs-4 fw-bold"
// //                   maxLength="6"
// //                   onChange={(e) => setOtpInput(e.target.value)}
// //                   required
// //                 />
// //                 <button
// //                   type="submit"
// //                   className="btn bg-blue text-white w-100 fw-bold py-2 mb-3"
// //                   disabled={isLoading}>
// //                   VERIFY OTP
// //                 </button>
// //                 <div className="small">
// //                   {canResend ? (
// //                     <span
// //                       className="text-gold fw-bold cursor-pointer"
// //                       onClick={handleForgot}>
// //                       Resend OTP
// //                     </span>
// //                   ) : (
// //                     <span>
// //                       Resend in <b className="text-blue">{timer}s</b>
// //                     </span>
// //                   )}
// //                 </div>
// //               </form>
// //             </div>
// //           )}

// //           {view === "reset" && (
// //             <div className="fade-in">
// //               <h4 className="text-center fw-bold text-blue mb-1">
// //                 New Password
// //               </h4>
// //               <p className="text-center small text-muted mb-4">
// //                 For: <span className="fw-bold text-primary">{userRole}</span>
// //               </p>
// //               <form
// //                 onSubmit={async (e) => {
// //                   e.preventDefault();

// //                   if (formData.newPassword !== formData.confirmPassword) {
// //                     toastService.error("Passwords do not match");
// //                     return;
// //                   }

// //                   setIsLoading(true);
// //                   try {
// //                     let result;
// //                     if (userRole === "Admin") {
// //                       result = await adminResetPassword(
// //                         formData.email,
// //                         formData.newPassword,
// //                         formData.confirmPassword,
// //                       );
// //                     } else {
// //                       result = await resetPassword({
// //                         email: formData.email,
// //                         newPassword: formData.newPassword,
// //                         confirmPassword: formData.confirmPassword,
// //                       });
// //                     }

// //                     if (result.success || result.message) {
// //                       toastService.success(
// //                         result.message || "Password updated successfully!",
// //                       );
// //                       setView("login");
// //                       setFormData({
// //                         ...formData,
// //                         newPassword: "",
// //                         confirmPassword: "",
// //                       });
// //                     } else {
// //                       toastService.error(
// //                         result.message || "Failed to reset password",
// //                       );
// //                     }
// //                   } catch (err) {
// //                     toastService.error(
// //                       err.message || "Failed to reset password",
// //                     );
// //                   } finally {
// //                     setIsLoading(false);
// //                   }
// //                 }}>
// //                 <div className="mb-3 position-relative">
// //                   <label className="small fw-bold">
// //                     New Password <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     type={showNewPass ? "text" : "password"}
// //                     name="newPassword"
// //                     size="sm"
// //                     className="form-control"
// //                     onChange={handleInput}
// //                     required
// //                   />
// //                   <span
// //                     className="pass-toggle text-gold fw-bold"
// //                     onClick={() => setShowNewPass(!showNewPass)}>
// //                     {" "}
// //                     {showNewPass ? "HIDE" : "SHOW"}{" "}
// //                   </span>
// //                 </div>
// //                 <div className="mb-4">
// //                   <label className="small fw-bold">
// //                     Confirm Password <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     type="password"
// //                     name="confirmPassword"
// //                     className="form-control"
// //                     onChange={handleInput}
// //                     required
// //                   />
// //                 </div>
// //                 <button
// //                   type="submit"
// //                   className="btn bg-blue text-white w-100 fw-bold py-2"
// //                   disabled={isLoading}>
// //                   UPDATE PASSWORD
// //                 </button>
// //               </form>
// //             </div>
// //           )}

// //           {view === "forgot" && (
// //             <div className="fade-in">
// //               <h4 className="text-center fw-bold text-blue mb-1">
// //                 Reset Password
// //               </h4>
// //               <p className="text-center small text-muted mb-4">
// //                 For: <span className="fw-bold text-primary">{userRole}</span>
// //               </p>
// //               <form onSubmit={handleForgot}>
// //                 <div className="mb-3">
// //                   <label className="small fw-bold">
// //                     Email ID <span className="text-danger">*</span>
// //                   </label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     className="form-control"
// //                     placeholder="name@example.com"
// //                     onChange={handleInput}
// //                     required
// //                   />
// //                 </div>
// //                 <button
// //                   type="submit"
// //                   className="btn bg-blue text-white w-100 fw-bold py-2"
// //                   disabled={isLoading}>
// //                   SEND OTP
// //                 </button>
// //                 <p className="text-center mt-3 small">
// //                   <span
// //                     className="text-gold fw-bold cursor-pointer"
// //                     onClick={() => setView("login")}>
// //                     Back to Login
// //                   </span>
// //                 </p>
// //               </form>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <style>{`
// //         .bg-blue { background-color: #002147 !important; }
// //         .text-blue { color: #002147 !important; }
// //         .text-gold { color: #EEBB5D !important; }
// //         .auth-card { width: 100%; max-width: 380px; }
// //         .cursor-pointer { cursor: pointer; }
// //         .pass-toggle { position: absolute; right: 10px; top: 32px; font-size: 10px; cursor: pointer; z-index: 10; }
// //         .fade-in { animation: fadeIn 0.4s ease-in; }
// //         @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
// //       `}</style>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   signupUser,
//   loginUser,
//   forgotPassword,
//   verifyOtp,
//   resetPassword,
//   adminLogin,
//   adminForgotPassword,
//   adminVerifyOtp,
//   adminResetPassword,
// } from "../services/authService";
// import { toastService } from "../utils/toast";

// export default function UnifiedAuthPage() {
//   const [view, setView] = useState("login");
//   const [userRole, setUserRole] = useState("Client"); // 'Client', 'Attorney', or 'Admin'
//   const [isLoading, setIsLoading] = useState(false);

//   const [showPass, setShowPass] = useState(false);
//   const [showNewPass, setShowNewPass] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const timerRef = useRef(null);

//   const [generatedCaptcha, setGeneratedCaptcha] = useState("");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [otpInput, setOtpInput] = useState("");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     repeatPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     terms: false,
//   });

//   // ⏱️ OTP Timer Logic
//   useEffect(() => {
//     if (view === "verify" && timer > 0) {
//       timerRef.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//       clearInterval(timerRef.current);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [view, timer]);

//   const startTimer = () => {
//     setTimer(60);
//     setCanResend(false);
//   };

//   // 🔐 Captcha Logic
//   const generateCaptcha = () => {
//     const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     let res = "";
//     for (let i = 0; i < 6; i++)
//       res += chars.charAt(Math.floor(Math.random() * chars.length));
//     setGeneratedCaptcha(res);
//   };

//   useEffect(() => {
//     if (view === "signup") generateCaptcha();
//   }, [view]);

//   const handleInput = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   // 🚀 Login Action
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (userRole === "Admin") {
//       try {
//         const res = await adminLogin(formData.email, formData.password);
//         if (res.success) {
//           toastService.success("Admin Login Successful");
//           window.location.href = "/admin-panel";
//         } else {
//           toastService.error(res.message || "Invalid Admin Credentials");
//         }
//       } catch (err) {
//         toastService.error(err.message || "Login failed");
//       } finally {
//         setIsLoading(false);
//       }
//       return;
//     }

//     try {
//       const res = await loginUser({
//         email: formData.email,
//         password: formData.password,
//       });
//       const token = res.token || res.client?.token;
//       if (res.message === "Login successful" || token) {
//         if (token) localStorage.setItem("token", token);
//         const role = (res.role || res.client?.role || userRole).toLowerCase();
//         localStorage.setItem("role", role);
//         toastService.success("Login Successful");
//         window.location.href =
//           role === "attorney" ? "/attorney-panel" : "/client-panel";
//       }
//     } catch (err) {
//       toastService.error(err.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.repeatPassword)
//       return toastService.error("Passwords do not match");
//     if (captchaInput.toUpperCase() !== generatedCaptcha)
//       return toastService.error("Invalid Captcha");
//     setIsLoading(true);
//     try {
//       await signupUser({
//         ...formData,
//         role: userRole.toLowerCase(),
//         confirmPassword: formData.repeatPassword,
//       });
//       toastService.success("Account created!");
//       setView("login");
//     } catch (err) {
//       toastService.error(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 1. FORGOT PASSWORD (Admin + Client/Attorney)
//   const handleForgot = async (e) => {
//     if (e) e.preventDefault();
//     setIsLoading(true);
//     try {
//       let result;
//       if (userRole === "Admin") {
//         result = await adminForgotPassword(formData.email);
//       } else {
//         result = await forgotPassword({ email: formData.email });
//       }

//       if (result.success || result.message) {
//         setView("verify");
//         startTimer();
//         toastService.success(result.message || "OTP Sent to email");
//       } else {
//         toastService.error(result.message || "Failed to send OTP");
//       }
//     } catch (err) {
//       toastService.error(err.message || "Failed to send OTP");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light-gray">
//       <div
//         className="card shadow-lg border-0 auth-card"
//         style={{ borderTop: "5px solid #002147" }}>
//         <div className="card-body p-4">
//           {/* LOGIN VIEW */}
//           {view === "login" && (
//             <div className="fade-in">
//               <h3 className="text-center fw-bold text-blue mb-1">
//                 Welcome Back
//               </h3>
//               <p className="text-center text-muted small mb-4">
//                 Please sign in to continue
//               </p>

//               <div className="d-flex justify-content-center gap-2 mb-4">
//                 {["Client", "Attorney", "Admin"].map((role) => (
//                   <button
//                     key={role}
//                     type="button"
//                     className={`btn btn-sm px-3 rounded-pill fw-bold ${userRole === role ? "bg-blue text-white" : "btn-outline-secondary"}`}
//                     onClick={() => setUserRole(role)}>
//                     {role}
//                   </button>
//                 ))}
//               </div>

//               <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                   <label className="form-label fw-bold small">
//                     Email ID <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control form-control-sm"
//                     onChange={handleInput}
//                     placeholder={
//                       userRole === "Admin" ? "admin@lawfirm.com" : "Enter email"
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="mb-3 position-relative">
//                   <label className="form-label fw-bold small">
//                     Password <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type={showPass ? "text" : "password"}
//                     name="password"
//                     className="form-control form-control-sm"
//                     onChange={handleInput}
//                     required
//                   />
//                   <span
//                     className="pass-toggle text-gold fw-bold"
//                     onClick={() => setShowPass(!showPass)}>
//                     {showPass ? "HIDE" : "SHOW"}
//                   </span>
//                 </div>

//                 {/* Admin can also forgot password now */}
//                 <div className="text-end mb-3">
//                   <span
//                     className="text-gold small fw-bold cursor-pointer"
//                     onClick={() => setView("forgot")}>
//                     Forgot Password?
//                   </span>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn bg-blue text-white w-100 fw-bold mb-3"
//                   disabled={isLoading}>
//                   {isLoading
//                     ? "PLEASE WAIT..."
//                     : `LOG IN AS ${userRole.toUpperCase()}`}
//                 </button>
//                 {userRole !== "Admin" && (
//                   <p className="text-center small">
//                     New User?{" "}
//                     <span
//                       className="text-gold fw-bold cursor-pointer"
//                       onClick={() => setView("signup")}>
//                       Create Account
//                     </span>
//                   </p>
//                 )}
//               </form>
//             </div>
//           )}

//           {/* SIGNUP VIEW */}
//           {view === "signup" && (
//             <div className="fade-in">
//               <h4 className="text-center fw-bold text-blue mb-3">
//                 Create Account
//               </h4>
//               <div className="d-flex justify-content-center gap-2 mb-3">
//                 <button
//                   type="button"
//                   className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === "Client" ? "bg-blue text-white" : "btn-outline-secondary"}`}
//                   onClick={() => setUserRole("Client")}>
//                   Client
//                 </button>
//                 <button
//                   type="button"
//                   className={`btn btn-sm px-4 rounded-pill fw-bold ${userRole === "Attorney" ? "bg-blue text-white" : "btn-outline-secondary"}`}
//                   onClick={() => setUserRole("Attorney")}>
//                   Attorney
//                 </button>
//               </div>
//               <form onSubmit={handleSignup}>
//                 <div className="row g-2 mb-2">
//                   <div className="col-6">
//                     <label className="small fw-bold">First Name *</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       className="form-control form-control-sm"
//                       onChange={handleInput}
//                       required
//                     />
//                   </div>
//                   <div className="col-6">
//                     <label className="small fw-bold">Last Name *</label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       className="form-control form-control-sm"
//                       onChange={handleInput}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-2">
//                   <label className="small fw-bold">Email ID *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control form-control-sm"
//                     onChange={handleInput}
//                     required
//                   />
//                 </div>
//                 <div className="row g-2 mb-2">
//                   <div className="col-6">
//                     <label className="small fw-bold">Password *</label>
//                     <input
//                       type="password"
//                       name="password"
//                       className="form-control form-control-sm"
//                       onChange={handleInput}
//                       required
//                     />
//                   </div>
//                   <div className="col-6">
//                     <label className="small fw-bold">Confirm *</label>
//                     <input
//                       type="password"
//                       name="repeatPassword"
//                       className="form-control form-control-sm"
//                       onChange={handleInput}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="small fw-bold">Security Code *</label>
//                   <div className="d-flex gap-2">
//                     <div
//                       className="bg-blue text-white px-3 py-1 rounded small fw-bold cursor-pointer"
//                       onClick={generateCaptcha}>
//                       {generatedCaptcha}
//                     </div>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       placeholder="Enter Code"
//                       onChange={(e) => setCaptchaInput(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn bg-blue text-white w-100 fw-bold mb-3"
//                   disabled={isLoading}>
//                   REGISTER
//                 </button>
//                 <p className="text-center small">
//                   Has Account?{" "}
//                   <span
//                     className="text-gold fw-bold cursor-pointer"
//                     onClick={() => setView("login")}>
//                     Sign In
//                   </span>
//                 </p>
//               </form>
//             </div>
//           )}

//           {/* 2. VERIFY OTP VIEW (Updated for Admin) */}
//           {view === "verify" && (
//             <div className="fade-in text-center">
//               <h4 className="fw-bold text-blue">Verify OTP</h4>
//               <p className="small text-muted mb-2">
//                 Enter OTP sent to your email
//               </p>
//               <p className="small text-muted mb-4">
//                 Account:{" "}
//                 <span className="fw-bold text-primary">{userRole}</span>
//               </p>
//               <form
//                 onSubmit={async (e) => {
//                   e.preventDefault();
//                   setIsLoading(true);
//                   try {
//                     let result;
//                     if (userRole === "Admin") {
//                       result = await adminVerifyOtp(formData.email, otpInput);
//                     } else {
//                       result = await verifyOtp({
//                         email: formData.email,
//                         otp: otpInput,
//                       });
//                     }

//                     if (result.success || result.message) {
//                       setView("reset");
//                       toastService.success(result.message || "OTP verified");
//                     } else {
//                       toastService.error(result.message || "Invalid OTP");
//                     }
//                   } catch (err) {
//                     toastService.error(err.message || "Invalid OTP");
//                   } finally {
//                     setIsLoading(false);
//                   }
//                 }}>
//                 <input
//                   type="text"
//                   className="form-control text-center mb-4 fs-4 fw-bold"
//                   maxLength="6"
//                   onChange={(e) => setOtpInput(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="btn bg-blue text-white w-100 fw-bold py-2 mb-3"
//                   disabled={isLoading}>
//                   {isLoading ? "VERIFYING..." : "VERIFY OTP"}
//                 </button>
//                 <div className="small">
//                   {canResend ? (
//                     <span
//                       className="text-gold fw-bold cursor-pointer"
//                       onClick={handleForgot}>
//                       Resend OTP
//                     </span>
//                   ) : (
//                     <span>
//                       Resend in <b className="text-blue">{timer}s</b>
//                     </span>
//                   )}
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* 3. RESET PASSWORD VIEW (Updated for Admin) */}
//           {view === "reset" && (
//             <div className="fade-in">
//               <h4 className="text-center fw-bold text-blue mb-1">
//                 New Password
//               </h4>
//               <p className="text-center small text-muted mb-4">
//                 For: <span className="fw-bold text-primary">{userRole}</span>
//               </p>
//               <form
//                 onSubmit={async (e) => {
//                   e.preventDefault();
//                   if (formData.newPassword !== formData.confirmPassword) {
//                     toastService.error("Passwords do not match");
//                     return;
//                   }
//                   setIsLoading(true);
//                   try {
//                     let result;
//                     if (userRole === "Admin") {
//                       result = await adminResetPassword(
//                         formData.email,
//                         formData.newPassword,
//                         formData.confirmPassword,
//                       );
//                     } else {
//                       result = await resetPassword({
//                         email: formData.email,
//                         newPassword: formData.newPassword,
//                         confirmPassword: formData.confirmPassword,
//                       });
//                     }

//                     if (result.success || result.message) {
//                       toastService.success(
//                         result.message || "Password updated successfully!",
//                       );
//                       setView("login");
//                     } else {
//                       toastService.error(
//                         result.message || "Failed to reset password",
//                       );
//                     }
//                   } catch (err) {
//                     toastService.error(
//                       err.message || "Failed to reset password",
//                     );
//                   } finally {
//                     setIsLoading(false);
//                   }
//                 }}>
//                 <div className="mb-3 position-relative">
//                   <label className="small fw-bold">New Password *</label>
//                   <input
//                     type={showNewPass ? "text" : "password"}
//                     name="newPassword"
//                     size="sm"
//                     className="form-control"
//                     onChange={handleInput}
//                     required
//                   />
//                   <span
//                     className="pass-toggle text-gold fw-bold"
//                     onClick={() => setShowNewPass(!showNewPass)}>
//                     {" "}
//                     {showNewPass ? "HIDE" : "SHOW"}{" "}
//                   </span>
//                 </div>
//                 <div className="mb-4">
//                   <label className="small fw-bold">Confirm Password *</label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     className="form-control"
//                     onChange={handleInput}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn bg-blue text-white w-100 fw-bold py-2"
//                   disabled={isLoading}>
//                   {isLoading ? "UPDATING..." : "UPDATE PASSWORD"}
//                 </button>
//               </form>
//             </div>
//           )}

//           {/* FORGOT VIEW */}
//           {view === "forgot" && (
//             <div className="fade-in">
//               <h4 className="text-center fw-bold text-blue mb-1">
//                 Reset Password
//               </h4>
//               <p className="text-center small text-muted mb-4">
//                 For: <span className="fw-bold text-primary">{userRole}</span>
//               </p>
//               <form onSubmit={handleForgot}>
//                 <div className="mb-3">
//                   <label className="small fw-bold">Email ID *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="name@example.com"
//                     onChange={handleInput}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn bg-blue text-white w-100 fw-bold py-2"
//                   disabled={isLoading}>
//                   {isLoading ? "SENDING..." : "SEND OTP"}
//                 </button>
//                 <p className="text-center mt-3 small">
//                   <span
//                     className="text-gold fw-bold cursor-pointer"
//                     onClick={() => setView("login")}>
//                     Back to Login
//                   </span>
//                 </p>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         .bg-blue { background-color: #002147 !important; }
//         .text-blue { color: #002147 !important; }
//         .text-gold { color: #EEBB5D !important; }
//         .auth-card { width: 100%; max-width: 380px; }
//         .cursor-pointer { cursor: pointer; }
//         .pass-toggle { position: absolute; right: 10px; top: 32px; font-size: 10px; cursor: pointer; z-index: 10; }
//         .fade-in { animation: fadeIn 0.4s ease-in; }
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import {
  signupUser,
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
  const [userRole, setUserRole] = useState("Client"); // Signup ke liye use hoga
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
    terms: false,
  });

  // ⏱️ OTP Timer
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

  // 🔐 Captcha
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
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // 🚀 Smart Login Action (Client/Attorney/Admin automatically detect karega)
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Pehle normal user login try karo
      let res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (res.success || res.token || res.client?.token) {
        handleLoginSuccess(res);
        return;
      }
    } catch (err) {
      // 2. Agar user login fail hota hai, toh Admin login try karo
      try {
        let adminRes = await adminLogin(formData.email, formData.password);
        if (adminRes.success) {
          localStorage.setItem("token", adminRes.data?.token || "admin-token");
          localStorage.setItem("role", "admin");
          toastService.success("Admin Login Successful");
          window.location.href = "/admin-panel";
          return;
        }
      } catch (adminErr) {
        toastService.error("Invalid Email or Password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (res) => {
    const token = res.token || res.client?.token;
    if (token) localStorage.setItem("token", token);

    const role = (res.role || res.client?.role || "client").toLowerCase();
    localStorage.setItem("role", role);

    toastService.success("Login Successful");
    if (role === "admin") window.location.href = "/admin-panel";
    else if (role === "attorney") window.location.href = "/attorney-panel";
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
      await signupUser({
        ...formData,
        role: userRole.toLowerCase(),
        confirmPassword: formData.repeatPassword,
      });
      toastService.success("Account created!");
      setView("login");
    } catch (err) {
      toastService.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD
  const handleForgot = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      // Pehle client/attorney try karega
      let result = await forgotPassword({ email: formData.email });
      if (result.success) {
        setUserRole("User");
        setView("verify");
        startTimer();
        toastService.success("OTP Sent to email");
      } else {
        // Fail hone par admin try karega
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
      toastService.error("Failed to process request");
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
          {/* LOGIN VIEW */}
          {view === "login" && (
            <div className="fade-in">
              <h3 className="text-center fw-bold text-blue mb-1">
                Welcome Back
              </h3>
              <p className="text-center text-muted small mb-4">
                Please sign in to continue
              </p>

              {/* Role selection buttons removed from here as requested */}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    Email ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm"
                    onChange={handleInput}
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label className="form-label fw-bold small">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    className="form-control form-control-sm"
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
                  {isLoading ? "PLEASE WAIT..." : "LOG IN"}
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

          {/* SIGNUP VIEW (Role selection buttons kept here) */}
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
                      className="form-control form-control-sm"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
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
                      className="form-control form-control-sm"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold">Confirm *</label>
                    <input
                      type="password"
                      name="repeatPassword"
                      className="form-control form-control-sm"
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
                      className="form-control form-control-sm"
                      placeholder="Enter Code"
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

          {/* VERIFY OTP VIEW */}
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
                  {isLoading ? "VERIFYING..." : "VERIFY OTP"}
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

          {/* RESET PASSWORD VIEW */}
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
                      toastService.success("Password updated successfully!");
                      setView("login");
                    } else {
                      toastService.error("Failed to reset password");
                    }
                  } catch (err) {
                    toastService.error("Failed to reset password");
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
                    {" "}
                    {showNewPass ? "HIDE" : "SHOW"}{" "}
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
                  {isLoading ? "UPDATING..." : "UPDATE PASSWORD"}
                </button>
              </form>
            </div>
          )}

          {/* FORGOT VIEW */}
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
                  {isLoading ? "SENDING..." : "SEND OTP"}
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