import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoArrowForward, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { z } from 'zod';
import Logo from '../assets/un_logo_gold.svg';

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
  .refine((val) => /[a-z]/.test(val), 'Password must contain at least one lowercase letter')
  .refine((val) => /[0-9]/.test(val), 'Password must contain at least one number')
  .refine((val) => /[^A-Za-z0-9]/.test(val), 'Password must contain at least one special character');

const resetSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  newPassword: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPasswordWithOtp } = useAuth();
  
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('pendingResetEmail');
    if (!savedEmail) {
      navigate('/forgot-password');
    } else {
      setEmail(savedEmail);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setServerError('');
    setSuccessMsg('');

    const validation = resetSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const formattedErrors = {};
      Object.keys(fieldErrors).forEach((key) => {
        formattedErrors[key] = fieldErrors[key][0];
      });
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      await resetPasswordWithOtp(
        email,
        formData.otp,
        formData.newPassword,
        formData.confirmPassword
      );
      
      setSuccessMsg('Password updated successfully! Redirecting to login...');
      localStorage.removeItem('pendingResetEmail');
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      setServerError(err);
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
          Reset Password
        </h3>

        <p className="text-center text-xs text-[#BABABA]/80 mb-6 font-allotrix-font-secondary">
          Enter the 6-digit OTP code sent to <br />
          <span className="text-[#DCA843] font-bold">{email}</span> and your new password.
        </p>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded mb-4 text-center">
            {serverError}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs p-3 rounded mb-4 text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* OTP Code */}
          <div>
            <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Verification Code (OTP)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#DCA843]/50">
                <IoShieldCheckmarkOutline className="text-sm" />
              </span>
              <input
                type="text"
                name="otp"
                maxLength="6"
                value={formData.otp}
                onChange={handleChange}
                className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCA843] tracking-widest text-center font-bold transition-colors"
                placeholder="6-digit code"
                required
              />
            </div>
            {errors.otp && <p className="text-[9px] text-red-500 mt-1">{errors.otp}</p>}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">New Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#DCA843]/50">
                <IoLockClosedOutline className="text-sm" />
              </span>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2 text-xs text-white focus:outline-none focus:border-[#DCA843] transition-colors"
                placeholder="New secure password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#DCA843]/50 hover:text-[#DCA843] transition-colors"
              >
                {showNewPassword ? <IoEyeOffOutline className="text-sm" /> : <IoEyeOutline className="text-sm" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-[9px] text-red-500 mt-1 max-w-[350px] whitespace-pre-wrap">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Confirm New Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#DCA843]/50">
                <IoLockClosedOutline className="text-sm" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2 text-xs text-white focus:outline-none focus:border-[#DCA843] transition-colors"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#DCA843]/50 hover:text-[#DCA843] transition-colors"
              >
                {showConfirmPassword ? <IoEyeOffOutline className="text-sm" /> : <IoEyeOutline className="text-sm" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[9px] text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-2.5 rounded hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? 'Updating Password...' : 'Reset Password'} <IoArrowForward className="text-sm" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#BABABA]/60">
          Go back to{' '}
          <Link to="/login" className="text-[#DCA843] hover:text-[#FFE082] transition-colors font-bold underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
