import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoMailOutline, IoArrowForward } from 'react-icons/io5';
import Logo from '../assets/un_logo_gold.svg';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { sendForgotPasswordOtp } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendForgotPasswordOtp(email);
      setSuccess('A password reset code has been sent to your email.');
      localStorage.setItem('pendingResetEmail', email.toLowerCase());
      setTimeout(() => {
        navigate('/reset-password');
      }, 2000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 relative overflow-hidden bg-[#0c0d12]">
      <div className="absolute inset-0 bg-radial-at-t from-[#DCA843]/5 via-[#0c0d12]/60 to-[#0c0d12] pointer-events-none" />

      <div className="w-full max-w-md bg-[#09090b]/85 backdrop-blur-md border border-[#DCA843]/20 shadow-2xl p-8 rounded-lg relative z-10 animate-fadeIn">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="CPS PRIME MUN Logo" className="h-16 w-16 mb-2 animate-pulseSlow" />
          <h2 className="font-cinzel text-xl font-bold tracking-wider text-[#DCA843] uppercase text-center">
            CPS PRIME MUN 5.O
          </h2>
          <p className="text-[10px] tracking-widest text-[#BABABA]/60 font-cinzel uppercase mt-0.5">
            Conquer From Within
          </p>
        </div>

        <h3 className="font-cinzel text-base tracking-wider text-white uppercase font-bold text-center mb-4 pb-2 border-b border-[#DCA843]/10">
          Forgot Password
        </h3>

        <p className="text-center text-xs text-[#BABABA]/80 mb-6 font-allotrix-font-secondary">
          Enter your registered email below, and we will email you an OTP to reset your password.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs p-3 rounded mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#DCA843]/50">
                <IoMailOutline className="text-sm" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value.trim().toLowerCase()); setError(''); }}
                className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCA843] transition-colors"
                placeholder="name@domain.com"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-2.5 rounded hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? 'Sending Code...' : 'Get Verification Code'} <IoArrowForward className="text-sm" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#BABABA]/60">
          Remember password?{' '}
          <Link to="/login" className="text-[#DCA843] hover:text-[#FFE082] transition-colors font-bold underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
