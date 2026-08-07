import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoMailOutline, IoLockClosedOutline, IoArrowForward, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import Logo from '../assets/un_logo_gold.svg';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'email' ? value.trim().toLowerCase() : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await login(formData.email, formData.password);
      
      // Store email in localStorage if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Check registration completed status and redirect
      if (user.registrationCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/registration-form');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill email if Remember Me was set previously
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

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

        <h3 className="font-cinzel text-base tracking-wider text-white uppercase font-bold text-center mb-6 pb-2 border-b border-[#DCA843]/10">
          Sign In
        </h3>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Email */}
          <div>
            <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#DCA843]/50">
                <IoMailOutline className="text-sm" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#DCA843] transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] uppercase">Password</label>
              <Link to="/forgot-password" className="text-[9px] font-cinzel text-[#DCA843] hover:underline uppercase tracking-wider">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#DCA843]/50">
                <IoLockClosedOutline className="text-sm" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2 text-xs text-white focus:outline-none focus:border-[#DCA843] transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#DCA843]/50 hover:text-[#DCA843] transition-colors"
              >
                {showPassword ? <IoEyeOffOutline className="text-sm" /> : <IoEyeOutline className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mt-1">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-[#DCA843] h-3.5 w-3.5 border-[#DCA843]/20 bg-[#121214]/65 rounded focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="rememberMe" className="ml-2 text-[10px] font-cinzel text-[#BABABA]/80 uppercase tracking-wider cursor-pointer">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-2.5 rounded hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Login'} <IoArrowForward className="text-sm" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#BABABA]/60">
          New to CPS PRIME MUN?{' '}
          <Link to="/register" className="text-[#DCA843] hover:text-[#FFE082] transition-colors font-bold underline">
            Register Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
