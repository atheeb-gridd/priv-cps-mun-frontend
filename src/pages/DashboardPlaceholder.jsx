import React from 'react';
import { useAuth } from '../context/AuthContext';
import { IoLogOutOutline, IoMailOutline, IoPersonOutline, IoKeyOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import Logo from '../assets/un_logo_gold.svg';

const DashboardPlaceholder = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 relative overflow-hidden bg-[#0c0d12]">
      <div className="absolute inset-0 bg-radial-at-t from-[#DCA843]/5 via-[#0c0d12]/60 to-[#0c0d12] pointer-events-none" />

      <div className="w-full max-w-2xl bg-[#09090b]/85 backdrop-blur-md border border-[#DCA843]/20 shadow-2xl p-8 rounded-lg relative z-10 animate-fadeIn">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pb-6 border-b border-[#DCA843]/20">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="CPS PRIME MUN Logo" className="h-16 w-16 animate-pulseSlow" />
            <div>
              <h2 className="font-cinzel text-xl font-bold tracking-wider text-[#DCA843] uppercase">
                CPS PRIME MUN 5.O
              </h2>
              <p className="text-[10px] tracking-widest text-[#BABABA]/60 font-cinzel uppercase mt-0.5">
                Conquer From Within
              </p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-2 border border-red-500/50 hover:bg-red-500/10 text-red-400 font-cinzel text-[10px] font-bold px-4 py-2 rounded transition-all uppercase tracking-widest"
          >
            Logout <IoLogOutOutline className="text-sm" />
          </button>
        </div>

        {/* Welcome Message */}
        <div className="mb-6">
          <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">
            Welcome back, {user.fullName}!
          </h3>
          <p className="text-xs text-[#BABABA]/80 mt-1 font-allotrix-font-secondary">
            Your account is verified and ready. Below is your profile summary.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* User ID Card */}
          <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#DCA843]/10 flex items-center justify-center text-[#DCA843]">
              <IoKeyOutline className="text-lg" />
            </div>
            <div>
              <p className="text-[9px] font-cinzel text-[#BABABA]/60 uppercase tracking-widest">User ID</p>
              <p className="text-xs font-bold text-white tracking-wider mt-0.5">{user.userId}</p>
            </div>
          </div>

          {/* Account ID Card */}
          <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#DCA843]/10 flex items-center justify-center text-[#DCA843]">
              <IoKeyOutline className="text-lg" />
            </div>
            <div>
              <p className="text-[9px] font-cinzel text-[#BABABA]/60 uppercase tracking-widest">Account ID</p>
              <p className="text-xs font-bold text-white tracking-wider mt-0.5">{user.accountId}</p>
            </div>
          </div>

          {/* Username */}
          <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#DCA843]/10 flex items-center justify-center text-[#DCA843]">
              <IoPersonOutline className="text-lg" />
            </div>
            <div>
              <p className="text-[9px] font-cinzel text-[#BABABA]/60 uppercase tracking-widest">Username</p>
              <p className="text-xs font-bold text-white tracking-wider mt-0.5">@{user.username}</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#DCA843]/10 flex items-center justify-center text-[#DCA843]">
              <IoMailOutline className="text-lg" />
            </div>
            <div>
              <p className="text-[9px] font-cinzel text-[#BABABA]/60 uppercase tracking-widest">Email Address</p>
              <p className="text-xs font-bold text-white tracking-wider mt-0.5 truncate max-w-[200px]">{user.email}</p>
            </div>
          </div>

        </div>

        {/* Post-Registration Message Card */}
        <div className="bg-gradient-to-r from-[#DCA843]/10 to-[#F1C40F]/5 border border-[#DCA843]/30 rounded-lg p-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <img src={Logo} alt="Logo Bg" className="h-44 w-44" />
          </div>
          
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mt-1 shrink-0">
              <IoShieldCheckmarkOutline className="text-xl animate-pulse" />
            </div>
            <div>
              <h4 className="font-cinzel text-sm font-bold text-[#DCA843] uppercase tracking-wider">
                Registration Confirmed
              </h4>
              <p className="text-xs text-[#BABABA]/90 leading-relaxed mt-2 font-allotrix-font-secondary">
                Congratulations! You have completed the account creation and email verification module. 
                Your delegate status is active. Further registration forms, allocation options, and event portfolios will unlock as scheduled.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPlaceholder;
