import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import karein
import Swal from 'sweetalert2';
import Logo from "../assets/images/diginiwas.webp"; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // 2. Navigate function initialize karein

  // ─── THEME MATCHED SWEETALERT CONFIG ───
  const showCustomAlert = (title, text, icon, callback) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      background: 'rgba(15, 23, 42, 0.85)',
      color: '#f8fafc',
      backdrop: 'rgba(4, 47, 46, 0.4) backdrop-blur-sm',
      confirmButtonText: 'Continue',
      confirmButtonColor: '#10b981',
      customClass: {
        popup: 'border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md font-sans',
        title: 'text-xl font-bold tracking-tight',
        htmlContainer: 'text-sm text-gray-300',
        confirmButton: 'px-5 py-2.5 rounded-xl text-slate-950 font-bold transition transform active:scale-95'
      },
      buttonsStyling: true,
    }).then((result) => {
      // Jab user alert ke 'Continue' button par click karega tab callback run hoga
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Token store karna (LocalStorage me)
      localStorage.setItem('token', data.token);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || {}));
      
      // Success Popup aur uske baad dashboard par redirect
      showCustomAlert(
        'Aapka Swagat Hai!', 
        'Login successfully completed.', 
        'success',
        () => {
        //   navigate('/dashboard'); 
          navigate('/dashboard', { replace: true });// 3. SweetAlert close hone par yahan route badlega
        }
      );

    } catch (err) {
      setError(err.message);
      showCustomAlert('Authentication Failed', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#042f2e] p-4 relative overflow-hidden font-sans">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 z-10 text-white">
        
        {/* Brand Logo & Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col justify-center items-center mb-4">
            
            <div className="h-20 w-auto flex items-center justify-center p-2 rounded-xl bg-slate-900/20 backdrop-blur-sm border border-white/5 shadow-inner mb-3">
              <img
                src={Logo}
                alt="DigiNiwas Logo"
                className="h-full w-auto object-contain drop-shadow-[0_4px_10px_rgba(16,185,129,0.25)]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden flex-col items-center">
                <span className="text-xl font-black text-emerald-400 tracking-wider">DIGINIWAS</span>
              </div>
            </div>

            <p className="text-xs text-emerald-400 tracking-widest uppercase font-bold">
              Apna Shahr, Apna Platform
            </p>
          </div>
          
          <h2 className="text-lg font-medium text-gray-200 mt-2">
            Ghar ki Talaash yahan shuru karein
          </h2>
        </div>

        {/* Error Alert Panel */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-200 text-sm rounded-xl text-center backdrop-blur-sm animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., rahul@example.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition text-white placeholder-gray-500"
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <a href="#forgot" className="text-xs text-emerald-400 hover:underline transition">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition text-white placeholder-gray-500"
              required
              disabled={loading}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded bg-white/5 border-white/20 text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
              disabled={loading}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300 select-none cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl transition duration-300 shadow-lg shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>


      </div>
    </div>
  );
};

export default LoginPage;
