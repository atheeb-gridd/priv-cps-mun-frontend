import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoShieldCheckmarkOutline, IoRefreshOutline } from 'react-icons/io5';
import Logo from '../assets/un_logo_gold.svg';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { verifyEmailOtp, resendOtp } = useAuth();
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  
  // Timer state (10 minutes = 600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);
  const timerRef = useRef(null);
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const savedEmail = localStorage.getItem('pendingVerifyEmail');
    if (!savedEmail) {
      navigate('/register');
    } else {
      setEmail(savedEmail);
    }

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleInputChange = (index, value) => {
    // Only accept numeric inputs
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setErrors('');

    // Advance to next input box
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move back on backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setErrors('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setErrors('');
    setSuccessMsg('');

    try {
      const response = await verifyEmailOtp(email, fullCode);
      setSuccessMsg('Email verified successfully! Logging you in...');
      // Clear pending state
      localStorage.removeItem('pendingVerifyEmail');
      setTimeout(() => {
        if (response && response.user && (response.user.role === 'Admin' || response.user.role === 'SuperAdmin')) {
          navigate('/dashboard');
        } else {
          navigate('/registration-form');
        }
      }, 2000);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return; // Prevent resend if timer is still running
    setResending(true);
    setErrors('');
    setSuccessMsg('');

    try {
      await resendOtp(email);
      setSuccessMsg('A new verification code has been sent to your email.');
      setTimeLeft(600); // Reset timer
      setCode(['', '', '', '', '', '']);
      inputRefs[0].current.focus();
    } catch (error) {
      setErrors(error);
    } finally {
      setResending(false);
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
          Email Verification
        </h3>

        <p className="text-center text-xs text-[#BABABA]/80 mb-6 font-allotrix-font-secondary">
          We have sent a verification code to <br />
          <span className="text-[#DCA843] font-bold font-allotrix-font-secondary">{email}</span>
        </p>

        {errors && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded mb-4 text-center">
            {errors}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs p-3 rounded mb-4 text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          
          {/* OTP Digit inputs */}
          <div className="flex justify-between gap-2 max-w-[320px] mx-auto w-full">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                ref={inputRefs[idx]}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-10 h-12 bg-[#121214]/65 border border-[#DCA843]/20 rounded text-center text-lg text-white font-bold focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]/30 transition-all"
              />
            ))}
          </div>

          {/* Countdown timer */}
          <div className="text-center text-xs font-allotrix-font-secondary text-[#BABABA]/60">
            {timeLeft > 0 ? (
              <span>Verification code expires in: <span className="text-white font-bold">{formatTime(timeLeft)}</span></span>
            ) : (
              <span className="text-red-400">Code expired. Please resend.</span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || resending}
              className={`flex-1 flex items-center justify-center gap-1.5 border font-cinzel text-[10px] font-bold py-2.5 rounded transition-all uppercase tracking-widest ${
                timeLeft > 0
                  ? 'border-[#DCA843]/15 text-[#DCA843]/20 cursor-not-allowed'
                  : 'border-[#DCA843]/60 text-[#DCA843] hover:bg-[#DCA843] hover:text-black'
              }`}
            >
              <IoRefreshOutline className="text-xs" /> {resending ? 'Resending...' : 'Resend OTP'}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-[10px] font-bold py-2.5 rounded hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest disabled:opacity-50"
            >
              Verify <IoShieldCheckmarkOutline className="text-xs" />
            </button>
          </div>

        </form>

        <div className="mt-8 text-center text-xs text-[#BABABA]/60">
          Want to change email?{' '}
          <Link to="/register" className="text-[#DCA843] hover:text-[#FFE082] transition-colors font-bold underline">
            Go Back
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;
