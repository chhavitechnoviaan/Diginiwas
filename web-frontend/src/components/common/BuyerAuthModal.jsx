// import React, { useEffect, useMemo, useState } from "react";
// import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, Mail, Phone, UserPlus, X } from "lucide-react";
// import { sendBuyerOtp, resendBuyerOtp, verifyBuyerOtp, registerBuyer, loginBuyer, clearBuyerOtpSession } from "../../services/buyerAuthService";

// const tabs = [
//   { id: "phone", label: "Phone + OTP" },
//   { id: "email", label: "Email + Password" },
// ];

// const cleanPhone = (value) => value.replace(/\D/g, "").slice(0, 10);

// export default function BuyerAuthModal({ onClose, onBack, onSuccess }) {
//   const [mode, setMode] = useState("login");
//   const [method, setMethod] = useState("phone");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);
//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const [otpVerificationToken, setOtpVerificationToken] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => () => {
//     clearBuyerOtpSession();
//   }, []);

//   useEffect(() => {
//     if (!otpTimer) return undefined;
//     const timer = window.setInterval(() => {
//       setOtpTimer((prev) => Math.max(prev - 1, 0));
//     }, 1000);
//     return () => window.clearInterval(timer);
//   }, [otpTimer]);

//   useEffect(() => {
//     setError("");
//     setMessage("");
//   }, [mode, method]);

//   const title = useMemo(
//     () => (mode === "login" ? "Welcome back, Buyer" : "Create your Buyer account"),
//     [mode]
//   );

//   const submitButtonLabel = useMemo(() => {
//     if (loading) return "Please wait...";
//     if (method === "phone") return otpSent ? "Verify OTP" : "Send OTP";
//     return mode === "login" ? "Login" : "Create Account";
//   }, [loading, method, mode, otpSent]);

//   const submit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       setLoading(true);

//       if (method === "phone") {
//         if (phone.length !== 10) {
//           throw new Error("Please enter a valid 10-digit mobile number.");
//         }

//         if (!otpSent) {
//           await sendBuyerOtp(phone);
//           setOtpSent(true);
//           setOtpTimer(30);
//           setMessage("OTP sent by Firebase. Please check your phone.");
//           return;
//         }

//         if (otp.length !== 6) {
//           throw new Error("Please enter the 6-digit OTP.");
//         }

//         await verifyBuyerOtp(otp);
//         onSuccess?.();
//         setMessage("Buyer login successful.");
//         window.setTimeout(onClose, 350);
//         return;
//       }

//       if (!email || !email.includes("@")) {
//         throw new Error("Please enter a valid email address.");
//       }

//       if (!password) {
//         throw new Error("Please enter your password.");
//       }

//       if (mode === "register") {
//         if (!name.trim()) throw new Error("Please enter your name.");
//         if (password.length < 6) throw new Error("Password must be at least 6 characters.");
//         if (password !== confirmPassword) throw new Error("Passwords do not match.");

//         await registerBuyer({
//           name: name.trim(),
//           email: email.trim(),
//           password,
//           phone: phone || undefined,
//         });

//         onSuccess?.();
//         setMessage("Buyer account created successfully.");
//         window.setTimeout(onClose, 500);
//         return;
//       }

//       await loginBuyer({ email: email.trim(), password });
//       onSuccess?.();
//       setMessage("Buyer login successful.");
//       window.setTimeout(onClose, 500);
//     } catch (err) {
//       const apiMessage =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         err?.message ||
//         "Something went wrong. Please try again.";
//       setError(apiMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendOtp = async () => {
//     if (!phone || otpTimer > 0) return;
//     try {
//       setLoading(true);
//       setError("");
//       await resendBuyerOtp(phone);
//       setOtpTimer(30);
//       setMessage("A new OTP has been sent.");
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || err?.message || "Unable to resend OTP."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangeMethod = (nextMethod) => {
//     setMethod(nextMethod);
//     if (nextMethod === "phone") {
//       setMode("login");
//     }
//     setOtpSent(false);
//     setOtp("");
//     setPhoneVerified(false);
//     setOtpVerificationToken("");
//     setError("");
//     setMessage("");
//   };

//   return (
//     <div className="fixed inset-0 z-[10040] flex items-center justify-center bg-[#061520]/80 p-4 backdrop-blur-md">
//       <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/15 bg-white shadow-2xl">
//         <div className="bg-[#183247] px-5 pb-6 pt-5 text-white sm:px-8 sm:pb-7">
//           <div className="flex items-center justify-between gap-3">
//             <button
//               type="button"
//               onClick={onBack}
//               className="inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-[#33cc99]"
//             >
//               <ArrowLeft size={15} />
//               Back
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
//               aria-label="Close"
//             >
//               <X size={17} />
//             </button>
//           </div>

//           <div className="mt-5 flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#33cc99]/15 text-[#33cc99] ring-1 ring-[#33cc99]/20">
//               <UserPlus size={23} />
//             </div>
//             <div>
//               <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#33cc99]">Buyer Access</p>
//               <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
//             </div>
//           </div>
//         </div>

//         <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
//           {method === "email" ? (
//             <div className="mb-5 flex rounded-xl bg-[#F2F7F8] p-1">
//               {[
//                 { id: "login", label: "Login" },
//                 { id: "register", label: "Create Account" },
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   type="button"
//                   onClick={() => {
//                     setMode(item.id);
//                     setOtpSent(false);
//                     setOtp("");
//                     setPhoneVerified(false);
//                     setOtpVerificationToken("");
//                   }}
//                   className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-extrabold transition ${
//                     mode === item.id
//                       ? "bg-white text-[#0F2E46] shadow-sm"
//                       : "text-[#78909C] hover:text-[#0F2E46]"
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           ) : null}

//           <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-[#F7FAFB] p-1">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => handleChangeMethod(tab.id)}
//                 className={`rounded-lg px-3 py-2.5 text-xs font-extrabold transition ${
//                   method === tab.id
//                     ? "bg-[#0F2E46] text-white shadow-sm"
//                     : "text-[#607985] hover:text-[#0F2E46]"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <div id="buyer-recaptcha-container" className="mb-3 flex min-h-[78px] justify-center overflow-visible" aria-label="Phone verification security check" />
//           <form onSubmit={submit} className="space-y-4">
//             {mode === "register" && (
//               <label className="block">
//                 <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Full Name</span>
//                 <input
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your name"
//                   className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
//                 />
//               </label>
//             )}

//             {method === "phone" ? (
//               <>
//                 <label className="block">
//                   <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Mobile Number</span>
//                   <div className="relative">
//                     <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33cc99]" />
//                     <input
//                       value={phone}
//                       onChange={(e) => !phoneVerified && setPhone(cleanPhone(e.target.value))}
//                       inputMode="numeric"
//                       maxLength={10}
//                       readOnly={phoneVerified}
//                       placeholder="10-digit mobile number"
//                       className={`h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] pl-11 pr-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10 ${phoneVerified ? "cursor-not-allowed bg-[#F2F7F8]" : ""}`}
//                     />
//                   </div>
//                 </label>

//                 {mode === "register" && phoneVerified && (
//                   <label className="block">
//                     <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Email (Optional)</span>
//                     <div className="relative">
//                       <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33cc99]" />
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="you@example.com"
//                         className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] pl-11 pr-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
//                       />
//                     </div>
//                   </label>
//                 )}

//                 {otpSent && (
//                   <label className="block">
//                     <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">OTP</span>
//                     <input
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                       inputMode="numeric"
//                       maxLength={6}
//                       placeholder="Enter 6-digit OTP"
//                       className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 text-center text-lg font-black tracking-[0.3em] text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
//                     />
//                     <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[#78909C]">
//                       <span>{otpTimer > 0 ? `Resend in ${otpTimer}s` : "Didn't receive the OTP?"}</span>
//                       <button
//                         type="button"
//                         onClick={resendOtp}
//                         disabled={otpTimer > 0 || loading}
//                         className="font-extrabold text-[#20A980] disabled:cursor-not-allowed disabled:opacity-40"
//                       >
//                         Resend OTP
//                       </button>
//                     </div>
//                   </label>
//                 )}
//               </>
//             ) : (
//               <>
//                 <label className="block">
//                   <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Email</span>
//                   <div className="relative">
//                     <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33cc99]" />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] pl-11 pr-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
//                     />
//                   </div>
//                 </label>

//                 <label className="block">
//                   <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Password</span>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                       className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 pr-11 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78909C]"
//                     >
//                       {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
//                     </button>
//                   </div>
//                 </label>

//                 {mode === "register" && (
//                   <label className="block">
//                     <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Confirm Password</span>
//                     <input
//                       type="password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       placeholder="Confirm your password"
//                       className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
//                     />
//                   </label>
//                 )}
//               </>
//             )}

//             {error && (
//               <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-bold text-red-600">
//                 {error}
//               </div>
//             )}

//             {message && !error && (
//               <div className="flex items-start gap-2 rounded-xl border border-[#BFEFE0] bg-[#F0FBF8] px-3.5 py-3 text-xs font-bold text-[#188B6D]">
//                 <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
//                 <span>{message}</span>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F2E46] px-4 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#153C59] disabled:cursor-not-allowed disabled:opacity-70"
//             >
//               {loading && <Loader2 size={16} className="animate-spin" />}
//               {submitButtonLabel}
//             </button>
//           </form>

//           <p className="mt-5 text-center text-[11px] leading-5 text-[#7B8E97]">
//             By continuing, you agree to DigiNiwas Terms of Service and Privacy Policy.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, Mail, Phone, UserPlus, X } from "lucide-react";
import { sendBuyerOtp, resendBuyerOtp, verifyBuyerOtp, registerBuyer, loginBuyer, clearBuyerOtpSession } from "../../services/buyerAuthService";

const tabs = [
  { id: "phone", label: "Phone + OTP" },
  { id: "email", label: "Email + Password" },
];

const cleanPhone = (value) => value.replace(/\D/g, "").slice(0, 10);

export default function BuyerAuthModal({ onClose, onBack, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [method, setMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpVerificationToken, setOtpVerificationToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => () => {
    clearBuyerOtpSession();
  }, []);

  useEffect(() => {
    if (!otpTimer) return undefined;
    const timer = window.setInterval(() => {
      setOtpTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [otpTimer]);

  useEffect(() => {
    setError("");
    setMessage("");
  }, [mode, method]);

  const title = useMemo(
    () => (mode === "login" ? "Welcome back, Buyer" : "Create your Buyer account"),
    [mode]
  );

  const submitButtonLabel = useMemo(() => {
    if (loading) return "Please wait...";
    if (method === "phone") return otpSent ? "Verify OTP" : "Send OTP";
    return mode === "login" ? "Login" : "Create Account";
  }, [loading, method, mode, otpSent]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      if (method === "phone") {
        if (phone.length !== 10) {
          throw new Error("Please enter a valid 10-digit mobile number.");
        }

        if (!otpSent) {
          await sendBuyerOtp(phone);
          setOtpSent(true);
          setOtpTimer(30);
          setMessage("OTP sent by Firebase. Please check your phone.");
          return;
        }

        if (otp.length !== 6) {
          throw new Error("Please enter the 6-digit OTP.");
        }

        await verifyBuyerOtp(otp);
        onSuccess?.();
        setMessage("Buyer login successful.");
        window.setTimeout(onClose, 350);
        return;
      }

      if (!email || !email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }

      if (!password) {
        throw new Error("Please enter your password.");
      }

      if (mode === "register") {
        if (!name.trim()) throw new Error("Please enter your name.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        if (password !== confirmPassword) throw new Error("Passwords do not match.");

        await registerBuyer({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone || undefined,
        });

        onSuccess?.();
        setMessage("Buyer account created successfully.");
        window.setTimeout(onClose, 500);
        return;
      }

      await loginBuyer({ email: email.trim(), password });
      onSuccess?.();
      setMessage("Buyer login successful.");
      window.setTimeout(onClose, 500);
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please try again.";
      setError(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!phone || otpTimer > 0) return;
    try {
      setLoading(true);
      setError("");
      await resendBuyerOtp(phone);
      setOtpTimer(30);
      setMessage("A new OTP has been sent.");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Unable to resend OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeMethod = (nextMethod) => {
    setMethod(nextMethod);
    if (nextMethod === "phone") {
      setMode("login");
    }
    setOtpSent(false);
    setOtp("");
    setPhoneVerified(false);
    setOtpVerificationToken("");
    setError("");
    setMessage("");
  };

  return (
    <div className="fixed inset-0 z-[10040] flex items-center justify-center bg-[#061520]/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/15 bg-white shadow-2xl">
        <div className="bg-[#183247] px-5 pb-6 pt-5 text-white sm:px-8 sm:pb-7">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-white/65 transition hover:text-[#33cc99]"
            >
              <ArrowLeft size={15} />
              Back
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#33cc99]/15 text-[#33cc99] ring-1 ring-[#33cc99]/20">
              <UserPlus size={23} />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#33cc99]">Buyer Access</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
            </div>
          </div>
        </div>

        <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
          {method === "email" ? (
            <div className="mb-5 flex rounded-xl bg-[#F2F7F8] p-1">
              {[
                { id: "login", label: "Login" },
                { id: "register", label: "Create Account" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMode(item.id);
                    setOtpSent(false);
                    setOtp("");
                    setPhoneVerified(false);
                    setOtpVerificationToken("");
                  }}
                  className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-extrabold transition ${
                    mode === item.id
                      ? "bg-white text-[#0F2E46] shadow-sm"
                      : "text-[#78909C] hover:text-[#0F2E46]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-[#F7FAFB] p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleChangeMethod(tab.id)}
                className={`rounded-lg px-3 py-2.5 text-xs font-extrabold transition ${
                  method === tab.id
                    ? "bg-[#0F2E46] text-white shadow-sm"
                    : "text-[#607985] hover:text-[#0F2E46]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div id="buyer-recaptcha-container" className="mb-3 flex min-h-[78px] justify-center overflow-visible" aria-label="Phone verification security check" />
          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Full Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
                />
              </label>
            )}

            {method === "phone" ? (
              <>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Mobile Number</span>
                  <div className="relative">
                    <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33cc99]" />
                    <input
                      value={phone}
                      onChange={(e) => !phoneVerified && setPhone(cleanPhone(e.target.value))}
                      inputMode="numeric"
                      maxLength={10}
                      readOnly={phoneVerified}
                      placeholder="10-digit mobile number"
                      className={`h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] pl-11 pr-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10 ${phoneVerified ? "cursor-not-allowed bg-[#F2F7F8]" : ""}`}
                    />
                  </div>
                </label>

                {mode === "register" && phoneVerified && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Email (Optional)</span>
                    <div className="relative">
                      <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33cc99]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] pl-11 pr-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
                      />
                    </div>
                  </label>
                )}

                {otpSent && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">OTP</span>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 text-center text-lg font-black tracking-[0.3em] text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
                    />
                    <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[#78909C]">
                      <span>{otpTimer > 0 ? `Resend in ${otpTimer}s` : "Didn't receive the OTP?"}</span>
                      <button
                        type="button"
                        onClick={resendOtp}
                        disabled={otpTimer > 0 || loading}
                        className="font-extrabold text-[#20A980] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </label>
                )}
              </>
            ) : (
              <>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Email</span>
                  <div className="relative">
                    <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33cc99]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] pl-11 pr-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 pr-11 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78909C]"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </label>

                {mode === "register" && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#5A7481]">Confirm Password</span>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="h-12 w-full rounded-xl border border-[#D9E4E7] bg-[#FBFDFD] px-4 text-sm font-semibold text-[#183247] outline-none focus:border-[#33cc99] focus:ring-4 focus:ring-[#33cc99]/10"
                    />
                  </label>
                )}
              </>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            {message && !error && (
              <div className="flex items-start gap-2 rounded-xl border border-[#BFEFE0] bg-[#F0FBF8] px-3.5 py-3 text-xs font-bold text-[#188B6D]">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F2E46] px-4 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#153C59] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {submitButtonLabel}
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] leading-5 text-[#7B8E97]">
            By continuing, you agree to DigiNiwas Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
