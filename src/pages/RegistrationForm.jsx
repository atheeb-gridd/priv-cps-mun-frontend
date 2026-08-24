import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../lib/axios';
import { toast } from 'react-hot-toast';
import { 
  IoArrowForward, 
  IoArrowBack,
  IoPersonOutline, 
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoLockClosedOutline,
  IoWalletOutline,
  IoCloudUploadOutline,
  IoCardOutline,
  IoClose,
  IoSchoolOutline,
  IoLogInOutline,
  IoPersonAddOutline,
  IoLogOutOutline,
  IoMailOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoDocumentTextOutline,
  IoChevronDown,
  IoKeyOutline,
  IoWarningOutline,
  IoSettingsOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoAlertCircleOutline
} from 'react-icons/io5';
import * as XLSX from 'xlsx';

const COMMITTEES = [
  'UN Human Rights Council (UNHRC)',
  'UN General Assembly (UNGA)',
  'UN Security Council (UNSC) (Double delegation)',
  'Economic and Social Council (ECOSOC)',
  'International Labour Organization (ILO)',
  'Social, Humanitarian and Cultural Committee (SOCHUM)',
  'UN Environment Programme (UNEP)',
  'International Press Plenary (IPP)',
  'International Press Journalism (IPJ)',
  'United States Senate (US SENATE)',
  'Lok Sabha',
  'Crisis Committee'
];

const COMMITTEE_LIMITS = {
  'UN Human Rights Council (UNHRC)': 40,
  'UN General Assembly (UNGA)': 60,
  'UN Security Council (UNSC) (Double delegation)': 40,
  'Economic and Social Council (ECOSOC)': 40,
  'International Labour Organization (ILO)': 30,
  'Social, Humanitarian and Cultural Committee (SOCHUM)': 40,
  'UN Environment Programme (UNEP)': 40,
  'International Press Plenary (IPP)': 30,
  'International Press Journalism (IPJ)': 30,
  'United States Senate (US SENATE)': 40,
  'Lok Sabha': 40,
  'Crisis Committee': 30
};
const COMMITTEE_COUNTRIES = {
  'UN Human Rights Council (UNHRC)': [
    'Myanmar', 'Bangladesh', 'India', 'China', 'Indonesia', 'Malaysia', 'Thailand',
    'United States of America', 'United Kingdom', 'France', 'Germany', 'Russian Federation',
    'Japan', 'Saudi Arabia', 'Pakistan', 'Turkey', 'Qatar', 'United Arab Emirates',
    'Australia', 'Brazil', 'South Korea', 'Nepal', 'Sri Lanka', 'South Africa',
    'Nigeria', 'Egypt', 'Venezuela', 'Philippines', 'Vietnam', 'Switzerland',
    'Canada', 'New Zealand', 'Norway', 'Denmark', 'Ireland', 'Maldives', 'Cambodia',
    'Laos', 'Iran', 'Somalia'
  ],
  'UN General Assembly (UNGA)': [
    'United States of America', 'United Kingdom', 'France', 'Russian Federation', 'China',
    'India', 'Japan', 'Germany', 'Brazil', 'Italy', 'Pakistan', 'South Korea',
    'Mexico', 'Nigeria', 'South Africa', 'Egypt', 'Kenya', 'Indonesia', 'Turkey',
    'Saudi Arabia', 'Australia', 'Canada', 'Spain', 'Netherlands', 'Sweden',
    'Ukraine', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Belgium',
    'Portugal', 'Greece', 'Ireland', 'New Zealand', 'Singapore', 'Malaysia',
    'Thailand', 'Vietnam', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Iran',
    'Iraq', 'Israel', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Jordan',
    'Algeria', 'Chile', 'EU (Observer Nation)', 'AU (Observer Nation)',
    'LAS (Observer Nation)', 'Cuba', 'Afghanistan', 'Venezuela', 'Syria',
    'DPRK', 'Belarus'
  ],
  'UN Security Council (UNSC) (Double delegation)': [
    'United States of America', 'United Kingdom', 'France', 'Russian Federation', 'China',
    'India', 'Japan', 'South Korea', 'Israel', 'Iran', 'Saudi Arabia', 'United Arab Emirates',
    'Turkey', 'Pakistan', 'Egypt', 'Indonesia', 'Qatar', 'Australia', 'Netherlands', 'Nigeria'
  ],
  'Economic and Social Council (ECOSOC)': [
    'United States of America', 'China', 'India', 'United Kingdom', 'Germany', 'France',
    'Japan', 'South Korea', 'Canada', 'Israel', 'Singapore', 'United Arab Emirates',
    'Estonia', 'Rwanda', 'Brazil', 'South Africa', 'Nigeria', 'Kenya', 'Indonesia',
    'Switzerland', 'Netherlands', 'Finland', 'Sweden', 'Australia', 'Saudi Arabia',
    'Mexico', 'Norway', 'Denmark', 'Ireland', 'New Zealand', 'Malaysia', 'Vietnam',
    'Philippines', 'Bangladesh', 'Egypt', 'Morocco', 'Argentina', 'Chile', 'Colombia',
    'Qatar'
  ],
  'International Labour Organization (ILO)': [
    'United States of America', 'Germany', 'Japan', 'India', 'China', 'France', 'United Kingdom',
    'Brazil', 'South Africa', 'Sweden', 'Denmark', 'Russian Federation',
    'South Korea', 'Bangladesh', 'Qatar', 'Saudi Arabia', 'Nigeria', 'Kenya', 'Mexico', 'Argentina',
    'Canada', 'Australia', 'Netherlands', 'Italy', 'Indonesia', 'DPRK', 'Spain', 'Pakistan',
    'Egypt', 'Sudan'
  ],
  'Social, Humanitarian and Cultural Committee (SOCHUM)': [
    'United States of America', 'China', 'Russian Federation', 'Germany', 'France', 'United Kingdom',
    'India', 'Israel', 'Brazil', 'South Africa', 'Iran', 'North Korea', 'Saudi Arabia', 'Turkey',
    'Egypt', 'Pakistan', 'Mexico', 'Nigeria', 'Sweden', 'Netherlands', 'Switzerland', 'Japan',
    'South Korea', 'Australia', 'Canada', 'Estonia', 'Singapore', 'Belarus', 'Venezuela', 'Cuba',
    'Vietnam', 'Belgium', 'Norway', 'Denmark', 'Finland', 'Ireland', 'New Zealand', 'Argentina',
    'Kenya', 'Indonesia'
  ],
  'UN Environment Programme (UNEP)': [
    'China', 'United States of America', 'Norway', 'India', 'Japan', 'South Korea', 'United Kingdom',
    'France', 'Germany', 'Canada', 'Australia', 'Chile', 'Mexico', 'Brazil', 'Russian Federation',
    'Nauru', 'Tonga', 'Fiji', 'Kiribati', 'Cook Islands', 'Papua New Guinea', 'Indonesia',
    'New Zealand', 'Netherlands', 'Jamaica', 'Costa Rica', 'Palau', 'Belgium', 'Tuvalu',
    'Solomon Islands', 'Vanuatu', 'Samoa', 'Maldives', 'Seychelles', 'Bangladesh', 'Philippines',
    'South Africa', 'Kenya', 'Denmark', 'Sweden'
  ],
  'International Press Plenary (IPP)': ['N/A'],
  'International Press Journalism (IPJ)': ['N/A'],
  'United States Senate (US SENATE)': [
    'Jim Risch (Republican, Idaho) - Chairman, Committee on Foreign Relations',
    'Jeanne Shaheen (Democrat, New Hampshire) - Ranking Member, Committee on Foreign Relations',
    'Tim Kaine (Democrat, Virginia)',
    'Chris Coons (Democrat, Delaware)',
    'John Cornyn (Republican, Texas)',
    'Roger Wicker (Republican, Mississippi) - Chairman, Committee on Armed Services',
    'Lisa Murkowski (Republican, Alaska)',
    'Chuck Schumer (Democrat, New York) - Senate Minority Leader',
    'Bernie Sanders (Independent, Vermont)',
    'Elizabeth Warren (Democrat, Massachusetts)',
    'Rand Paul (Republican, Kentucky)',
    'Ted Cruz (Republican, Texas)',
    'Josh Hawley (Republican, Missouri)',
    'Cory Booker (Democrat, New Jersey)',
    'Mark Warner (Democrat, Virginia)',
    'Susan Collins (Republican, Maine)',
    'Mitch McConnell (Republican, Kentucky)',
    'John Thune (Republican, South Dakota) - Senate Majority Leader',
    'Ruben Gallego (Democrat, Arizona)',
    'Elissa Slotkin (Democrat, Michigan)',
    'Jon Ossoff (Democrat, Georgia)',
    'Adam Schiff (Democrat, California)',
    'Chris Murphy (Democrat, Connecticut)',
    'Jack Reed (Democrat, Rhode Island)',
    'Dick Durbin (Democrat, Illinois) - Senate Minority Whip',
    'John Fetterman (Democrat, Pennsylvania)',
    'Tammy Duckworth (Democrat, Illinois)',
    'Gary Peters (Democrat, Michigan)',
    'Ron Wyden (Democrat, Oregon)',
    'Ed Markey (Democrat, Massachusetts)',
    'Steve Daines (Republican, Montana)',
    'Tom Cotton (Republican, Arkansas)',
    'Joni Ernst (Republican, Iowa)',
    'Dan Sullivan (Republican, Alaska)',
    'John Barrasso (Republican, Wyoming) - Senate Majority Whip',
    'Bill Cassidy (Republican, Louisiana)',
    'Mike Lee (Republican, Utah)',
    'Rick Scott (Republican, Florida)',
    'Jim Justice (Republican, West Virginia)',
    'Angus King (Independent, Maine)'
  ],
  'Lok Sabha': [
    'Prime Minister (BJP, Uttar Pradesh)',
    'Union Home Minister (BJP, Gujarat)',
    'Union Defence Minister (BJP, Uttar Pradesh)',
    'Union Finance Minister (BJP, Karnataka)',
    'Union Minister for Railways, Information & Broadcasting and Electronics & IT (BJP, Odisha)',
    'Union Minister for Agriculture & Farmers Welfare (BJP, Madhya Pradesh)',
    'Union Education Minister (BJP, Odisha)',
    'Union Commerce & Industry Minister (BJP, Maharashtra)',
    'Union Coal & Mines Minister (BJP, Telangana)',
    'Union Parliamentary Affairs & Minority Affairs Minister (BJP, Arunachal Pradesh)',
    'Union Food Processing Industries Minister (LJP (RV), Bihar)',
    'Union Jal Shakti Minister (BJP, Gujarat)',
    'Union Tribal Affairs Minister (BJP, Odisha)',
    'MP (BJP, Himachal Pradesh) - 1',
    'MP (BJP, Karnataka) - 1',
    'MP (BJP, Jharkhand) - 1',
    'MP (BJP, Bihar) - 1',
    'MP (BJP, Uttar Pradesh) - 1',
    'MP (BJP, Delhi) - 1',
    'MP (BJP, Himachal Pradesh) - 2',
    'MP (BJP, Delhi) - 2',
    'Leader of Opposition (INC, Uttar Pradesh)',
    'MP (INC, Kerala) - 1',
    'MP (INC, Kerala) - 2',
    'MP (INC, Assam) - 1',
    'MP (INC, Kerala) - 3',
    'MP (INC, Tamil Nadu) - 1',
    'MP (INC, Tamil Nadu) - 2',
    'MP (Samajwadi Party, Uttar Pradesh) - 1',
    'MP (Samajwadi Party, Uttar Pradesh) - 2',
    'MP (Samajwadi Party, Uttar Pradesh) - 3',
    'MP (All India Trinamool Congress, West Bengal) - 1',
    'MP (All India Trinamool Congress, West Bengal) - 2',
    'MP (DMK, Tamil Nadu) - 1',
    'MP (DMK, Tamil Nadu) - 2',
    'MP (DMK, Tamil Nadu) - 3',
    'MP (AIMIM, Telangana) - 1',
    'MP (NCP (SP), Maharashtra) - 1',
    'MP (Shiv Sena, Maharashtra) - 1',
    'MP (Shiromani Akali Dal, Punjab) - 1'
  ],
  'Crisis Committee': [
    'United States of America', 'Iran', 'Israel', 'Russian Federation', 'China', 'United Kingdom',
    'France', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Iraq', 'Syria', 'Jordan', 'Turkey',
    'Pakistan', 'India', 'Germany', 'Japan', 'South Korea', 'Egypt', 'Lebanon', 'Yemen', 'Oman',
    'Kuwait', 'Bahrain', 'North Korea', 'Ukraine', 'Brazil', 'South Africa', 'Australia'
  ]
};

const COMMITTEE_WHATSAPP_LINKS = {
  'UN Human Rights Council (UNHRC)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_UNHRC',
  'UN General Assembly (UNGA)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_UNGA',
  'UN Security Council (UNSC) (Double delegation)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_UNSC',
  'Economic and Social Council (ECOSOC)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_ECOSOC',
  'International Labour Organization (ILO)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_ILO',
  'Social, Humanitarian and Cultural Committee (SOCHUM)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_SOCHUM',
  'UN Environment Programme (UNEP)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_UNEP',
  'International Press Plenary (IPP)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_IPP',
  'International Press Journalism (IPJ)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_IPJ',
  'United States Senate (US SENATE)': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_US_SENATE',
  'Lok Sabha': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_LOK_SABHA',
  'Crisis Committee': 'https://chat.whatsapp.com/ImNiYtw3W5t8xIHuPTYgWW_CRISIS'
};

const allocateRandomCountry = (committee, tempAllocated = new Set()) => {
  const allCountries = COMMITTEE_COUNTRIES[committee] || ['Delegate'];
  const regs = JSON.parse(localStorage.getItem('cps_mun_registrations') || '[]');
  const allocated = new Set(tempAllocated);
  
  regs.forEach(r => {
    const d = r.details || {};
    if (r.registrationType === 'individual') {
      const comm = d.allocatedCommittee || d.committee;
      if (comm === committee && d.allocatedCountry) {
        allocated.add(d.allocatedCountry.toLowerCase());
      }
    } else if (r.registrationType === 'school') {
      const list = d.delegatesList || d.delegates || [];
      list.forEach(del => {
        const comm = del.allocatedCommittee || del.selectedCommittee;
        if (comm === committee && del.allocatedCountry) {
          allocated.add(del.allocatedCountry.toLowerCase());
        }
      });
    }
  });

  const available = allCountries.filter(c => !allocated.has(c.toLowerCase()));
  
  if (available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];
    tempAllocated.add(chosen.toLowerCase());
    return chosen;
  } else {
    const randomIndex = Math.floor(Math.random() * allCountries.length);
    const chosen = allCountries[randomIndex];
    tempAllocated.add(chosen.toLowerCase());
    return chosen;
  }
};

const getDeterministicCountry = (committee, seedInput = '') => {
  const allCountries = COMMITTEE_COUNTRIES[committee] || ['France', 'United States', 'United Kingdom', 'Germany', 'Japan', 'South Korea', 'India', 'Canada'];
  if (!allCountries || allCountries.length === 0) return 'Delegate';
  const seed = (seedInput || 'cps_mun_seed').toString().toLowerCase();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % allCountries.length;
  return allCountries[index] || 'France';
};

const PerformantInput = ({ value, onChange, label, error, type = "text", className = "", ...props }) => {
  const [localValue, setLocalValue] = useState(value || '');

  // Keep local value in sync when parent prop value changes (e.g. on load / restore draft)
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Debounced parent state update so it syncs if typing pauses
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = (e) => {
    if (e.target.value !== value) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      {label && <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">{label}</label>}
      <input
        type={type}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] ${className}`}
        {...props}
      />
      {error && <p className="text-[9px] text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const CustomDatePicker = ({ value, onChange, label, error, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse YYYY-MM-DD
  const dateObj = value ? new Date(value) : null;
  const currentYear = new Date().getFullYear();
  
  const [selectedMonth, setSelectedMonth] = useState(dateObj ? dateObj.getMonth() : new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(dateObj ? dateObj.getFullYear() : currentYear - 15);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate years list (e.g. from currentYear down to 1980)
  const years = [];
  for (let y = currentYear; y >= 1980; y--) {
    years.push(y);
  }

  // Days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // First day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const handleSelectDay = (day) => {
    // Format to YYYY-MM-DD
    const m = String(selectedMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    onChange(`${selectedYear}-${m}-${d}`);
    setIsOpen(false);
  };

  // Format date for display: DD/MM/YYYY
  const getDisplayValue = () => {
    if (!value) return '';
    const parts = value.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return value;
  };

  // Generate day cells
  const dayCells = [];
  // Empty slots for preceding days
  for (let i = 0; i < firstDay; i++) {
    dayCells.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = value === `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    dayCells.push(
      <button
        key={`day-${day}`}
        type="button"
        onClick={() => handleSelectDay(day)}
        className={`w-8 h-8 flex items-center justify-center rounded text-xs transition-all font-medium ${
          isSelected 
            ? 'bg-[#DCA843] text-black font-bold shadow-[0_0_10px_rgba(220,168,67,0.4)]' 
            : 'text-white/80 hover:bg-[#DCA843]/15 hover:text-white hover:scale-105'
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">{label}</label>}
      <div className="relative">
        <input
          type="text"
          readOnly
          placeholder="DD/MM/YYYY"
          value={getDisplayValue()}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-2.5 pr-10 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#DCA843] cursor-pointer"
        />
        <IoCalendarOutline 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#DCA843] cursor-pointer hover:scale-110 transition-transform" 
        />
      </div>
      {error && <p className="text-[9px] text-red-500 mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-[9999] mt-2 left-0 w-72 bg-[#0c0c0e] border border-[#DCA843]/40 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-4 backdrop-blur-md animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <button 
              type="button" 
              onClick={handlePrevMonth}
              className="text-[#DCA843] hover:text-[#FFE082] p-1 text-xs font-bold"
            >
              &lt;
            </button>
            <div className="flex gap-1.5">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                className="bg-black/60 border border-[#DCA843]/10 text-white text-[11px] py-1 px-1.5 rounded focus:outline-none focus:border-[#DCA843] cursor-pointer"
              >
                {months.map((m, idx) => (
                  <option key={m} value={idx}>{m}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                className="bg-black/60 border border-[#DCA843]/10 text-white text-[11px] py-1 px-1.5 rounded focus:outline-none focus:border-[#DCA843] cursor-pointer"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <button 
              type="button" 
              onClick={handleNextMonth}
              className="text-[#DCA843] hover:text-[#FFE082] p-1 text-xs font-bold"
            >
              &gt;
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-[#BABABA]/50 font-cinzel">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(w => (
              <div key={w} className="w-8">{w}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {dayCells}
          </div>
        </div>
      )}
    </div>
  );
};

const handleDownloadFile = async (url) => {
  if (!url) return;
  try {
    if (url.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded_document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const filename = url.split('/').pop() || 'document';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'document';
    link.target = '_blank';
    link.click();
  }
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  // Authentication State from context
  const { user: currentUser, login, logout, checkAuth } = useAuth();
  const getWhatsAppLink = () => {
    const committee = myRegistration?.allocatedCommittee || myRegistration?.details?.committee || myRegistration?.details?.selectedCommittee;
    return COMMITTEE_WHATSAPP_LINKS[committee] || 'https://chat.whatsapp.com/ISziD5uOFDC2rwjuxqCWOR?s=cl&p=a&mlu=0&ilr=0';
  };
  const setCurrentUser = () => {};
  const [authState, setAuthState] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot Password Flow States
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [forgotEmail, setForgotEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [otpAlert, setOtpAlert] = useState(null);

  // Auth Inputs State
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authErrors, setAuthErrors] = useState({});

  // Core Registration Flow State
  const [regType, setRegType] = useState(null); // 'individual' | 'school' | null
  const [showAdminConsole, setShowAdminConsole] = useState(false);
  const [editingDelegateModal, setEditingDelegateModal] = useState(null);
  const [viewDocsModal, setViewDocsModal] = useState(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminSelectedReg, setAdminSelectedReg] = useState(null);
  const [adminAllocatedCountry, setAdminAllocatedCountry] = useState('');
  const [adminAllocatedCommittee, setAdminAllocatedCommittee] = useState('');
  const [adminTab, setAdminTab] = useState('database'); // 'database' | 'allocations' | 'credentials'
  const [userCredentials, setUserCredentials] = useState([]);
  const [credSearch, setCredSearch] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [selectedAllocationCommittee, setSelectedAllocationCommittee] = useState('UN Security Council (UNSC) (Double delegation)');
  const [swapSource, setSwapSource] = useState(null); // { registrationId, delegateIndex, name, portfolio, committee }

  const [dbSeatCounts, setDbSeatCounts] = useState({});
  const [registrationStatus, setRegistrationStatus] = useState('live'); // 'live' | 'offline'
  const [isTestMode, setIsTestMode] = useState(false);
  const [feeTierName, setFeeTierName] = useState('Early Bird (₹750)');
  const [isClosedDeadline, setIsClosedDeadline] = useState(false);
  const [globalFeeRate, setGlobalFeeRate] = useState(() => {
    const saved = parseInt(localStorage.getItem('cps_mun_delegate_fee'), 10);
    return [1, 750, 800].includes(saved) ? saved : 750;
  });

  const fetchFeeSetting = useCallback(async () => {
    try {
      const { data } = await apiClient.get('/registration/settings/fee');
      if (data && data.success) {
        if (data.testMode !== undefined) setIsTestMode(Boolean(data.testMode));
        if (data.feeTier !== undefined) setFeeTierName(data.feeTier);
        if (data.isPastDeadline !== undefined) setIsClosedDeadline(Boolean(data.isPastDeadline));
        if (data.fee !== undefined && data.fee !== null) {
          const feeVal = parseInt(data.fee, 10);
          setGlobalFeeRate(feeVal);
          localStorage.setItem('cps_mun_delegate_fee', feeVal.toString());
        }
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchFeeSetting();
    const interval = setInterval(fetchFeeSetting, 5000);
    return () => clearInterval(interval);
  }, [fetchFeeSetting]);

  const handleToggleTestMode = async (enableTest) => {
    setIsTestMode(enableTest);
    try {
      let res;
      try {
        res = await apiClient.post('/registration/admin/settings/fee', { testMode: enableTest });
      } catch (err1) {
        res = await apiClient.post('/registration/settings/fee', { testMode: enableTest });
      }
      if (res.data && res.data.success) {
        const feeVal = res.data.fee;
        setGlobalFeeRate(feeVal);
        localStorage.setItem('cps_mun_delegate_fee', feeVal.toString());
        toast.success(enableTest ? '🧪 Test Mode ENABLED! ₹1 fee active for testing.' : `⚡ Test Mode DISABLED! Active rate: ₹${feeVal}`);
        if (res.data.feeTier) setFeeTierName(res.data.feeTier);
      } else {
        toast.error('Failed to update test mode setting on server.');
      }
    } catch (err) {
      console.error('Error toggling test mode:', err);
      toast.error(`Error updating test mode: ${err.response?.data?.message || err.message}`);
    }
  };

  const fetchRegistrationStatus = useCallback(async () => {
    try {
      const { data } = await apiClient.get('/registration/status');
      if (data && data.status) {
        setRegistrationStatus(data.status);
      }
    } catch (err) {
      console.error('Error fetching registration status:', err);
    }
  }, []);

  useEffect(() => {
    fetchRegistrationStatus();
  }, [fetchRegistrationStatus]);

  const handleToggleRegistrationStatus = async (newStatus) => {
    try {
      const { data } = await apiClient.post('/registration/admin/status', { status: newStatus });
      if (data && data.status) {
        setRegistrationStatus(data.status);
        toast.success(`System Registration Status set to ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update registration status.');
    }
  };

  const fetchUserCredentials = useCallback(async () => {
    if (!currentUser || (currentUser.role !== 'Admin' && currentUser.role !== 'SuperAdmin')) return;
    try {
      const { data } = await apiClient.get('/registration/admin/user-credentials');
      setUserCredentials(data.users || []);
    } catch (err) {
      console.error('Error fetching user credentials:', err);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchSeatCounts = async () => {
      try {
        const { data } = await apiClient.get('/registration/seat-counts');
        setDbSeatCounts(data.counts || {});
      } catch (err) {
        console.error('Error fetching seat counts:', err);
      }
    };
    fetchSeatCounts();
  }, []);

  useEffect(() => {
    if (!currentUser || (currentUser.role !== 'Admin' && currentUser.role !== 'SuperAdmin')) return;
    if (adminTab === 'credentials') {
      fetchUserCredentials();
    }
  }, [adminTab, currentUser, fetchUserCredentials]);


  const getCommitteeSeatCounts = () => {
    const counts = {};
    COMMITTEES.forEach(c => {
      counts[c] = dbSeatCounts[c] || 0;
    });
    return counts;
  };

  const getAvailableCommittees = (currentDelegateIdx = null) => {
    const dbCounts = getCommitteeSeatCounts();
    const formCounts = {};
    COMMITTEES.forEach(c => { formCounts[c] = 0; });
    
    if (regType === 'school' && formData.delegates) {
      formData.delegates.forEach((del, idx) => {
        if (currentDelegateIdx === null || idx !== currentDelegateIdx) {
          const comm = del.selectedCommittee;
          if (comm && formCounts[comm] !== undefined) {
            formCounts[comm] += 1;
          }
        }
      });
    }

    return COMMITTEES.map(c => {
      const dbCount = dbCounts[c] || 0;
      const formCount = formCounts[c] || 0;
      const totalCount = dbCount + formCount;
      const limit = COMMITTEE_LIMITS[c] || 30;
      return {
        name: c,
        filled: totalCount,
        limit: limit,
        isFull: totalCount >= limit
      };
    });
  };
  const [step, setStep] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'processing' | 'success' | 'failed'
  const [selectedMethod, setSelectedMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  // eslint-disable-next-line no-unused-vars
  const [excelLoading, setExcelLoading] = useState(false);
  const [excelUploaded, setExcelUploaded] = useState(false);
  const [expandedDelegateIdx, setExpandedDelegateIdx] = useState(0);
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    // Individual details
    fullName: '',
    gender: '',
    dob: '',
    gradeClass: '',
    section: '',
    schoolName: '',
    schoolCity: '',
    schoolBoard: 'CBSE',
    email: '',
    mobile: '',
    parentName: '',
    parentMobile: '',
    parentEmail: '',
    isFirstMUN: 'No',
    numMUNs: '0',
    medicalConditions: '',
    gadgetsList: '',
    emergencyName: '',
    emergencyNumber: '',
    acceptedTerms: false,
    acceptedRules: false,
    acceptedPrivacy: false,
    acceptedParentConsent: false,
    selectedCommittee: '',
    preference1: '',
    preference2: '',
    preference3: '',
    docStudentId: '',
    docPhoto: '',

    // School Details
    schoolTeacherName: '',
    schoolTeacherEmail: '',
    schoolTeacherMobile: '',
    schoolAddress: '',
    schoolNumDelegates: '',
    schoolAuthLetter: '',
    delegates: []
  });

  const [errors, setErrors] = useState({});

  // Admin specific popup states
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [previewDelegate, setPreviewDelegate] = useState(null);
  const [showBulkMailModal, setShowBulkMailModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [bulkMailSubject, setBulkMailSubject] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [bulkMailBody, setBulkMailBody] = useState('');
  const [showClearPaymentsModal, setShowClearPaymentsModal] = useState(false);
  const [clearingPaymentsLoading, setClearingPaymentsLoading] = useState(false);

  // Auto-scroll to top of page whenever registration step, type, or admin tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [step, regType, adminTab]);

  // Process return query parameters & sync persistent payment state
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const statusParam = urlParams.get('payment_status');
    const txnIdParam = urlParams.get('txn_id');
    const regIdParam = urlParams.get('reg_id');
    const regTypeParam = urlParams.get('reg_type');
    const stepParam = urlParams.get('step');

    // Restore regType from URL parameter, local storage, or regIdParam
    const isSchoolReg = (regTypeParam === 'school') || (regIdParam && regIdParam.includes('SCH')) || localStorage.getItem('cps_mun_reg_type') === 'school';
    const effectiveRegType = isSchoolReg ? 'school' : (regTypeParam || localStorage.getItem('cps_mun_reg_type') || 'individual');
    if (effectiveRegType) {
      setRegType(effectiveRegType);
      localStorage.setItem('cps_mun_reg_type', effectiveRegType);
    }

    const isLocallyVerified = Boolean(regIdParam && localStorage.getItem(`cps_paid_${regIdParam}`) === 'true');
    const targetStep = stepParam ? parseInt(stepParam, 10) : (effectiveRegType === 'school' ? 3 : 4);

    if (effectiveRegType === 'school') {
      setStep(3);
      if (statusParam === 'success' || isLocallyVerified) {
        setIsPaid(true);
        setPaymentStatus('success');
        if (txnIdParam) setPaymentId(txnIdParam);
        if (regIdParam) localStorage.setItem(`cps_paid_${regIdParam}`, 'true');
      } else if (statusParam && statusParam !== 'success') {
        setIsPaid(false);
        setPaymentStatus('failed');
        if (txnIdParam) setPaymentId(txnIdParam);
      }
    } else if (statusParam === 'success' || isLocallyVerified) {
      setIsPaid(true);
      setPaymentStatus('success');
      if (txnIdParam) {
        setPaymentId(txnIdParam);
        if (regIdParam) localStorage.setItem(`cps_mun_paid_txn_id_${regIdParam}`, txnIdParam);
      } else {
        const savedTxnId = (regIdParam && localStorage.getItem(`cps_mun_paid_txn_id_${regIdParam}`)) || '';
        if (savedTxnId) setPaymentId(savedTxnId);
      }
      if (regIdParam) localStorage.setItem(`cps_paid_${regIdParam}`, 'true');
      setStep(targetStep);
      if (statusParam === 'success') {
        toast.success('HDFC Payment Verified Successfully!');
      }
    } else if (statusParam && statusParam !== 'success' && !isLocallyVerified) {
      setIsPaid(false);
      setPaymentStatus('failed');
      if (txnIdParam) setPaymentId(txnIdParam);
      toast.error('Payment Transaction Failed or Cancelled. Please try paying again to unlock the next step.');
      setStep(targetStep);
    }
  }, []);
  useEffect(() => {
    if (!currentUser || !currentUser.email) return;
    const currentEmail = currentUser.email.toLowerCase();
    const userDraftKey = `cps_mun_draft_${currentEmail}`;

    try {
      const savedLocal = localStorage.getItem(userDraftKey);
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal);
        const draftEmail = (parsed.formData?.email || parsed.userEmail || '').toLowerCase();

        if (draftEmail && draftEmail === currentEmail) {
          if (parsed.formData) {
            setFormData(prev => ({
              ...prev,
              ...parsed.formData,
              fullName: currentUser.fullName || currentUser.name || parsed.formData.fullName || '',
              email: currentEmail,
              docStudentId: parsed.formData.docStudentId || parsed.formData.studentIdDoc || parsed.formData.docStudentIdFile?.name || prev.docStudentId || (parsed.formData.docStudentIdFile ? 'Student_ID_Uploaded.pdf' : ''),
              docPhoto: parsed.formData.docPhoto || parsed.formData.aadharDoc || parsed.formData.docAadhar || parsed.formData.docPhotoFile?.name || prev.docPhoto || (parsed.formData.docPhotoFile ? 'Aadhar_Uploaded.pdf' : ''),
              docStudentIdFile: parsed.formData.docStudentIdFile || prev.docStudentIdFile || null,
              docPhotoFile: parsed.formData.docPhotoFile || prev.docPhotoFile || null
            }));
          }
          if (parsed.regType) setRegType(parsed.regType);
        } else {
          localStorage.removeItem(userDraftKey);
          setFormData(prev => ({
            ...prev,
            fullName: currentUser.fullName || currentUser.name || '',
            email: currentEmail,
            gender: '',
            dob: '',
            gradeClass: '',
            section: '',
            schoolName: '',
            schoolCity: '',
            mobile: '',
            parentName: '',
            parentMobile: '',
            parentEmail: ''
          }));
        }
      } else {
        // No draft for this user: initialize clean form with current user's name & email
        setFormData(prev => ({
          ...prev,
          fullName: currentUser.fullName || currentUser.name || '',
          email: currentEmail,
          gender: '',
          dob: '',
          gradeClass: '',
          section: '',
          schoolName: '',
          schoolCity: '',
          mobile: '',
          parentName: '',
          parentMobile: '',
          parentEmail: ''
        }));
      }
    } catch (e) {}
  }, [currentUser]);

  // Seed default host credentials on mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('cps_mun_users') || '[]');
    const hostEmail = 'host@cpsmun.org';
    const hostExists = users.some(u => u.email.toLowerCase() === hostEmail);
    if (!hostExists) {
      users.push({
        name: 'MUN Host Admin',
        email: hostEmail,
        password: 'cpsmunhoster'
      });
      localStorage.setItem('cps_mun_users', JSON.stringify(users));
    }
  }, []);

  const [myRegistration, setMyRegistration] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadingRegistration, setLoadingRegistration] = useState(true);
  const [allRegistrations, setAllRegistrations] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loadingAllRegistrations, setLoadingAllRegistrations] = useState(false);

  const getAllottedPortfoliosMap = useCallback((committee) => {
    const map = {};
    (allRegistrations || []).forEach(r => {
      if (r.registrationType === 'individual') {
        const comm = r.allocatedCommittee || r.details?.selectedCommittee || r.details?.committee;
        if (comm === committee && r.allocatedCountry && r.allocatedCountry !== 'N/A') {
          const name = r.details?.fullName || 'Individual Delegate';
          map[r.allocatedCountry] = `${name} (Individual)`;
        }
      } else {
        const roster = r.details?.delegates || r.details?.delegatesList || [];
        roster.forEach((d, dIdx) => {
          const comm = d.allocatedCommittee || d.selectedCommittee;
          if (comm === committee && d.allocatedCountry && d.allocatedCountry !== 'N/A') {
            const name = d.name || `Delegate #${dIdx + 1}`;
            const school = r.details?.schoolName || 'School';
            map[d.allocatedCountry] = `${name} (${school})`;
          }
        });
      }
    });
    return map;
  }, [allRegistrations]);

  // Auto-save draft states
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [draftRestoredNotice, setDraftRestoredNotice] = useState(null);
  const isInitialMount = useRef(true);

  // Function to push current form draft to backend database
  const saveDraftToBackend = useCallback(async (formDataToSave, stepToSave, regTypeToSave) => {
    if (!currentUser || currentUser.email === 'host@cpsmun.org' || currentUser.role === 'Admin' || currentUser.role === 'SuperAdmin' || myRegistration) return;
    
    setSaveStatus('saving');
    try {
      // Strip heavy file buffers / base64 objects from draft payload to prevent database bloat
      const sanitizedFormData = { ...formDataToSave };
      delete sanitizedFormData.docStudentIdFile;
      delete sanitizedFormData.docPhotoFile;
      delete sanitizedFormData.docStudentIdBase64;
      delete sanitizedFormData.docPhotoBase64;
      delete sanitizedFormData.docAadharBase64;

      if (Array.isArray(sanitizedFormData.delegates)) {
        sanitizedFormData.delegates = sanitizedFormData.delegates.map(d => {
          const cleanD = { ...d };
          delete cleanD.docStudentIdFile;
          delete cleanD.docPhotoFile;
          delete cleanD.docStudentIdBase64;
          delete cleanD.docPhotoBase64;
          delete cleanD.docAadharBase64;
          return cleanD;
        });
      }

      const res = await apiClient.post('/registration/draft', {
        currentStep: stepToSave,
        regType: regTypeToSave,
        formData: sanitizedFormData
      });
      setSaveStatus('saved');
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSavedTime(timeStr);
    } catch (err) {
      console.error('Auto-save draft error:', err);
      setSaveStatus('error');
    }
  }, [currentUser, myRegistration]);

  // Immediate save trigger helper for blur / select / file upload events
  const triggerImmediateSave = useCallback(() => {
    if (formData && step < 9 && regType) {
      saveDraftToBackend(formData, step, regType);
    }
  }, [formData, step, regType, saveDraftToBackend]);

  // Debounced auto-save effect (500ms typing debounce - only fires when user pauses typing)
  useEffect(() => {
    if (!currentUser || myRegistration || !regType || step >= 9) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSaveStatus('saving');
      saveDraftToBackend(formData, step, regType);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, step, regType, currentUser, myRegistration, saveDraftToBackend]);

  const fetchAllRegistrations = useCallback(async () => {
    if (!currentUser || (currentUser.role !== 'Admin' && currentUser.role !== 'SuperAdmin')) return;
    try {
      setLoadingAllRegistrations(true);
      const { data } = await apiClient.get('/registration/all');
      setAllRegistrations(data.registrations || []);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setLoadingAllRegistrations(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const isUserAdmin = currentUser?.email === 'host@cpsmun.org' || currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin' || currentUser?.email === 'cpsprimemun@gmail.com';
    if (currentUser && isUserAdmin) {
      setShowAdminConsole(true);
      fetchAllRegistrations();
      fetchUserCredentials();

      const interval = setInterval(() => {
        fetchAllRegistrations();
        fetchUserCredentials();
      }, 30000);

      return () => clearInterval(interval);
    } else {
      setShowAdminConsole(false);
    }
  }, [currentUser, fetchAllRegistrations, fetchUserCredentials]);

  const getCandidateRegistration = useCallback(() => {
    return myRegistration;
  }, [myRegistration]);

  // Deterministic Online Receipt Number (Fixed per registration session)
  const onlineReceiptNumber = useMemo(() => {
    const activeReg = typeof getCandidateRegistration === 'function' ? getCandidateRegistration() : null;
    const seed = activeReg?.registrationId || formData.email || formData.fullName || 'CPSMUN';
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 37 + seed.charCodeAt(i)) & 0x7fffffff;
    }
    return String(1000 + (hash % 8999));
  }, [getCandidateRegistration, formData.email, formData.fullName]);

  // Auto-poll HDFC Payment Status from backend when on Step 4
  const verifyHdfcPaymentLive = useCallback(async (showNotice = false) => {
    try {
      const activeReg = typeof getCandidateRegistration === 'function' ? getCandidateRegistration() : null;
      const regId = activeReg?.registrationId || 'CPS-PAY';
      const userEmail = formData?.email || formData?.teacherEmail || currentUser?.email || 'tanav.trt@gmail.com';
      
      const { data } = await apiClient.get(`/payment/hdfc/status/${regId}?email=${encodeURIComponent(userEmail)}&recheck=${showNotice ? 'true' : 'false'}`);
      if (data && data.isPaid) {
        setIsPaid(true);
        setPaymentStatus('success');
        if (data.paymentId) setPaymentId(data.paymentId);
        if (regId && regId !== 'CPS-PAY') localStorage.setItem(`cps_paid_${regId}`, 'true');
        if (data.paymentId && regId) localStorage.setItem(`cps_mun_paid_txn_id_${regId}`, data.paymentId);
        toast.success('HDFC Payment Verified! Please review your receipt and click "Next Step".');
        setStep(4);
        return true;
      } else if (showNotice) {
        toast.error('No verified payment found yet. Please complete payment via HDFC Gateway.');
      }
    } catch (err) {
      if (showNotice) toast.error('Error verifying payment with gateway server.');
    }
    return false;
  }, [formData?.email, formData?.teacherEmail, currentUser, getCandidateRegistration]);

  useEffect(() => {
    // Payment verification polling runs on step 4 (individual) and steps 2-3 (school)
    const isPaymentStep = step === 4 || step === 3 || step === 2;
    if (!isPaymentStep || isPaid) return;
    verifyHdfcPaymentLive(false);
    const timer = setInterval(() => verifyHdfcPaymentLive(false), 3000);
    return () => clearInterval(timer);
  }, [step, isPaid, verifyHdfcPaymentLive]);

  // ── Payment Bypass: test accounts automatically skip payment step ─────────
  useEffect(() => {
    // Bypass on step 4 (individual) or steps 2-3 (school)
    const isPaymentStep = step === 4 || step === 3 || step === 2;
    if (!isPaymentStep || isPaid || !currentUser?.paymentBypass) return;
    setIsPaid(true);
    setPaymentStatus('success');
    setPaymentId('BYPASS-TEST-ACCOUNT');
    toast.success('Test account: payment step bypassed automatically.');
  }, [step, isPaid, currentUser]);
  // ─────────────────────────────────────────────────────────────────────────

  // Load existing registration or active draft from backend
  useEffect(() => {
    let isCancelled = false;

    // Reset state for new user session
    setMyRegistration(null);
    setSaveStatus('idle');

    const fetchMyReg = async () => {
      try {
        const { data } = await apiClient.get('/registration/my-registration');
        if (isCancelled) return;

        if (data && data.registration) {
          const matched = data.registration;
          if (isCancelled) return;

          setMyRegistration(matched);
          const isSchoolReg = (matched.registrationId && matched.registrationId.includes('SCH')) || matched.registrationType === 'school' || localStorage.getItem('cps_mun_reg_type') === 'school';
          const effectiveRegType = isSchoolReg ? 'school' : (matched.registrationType || 'individual');
          setRegType(effectiveRegType);
          localStorage.setItem('cps_mun_reg_type', effectiveRegType);

          const isRecordVerified = matched.details?.paymentStatus === 'Verified' || matched.paymentStatus === 'Verified';
          const isRegIdPaid = Boolean(matched.registrationId && localStorage.getItem(`cps_paid_${matched.registrationId}`) === 'true');
          const isBypassAccount = Boolean(currentUser?.paymentBypass) || (matched.paymentId && matched.paymentId.startsWith('BYPASS')) || (matched.details?.paymentId && String(matched.details.paymentId).startsWith('BYPASS'));
          const hasPaidLocally = isRecordVerified || isRegIdPaid || isBypassAccount;
          const isHostUser = currentUser?.email === 'host@cpsmun.org' || currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin' || currentUser?.email === 'cpsprimemun@gmail.com';

          // Any registered record returned by backend that is not a Draft means the user has submitted!
          const isSubmitted = Boolean(matched && (matched.details?.status === 'Submitted' || matched.details?.isSubmitted));

          if (isSubmitted && (hasPaidLocally || isHostUser)) {
            if (effectiveRegType === 'individual') {
              setStep(9);
              setFormData(prev => ({
                ...prev,
                ...matched.details,
                fullName: matched.details?.fullName || matched.details?.name || prev.fullName || '',
                gender: matched.details?.gender || prev.gender || '',
                dob: matched.details?.dob || prev.dob || '',
                gradeClass: matched.details?.gradeClass || matched.details?.grade || prev.gradeClass || '',
                section: matched.details?.section || prev.section || '',
                schoolName: matched.details?.schoolName || prev.schoolName || '',
                schoolCity: matched.details?.schoolCity || matched.details?.city || prev.schoolCity || '',
                mobile: matched.details?.mobile || matched.details?.phone || prev.mobile || '',
                parentName: matched.details?.parentName || matched.details?.guardianName || prev.parentName || '',
                parentMobile: matched.details?.parentMobile || matched.details?.guardianMobile || prev.parentMobile || '',
                parentEmail: matched.details?.parentEmail || matched.details?.guardianEmail || prev.parentEmail || '',
                isFirstMUN: matched.details?.isFirstMUN || matched.details?.firstTimeMUN || prev.isFirstMUN || 'No',
                numMUNs: (matched.details?.numMUNs !== undefined && matched.details?.numMUNs !== null && matched.details?.numMUNs !== '')
                  ? String(matched.details.numMUNs)
                  : (matched.details?.munsAttended ? String(matched.details.munsAttended) : ((matched.details?.isFirstMUN === 'No' || prev.isFirstMUN === 'No') ? '1' : '0')),
                medicalConditions: matched.details?.medicalConditions || matched.details?.medical || prev.medicalConditions || '',
                gadgetsList: matched.details?.gadgetsList || matched.details?.gadgets || prev.gadgetsList || '',
                emergencyName: matched.details?.emergencyName || matched.details?.emergencyContactName || matched.details?.emergencyContact || prev.emergencyName || matched.details?.parentName || '',
                emergencyNumber: matched.details?.emergencyNumber || matched.details?.emergencyContactNumber || matched.details?.emergencyMobile || prev.emergencyNumber || matched.details?.parentMobile || '',
                docStudentId: matched.details?.docStudentId || matched.details?.studentIdDoc || matched.details?.docStudentIdFile?.name || prev.docStudentId || (matched.details?.docStudentIdFile ? 'Student_ID_Uploaded.pdf' : ''),
                docPhoto: matched.details?.docPhoto || matched.details?.aadharDoc || matched.details?.docAadhar || matched.details?.docPhotoFile?.name || prev.docPhoto || (matched.details?.docPhotoFile ? 'Aadhar_Uploaded.pdf' : ''),
                docStudentIdFile: matched.details?.docStudentIdFile || prev.docStudentIdFile || null,
                docPhotoFile: matched.details?.docPhotoFile || prev.docPhotoFile || null,
                selectedCommittee: matched.details?.committee || matched.details?.selectedCommittee || matched.details?.allocatedCommittee || matched.allocatedCommittee || prev.selectedCommittee || ''
              }));
            } else if (effectiveRegType === 'school') {
              setStep(7);
              setFormData(prev => ({
                ...prev,
                ...matched.details,
                schoolTeacherName: matched.details?.teacherName || prev.schoolTeacherName || '',
                schoolTeacherEmail: matched.details?.teacherEmail || prev.schoolTeacherEmail || '',
                schoolTeacherMobile: matched.details?.teacherMobile || prev.schoolTeacherMobile || '',
                schoolAddress: matched.details?.address || prev.schoolAddress || '',
                schoolNumDelegates: (matched.details?.delegatesCount || matched.details?.delegates?.length || prev.schoolNumDelegates || '5').toString(),
                delegates: matched.details?.delegates || matched.details?.delegatesList || prev.delegates || []
              }));
            }
          } else {
            // Restore form data for active registration but place them on payment step since they haven't paid
            setFormData(prev => ({
              ...prev,
              ...matched.details,
              fullName: matched.details?.fullName || matched.details?.name || prev.fullName || '',
              gender: matched.details?.gender || prev.gender || '',
              dob: matched.details?.dob || prev.dob || '',
              gradeClass: matched.details?.gradeClass || matched.details?.grade || prev.gradeClass || '',
              section: matched.details?.section || prev.section || '',
              schoolName: matched.details?.schoolName || prev.schoolName || '',
              schoolCity: matched.details?.schoolCity || matched.details?.city || prev.schoolCity || '',
              mobile: matched.details?.mobile || matched.details?.phone || prev.mobile || '',
              parentName: matched.details?.parentName || matched.details?.guardianName || prev.parentName || '',
              parentMobile: matched.details?.parentMobile || matched.details?.guardianMobile || prev.parentMobile || '',
              parentEmail: matched.details?.parentEmail || matched.details?.guardianEmail || prev.parentEmail || '',
              isFirstMUN: matched.details?.isFirstMUN || matched.details?.firstTimeMUN || prev.isFirstMUN || 'No',
              numMUNs: (matched.details?.numMUNs !== undefined && matched.details?.numMUNs !== null && matched.details?.numMUNs !== '')
                ? String(matched.details.numMUNs)
                : (matched.details?.munsAttended ? String(matched.details.munsAttended) : ((matched.details?.isFirstMUN === 'No' || prev.isFirstMUN === 'No') ? '1' : '0')),
              medicalConditions: matched.details?.medicalConditions || matched.details?.medical || prev.medicalConditions || '',
              gadgetsList: matched.details?.gadgetsList || matched.details?.gadgets || prev.gadgetsList || '',
              emergencyName: matched.details?.emergencyName || matched.details?.emergencyContactName || matched.details?.emergencyContact || prev.emergencyName || matched.details?.parentName || '',
              emergencyNumber: matched.details?.emergencyNumber || matched.details?.emergencyContactNumber || matched.details?.emergencyMobile || prev.emergencyNumber || matched.details?.parentMobile || '',
              docStudentId: matched.details?.docStudentId || matched.details?.studentIdDoc || matched.details?.docStudentIdFile?.name || prev.docStudentId || (matched.details?.docStudentIdFile ? 'Student_ID_Uploaded.pdf' : ''),
              docPhoto: matched.details?.docPhoto || matched.details?.aadharDoc || matched.details?.docAadhar || matched.details?.docPhotoFile?.name || prev.docPhoto || (matched.details?.docPhotoFile ? 'Aadhar_Uploaded.pdf' : ''),
              docStudentIdFile: matched.details?.docStudentIdFile || prev.docStudentIdFile || null,
              docPhotoFile: matched.details?.docPhotoFile || prev.docPhotoFile || null,
              schoolTeacherName: matched.details?.teacherName || prev.schoolTeacherName || '',
              schoolTeacherEmail: matched.details?.teacherEmail || prev.schoolTeacherEmail || '',
              schoolTeacherMobile: matched.details?.teacherMobile || prev.schoolTeacherMobile || '',
              schoolAddress: matched.details?.schoolAddress || matched.details?.address || prev.schoolAddress || '',
              schoolNumDelegates: (matched.details?.delegatesCount || matched.details?.delegates?.length || prev.schoolNumDelegates || '5').toString()
            }));

            const targetStep = effectiveRegType === 'school' ? 3 : 4;
            setStep(targetStep);
          }

          setPaymentId(matched.paymentId || matched.details?.paymentId);
          if (hasPaidLocally) {
            setIsPaid(true);
            setPaymentStatus('success');
          } else {
            setIsPaid(false);
            setPaymentStatus('pending');
          }
        } else {
          // Check for active registration draft in MongoDB / database
          try {
            const draftRes = await apiClient.get('/registration/draft');
            if (isCancelled) return;

            if (draftRes.data?.draft && draftRes.data.draft.formData) {
              const draft = draftRes.data.draft;
              const urlParams = new URLSearchParams(window.location.search);
              const statusParam = urlParams.get('payment_status');
              const regIdParam = urlParams.get('reg_id');
              const regTypeParam = urlParams.get('reg_type');
              const stepParam = urlParams.get('step');
              const savedType = regTypeParam || localStorage.getItem('cps_mun_reg_type');
              const effectiveRegType = savedType || draft.regType || (regIdParam && regIdParam.includes('SCH') ? 'school' : 'individual');
              setRegType(effectiveRegType);
              localStorage.setItem('cps_mun_reg_type', effectiveRegType);
              
              const isDraftPaid = Boolean(draft.registrationId && localStorage.getItem(`cps_paid_${draft.registrationId}`) === 'true');
              const hasPaidLocally = isDraftPaid;
              const targetStep = stepParam ? parseInt(stepParam, 10) : (effectiveRegType === 'school' ? 3 : 4);
              if (effectiveRegType === 'school') {
                setStep(3);
              } else if (hasPaidLocally || isHost) {
                setStep(targetStep);
              } else if (statusParam || (draft.currentStep && draft.currentStep >= targetStep)) {
                setStep(targetStep);
              } else {
                setStep(draft.currentStep || 1);
              }
              setFormData(prev => ({
                ...prev,
                ...draft.formData,
                fullName: draft.formData.fullName || currentUser?.name || prev.fullName || '',
                email: draft.formData.email || currentUser?.email || prev.email || '',
                schoolTeacherEmail: draft.formData.schoolTeacherEmail || currentUser?.email || prev.schoolTeacherEmail || '',
                isFirstMUN: draft.formData.isFirstMUN || draft.formData.firstTimeMUN || prev.isFirstMUN || 'No',
                numMUNs: (draft.formData.numMUNs !== undefined && draft.formData.numMUNs !== null && draft.formData.numMUNs !== '')
                  ? String(draft.formData.numMUNs)
                  : (draft.formData.munsAttended ? String(draft.formData.munsAttended) : ((draft.formData.isFirstMUN === 'No' || prev.isFirstMUN === 'No') ? '1' : '0')),
                medicalConditions: draft.formData.medicalConditions || draft.formData.medical || prev.medicalConditions || '',
                gadgetsList: draft.formData.gadgetsList || draft.formData.gadgets || prev.gadgetsList || '',
                emergencyName: draft.formData.emergencyName || draft.formData.emergencyContactName || draft.formData.emergencyContact || prev.emergencyName || draft.formData.parentName || '',
                emergencyNumber: draft.formData.emergencyNumber || draft.formData.emergencyContactNumber || draft.formData.emergencyMobile || prev.emergencyNumber || draft.formData.parentMobile || '',
                docStudentId: draft.formData.docStudentId || draft.formData.studentIdDoc || draft.formData.docStudentIdFile?.name || prev.docStudentId || (draft.formData.docStudentIdFile ? 'Student_ID_Uploaded.pdf' : ''),
                docPhoto: draft.formData.docPhoto || draft.formData.aadharDoc || draft.formData.docAadhar || draft.formData.docPhotoFile?.name || prev.docPhoto || (draft.formData.docPhotoFile ? 'Aadhar_Uploaded.pdf' : ''),
                docStudentIdFile: draft.formData.docStudentIdFile || prev.docStudentIdFile || null,
                docPhotoFile: draft.formData.docPhotoFile || prev.docPhotoFile || null
              }));
              if (draft.lastSavedAt) {
                const timeStr = new Date(draft.lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setLastSavedTime(timeStr);
                setSaveStatus('saved');
                setDraftRestoredNotice(`Draft restored (${timeStr}) — Resuming your progress.`);
              }
            } else {
              // Fresh user with no existing registration or draft -> show selection screen
              setRegType(null);
            }
          } catch (draftErr) {
            if (isCancelled) return;
            console.error('Error fetching registration draft:', draftErr);
            setRegType(null);
          }
        }
      } catch (err) {
        if (isCancelled) return;
        console.error('Error loading registration:', err);
        setRegType(null);
      } finally {
        if (!isCancelled) {
          setLoadingRegistration(false);
        }
      }
    };

    if (currentUser && currentUser.email !== 'host@cpsmun.org' && currentUser.role !== 'Admin' && currentUser.role !== 'SuperAdmin' && currentUser.email !== 'cpsprimemun@gmail.com') {
      fetchMyReg();
    } else {
      setLoadingRegistration(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [currentUser]);

  // Reset state when switching flows
  const handleSelectFlow = (type) => {
    if (registrationStatus === 'offline' && !isHost) {
      toast.error('Registrations are currently offline/closed. Please stay tuned.');
      return;
    }
    setRegType(type);
    setStep(1);
    setIsPaid(false);
    setPaymentId('');
    setPaymentStatus('idle');
    setSelectedMethod(null);
    setExcelUploaded(false);
    setErrors({});
    // Clear data except current user info
    setFormData({
      fullName: currentUser?.name || '',
      gender: '',
      dob: '',
      gradeClass: '',
      section: '',
      schoolName: '',
      schoolCity: '',
      email: currentUser?.email || '',
      mobile: '',
      parentName: '',
      parentMobile: '',
      parentEmail: '',
      isFirstMUN: 'No',
      numMUNs: '0',
      medicalConditions: '',
      gadgetsList: '',
      emergencyName: '',
      emergencyNumber: '',
      acceptedTerms: false,
      acceptedRules: false,
      acceptedPrivacy: false,
      acceptedParentConsent: false,
      selectedCommittee: '',
      preference1: '',
      preference2: '',
      preference3: '',
      docStudentId: '',
      docPhoto: '',

      schoolTeacherName: '',
      schoolTeacherEmail: currentUser?.email || '',
      schoolTeacherMobile: '',
      schoolAddress: '',
      schoolNumDelegates: '',
      schoolAuthLetter: '',
      delegates: []
    });
  };

  // Generate dynamic delegate inputs when count changes
  useEffect(() => {
    if (regType === 'school' && formData.schoolNumDelegates) {
      const count = parseInt(formData.schoolNumDelegates, 10) || 0;
      setFormData(prev => {
        const currentDelegates = [...prev.delegates];
        if (currentDelegates.length < count) {
          const diff = count - currentDelegates.length;
          for (let i = 0; i < diff; i++) {
            currentDelegates.push({
              name: '',
              gender: '',
              dob: '',
              gradeClass: '',
              section: '',
              email: '',
              mobile: '',
              parentName: '',
              parentMobile: '',
              parentEmail: '',
              isFirstMUN: 'No',
              numMUNs: '0',
              medicalConditions: '',
              gadgetsList: '',
              emergencyName: '',
              emergencyNumber: '',
              selectedCommittee: '',
              docStudentId: '',
              docPhoto: '',
              acceptedTerms: false,
              acceptedRules: false,
              acceptedPrivacy: false,
              acceptedParentConsent: false
            });
          }
        } else if (currentDelegates.length > count) {
          currentDelegates.length = count;
        }
        return { ...prev, delegates: currentDelegates };
      });
    }
  }, [formData.schoolNumDelegates, regType]);

  // Validation helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  // Authentication Logging Helper
  const saveAuthLog = (email, action, details) => {
    const logs = JSON.parse(localStorage.getItem('cps_mun_auth_logs') || '[]');
    const userAgent = navigator.userAgent;
    let device = 'Desktop';
    if (/Mobi|Android|iPhone/i.test(userAgent)) {
      device = 'Mobile';
    } else if (/iPad|Tablet/i.test(userAgent)) {
      device = 'Tablet';
    }
    
    let browser = 'Unknown Browser';
    if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
    else if (userAgent.indexOf("Safari") > -1) browser = "Safari";
    else if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
    else if (userAgent.indexOf("MSIE") > -1 || !!document.documentMode === true) browser = "IE";

    logs.push({
      timestamp: new Date().toISOString(),
      email: email || 'anonymous',
      action: action,
      details: details,
      ipAddress: '192.168.1.' + Math.floor(10 + Math.random() * 89),
      browser: browser,
      device: device
    });
    localStorage.setItem('cps_mun_auth_logs', JSON.stringify(logs));
  };

  const handleSaveAdminAllocations = async (regId, updatedDelegates, updatedDetails = {}) => {
    const target = allRegistrations.find(r => r.registrationId === regId);
    if (!target) {
      alert("Registration not found.");
      return;
    }

    let detailsUpdate = { 
      ...target.details,
      ...updatedDetails 
    };

    if (target.registrationType === 'individual') {
      detailsUpdate.allocatedCountry = updatedDetails.allocatedCountry !== undefined ? updatedDetails.allocatedCountry : target.allocatedCountry;
      detailsUpdate.allocatedCommittee = updatedDetails.allocatedCommittee !== undefined ? updatedDetails.allocatedCommittee : target.allocatedCommittee;
    } else {
      if (updatedDelegates !== undefined && updatedDelegates !== null) {
        detailsUpdate.delegates = updatedDelegates;
        detailsUpdate.delegatesList = updatedDelegates;
      }
    }

    try {
      const { data } = await apiClient.put(`/registration/update/${target._id}`, {
        allocatedCommittee: updatedDetails.allocatedCommittee || target.allocatedCommittee,
        allocatedCountry: updatedDetails.allocatedCountry || target.allocatedCountry,
        details: detailsUpdate,
      });

      saveAuthLog(currentUser?.email || 'admin', 'ADMIN_RECORD_UPDATED', `Admin updated registration fields for ID ${regId}`);
      toast.success('Allocations and Details saved successfully!');
      
      // Update local state to trigger rerender
      setAllRegistrations(prev => prev.map(r => r._id === data.registration._id ? data.registration : r));
      setAdminSelectedReg(data.registration);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save admin changes to database.');
    }
  };

  const handleToggleLockStatus = async (regId) => {
    const target = allRegistrations.find(r => r.registrationId === regId);
    if (!target) return;

    const isLocked = !target.details?.isLocked;
    const detailsUpdate = {
      ...target.details,
      isLocked,
    };

    try {
      const { data } = await apiClient.put(`/registration/update/${target._id}`, {
        details: detailsUpdate,
      });

      saveAuthLog(currentUser?.email || 'admin', 'ADMIN_LOCK_TOGGLED', `Admin toggled lock status for ID ${regId} to ${isLocked ? 'LOCKED' : 'UNLOCKED'}`);
      toast.success(`Registration status changed to ${isLocked ? 'LOCKED' : 'UNLOCKED'}`);
      
      // Update local state to trigger rerender
      setAllRegistrations(prev => prev.map(r => r._id === data.registration._id ? data.registration : r));
      setAdminSelectedReg(data.registration);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update lock status.');
    }
  };

  const handleClearAllData = async () => {
    const confirmed = window.confirm(
      '⚠️ WARNING: This will permanently delete ALL registration data, user accounts, and audit logs from the database AND the Excel sheet.\n\nAdmin accounts will be preserved.\n\nAre you absolutely sure?'
    );
    if (!confirmed) return;

    const doubleConfirmed = window.confirm(
      'Final confirmation: Delete ALL registrations, delegate credentials, and logs from the database? This cannot be undone.'
    );
    if (!doubleConfirmed) return;

    try {
      await apiClient.delete('/registration/admin/clear-all');

      // Clear local state
      setAllRegistrations([]);
      setAdminSelectedReg(null);

      // Clear localStorage caches
      localStorage.removeItem('cps_mun_registrations');
      localStorage.removeItem('cps_mun_auth_logs');

      toast.success('✅ All data cleared successfully. Admin accounts preserved. Excel file deleted.');
    } catch (err) {
      console.error('Clear all data failed:', err);
      toast.error(err?.response?.data?.message || '❌ Failed to clear data. Please try again.');
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleResendEmail = async (id, recipient, emailType, delegateIndex = null) => {
    try {
      await apiClient.post('/registration/admin/resend', { id, recipient, emailType, delegateIndex });
      toast.success(`Successfully resent "${emailType}" notification.`);
    } catch (err) {
      console.error('Error resending email:', err);
      toast.error(err.response?.data?.message || 'Failed to resend email.');
    }
  };

  const handleDeleteRegistration = async (id) => {
    if (!window.confirm("Are you absolutely sure you want to permanently delete this registration? This will delete their database record, delete their candidate login credentials, auto-dispatch a cancellation email, and update the master Excel. This action CANNOT be undone.")) {
      return;
    }
    try {
      await apiClient.delete(`/registration/admin/delete/${id}`);
      toast.success('Registration and associated login credentials removed successfully.');
      setAdminSelectedReg(null);
      await fetchAllRegistrations();
      await fetchUserCredentials();
    } catch (err) {
      console.error('Error deleting registration:', err);
      toast.error(err.response?.data?.message || 'Failed to delete registration.');
    }
  };

  const handleDeleteUserCredential = async (id, email, role) => {
    if (role === 'Admin' || role === 'SuperAdmin') {
      toast.error('Cannot delete Admin or SuperAdmin credentials.');
      return;
    }
    if (!window.confirm(`Are you sure you want to permanently delete the login credential for "${email}"? This delegate will no longer be able to log in.`)) {
      return;
    }
    try {
      await apiClient.delete(`/registration/admin/user-credential/${encodeURIComponent(id || email)}`);
      toast.success(`Login credential and associated registration records for ${email} deleted successfully.`);
      await fetchAllRegistrations();
      await fetchUserCredentials();
    } catch (err) {
      console.error('Error deleting user credential:', err);
      toast.error(err.response?.data?.message || 'Failed to delete user credential.');
    }
  };

  const handleChangeUserPassword = async (email) => {
    const newPassword = window.prompt(`Enter a new password for "${email}":`);
    if (newPassword === null) return; // User cancelled
    if (newPassword.trim().length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    try {
      await apiClient.put('/registration/admin/update-user-password', {
        email: email.toLowerCase(),
        newPassword: newPassword.trim()
      });
      toast.success(`Password updated successfully for ${email}.`);
      await fetchUserCredentials();
    } catch (err) {
      console.error('Error changing user password:', err);
      toast.error(err.response?.data?.message || 'Failed to update password.');
    }
  };

  const handleAssignPortfolio = async (regId, delegateIndex, committee, country) => {
    try {
      const { data } = await apiClient.post('/registration/admin/assign', {
        registrationId: regId,
        delegateIndex,
        allocatedCommittee: committee,
        allocatedCountry: country
      });
      await fetchAllRegistrations();
      if (adminSelectedReg && adminSelectedReg.registrationId === regId) {
        setAdminSelectedReg(data.registration);
      }
      toast.success(`Successfully allocated "${country}" to delegate.`);
    } catch (err) {
      console.error('Error assigning portfolio:', err);
      toast.error(err.response?.data?.message || 'Failed to assign portfolio.');
    }
  };

  const handleSwapPortfolios = async (delegateA, delegateB) => {
    try {
      await apiClient.post('/registration/admin/swap', {
        delegateA: {
          registrationId: delegateA.registrationId,
          delegateIndex: delegateA.delegateIndex
        },
        delegateB: {
          registrationId: delegateB.registrationId,
          delegateIndex: delegateB.delegateIndex
        }
      });
      await fetchAllRegistrations();
      await fetchUserCredentials();
      setSwapSource(null);
      toast.success("Successfully swapped delegate allocations!");
    } catch (err) {
      console.error('Error swapping portfolios:', err);
      toast.error(err.response?.data?.message || 'Failed to swap portfolios.');
    }
  };

  const handleExportAllData = async () => {
    try {
      const response = await apiClient.get('/registration/admin/download-excel', {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'master_registration.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('✅ Master Excel exported successfully from server!');
    } catch (err) {
      console.error('Failed to export Master Excel:', err);
      // When responseType is 'blob', error responses are also blobs — parse them to get the real message
      let errorMessage = 'Failed to download master Excel sheet.';
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          errorMessage = json.message || errorMessage;
        } catch (parseErr) {
          // Blob wasn't JSON, keep default message
        }
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 401) {
        errorMessage = 'Session expired. Please sign out and sign in again.';
      } else if (err.response?.status === 403) {
        errorMessage = 'Admin access required. Please sign in with an admin account.';
      } else if (!err.response) {
        errorMessage = 'Network error — could not reach the server. Please check your connection.';
      }
      alert(`❌ ${errorMessage}`);
    }
  };

  // Authentication Handlers
  const handleSignOut = () => {
    if (currentUser) {
      saveAuthLog(currentUser.email, 'SIGN_OUT', `User ${currentUser.name} signed out`);
    }
    logout();
    localStorage.removeItem('cps_mun_current_user');
    sessionStorage.removeItem('cps_mun_current_user');
    setCurrentUser(null);
    setRegType(null);
    setStep(1);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!authEmail.trim()) {
      errs.email = 'Email Address is required';
    } else if (!validateEmail(authEmail)) {
      errs.email = 'Invalid Email format';
    }
    if (!authPassword) {
      errs.password = 'Password is required';
    }

    if (Object.keys(errs).length > 0) {
      setAuthErrors(errs);
      return;
    }

    try {
      // Authenticate directly against MongoDB / Backend
      const authenticatedUser = await login(authEmail, authPassword);
      
      const userSession = { name: authenticatedUser.name, email: authenticatedUser.email };
      if (rememberMe) {
        localStorage.setItem('cps_mun_current_user', JSON.stringify(userSession));
        sessionStorage.removeItem('cps_mun_current_user');
      } else {
        sessionStorage.setItem('cps_mun_current_user', JSON.stringify(userSession));
        localStorage.removeItem('cps_mun_current_user');
      }
      
      setAuthErrors({});
      saveAuthLog(authenticatedUser.email, 'SIGN_IN_SUCCESS', `User ${authenticatedUser.name} logged in successfully`);

      // Reset auth inputs
      setAuthName('');
      setAuthEmail('');
      setAuthPassword('');
      setAuthConfirmPassword('');
    } catch (err) {
      saveAuthLog(authEmail, 'SIGN_IN_FAILED', `Failed login attempt: ${err}`);
      setAuthErrors({ form: typeof err === 'string' ? err : 'Incorrect email or password.' });
      toast.error(typeof err === 'string' ? err : 'Incorrect email or password.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const errs = {};
    if (!authName.trim()) errs.name = 'Full Name is required';
    if (!authEmail.trim()) {
      errs.email = 'Email Address is required';
    } else if (!validateEmail(authEmail)) {
      errs.email = 'Invalid Email format';
    }
    if (!authPassword) {
      errs.password = 'Password is required';
    } else if (authPassword.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (authPassword !== authConfirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errs).length > 0) {
      setAuthErrors(errs);
      return;
    }

    // Check if account already exists
    const users = JSON.parse(localStorage.getItem('cps_mun_users') || '[]');
    const alreadyExists = users.some(u => u.email.toLowerCase() === authEmail.toLowerCase());

    if (alreadyExists) {
      saveAuthLog(authEmail, 'SIGN_UP_FAILED', 'Failed signup - email already exists');
      setAuthErrors({ email: 'An account with this email already exists.' });
      return;
    }

    // Save account
    const newUser = {
      name: authName.trim(),
      email: authEmail.trim().toLowerCase(),
      password: authPassword
    };

    users.push(newUser);
    localStorage.setItem('cps_mun_users', JSON.stringify(users));

    // Automatically log in
    const userSession = { name: newUser.name, email: newUser.email };
    if (rememberMe) {
      localStorage.setItem('cps_mun_current_user', JSON.stringify(userSession));
      sessionStorage.removeItem('cps_mun_current_user');
    } else {
      sessionStorage.setItem('cps_mun_current_user', JSON.stringify(userSession));
      localStorage.removeItem('cps_mun_current_user');
    }
    setCurrentUser(userSession);
    setAuthErrors({});
    saveAuthLog(newUser.email, 'SIGN_UP_SUCCESS', `Account created successfully and logged in for ${newUser.name}`);

    // Reset registration type & local draft storage for fresh account
    localStorage.removeItem('cps_mun_reg_type');
    localStorage.removeItem('cps_mun_saved_formdata');
    localStorage.removeItem('cps_payment_verified');
    setRegType(null);
    setStep(1);

    // Reset inputs
    setAuthName('');
    setAuthEmail('');
    setAuthPassword('');
    setAuthConfirmPassword('');
  };

  // Handle Forgot Password Flows
  const handleForgotEmailSubmit = (e) => {
    e.preventDefault();
    setAuthErrors({});
    if (!forgotEmail.trim()) {
      setAuthErrors({ forgotEmail: 'Email Address is required' });
      return;
    } else if (!validateEmail(forgotEmail)) {
      setAuthErrors({ forgotEmail: 'Invalid Email format' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('cps_mun_users') || '[]');
    const matchedUser = users.find(u => u.email.toLowerCase() === forgotEmail.toLowerCase());

    if (!matchedUser) {
      setAuthErrors({ forgotEmail: 'No account registered with this email.' });
      return;
    }

    // Generate random 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    
    // Simulate sending OTP via alert or a notification block
    setOtpAlert(`📧 OTP sent successfully! Use code: ${otp} (Simulated)`);
    setForgotStep(2);
  };

  const handleForgotOtpVerify = (e) => {
    e.preventDefault();
    setAuthErrors({});
    if (!enteredOtp.trim()) {
      setAuthErrors({ otp: 'Please enter the 6-digit OTP' });
      return;
    }

    if (enteredOtp.trim() !== generatedOtp) {
      setAuthErrors({ otp: 'Incorrect OTP. Please check the code.' });
      return;
    }

    setForgotStep(3);
    setOtpAlert(null);
  };

  const handleForgotResetSubmit = (e) => {
    e.preventDefault();
    setAuthErrors({});
    if (!newPassword) {
      setAuthErrors({ newPassword: 'Password is required' });
      return;
    } else if (newPassword.length < 6) {
      setAuthErrors({ newPassword: 'Password must be at least 6 characters' });
      return;
    }

    if (newPassword !== newConfirmPassword) {
      setAuthErrors({ newConfirmPassword: 'Passwords do not match' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('cps_mun_users') || '[]');
    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === forgotEmail.toLowerCase()) {
        return { ...u, password: newPassword };
      }
      return u;
    });

    localStorage.setItem('cps_mun_users', JSON.stringify(updatedUsers));
    saveAuthLog(forgotEmail, 'PASSWORD_RESET', 'User successfully reset their password');
    
    alert('✅ Password reset successful! You can now log in with your new password.');
    
    // Reset forgot states
    setAuthState('signin');
    setForgotStep(1);
    setForgotEmail('');
    setGeneratedOtp('');
    setEnteredOtp('');
    setNewPassword('');
    setNewConfirmPassword('');
  };

  // Validate Step 1 (Individual - Personal details)
  const validateIndividualStep1 = () => {
    const errs = {};
    if (!(formData.fullName || '').trim()) errs.fullName = 'Full Name is required';
    if (!formData.gender) errs.gender = 'Gender is required';
    if (!formData.dob) errs.dob = 'Date of Birth is required';
    
    const grade = parseInt(formData.gradeClass, 10);
    if (!formData.gradeClass) {
      errs.gradeClass = 'Grade is required';
    } else if (isNaN(grade) || grade < 1 || grade > 12) {
      errs.gradeClass = 'Eligible for Class 1 to 12 only';
    }

    if (!(formData.section || '').trim()) errs.section = 'Section is required';
    if (!(formData.schoolName || '').trim()) errs.schoolName = 'School Name is required';
    if (!(formData.schoolCity || '').trim()) errs.schoolCity = 'School City is required';

    const effectiveEmail = (formData.email || currentUser?.email || '').trim().toLowerCase();
    if (!effectiveEmail) {
      errs.email = 'Email Address is required';
    } else if (!validateEmail(effectiveEmail)) {
      errs.email = 'Invalid Email format';
    }

    if (!(formData.mobile || '').trim()) {
      errs.mobile = 'Mobile Number is required';
    } else if (!validatePhone(formData.mobile)) {
      errs.mobile = 'Mobile must be 10 digits';
    }

    if (!(formData.parentName || '').trim()) errs.parentName = 'Parent Name is required';
    if (!(formData.parentMobile || '').trim()) {
      errs.parentMobile = 'Parent Mobile is required';
    } else if (!validatePhone(formData.parentMobile)) {
      errs.parentMobile = 'Mobile must be 10 digits';
    }
    if (!(formData.parentEmail || '').trim()) {
      errs.parentEmail = 'Parent Email is required';
    } else if (!validateEmail(formData.parentEmail)) {
      errs.parentEmail = 'Invalid Email format';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 2 (Individual - Delegate details)
  const validateIndividualStep2 = () => {
    const errs = {};
    if (formData.isFirstMUN === 'No') {
      const num = parseInt(formData.numMUNs, 10);
      if (!formData.numMUNs || isNaN(num) || num < 1) {
        errs.numMUNs = 'Number of MUNs attended must be at least 1 when First-time MUN is No';
      }
    }
    if (!(formData.emergencyName || '').trim()) errs.emergencyName = 'Emergency Name is required';
    if (!(formData.emergencyNumber || '').trim()) {
      errs.emergencyNumber = 'Emergency Number is required';
    } else if (!validatePhone(formData.emergencyNumber)) {
      errs.emergencyNumber = 'Mobile must be 10 digits';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 3 (Individual - Document Upload)
  const validateIndividualStep3 = () => {
    const errs = {};
    if (!formData.docStudentId) errs.docStudentId = 'Student ID Card is required';
    if (!formData.docPhoto) errs.docPhoto = 'Aadhar Card Copy is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 6 (Individual - Preferences removed, bypass)
  // eslint-disable-next-line no-unused-vars
  const validateIndividualStep6 = () => {
    return true;
  };

  // Validate Step 7 (Individual - Declarations)
  const validateIndividualStep7 = () => {
    const errs = {};
    if (!formData.acceptedTerms) errs.acceptedTerms = 'You must confirm these details';
    if (!formData.acceptedRules) errs.acceptedRules = 'You must agree to the rules';
    if (!formData.acceptedPrivacy) errs.acceptedPrivacy = 'You must agree to the privacy policy';
    if (!formData.acceptedParentConsent) errs.acceptedParentConsent = 'Parental consent is mandatory';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Download Roster Excel template
  // eslint-disable-next-line no-unused-vars
  const handleDownloadExcelTemplate = () => {
    const headers = [
      'S.No', 'Full Name', 'Gender', 'DOB (YYYY-MM-DD)', 'Grade (IX-XII)', 'Section', 
      'Email', 'Mobile', 'Parent Name', 'Parent Mobile', 'Parent Email', 
      'First-time MUN (Yes/No)', 'Number of MUNs', 'Medical Conditions', 
      'Emergency Contact Name', 'Emergency Mobile', 'Preferred Committee'
    ];
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Roster Template');
    XLSX.writeFile(wb, 'CPS_PRIME_MUN_School_Delegation_Roster_Template.xlsx');
  };

  // Import Excel roster
  // eslint-disable-next-line no-unused-vars
  const handleImportExcelRoster = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const delegatesList = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length < 2) continue;

          delegatesList.push({
            name: String(row[1] || '').trim(),
            gender: String(row[2] || '').trim(),
            dob: String(row[3] || '').trim(),
            gradeClass: String(row[4] || '').trim(),
            section: String(row[5] || '').trim(),
            email: String(row[6] || '').trim(),
            mobile: String(row[7] || '').trim(),
            parentName: String(row[8] || '').trim(),
            parentMobile: String(row[9] || '').trim(),
            parentEmail: String(row[10] || '').trim(),
            isFirstMUN: String(row[11] || 'No').trim(),
            numMUNs: String(row[12] || '0').trim(),
            medicalConditions: String(row[13] || '').trim(),
            emergencyName: String(row[14] || '').trim(),
            emergencyNumber: String(row[15] || '').trim(),
            selectedCommittee: String(row[16] || '').trim(),
            docStudentId: '',
            docPhoto: '',
            acceptedTerms: true,
            acceptedRules: true,
            acceptedPrivacy: true,
            acceptedParentConsent: true
          });
        }

        if (delegatesList.length > 0) {
          setFormData(prev => ({
            ...prev,
            schoolNumDelegates: delegatesList.length.toString(),
            delegates: delegatesList
          }));
          setExcelUploaded(true);
          alert(`🎉 Successfully parsed and loaded ${delegatesList.length} delegates from Excel roster!`);
        } else {
          alert('No delegates found in sheet. Please verify columns.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to read Excel file. Please use the valid template.');
      } finally {
        setExcelLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  // Validate Step 1 (School)
  const validateSchoolStep1 = () => {
    const errs = {};
    if (!(formData.schoolName || '').trim()) errs.schoolName = 'School Name is required';
    if (!(formData.schoolCity || '').trim()) errs.schoolCity = 'School City is required';
    if (!(formData.schoolTeacherName || '').trim()) errs.schoolTeacherName = 'Teacher-in-Charge Name is required';
    const effectiveTeacherEmail = (formData.schoolTeacherEmail || currentUser?.email || '').trim().toLowerCase();
    if (!effectiveTeacherEmail) {
      errs.schoolTeacherEmail = 'Teacher Email is required';
    } else if (!validateEmail(effectiveTeacherEmail)) {
      errs.schoolTeacherEmail = 'Invalid Email format';
    }
    if (!(formData.schoolTeacherMobile || '').trim()) {
      errs.schoolTeacherMobile = 'Teacher Mobile is required';
    } else if (!validatePhone(formData.schoolTeacherMobile)) {
      errs.schoolTeacherMobile = 'Mobile must be 10 digits';
    }
    if (!(formData.schoolAddress || '').trim()) errs.schoolAddress = 'School Address is required';
    
    const count = parseInt(formData.schoolNumDelegates, 10);
    if (!formData.schoolNumDelegates || isNaN(count) || count <= 0) {
      errs.schoolNumDelegates = 'Please enter a valid number of delegates';
    } else if (count > 30) {
      errs.schoolNumDelegates = 'Maximum delegation size is 30';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 5 (School Documents)
  const validateSchoolStep5Documents = () => {
    const errs = {};
    if (!formData.schoolAuthLetter) {
      errs.schoolAuthLetter = 'Principal Official Authorization Letter is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateSchoolStep4Delegates = () => {
    const errs = {};
    const delegateErrors = [];
    let hasError = false;

    formData.delegates.forEach((del, idx) => {
      const delErr = {};
      if (!(del.name || '').trim()) { delErr.name = 'Name is required'; hasError = true; }
      if (!del.gender) { delErr.gender = 'Gender is required'; hasError = true; }
      if (!del.dob) { delErr.dob = 'DOB is required'; hasError = true; }
      
      const grade = parseInt(del.gradeClass, 10);
      if (!del.gradeClass) {
        delErr.gradeClass = 'Grade is required';
        hasError = true;
      } else if (isNaN(grade) || grade < 1 || grade > 12) {
        delErr.gradeClass = 'Class 1 to 12 only';
        hasError = true;
      }

      if (!(del.section || '').trim()) { delErr.section = 'Section is required'; hasError = true; }
      
      if (!(del.email || '').trim()) {
        delErr.email = 'Email is required';
        hasError = true;
      } else if (!validateEmail(del.email)) {
        delErr.email = 'Invalid format';
        hasError = true;
      }

      if (!(del.mobile || '').trim()) {
        delErr.mobile = 'Mobile is required';
        hasError = true;
      } else if (!validatePhone(del.mobile)) {
        delErr.mobile = '10 digits required';
        hasError = true;
      }

      // Parent details removed from school delegate roster


      if (!del.selectedCommittee) {
        delErr.selectedCommittee = 'Committee is required';
        hasError = true;
      }

      delegateErrors[idx] = delErr;
    });

    if (hasError) {
      errs.delegates = delegateErrors;
      setErrors(errs);
    } else {
      setErrors({});
    }
    return !hasError;
  };


  // Payment triggers
  const handleProceedPayment = () => {
    setErrors({});
    handleInitiateHdfcPayment();
  };

  // Simulate payment success
  const handlePaymentSuccess = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      const mockPayId = 'PAY-CPS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setPaymentId(mockPayId);
      setIsPaid(true);
      setPaymentStatus('success');
      
      // Auto close gateway after a short delay
      setTimeout(() => {
        setShowPaymentGateway(false);
        setStep(prev => prev + 1);
      }, 1500);
    }, 1200);
  };

  // Simulate payment failure
  const handlePaymentFailure = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('failed');
    }, 1000);
  };

  const handleClearAllPayments = () => {
    setShowClearPaymentsModal(true);
  };

  const confirmClearAllPayments = async () => {
    try {
      setClearingPaymentsLoading(true);
      await apiClient.post('/payment/hdfc/clear-all');

      // 1. Wipe all local storage persistent keys
      localStorage.removeItem('cps_payment_verified');
      localStorage.removeItem('cps_mun_paid_txn_id');
      localStorage.removeItem('cps_mun_saved_formdata');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cps_paid_') || key.startsWith('cps_mun_draft_')) {
          localStorage.removeItem(key);
        }
      });

      // 2. Reset all local component state
      setIsPaid(false);
      setPaymentStatus('failed');
      setPaymentId('');
      setMyRegistration(null);
      setAllRegistrations([]);
      setFormData({
        fullName: currentUser?.name || currentUser?.fullName || '',
        email: currentUser?.email || '',
        gender: '',
        dob: '',
        gradeClass: '',
        section: '',
        schoolName: '',
        schoolCity: '',
        mobile: '',
        parentName: '',
        parentMobile: '',
        parentEmail: '',
        pref1: '',
        pref2: '',
        pref3: '',
        selectedCommittee: ''
      });

      // 3. Re-sync user auth session from backend
      if (typeof checkAuth === 'function') {
        await checkAuth();
      }

      setShowClearPaymentsModal(false);
      toast.success('All payment & registration records cleared successfully!');
      setStep(1);

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.error('Clear payments error:', err);
      toast.error('Failed to clear payment records.');
    } finally {
      setClearingPaymentsLoading(false);
    }
  };

  // Initiate Direct HDFC Payment Gateway Redirect (Production)
  const handleInitiateHdfcPayment = async () => {
    try {
      // ── Payment Bypass: test accounts skip the HDFC gateway entirely ──────
      const bypassEmails = [
        'counsellor.ann@chennaipublicschool.com',
        'reena@cpsglobalschool.com',
        'omarm@cpsglobalschool.com'
      ];
      const currentEmail = (currentUser?.email || '').toLowerCase().trim();
      if (currentUser?.paymentBypass || bypassEmails.includes(currentEmail)) {
        toast.success('Test account: payment bypassed – no gateway redirect.');
        const mockPayId = 'BYPASS-' + Date.now().toString(36).toUpperCase();
        setPaymentId(mockPayId);
        setIsPaid(true);
        setPaymentStatus('success');
        localStorage.setItem('cps_payment_verified', 'true');
        localStorage.setItem('cps_mun_paid_txn_id', mockPayId);
        return;
      }
      // ─────────────────────────────────────────────────────────────────────

      const effectiveType = regType || localStorage.getItem('cps_mun_reg_type') || 'school';
      const activeReg = typeof getCandidateRegistration === 'function' ? getCandidateRegistration() : null;
      let regId = activeReg?.registrationId;
      if (!regId || (effectiveType === 'school' && !regId.includes('SCH'))) {
        regId = 'CPS-' + (effectiveType === 'school' ? 'SCH' : 'IND') + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      }
      
      const numDelegates = effectiveType === 'individual' 
        ? 1 
        : (parseInt(formData.schoolNumDelegates, 10) || (formData.delegates && formData.delegates.length) || 1);
        
      const amount = effectiveType === 'individual' ? globalFeeRate : (numDelegates * globalFeeRate);
      
      const schoolName = formData.schoolName || (effectiveType === 'individual' ? 'Individual' : 'School Delegation');
      const customerName = effectiveType === 'individual' 
        ? (formData.fullName || 'Delegate')
        : (formData.schoolTeacherName || formData.teacherName || 'Faculty Advisor');
      const customerEmail = effectiveType === 'individual'
        ? (formData.email || currentUser?.email || '')
        : (formData.schoolTeacherEmail || formData.teacherEmail || currentUser?.email || '');
      const customerMobile = effectiveType === 'individual'
        ? (formData.mobile || '')
        : (formData.schoolTeacherMobile || formData.teacherMobile || '');

      // Save current form data & draft locally and to backend before gateway redirect
      const activeStep = effectiveType === 'school' ? 3 : 4;
      if (effectiveType === 'school') {
        localStorage.setItem('cps_school_payment_attempted', 'true');
      }
      localStorage.setItem('cps_mun_reg_type', effectiveType);
      localStorage.setItem('cps_mun_saved_formdata', JSON.stringify({ formData, regType: effectiveType }));
      try {
        await apiClient.post('/registration/draft', { formData, regType: effectiveType, currentStep: activeStep });
      } catch (err) {}

      const toastId = toast.loading(`Redirecting to HDFC Payment Gateway (₹${amount.toFixed(2)})...`);

      const res = await apiClient.post('/payment/hdfc/initiate', {
        registrationId: regId,
        amount,
        customerName,
        customerEmail,
        customerMobile,
        schoolName,
        regType: effectiveType,
        numDelegates,
        details: formData,
        formData: formData
      });

      if (res.data && res.data.success && res.data.gatewayUrl && res.data.encRequest) {
        toast.dismiss(toastId);
        
        // Dynamically submit POST form to HDFC Test Gateway URL
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = res.data.gatewayUrl;

        const encInput = document.createElement('input');
        encInput.type = 'hidden';
        encInput.name = 'encRequest';
        encInput.value = res.data.encRequest;
        form.appendChild(encInput);

        const accessInput = document.createElement('input');
        accessInput.type = 'hidden';
        accessInput.name = 'access_code';
        accessInput.value = res.data.accessCode;
        form.appendChild(accessInput);

        if (res.data.merchantCode) {
          const merchantInput = document.createElement('input');
          merchantInput.type = 'hidden';
          merchantInput.name = 'merchant_id';
          merchantInput.value = res.data.merchantCode;
          form.appendChild(merchantInput);
        }

        document.body.appendChild(form);
        form.submit();
      } else {
        toast.dismiss(toastId);
        toast.error('Failed to obtain HDFC payment parameters. Please try again.');
      }
    } catch (err) {
      console.error('HDFC Payment initiation error:', err);
      toast.error('Unable to connect to HDFC Payment Gateway.');
    }
  };

  const handleDownloadConfirmationLetter = (regParam) => {
    const reg = regParam || myRegistration || {};
    const details = reg.details || {};
    const localSaved = JSON.parse(localStorage.getItem('cps_mun_saved_formdata') || '{}').formData || {};

    const fullName = details.fullName || formData.fullName || localSaved.fullName || 'Delegate';
    const gender = details.gender || formData.gender || localSaved.gender || 'N/A';
    const schoolName = details.schoolName || formData.schoolName || localSaved.schoolName || 'Chennai Public School';
    const gradeClass = details.gradeClass || formData.gradeClass || localSaved.gradeClass || '11';
    const section = details.section || formData.section || localSaved.section || 'A';
    const preferredCommittee = reg.allocatedCommittee || details.committee || details.selectedCommittee || formData.selectedCommittee || localSaved.selectedCommittee || 'Economic and Social Council (ECOSOC)';
    const allocatedCountry = reg.allocatedCountry || details.allocatedCountry || formData.allocatedCountry || localSaved.allocatedCountry || 'Pending Secretariat Allocation';
    const regId = reg.registrationId || 'CPS-IND-501';
    const paymentIdVal = reg.paymentId || details.paymentId || paymentId || localStorage.getItem('cps_mun_paid_txn_id') || 'PAY-VERIFIED-1001';
    const amountPaidVal = parseFloat(reg.amountPaid || details.amountPaid || 1) || 1;

    const htmlContent = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>CPS PRIME MUN 5.O - Confirmation Letter</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            * {
              box-sizing: border-box;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #111111;
              font-family: 'Times New Roman', Times, serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            body {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 15mm 20mm;
              box-sizing: border-box;
              line-height: 1.6;
            }
            .header { text-align: center; border-bottom: 3px double #dca843; padding-bottom: 15px; margin-bottom: 25px; }
            .logo { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #111; text-transform: uppercase; }
            .subtitle { font-size: 12px; letter-spacing: 1px; color: #555; text-transform: uppercase; }
            .title { text-align: center; font-size: 18px; font-weight: bold; text-decoration: underline; margin-bottom: 25px; }
            .meta-info { display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 13px; }
            .meta-block { display: inline-block; width: 48%; }
            .content { font-size: 13.5px; text-align: justify; margin-bottom: 30px; line-height: 1.6; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table th, .details-table td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; font-size: 12.5px; }
            .details-table th { background: #f8fafc; font-weight: bold; width: 25%; color: #334155; }
            .footer-signatures { display: flex; justify-content: space-between; margin-top: 40px; font-size: 13px; page-break-inside: avoid; }
            .signature-line { border-top: 1.5px solid #111; width: 200px; text-align: center; padding-top: 5px; font-weight: 600; }
            @media print {
              html, body {
                width: 210mm;
                min-height: 297mm;
                margin: 0 auto;
                padding: 10mm 15mm;
              }
              button, .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">CPS PRIME MUN 5.O</div>
            <div class="subtitle">Official Delegate Confirmation Letter</div>
            <div style="font-size: 10px; color: #777; margin-top: 5px;">Secretariat: Chennai Public School, Chennai</div>
          </div>
          
          <div class="title">OFFICIAL CONFIRMATION OF REGISTRATION</div>
          
          <div class="meta-info">
            <div class="meta-block">
              <strong>Registration ID:</strong> ${regId}<br/>
              <strong>Delegate ID:</strong> DEL-${(regId || '').split('-')[2] || '001'}<br/>
              <strong>Date:</strong> ${new Date(reg.registeredAt || Date.now()).toLocaleDateString()}
            </div>
            <div class="meta-block" style="text-align: right;">
              <strong>Payment ID:</strong> ${paymentIdVal}<br/>
              <strong>Payment Status:</strong> Verified & Successful<br/>
              <strong>Amount Paid:</strong> ₹${amountPaidVal.toFixed(2)}
            </div>
          </div>
          
          <div class="content">
            Dear <strong>${fullName}</strong>,<br/><br/>
            On behalf of the Chennai Public School Model United Nations Secretariat, we are pleased to confirm your registration as an individual delegate for the upcoming <strong>CPS PRIME MUN 5.O Conference</strong>, scheduled to take place at Chennai Public School campus.<br/><br/>
            Your application and delegate fees have been successfully processed and verified. Please find your registration details below:
            
            <table class="details-table">
              <tr>
                <th>Delegate Name</th>
                <td>${fullName}</td>
                <th>Gender</th>
                <td>${gender}</td>
              </tr>
              <tr>
                <th>Institution/School</th>
                <td>${schoolName}</td>
                <th>Class & Section</th>
                <td>Grade ${gradeClass} - ${section}</td>
              </tr>
              <tr>
                <th>Preferred Committee</th>
                <td colspan="3">${preferredCommittee}</td>
              </tr>

              <tr>
                <th>Allocated Country</th>
                <td colspan="3" style="color: #10b981; font-weight: bold;">
                  ${/IPP|IPJ/i.test(preferredCommittee || '') ? 'N/A' : allocatedCountry} (${preferredCommittee})
                </td>
              </tr>
            </table>
            
            Please note that your final country/portfolio allocation is subject to review by the Executive Board and the Organizing Committee. An update will be available on your candidate dashboard as allocations are finalized.<br/><br/>
            We look forward to welcoming you for two days of intense debate, diplomacy, and collaboration. Please carry a printed copy of this letter or display the registration ID card on your mobile device at the entry desk.
          </div>
          
          <div class="footer-signatures">
            <div>
              <div style="height: 100px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 5px;">
                <img src="/signatures/new_director_signature_2026.png" style="max-height: 90px; max-width: 180px; object-fit: contain;" />
              </div>
              <div class="signature-line">
                Secretary-General<br/>
                <span style="font-size: 10px; color: #555;">CPS PRIME MUN 5.O</span>
              </div>
            </div>
            <div>
              <div style="height: 100px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 5px;">
                <img src="/signatures/new_sg_signature_2026.png" style="max-height: 90px; max-width: 180px; object-fit: contain;" />
              </div>
              <div class="signature-line" style="margin-left: auto;">
                Director of Registrations<br/>
                <span style="font-size: 10px; color: #555;">CPS PRIME MUN 5.O</span>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 50px;">
            <button onclick="window.print()" style="background: #dca843; border: none; color: black; font-weight: bold; padding: 12px 30px; font-size: 13px; cursor: pointer; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              Print Confirmation Letter
            </button>
          </div>
        </body>
      </html>`;

    // 1. Instant File Download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `CPS_PRIME_MUN_Confirmation_Letter_${reg.registrationId || 'DELEGATE'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Open letter window for instant viewing & printing
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        try {
          printWindow.focus();
          printWindow.print();
        } catch (err) {}
      }, 400);
    }
  };

  // Download School Delegation Confirmation Letter
  const handleDownloadSchoolConfirmationLetter = (reg, delegateIdx) => {
    const details = reg.details || {};
    const delegates = details.delegates || details.delegatesList || [];
    const del = delegates[delegateIdx] || {};
    const htmlContent = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>CPS PRIME MUN 5.O - Delegate Confirmation Letter</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            * {
              box-sizing: border-box;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #111111;
              font-family: 'Times New Roman', Times, serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            body {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 15mm 20mm;
              box-sizing: border-box;
              line-height: 1.6;
            }
            .header { text-align: center; border-bottom: 3px double #dca843; padding-bottom: 15px; margin-bottom: 25px; }
            .logo { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #111; text-transform: uppercase; }
            .subtitle { font-size: 12px; letter-spacing: 1px; color: #555; text-transform: uppercase; }
            .title { text-align: center; font-size: 18px; font-weight: bold; text-decoration: underline; margin-bottom: 25px; }
            .meta-info { display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 13px; }
            .meta-block { display: inline-block; width: 48%; }
            .content { font-size: 13.5px; text-align: justify; margin-bottom: 30px; line-height: 1.6; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table th, .details-table td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; font-size: 12.5px; }
            .details-table th { background: #f8fafc; font-weight: bold; width: 25%; color: #334155; }
            .footer-signatures { display: flex; justify-content: space-between; margin-top: 40px; font-size: 13px; page-break-inside: avoid; }
            .signature-line { border-top: 1.5px solid #111; width: 200px; text-align: center; padding-top: 5px; font-weight: 600; }
            @media print {
              html, body {
                width: 210mm;
                min-height: 297mm;
                margin: 0 auto;
                padding: 10mm 15mm;
              }
              button, .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">CPS PRIME MUN 5.O</div>
            <div class="subtitle">Official Delegate Confirmation Letter</div>
            <div style="font-size: 10px; color: #777; margin-top: 5px;">Secretariat: Chennai Public School, Chennai</div>
          </div>
          
          <div class="title">OFFICIAL CONFIRMATION OF REGISTRATION</div>
          
          <div class="meta-info">
            <div class="meta-block">
              <strong>School Delegation ID:</strong> ${reg.registrationId || 'Pending'}<br/>
              <strong>Delegate Registration ID:</strong> ${del.registrationId || `${reg.registrationId || 'CPS-SCH-500'}-${delegateIdx + 1}`}<br/>
              <strong>Date:</strong> ${reg.registeredAt ? new Date(reg.registeredAt).toLocaleDateString() : new Date().toLocaleDateString()}
            </div>
            <div class="meta-block" style="text-align: right;">
              <strong>Payment ID:</strong> ${reg.paymentId}<br/>
              <strong>Payment Status:</strong> Verified & Successful<br/>
              <strong>Roster Index:</strong> Delegate #${delegateIdx + 1}
            </div>
          </div>
          
          <div class="content">
            Dear <strong>${del.name || 'Delegate'}</strong>,<br/><br/>
            On behalf of the Chennai Public School Model United Nations Secretariat, we are pleased to confirm your registration as a school delegation delegate representing <strong>${details.schoolName || ''}</strong> for the upcoming <strong>CPS PRIME MUN 5.O Conference</strong>, scheduled to take place at Chennai Public School campus.<br/><br/>
            The school delegation fees and roster have been successfully processed and verified. Please find your individual registration details below:
            
            <table class="details-table">
              <tr>
                <th>Delegate Name</th>
                <td>${del.name || ''}</td>
                <th>Gender</th>
                <td>${del.gender || ''}</td>
              </tr>
              <tr>
                <th>Institution/School</th>
                <td>${details.schoolName || ''}</td>
                <th>Class & Section</th>
                <td>Grade ${del.gradeClass || ''} - ${del.section || ''}</td>
              </tr>
              <tr>
                <th>Preferred Committee</th>
                <td colspan="3">${del.selectedCommittee || ''}</td>
              </tr>
              <tr>
                <th>Allocation Status</th>
                <td colspan="3" style="color: ${del.allocatedCommittee || (reg.details?.delegates?.[delegateIdx]?.allocatedCommittee) ? '#10b981' : '#777'}; font-weight: bold;">
                  ${(() => {
                    const comm = del.allocatedCommittee || reg.details?.delegates?.[delegateIdx]?.allocatedCommittee;
                    const country = del.allocatedCountry || reg.details?.delegates?.[delegateIdx]?.allocatedCountry;
                    if (!comm) return 'Pending Country/Portfolio Allocation';
                    if (comm.includes('IPP') || comm.includes('IPJ')) {
                      return comm;
                    }
                    return `${comm} (${country || 'Delegate'})`;
                  })()}
                </td>
              </tr>
            </table>
            
            Please note that your final country/portfolio allocation is subject to review by the Executive Board and the Organizing Committee. An update will be available on the coordinator dashboard as allocations are finalized.<br/><br/>
            We look forward to welcoming you for two days of intense debate, diplomacy, and collaboration. Please carry a printed copy of this letter or display the registration ID card on your mobile device at the entry desk.
          </div>
          
          <div class="footer-signatures">
            <div>
              <div style="height: 100px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 5px;">
                <img src="/signatures/new_director_signature_2026.png" style="max-height: 90px; max-width: 180px; object-fit: contain;" />
              </div>
              <div class="signature-line">
                Secretary-General<br/>
                <span style="font-size: 10px; color: #555;">CPS PRIME MUN 5.O</span>
              </div>
            </div>
            <div>
              <div style="height: 100px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 5px;">
                <img src="/signatures/new_sg_signature_2026.png" style="max-height: 90px; max-width: 180px; object-fit: contain;" />
              </div>
              <div class="signature-line" style="margin-left: auto;">
                Director of Registrations<br/>
                <span style="font-size: 10px; color: #555;">CPS PRIME MUN 5.O</span>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 50px;">
            <button onclick="window.print()" style="background: #dca843; border: none; color: black; font-weight: bold; padding: 12px 30px; font-size: 13px; cursor: pointer; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              Print Confirmation Letter
            </button>
          </div>
        </body>
      </html>`;

    // 1. Instant File Download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `CPS_PRIME_MUN_Confirmation_Letter_${reg.registrationId || 'SCHOOL'}_${delegateIdx + 1}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Open letter window for instant viewing & printing
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        try {
          printWindow.focus();
          printWindow.print();
        } catch (err) {}
      }, 400);
    }
  };
  const sendActualEmail = async (to, subject, htmlBody) => {
    if (!to) return;
    try {
      await apiClient.post('/registration/admin/send-email', {
        to,
        subject,
        body: htmlBody,
      });
      console.log(`Backend email dispatched to ${to}`);
      return 'OK';
    } catch (error) {
      console.error(`Backend email dispatch error for ${to}:`, error);
      throw error;
    }
  };

  // Submit Final Registration (Local DB)
  const handleSubmitRegistration = () => {
    if (isSubmittingRegistration) return;
    setIsSubmittingRegistration(true);

    const isHost = currentUser?.email === 'host@cpsmun.org' || currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin' || currentUser?.email === 'cpsprimemun@gmail.com';

    // Prevent duplicate registrations
    if (currentUser && currentUser.email !== 'host@cpsmun.org' && currentUser.role !== 'Admin' && currentUser.role !== 'SuperAdmin' && currentUser.email !== 'cpsprimemun@gmail.com') {
      if (myRegistration && (myRegistration.details?.status === 'Submitted' || myRegistration.details?.isSubmitted)) {
        alert("You have already completed a registration under this login/email address.");
        setIsSubmittingRegistration(false);
        return;
      }
    }

    const generateBadgeNumber = () => 'BADGE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const generateReceiptNumber = () => 'REC-' + Math.floor(100000 + Math.random() * 900000);

    const existingIndCountry = formData.allocatedCountry || (myRegistration && (myRegistration.allocatedCountry || myRegistration.details?.allocatedCountry));
    const allocatedIndividualCountry = existingIndCountry || (regType === 'individual' ? allocateRandomCountry(formData.selectedCommittee) : '');
    const tempAllocated = new Set();
    const allocatedDelegates = regType === 'school' ? (formData.delegates || []).map((del, idx) => {
      const comm = del.selectedCommittee || del.allocatedCommittee;
      const existingDelCountry = del.allocatedCountry || (myRegistration && myRegistration.details?.delegates?.[idx]?.allocatedCountry);
      const country = existingDelCountry || (comm ? allocateRandomCountry(comm, tempAllocated) : 'Pending Secretariat Allocation');
      return {
        ...del,
        allocatedCommittee: comm,
        allocatedCountry: country,
        badgeNumber: del.badgeNumber || generateBadgeNumber()
      };
    }) : [];

    const existingRegId = myRegistration?.registrationId || (typeof getCandidateRegistration === 'function' ? getCandidateRegistration()?.registrationId : null);
    const finalRegId = existingRegId || 'CPS-' + (regType === 'individual' ? 'IND' : 'SCH') + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Save to LocalStorage DB
    const registrationRecord = {
      registrationId: finalRegId,
      paymentId: isHost ? 'PAY-HOST-BYPASS' : paymentId,
      registrationType: regType,
      registeredByUser: (currentUser?.email || 'guest@cpsmun.org').trim().toLowerCase(),
      registeredAt: new Date().toISOString(),
      amountPaid: isHost ? 0 : (regType === 'individual' ? globalFeeRate : (parseInt(formData.schoolNumDelegates, 10) * globalFeeRate)),
      allocatedCommittee: regType === 'individual' ? formData.selectedCommittee : '',
      allocatedCountry: regType === 'individual' ? allocatedIndividualCountry : '',
      details: regType === 'individual' ? {
        fullName: formData.fullName,
        gender: formData.gender,
        dob: formData.dob,
        gradeClass: formData.gradeClass,
        section: formData.section,
        schoolName: formData.schoolName,
        schoolCity: formData.schoolCity,
        email: (formData.email || '').trim().toLowerCase(),
        mobile: formData.mobile,
        parentName: formData.parentName,
        parentMobile: formData.parentMobile,
        parentEmail: (formData.parentEmail || '').trim().toLowerCase(),
        isFirstMUN: formData.isFirstMUN,
        numMUNs: formData.numMUNs,
        medicalConditions: formData.medicalConditions,
        emergencyName: formData.emergencyName,
        emergencyNumber: formData.emergencyNumber,
        committee: formData.selectedCommittee,
        allocatedCommittee: formData.selectedCommittee,
        allocatedCountry: allocatedIndividualCountry,
        preference1: formData.preference1,
        preference2: formData.preference2,
        preference3: formData.preference3,
        docStudentId: formData.docStudentId,
        docStudentIdFile: formData.docStudentIdFile,
        docPhoto: formData.docPhoto,
        docPhotoFile: formData.docPhotoFile,
        acceptedParentConsent: formData.acceptedParentConsent,
        badgeNumber: generateBadgeNumber(),
        receiptNumber: generateReceiptNumber()
      } : {
        schoolName: formData.schoolName,
        schoolCity: formData.schoolCity,
        teacherName: formData.schoolTeacherName,
        teacherEmail: (formData.schoolTeacherEmail || '').trim().toLowerCase(),
        teacherMobile: formData.schoolTeacherMobile,
        schoolAuthLetter: formData.schoolAuthLetter,
        schoolAuthLetterFile: formData.schoolAuthLetterFile,
        receiptNumber: generateReceiptNumber(),
        delegates: allocatedDelegates.map(d => ({
          ...d,
          email: (d.email || '').trim().toLowerCase(),
          parentEmail: (d.parentEmail || '').trim().toLowerCase(),
          docStudentIdFile: d.docStudentIdFile
        }))
      }
    };

    // Save to backend database instead of LocalStorage
    apiClient.post('/registration/submit', registrationRecord)
      .then((response) => {
        // Refresh local user context in case registrationCompleted is updated
        checkAuth();
        setMyRegistration(response.data.registration);
        
        // Move to success step
        setStep(prev => prev + 1);
        setIsSubmittingRegistration(false);
      })
      .catch(err => {
        setIsSubmittingRegistration(false);
        if (err.response?.data?.error === 'COMMITTEE_FULL') {
          alert('The selected committee is full. Please choose a different committee.');
        } else {
          alert(err.response?.data?.message || 'Failed to submit registration. Please try again.');
        }
      });
  };

  const isHost = currentUser?.email === 'host@cpsmun.org' || currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin' || currentUser?.email === 'cpsprimemun@gmail.com';

  return (
    <main className="bg-transparent min-h-screen pt-32 pb-20 px-4 md:px-6 flex flex-col items-center justify-start font-allotrix-font-secondary relative z-10">
      
      {/* Title Header (Corrected High Contrast Colors) */}
      <div className="text-center max-w-2xl mb-8 flex flex-col items-center gap-3">
        <span className="font-cinzel text-xs tracking-widest text-[#DCA843] font-semibold uppercase">
          Table of Diplomacy
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-wider text-[#ffffff] drop-shadow-[0_2px_8px_rgba(220,168,67,0.15)]">
          {isHost ? 'Secretariat Control Center' : regType === 'individual' ? 'Individual Registration' : regType === 'school' ? 'Delegation Registration' : 'Register Slot'}
        </h1>
        <div className="h-0.5 w-16 bg-[#DCA843] mt-1"></div>
      </div>

      {/* User Session Bar */}
      {currentUser && (
        <div className="w-full max-w-4xl flex flex-col gap-3 bg-[#09090b]/75 border border-[#DCA843]/20 px-4 md:px-6 py-4 rounded-md mb-6 backdrop-blur-md shadow-lg">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[11px] md:text-xs text-[#BABABA]">
                Logged in as <strong className="text-white font-medium">{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-1 text-[10px] md:text-xs font-cinzel font-bold text-[#DCA843] hover:text-[#FFE082] transition-colors uppercase tracking-wider"
            >
              <IoLogOutOutline className="text-sm md:text-base" /> Sign Out
            </button>
          </div>

          {/* Seeded Host Admin Panel controls (Accessible ONLY by host) */}
          {isHost && (
            <div className="mt-1 pt-3 border-t border-[#DCA843]/15 flex flex-wrap gap-3 items-center">
              <span className="text-[9px] font-cinzel font-bold text-[#DCA843] uppercase tracking-widest mr-2">Admin Dashboard:</span>
               <button 
                onClick={handleExportAllData}
                className="flex items-center gap-1.5 border border-emerald-500/45 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400 font-cinzel text-[9px] font-bold px-3 py-1.5 rounded transition-all uppercase tracking-wider"
              >
                <IoDocumentTextOutline className="text-xs" /> Export All Data (Multi-Sheet .xlsx)
              </button>
              <button 
                onClick={handleClearAllData}
                className="flex items-center gap-1.5 border border-red-500/45 bg-red-500/5 hover:bg-red-500/15 text-red-400 font-cinzel text-[9px] font-bold px-3 py-1.5 rounded transition-all uppercase tracking-wider"
              >
                <IoCloseCircleOutline className="text-xs" /> Clear All Data &amp; Logs
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* AUTHENTICATION PORTAL (IF NOT LOGGED IN)                       */}
      {/* ============================================================== */}
      {!currentUser && (
        <div className="w-full max-w-md bg-[#09090b]/75 backdrop-blur-md border border-[#DCA843]/20 shadow-2xl p-6 md:p-8 rounded-lg relative overflow-hidden mt-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DCA843]/30 to-transparent"></div>
          
          {/* Tabs for Sign In vs Sign Up */}
          <div className="flex border-b border-[#DCA843]/15 mb-6">
            <button
              onClick={() => { setAuthState('signin'); setAuthErrors({}); }}
              className={`flex-1 pb-3 text-xs font-cinzel font-bold uppercase tracking-widest text-center transition-all ${
                authState === 'signin' 
                  ? 'text-[#DCA843] border-b-2 border-[#DCA843]' 
                  : 'text-[#BABABA]/50 border-b border-transparent hover:text-[#BABABA]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthState('signup'); setAuthErrors({}); }}
              className={`flex-1 pb-3 text-xs font-cinzel font-bold uppercase tracking-widest text-center transition-all ${
                authState === 'signup' 
                  ? 'text-[#DCA843] border-b-2 border-[#DCA843]' 
                  : 'text-[#BABABA]/50 border-b border-transparent hover:text-[#BABABA]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {authErrors.form && (
            <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] rounded p-3 text-xs text-center mb-4">
              {authErrors.form}
            </div>
          )}

          {/* SIGN IN FORM */}
          {authState === 'signin' && (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Email Address</label>
                <div className="relative">
                  <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                  <input 
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value.toLowerCase())}
                    className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                    placeholder="name@domain.com"
                  />
                </div>
                {authErrors.email && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Password</label>
                <div className="relative">
                  <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 hover:text-white"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
                {authErrors.password && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.password}</p>}
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#BABABA]">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#DCA843]"
                  />
                  <span>Remember Me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => { setAuthState('forgot'); setForgotStep(1); setAuthErrors({}); }}
                  className="text-[#DCA843] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-3.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-widest"
              >
                Sign In <IoLogInOutline className="text-base" />
              </button>

              <p className="text-center text-[10px] text-[#BABABA] mt-3">
                New to the portal?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthState('signup'); setAuthErrors({}); }}
                  className="text-[#DCA843] underline font-semibold"
                >
                  Create an account
                </button>
              </p>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {authState === 'forgot' && (
            <div className="flex flex-col gap-4">
              <h3 className="font-cinzel text-sm font-bold text-[#DCA843] uppercase tracking-wider mb-2">
                Reset Password
              </h3>

              {otpAlert && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded p-3 text-[10px] text-center mb-2 animate-pulse leading-normal">
                  {otpAlert}
                </div>
              )}

              {forgotStep === 1 && (
                <form onSubmit={handleForgotEmailSubmit} className="flex flex-col gap-4">
                  <p className="text-[10px] text-[#BABABA] leading-normal">
                    Enter your registered email address below. We will send you a 6-digit OTP code to verify your identity.
                  </p>
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Email Address</label>
                    <div className="relative">
                      <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                      <input 
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value.toLowerCase())}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                        placeholder="name@domain.com"
                      />
                    </div>
                    {authErrors.forgotEmail && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.forgotEmail}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-3.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-widest"
                  >
                    Send OTP Code
                  </button>
                </form>
              )}

              {forgotStep === 2 && (
                <form onSubmit={handleForgotOtpVerify} className="flex flex-col gap-4">
                  <p className="text-[10px] text-[#BABABA] leading-normal">
                    Please enter the 6-digit OTP code sent to your email.
                  </p>
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Enter OTP Code</label>
                    <div className="relative">
                      <IoKeyOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                      <input 
                        type="text"
                        maxLength="6"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] tracking-widest font-mono text-center"
                        placeholder="000000"
                      />
                    </div>
                    {authErrors.otp && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.otp}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-3.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-widest"
                  >
                    Verify OTP
                  </button>
                </form>
              )}

              {forgotStep === 3 && (
                <form onSubmit={handleForgotResetSubmit} className="flex flex-col gap-4">
                  <p className="text-[10px] text-[#BABABA] leading-normal">
                    Create a new secure password for your account.
                  </p>
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">New Password</label>
                    <div className="relative">
                      <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                        placeholder="At least 6 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 hover:text-white"
                      >
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </button>
                    </div>
                    {authErrors.newPassword && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.newPassword}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Confirm New Password</label>
                    <div className="relative">
                      <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        value={newConfirmPassword}
                        onChange={(e) => setNewConfirmPassword(e.target.value)}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2.5 text-xs text-white focus:outline-none"
                        placeholder="Repeat new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 hover:text-white"
                      >
                        {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </button>
                    </div>
                    {authErrors.newConfirmPassword && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.newConfirmPassword}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-3.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-widest"
                  >
                    Reset Password
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => { setAuthState('signin'); setForgotStep(1); setOtpAlert(null); setAuthErrors({}); }}
                className="text-center text-[10px] text-[#DCA843] hover:underline mt-2 font-semibold self-center"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* SIGN UP FORM */}
          {authState === 'signup' && (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Full Name</label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                  <input 
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                    placeholder="Enter your name"
                  />
                </div>
                {authErrors.name && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Email Address</label>
                <div className="relative">
                  <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                  <input 
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value.toLowerCase())}
                    className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                    placeholder="name@domain.com"
                  />
                </div>
                {authErrors.email && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Password</label>
                <div className="relative">
                  <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 hover:text-white"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
                {authErrors.password && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.password}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Confirm Password</label>
                <div className="relative">
                  <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 text-sm" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded pl-9 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                    placeholder="Repeat password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BABABA]/60 hover:text-white"
                  >
                    {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
                {authErrors.confirmPassword && <p className="text-[9px] text-[#ef4444] mt-1">{authErrors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-3.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-widest"
              >
                Create Account <IoPersonAddOutline className="text-base" />
              </button>

              <p className="text-center text-[10px] text-[#BABABA] mt-3">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthState('signin'); setAuthErrors({}); }}
                  className="text-[#DCA843] underline font-semibold"
                >
                  Sign In instead
                </button>
              </p>
            </form>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* SELECTOR FLOW (ONLY DISPLAYED IF LOGGED IN AND NOT ADMIN)      */}
      {/* ============================================================== */}
      {currentUser && !isHost && !regType && !showAdminConsole && !getCandidateRegistration() && (
        registrationStatus === 'offline' && !isHost ? (
          <div className="w-full max-w-3xl border border-[#DCA843]/40 bg-[#09090b]/90 backdrop-blur-xl p-8 md:p-12 rounded-2xl flex flex-col items-center text-center gap-6 shadow-[0_0_50px_rgba(220,168,67,0.12)] relative overflow-hidden mt-6 mx-auto">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DCA843]/60 to-transparent"></div>
            <div className="absolute top-[-30%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-[#DCA843]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-16 h-16 rounded-full bg-[#07080c] border border-[#DCA843]/60 flex items-center justify-center text-[#DCA843] shadow-[0_0_20px_rgba(220,168,67,0.25)]">
              <IoTimeOutline className="text-3xl animate-pulse" />
            </div>

            <div className="flex flex-col gap-3 max-w-xl">
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-[#DCA843] tracking-[0.15em] uppercase">
                Registrations Opening Soon
              </h2>
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#DCA843]/60 to-transparent mx-auto"></div>
              
              <p className="font-allotrix-font-secondary text-sm text-gray-300 leading-relaxed mt-2">
                Dear Delegates and Faculty Advisors,
              </p>
              
              <p className="font-allotrix-font-secondary text-xs md:text-sm text-[#BABABA] leading-relaxed">
                Thank you for your overwhelming interest in <strong className="text-[#DCA843]">CPS PRIME MUN 5.O</strong>. Delegate registrations for Individual Delegates and School Delegations are currently <span className="text-red-400 font-semibold uppercase">Offline</span> while committee allocations and preparations are being finalized.
              </p>
              
              <p className="font-allotrix-font-secondary text-xs md:text-sm text-[#BABABA] leading-relaxed">
                Online registrations will open shortly. Please stay in touch with our Secretariat for further official updates and announcements.
              </p>
            </div>

            {/* Secretariat Formal Contact Info Box */}
            <div className="w-full bg-[#0d0f17] border border-[#DCA843]/25 rounded-xl p-4 md:p-5 text-left grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <h4 className="font-cinzel text-[11px] font-bold text-[#DCA843] uppercase tracking-wider mb-1">Official Email</h4>
                <a href="mailto:cpsprimemun@gmail.com" className="text-xs text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <IoMailOutline className="text-[#DCA843]" /> cpsprimemun@gmail.com
                </a>
              </div>
              <div>
                <h4 className="font-cinzel text-[11px] font-bold text-[#DCA843] uppercase tracking-wider mb-1">Secretariat Helpline</h4>
                <div className="flex flex-col gap-1 text-xs text-gray-300">
                  <p className="flex items-center gap-1.5">
                    <span className="text-[#DCA843] font-semibold">Head Teacher In-charge:</span> 
                    <a href="tel:+917010525692" className="hover:text-white transition-colors">+91 70105 25692</a>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-[#DCA843] font-semibold">Secretary General (SG):</span> 
                    <a href="tel:+919650204929" className="hover:text-white transition-colors">+91 96502 04929</a>
                  </p>
                </div>
              </div>
            </div>

            <Link 
              to="/"
              className="mt-2 px-8 py-3 rounded bg-gradient-to-r from-[#DCA843] to-[#B3832B] text-black font-cinzel text-xs font-bold uppercase tracking-widest shadow-lg hover:brightness-110 transition-all text-center"
            >
              Return to Home Page
            </Link>
          </div>
        ) : !isHost && getAvailableCommittees().every(c => c.isFull) ? (
          <div className="w-full max-w-2xl border border-red-500/30 bg-red-500/5 backdrop-blur-md p-8 md:p-10 rounded-xl flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden mt-6 mx-auto">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <IoCloseCircleOutline className="text-4xl animate-pulse" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                Registration Closed
              </h2>
              <p className="font-allotrix-font-secondary text-sm text-[#BABABA] leading-relaxed">
                Thank you for your interest in CPS PRIME MUN 5.O! Unfortunately, all committees have reached their maximum delegate capacity and registrations are now officially closed.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 max-w-4xl w-full mt-6">
            
            {/* Individual card */}
            <div 
              onClick={() => handleSelectFlow('individual')}
              className="border border-[#DCA843]/20 bg-[#09090b]/80 backdrop-blur-md p-8 md:p-10 rounded-xl flex flex-col items-center text-center justify-between cursor-pointer transition-all duration-500 hover:border-[#DCA843]/85 hover:shadow-[0_20px_40px_rgba(0,0,0,0.65),0_0_35px_rgba(220,168,67,0.15)] hover:-translate-y-2 group overflow-hidden relative"
            >
              {/* Card Shine & Glow Effects */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DCA843]/45 to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,168,67,0.06)_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

              {/* Icon with Gold Accent Ring */}
              <div className="relative z-10 w-20 h-20 rounded-full border border-[#DCA843]/25 bg-[#DCA843]/5 flex items-center justify-center text-[#DCA843] mb-6 transition-all duration-500 shadow-[inset_0_0_12px_rgba(220,168,67,0.08)] group-hover:scale-110 group-hover:border-[#DCA843]/60 group-hover:shadow-[0_0_20px_rgba(220,168,67,0.2)]">
                <div className="absolute inset-0.5 rounded-full border border-dashed border-[#DCA843]/15 group-hover:border-solid group-hover:border-[#DCA843]/30 transition-all duration-500 animate-[spin_20s_linear_infinite] group-hover:animate-none"></div>
                <IoPersonOutline className="text-3xl relative z-10 transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-3.5 mb-8 relative z-10">
                <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-widest uppercase transition-colors duration-300 group-hover:text-[#DCA843] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Individual Delegate
                </h2>
                <p className="font-allotrix-font-secondary text-xs text-[#BABABA] leading-relaxed group-hover:text-white transition-colors duration-300">
                  Independent students joining to represent a country. Challenge your diplomatic, research, and debating skills inside our specialized committees.
                </p>
              </div>

              {/* Premium Action Button */}
              <button className="w-full relative z-10 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-4 rounded-md shadow-lg transition-all duration-300 hover:from-[#FFE082] hover:to-[#DCA843] hover:shadow-[0_0_20px_rgba(220,168,67,0.35)] group-hover:scale-[1.02] uppercase tracking-widest">
                Get Started <IoArrowForward className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* School Card */}
            <div 
              onClick={() => handleSelectFlow('school')}
              className="border border-[#DCA843]/20 bg-[#09090b]/80 backdrop-blur-md p-8 md:p-10 rounded-xl flex flex-col items-center text-center justify-between cursor-pointer transition-all duration-500 hover:border-[#DCA843]/85 hover:shadow-[0_20px_40px_rgba(0,0,0,0.65),0_0_35px_rgba(220,168,67,0.15)] hover:-translate-y-2 group overflow-hidden relative"
            >
              {/* Card Shine & Glow Effects */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DCA843]/45 to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,168,67,0.06)_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

              {/* Icon with Gold Accent Ring */}
              <div className="relative z-10 w-20 h-20 rounded-full border border-[#DCA843]/25 bg-[#DCA843]/5 flex items-center justify-center text-[#DCA843] mb-6 transition-all duration-500 shadow-[inset_0_0_12px_rgba(220,168,67,0.08)] group-hover:scale-110 group-hover:border-[#DCA843]/60 group-hover:shadow-[0_0_20px_rgba(220,168,67,0.2)]">
                <div className="absolute inset-0.5 rounded-full border border-dashed border-[#DCA843]/15 group-hover:border-solid group-hover:border-[#DCA843]/30 transition-all duration-500 animate-[spin_20s_linear_infinite] group-hover:animate-none"></div>
                <IoPeopleOutline className="text-3xl relative z-10 transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-3.5 mb-8 relative z-10">
                <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-widest uppercase transition-colors duration-300 group-hover:text-[#DCA843] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  School Delegation
                </h2>
                <p className="font-allotrix-font-secondary text-xs text-[#BABABA] leading-relaxed group-hover:text-white transition-colors duration-300">
                  For schools, clubs, or institutions registering multiple students concurrently. Compete collaboratively for the prestigious Best Delegation Trophy.
                </p>
              </div>

              {/* Premium Action Button */}
              <button className="w-full relative z-10 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-4 rounded-md shadow-lg transition-all duration-300 hover:from-[#FFE082] hover:to-[#DCA843] hover:shadow-[0_0_20px_rgba(220,168,67,0.35)] group-hover:scale-[1.02] uppercase tracking-widest">
                Get Started <IoArrowForward className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        )
      )}

      {/* Loading Spinner for already registered user dashboard load */}
      {currentUser && !regType && !showAdminConsole && getCandidateRegistration() && (
        <div className="flex flex-col items-center justify-center py-24 animate-fadeIn">
          <div className="w-12 h-12 border-4 border-double border-[#DCA843] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-cinzel text-[11px] text-[#DCA843] tracking-widest mt-6 uppercase font-bold animate-pulse">Loading your dashboard...</p>
        </div>
      )}

      {/* ============================================================== */}
      {/* HOST Secretariat Admin Control Panel                          */}
      {/* ============================================================== */}
      {((currentUser && (currentUser?.email === 'host@cpsmun.org' || currentUser?.role === 'Admin' || currentUser?.role === 'SuperAdmin' || currentUser?.email === 'cpsprimemun@gmail.com')) || isHost) && showAdminConsole && (
        <div className="w-full max-w-4xl bg-[#09090b]/80 border border-[#DCA843]/20 shadow-2xl p-6 md:p-8 rounded-lg relative overflow-visible mt-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DCA843]/45 to-transparent"></div>
          
          <div className="flex justify-between items-center pb-4 border-b border-[#DCA843]/15 mb-6">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-white tracking-widest uppercase">Secretariat Admin Panel</h2>
              <p className="text-[10px] text-[#BABABA]">Directly assign portfolios, lock/unlock entries, and audit delegate databases.</p>
            </div>
          </div>

          {!adminSelectedReg ? (
            <div className="flex flex-col gap-4">
              {/* Admin Registration Mode Switch Control Box */}
              <div className="bg-[#0b0f19] border border-[#DCA843]/40 rounded-xl p-4 mb-2 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${registrationStatus === 'live' ? 'bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]' : 'bg-red-500 shadow-[0_0_12px_#ef4444]'}`}></div>
                  <div>
                    <h4 className="font-cinzel font-bold text-xs md:text-sm text-white uppercase tracking-wider">
                      System Registration Status: <span className={registrationStatus === 'live' ? 'text-green-400 font-black' : 'text-red-400 font-black'}>{registrationStatus === 'live' ? 'LIVE (Open for Registrations)' : 'OFFLINE (Closed / Opening Soon Notice)'}</span>
                    </h4>
                    <p className="text-[11px] text-[#BABABA] mt-0.5">
                      {registrationStatus === 'live' 
                        ? 'Individual & School registrations are currently OPEN for delegates.' 
                        : 'Registration forms are OFFLINE. Delegates see the formal "Registrations Opening Soon" notice.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleRegistrationStatus('live')}
                    className={`px-4 py-2 rounded font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      registrationStatus === 'live'
                        ? 'bg-green-600/30 text-green-400 border border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.25)] font-black'
                        : 'bg-black/50 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-500'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Live Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleRegistrationStatus('offline')}
                    className={`px-4 py-2 rounded font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      registrationStatus === 'offline'
                        ? 'bg-red-600/30 text-red-400 border border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.25)] font-black'
                        : 'bg-black/50 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-500'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Offline Mode
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAllPayments}
                    className="px-4 py-2 rounded font-cinzel text-[10px] md:text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600/40 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Clear All Payments
                  </button>
                </div>
              </div>

              {/* Test Mode & Automated Fee Schedule Control Widget */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#121214]/90 border border-[#DCA843]/40 rounded-xl p-4 my-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#DCA843]/10 border border-[#DCA843]/30">
                    <IoWalletOutline className="text-[#DCA843] text-2xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-cinzel text-xs font-bold text-[#DCA843] uppercase tracking-wider">
                        Gateway System Mode:
                      </span>
                      {isTestMode ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 animate-pulse">
                          🧪 TEST MODE ACTIVE (₹1 GATEWAY FEE)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 flex items-center gap-1">
                          ⚡ PRODUCTION MODE ({feeTierName})
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#BABABA] block mt-1">
                      📅 Early Bird: <strong className="text-white">₹750</strong> (till Aug 14) | Standard: <strong className="text-white">₹800</strong> (Aug 15–27) | Closure: <strong className="text-red-400">Aug 27, 10:00 AM IST</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleTestMode(!isTestMode)}
                    className={`px-4 py-2 rounded-lg font-cinzel text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                      isTestMode
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black border border-amber-400 scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {isTestMode ? '⚡ Switch to Production Mode (Auto Fee Schedule)' : '🧪 Enable Test Mode (₹1 Gateway Fee)'}
                  </button>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex gap-4 border-b border-white/10 pb-2 mb-2">
                <button
                  onClick={() => setAdminTab('database')}
                  className={`text-xs font-cinzel font-bold uppercase tracking-wider pb-1 transition-all ${
                    adminTab === 'database' ? 'text-[#DCA843] border-b-2 border-[#DCA843]' : 'text-[#BABABA] hover:text-white'
                  }`}
                >
                  Delegates Database
                </button>
                <button
                  onClick={() => setAdminTab('allocations')}
                  className={`text-xs font-cinzel font-bold uppercase tracking-wider pb-1 transition-all ${
                    adminTab === 'allocations' ? 'text-[#DCA843] border-b-2 border-[#DCA843]' : 'text-[#BABABA] hover:text-white'
                  }`}
                >
                  Committee Allocations
                </button>
                <button
                  onClick={() => setAdminTab('credentials')}
                  className={`text-xs font-cinzel font-bold uppercase tracking-wider pb-1 transition-all ${
                    adminTab === 'credentials' ? 'text-[#DCA843] border-b-2 border-[#DCA843]' : 'text-[#BABABA] hover:text-white'
                  }`}
                >
                  Delegate Credentials
                </button>
              </div>

              {adminTab === 'database' && (
                <div className="flex flex-col gap-4">
                  {/* Live Registration Analytics Dashboard Panel Widget */}
                  {(() => {
                    const allRegs = allRegistrations;
                    const allDelegatesFlat = [];
                    allRegs.forEach(r => {
                      const isPaid = r.paymentStatus === 'Verified' || r.details?.paymentStatus === 'Verified';
                      if (!isPaid) return; // Do not count unpaid/pending draft attempts as registered delegates

                      if (r.registrationType === 'individual') {
                        allDelegatesFlat.push({
                          regId: r.registrationId,
                          name: r.details?.fullName || 'N/A',
                          email: r.details?.email || 'N/A',
                          mobile: r.details?.mobile || 'N/A',
                          committee: r.allocatedCommittee || r.details?.selectedCommittee || r.details?.committee || 'N/A',
                          country: (() => {
                            const comm = r.allocatedCommittee || r.details?.selectedCommittee || r.details?.committee || '';
                            if (comm.includes('IPP') || comm.includes('IPJ')) return 'N/A';
                            return r.allocatedCountry || 'N/A';
                          })(),
                          status: r.status || 'Approved',
                          paymentStatus: 'Verified',
                          attendance: r.attendanceStatus || 'Absent',
                          certificate: r.certificateStatus || 'Not Generated',
                          isFirstMUN: r.details?.isFirstMUN || 'Yes',
                          amountPaid: parseFloat(r.amountPaid || r.details?.amountPaid || globalFeeRate) || globalFeeRate,
                          date: r.registeredAt || '',
                          seatStatus: r.details?.seatStatus || 'Pending'
                        });
                      } else {
                        const dels = r.details?.delegates || r.details?.delegatesList || [];
                        const totalAmt = parseFloat(r.amountPaid || r.details?.amountPaid) || (dels.length * globalFeeRate);
                        const perDel = totalAmt / (dels.length || 1);
                        dels.forEach(del => {
                          allDelegatesFlat.push({
                            regId: r.registrationId,
                            name: del.name || 'N/A',
                            email: r.details?.teacherEmail || 'N/A',
                            mobile: r.details?.teacherMobile || 'N/A',
                            committee: del.allocatedCommittee || del.selectedCommittee || 'N/A',
                            country: (() => {
                              const comm = del.allocatedCommittee || del.selectedCommittee || '';
                              if (comm.includes('IPP') || comm.includes('IPJ')) return 'N/A';
                              return del.allocatedCountry || 'N/A';
                            })(),
                            status: r.status || 'Approved',
                            paymentStatus: 'Verified',
                            attendance: del.attendanceStatus || 'Absent',
                            certificate: del.certificateStatus || 'Not Generated',
                            isFirstMUN: del.isFirstMUN || 'Yes',
                            amountPaid: perDel,
                            date: r.registeredAt || '',
                            seatStatus: del.seatStatus || r.details?.seatStatus || 'Pending'
                          });
                        });
                      }
                    });

                    const verifiedRegs = allRegs.filter(r => r.paymentStatus === 'Verified' || r.details?.paymentStatus === 'Verified');
                    const totalRegs = verifiedRegs.length;
                    const pendingRegsCount = allRegs.length - verifiedRegs.length;
                    const totalDelegates = allDelegatesFlat.length;
                    const totalRevenue = verifiedRegs.reduce((acc, curr) => {
                      const val = parseFloat(curr.amountPaid || curr.details?.amountPaid || (curr.registrationType === 'individual' ? globalFeeRate : (curr.details?.delegates?.length || 1) * globalFeeRate));
                      return acc + (isNaN(val) ? 0 : val);
                    }, 0);
                    const experiencedCount = allDelegatesFlat.filter(d => d.isFirstMUN === 'No').length;
                    const beginnerCount = allDelegatesFlat.filter(d => d.isFirstMUN === 'Yes').length;
                    const confirmedSeats = allDelegatesFlat.filter(d => d.seatStatus === 'Confirmed' || d.seatStatus === 'Reserved' || d.status === 'Confirmed').length;
                    const countriesAllocated = allDelegatesFlat.filter(d => d.country && d.country !== 'N/A' && d.country !== 'Pending').length;
                    const totalSchools = new Set(allRegs.filter(r => r.registrationType === 'school').map(r => r.details?.schoolName).filter(Boolean)).size;
                    const individualRegs = allRegs.filter(r => r.registrationType === 'individual').length;
                    const schoolRegs = allRegs.filter(r => r.registrationType === 'school').length;

                    // Per-committee data using the official capacity list
                    const COMM_CAPS = {
                      'UN Human Rights Council (UNHRC)': 40,
                      'UN General Assembly (UNGA)': 60,
                      'UN Security Council (UNSC) (Double delegation)': 40,
                      'Economic and Social Council (ECOSOC)': 40,
                      'International Labour Organization (ILO)': 30,
                      'Social, Humanitarian and Cultural Committee (SOCHUM)': 40,
                      'UN Environment Programme (UNEP)': 40,
                      'International Press Plenary (IPP)': 30,
                      'International Press Journalism (IPJ)': 30,
                      'United States Senate (US SENATE)': 40,
                      'Lok Sabha': 40,
                      'Crisis Committee': 30,
                    };
                    const TOTAL_CAPACITY = 460;
                    const filledSeats = totalDelegates;
                    const availableSeats = Math.max(0, TOTAL_CAPACITY - filledSeats);
                    const fillPercent = Math.min(100, Math.round((filledSeats / TOTAL_CAPACITY) * 100));

                    const commStats = Object.entries(COMM_CAPS).map(([name, cap]) => {
                      const shortName = name.match(/\(([^)]+)\)$/)?.[1] || name.split(' ').slice(0, 2).join(' ');
                      const filled = allDelegatesFlat.filter(d => {
                        const c = (d.committee || '').toLowerCase();
                        return c === name.toLowerCase() || c.includes(shortName.toLowerCase());
                      }).length;
                      return { name, shortName, cap, filled, pct: Math.min(100, Math.round((filled / cap) * 100)) };
                    });

                    return (
                      <div className="flex flex-col gap-4 mb-2 animate-fadeIn">
                        {/* Row 1 — 4 primary KPI cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-[#0A1628]/80 border border-[#DCA843]/20 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Total Delegates</span>
                            <span className="text-2xl font-bold text-white">{totalDelegates}</span>
                            <span className="text-[9px] text-[#BABABA]">{totalRegs} registrations · {individualRegs} indiv · {schoolRegs} schools</span>
                          </div>
                          <div className="bg-[#0A1628]/80 border border-emerald-500/25 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Verified Revenue</span>
                            <span className="text-2xl font-bold text-emerald-400">₹{totalRevenue.toLocaleString('en-IN')}</span>
                            <span className="text-[9px] text-[#BABABA]">from {allRegs.filter(r => r.paymentStatus === 'Verified' || r.details?.paymentStatus === 'Verified').length} verified payments</span>
                          </div>
                          <div className="bg-[#0A1628]/80 border border-amber-500/25 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Seats Filled / Capacity</span>
                            <span className="text-2xl font-bold text-amber-400">{filledSeats} <span className="text-sm text-[#BABABA] font-normal">/ {TOTAL_CAPACITY}</span></span>
                            <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                              <div className="bg-amber-400 h-1.5 rounded-full transition-all" style={{width: `${fillPercent}%`}}></div>
                            </div>
                            <span className="text-[9px] text-[#BABABA]">{availableSeats} seats still open · {fillPercent}% full</span>
                          </div>
                          <div className="bg-[#0A1628]/80 border border-[#DCA843]/20 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Confirmed Seats</span>
                            <span className="text-2xl font-bold text-[#DCA843]">{confirmedSeats}</span>
                            <span className="text-[9px] text-[#BABABA]">{totalDelegates - confirmedSeats} pending confirmation</span>
                          </div>
                        </div>

                        {/* Row 2 — 4 secondary KPI cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-[#0A1628]/80 border border-[#DCA843]/20 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Countries Allocated</span>
                            <span className="text-2xl font-bold text-white">{countriesAllocated}</span>
                            <span className="text-[9px] text-[#BABABA]">{totalDelegates - countriesAllocated} pending allocation</span>
                          </div>
                          <div className="bg-[#0A1628]/80 border border-[#DCA843]/20 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Schools Registered</span>
                            <span className="text-2xl font-bold text-white">{totalSchools}</span>
                            <span className="text-[9px] text-[#BABABA]">{schoolRegs} school reg entries</span>
                          </div>
                          <div className="bg-[#0A1628]/80 border border-blue-500/25 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Experienced Delegates</span>
                            <span className="text-2xl font-bold text-blue-400">{experiencedCount}</span>
                            <span className="text-[9px] text-[#BABABA]">attended a MUN before</span>
                          </div>
                          <div className="bg-[#0A1628]/80 border border-purple-500/25 p-3 rounded-lg flex flex-col gap-1">
                            <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">First-Time Delegates</span>
                            <span className="text-2xl font-bold text-purple-400">{beginnerCount}</span>
                            <span className="text-[9px] text-[#BABABA]">attending their first MUN</span>
                          </div>
                        </div>

                        {/* Committee Occupancy Table */}
                        <div className="bg-[#0A1628]/80 border border-[#DCA843]/15 rounded-lg p-3">
                          <h5 className="font-cinzel text-[10px] text-[#DCA843] uppercase tracking-wider font-bold mb-3">Committee Seat Occupancy</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {commStats.map(({ name, shortName, cap, filled, pct }) => (
                              <div key={name} className="flex flex-col gap-0.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[9px] text-[#BABABA] font-cinzel truncate max-w-[180px]" title={name}>{shortName}</span>
                                  <span className="text-[9px] font-bold ml-2 shrink-0" style={{color: pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#10b981'}}>
                                    {filled}/{cap}
                                  </span>
                                </div>
                                <div className="w-full bg-white/8 rounded-full h-1">
                                  <div
                                    className="h-1 rounded-full transition-all"
                                    style={{
                                      width: `${pct}%`,
                                      backgroundColor: pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#10b981'
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-4 mt-3 pt-2 border-t border-white/5">
                            <span className="flex items-center gap-1 text-[9px] text-[#BABABA]"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> &lt;70% — Open</span>
                            <span className="flex items-center gap-1 text-[9px] text-[#BABABA]"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> 70–89% — Filling</span>
                            <span className="flex items-center gap-1 text-[9px] text-[#BABABA]"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> 90%+ — Nearly Full</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Search Bar */}
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search by ID, applicant name, email, or school name..."
                      className="flex-1 bg-black/45 border border-[#DCA843]/20 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#DCA843]"
                    />
                  </div>

                  {/* Registrations List */}
                  <div className="overflow-x-auto border border-white/5 rounded-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-black/55 text-[#DCA843] font-cinzel border-b border-[#DCA843]/10">
                          <th className="p-3">S.No.</th>
                          <th className="p-3">ID</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Applicant / Institution</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Roster</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DCA843]/5 text-[#BABABA]">
                        {(() => {
                          const allRegs = [...allRegistrations].sort((a, b) => {
                            const timeA = new Date(a.createdAt || a.registeredAt || a.details?.createdAt || 0).getTime();
                            const timeB = new Date(b.createdAt || b.registeredAt || b.details?.createdAt || 0).getTime();
                            return timeB - timeA;
                          });
                          const filtered = allRegs.filter(r => {
                            const s = adminSearch.toLowerCase();
                            if (!s) return true;
                            
                            const idMatch = (r.registrationId || '').toLowerCase().includes(s);
                            const typeMatch = (r.registrationType || '').toLowerCase().includes(s);
                            const details = r.details || {};
                            const nameMatch = (details.fullName || details.schoolName || details.teacherName || '').toLowerCase().includes(s);
                            const emailMatch = (details.email || details.teacherEmail || '').toLowerCase().includes(s);
                            const schoolMatch = (details.schoolName || '').toLowerCase().includes(s);
                            
                            const paymentStatusMatch = (r.paymentStatus || '').toLowerCase().includes(s);
                            const statusMatch = (r.status || '').toLowerCase().includes(s);
                            
                            // Check individual committee & country
                            const committeeMatch = (r.allocatedCommittee || details.selectedCommittee || details.committee || '').toLowerCase().includes(s);
                            const countryMatch = (r.allocatedCountry || details.allocatedCountry || '').toLowerCase().includes(s);
                            const attendanceMatch = (r.attendanceStatus || '').toLowerCase().includes(s);
                            
                            // Check school roster details
                            const delegates = details.delegates || details.delegatesList || [];
                            const rosterMatch = delegates.some(d => 
                              (d.name || '').toLowerCase().includes(s) ||
                              (d.selectedCommittee || d.allocatedCommittee || '').toLowerCase().includes(s) ||
                              (d.allocatedCountry || '').toLowerCase().includes(s) ||
                              (d.attendanceStatus || '').toLowerCase().includes(s)
                            );

                            return idMatch || typeMatch || nameMatch || emailMatch || schoolMatch || paymentStatusMatch || statusMatch || committeeMatch || countryMatch || attendanceMatch || rosterMatch;
                          });

                          if (filtered.length === 0) {
                            return (
                              <tr>
                                <td colSpan="8" className="p-8 text-center text-[#BABABA] italic">
                                  No registrations match search filter query.
                                </td>
                              </tr>
                            );
                          }

                          return filtered.map((r, idx) => {
                            const d = r.details || {};
                            const isIndiv = r.registrationType === 'individual';
                            const count = isIndiv ? 1 : (d.delegates || d.delegatesList || []).length;
                            return (
                              <tr key={idx} className="hover:bg-white/5 transition-colors">
                                <td className="p-3 font-mono font-bold text-[#DCA843]">{idx + 1}</td>
                                <td className="p-3 font-mono font-bold text-white">{r.registrationId}</td>
                                <td className="p-3 uppercase font-cinzel text-[10px] tracking-wider text-[#DCA843]">
                                  {r.registrationType}
                                </td>
                                <td className="p-3">
                                  <div className="font-bold text-white">
                                    {isIndiv ? d.fullName : d.schoolName}
                                  </div>
                                  <div className="text-[10px] text-[#BABABA]/80">
                                    {isIndiv ? d.email : `${d.teacherName} (${d.teacherEmail})`}
                                  </div>
                                </td>
                                <td className="p-3 text-[10px]">
                                  {r.registeredAt ? r.registeredAt.split('T')[0] : ''}
                                </td>
                                <td className="p-3">
                                  {(() => {
                                    const isPaid = r.paymentStatus === 'Verified' || d.paymentStatus === 'Verified';
                                    return isPaid ? (
                                      <span className="font-semibold text-white">{count} delegates</span>
                                    ) : (
                                      <span className="text-[10px] text-amber-400 font-semibold italic">0 Paid (Unpaid Draft)</span>
                                    );
                                  })()}
                                </td>
                                <td className="p-3">
                                  {(() => {
                                    const isPaid = r.paymentStatus === 'Verified' || d.paymentStatus === 'Verified';
                                    return (
                                      <div className="flex flex-col gap-1 items-start">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                          isPaid
                                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                            : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                                        }`}>
                                          {isPaid ? 'VERIFIED' : 'PENDING PAYMENT'}
                                        </span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider ${
                                          r.isLocked 
                                            ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                                            : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                                        }`}>
                                          {r.isLocked ? 'Locked' : 'Unlocked'}
                                        </span>
                                      </div>
                                    );
                                  })()}
                                </td>
                                <td className="p-3 text-right">
                                  <button 
                                    onClick={() => {
                                      setAdminSelectedReg(r);
                                      if (isIndiv) {
                                        setAdminAllocatedCountry(d.allocatedCountry || '');
                                        setAdminAllocatedCommittee(d.allocatedCommittee || d.selectedCommittee || d.committee || '');
                                      }
                                    }}
                                    className="text-[10px] bg-[#DCA843]/10 hover:bg-[#DCA843] hover:text-black border border-[#DCA843]/30 text-[#DCA843] font-cinzel font-bold px-3 py-1.5 rounded transition-all uppercase tracking-wider cursor-pointer"
                                  >
                                    Manage
                                  </button>
                                </td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {adminTab === 'allocations' && (() => {
                const getUnallocatedDelegates = (committee) => {
                  const unallocated = [];
                  allRegistrations.forEach(r => {
                    const isPaid = r.paymentStatus === 'Verified' || r.details?.paymentStatus === 'Verified';
                    if (!isPaid) return;

                    if (r.registrationType === 'individual') {
                      const comm = r.allocatedCommittee || r.details?.selectedCommittee || r.details?.committee;
                      if (comm === committee && !r.allocatedCountry) {
                        unallocated.push({
                          registrationId: r.registrationId,
                          delegateIndex: null,
                          name: r.details?.fullName || 'Individual Delegate',
                          schoolName: 'Individual',
                          email: r.details?.email || ''
                        });
                      }
                    } else {
                      const roster = r.details?.delegates || r.details?.delegatesList || [];
                      roster.forEach((del, idx) => {
                        const comm = del.allocatedCommittee || del.selectedCommittee;
                        if (comm === committee && !del.allocatedCountry) {
                          unallocated.push({
                            registrationId: r.registrationId,
                            delegateIndex: idx,
                            name: del.name || `Delegate #${idx + 1}`,
                            schoolName: r.details?.schoolName || 'School',
                            email: r.details?.teacherEmail || ''
                          });
                        }
                      });
                    }
                  });
                  return unallocated;
                };

                return (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    {/* Dropdown Selector */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/45 border border-[#DCA843]/10 p-4 rounded-lg">
                      <div>
                        <label className="block text-[9px] font-cinzel text-[#BABABA] uppercase">Select Committee</label>
                        <select
                          value={selectedAllocationCommittee}
                          onChange={(e) => {
                            setSelectedAllocationCommittee(e.target.value);
                            setSwapSource(null);
                          }}
                          className="bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843] w-64 mt-1"
                        >
                          {COMMITTEES.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="text-right text-xs">
                        <span className="text-[9px] font-cinzel text-[#BABABA] uppercase">Available Slots</span>
                        <p className="text-sm font-bold text-white mt-0.5">
                          {(() => {
                            const committee = selectedAllocationCommittee;
                            const pool = COMMITTEE_COUNTRIES[committee] || [];
                            // Count assigned delegates
                            let assigned = 0;
                            allRegistrations.forEach(r => {
                              if (r.registrationType === 'individual') {
                                if (r.allocatedCommittee === committee && r.allocatedCountry) assigned++;
                              } else {
                                const roster = r.details?.delegates || r.details?.delegatesList || [];
                                roster.forEach(d => {
                                  if (d.allocatedCommittee === committee && d.allocatedCountry) assigned++;
                                });
                              }
                            });
                            const isUNSC = committee.toLowerCase().includes('unsc') || committee.toLowerCase().includes('security council');
                            const totalLimit = isUNSC ? 40 : pool.length;
                            return `${totalLimit - assigned} / ${totalLimit} Available`;
                          })()}
                        </p>
                      </div>
                    </div>

                    {/* Swap Source Alert banner */}
                    {swapSource && (
                      <div className="bg-[#DCA843]/10 border border-[#DCA843]/30 p-3 rounded flex justify-between items-center text-xs text-white">
                        <span>
                          🔄 Swapping <strong>{swapSource.name}</strong> ({swapSource.portfolio || 'Unassigned'}) in {swapSource.committee}. Select another delegate below to swap.
                        </span>
                        <button
                          onClick={() => setSwapSource(null)}
                          className="text-xs text-rose-400 font-bold hover:text-rose-300 underline"
                        >
                          Cancel Swap
                        </button>
                      </div>
                    )}

                    {/* Grid showing all countries or portfolios */}
                    <div className="overflow-x-auto border border-white/5 rounded-lg max-h-[500px]">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-black/55 text-[#DCA843] font-cinzel border-b border-[#DCA843]/10 uppercase tracking-wider text-[10px]">
                            <th className="p-3">
                              {(selectedAllocationCommittee?.includes('IPP') || selectedAllocationCommittee?.includes('IPJ')) ? 'Media Portfolio' : 'Portfolio / Country'}
                            </th>
                            <th className="p-3">Delegate Name</th>
                            <th className="p-3">Registration Type / Institution</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DCA843]/5 text-[#BABABA]">
                          {(() => {
                            const committee = selectedAllocationCommittee;
                            const pool = COMMITTEE_COUNTRIES[committee] || [];
                            const isUNSC = committee.toLowerCase().includes('unsc') || committee.toLowerCase().includes('security council');

                            // Gather all assignees in this committee
                            const assignees = [];
                            allRegistrations.forEach(r => {
                              if (r.registrationType === 'individual') {
                                if (r.allocatedCommittee === committee) {
                                  assignees.push({
                                    registrationId: r.registrationId,
                                    delegateIndex: null,
                                    name: r.details?.fullName || 'Individual Delegate',
                                    schoolName: 'Individual',
                                    portfolio: r.allocatedCountry,
                                    email: r.details?.email || ''
                                  });
                                }
                              } else {
                                const roster = r.details?.delegates || r.details?.delegatesList || [];
                                roster.forEach((del, idx) => {
                                  if (del.allocatedCommittee === committee) {
                                    assignees.push({
                                      registrationId: r.registrationId,
                                      delegateIndex: idx,
                                      name: del.name || `Delegate #${idx + 1}`,
                                      schoolName: r.details?.schoolName || 'School',
                                      portfolio: del.allocatedCountry,
                                      email: r.details?.teacherEmail || ''
                                    });
                                  }
                                });
                              }
                            });

                            // Unallocated delegates dropdown options
                            const unallocatedOptions = getUnallocatedDelegates(committee);

                            if (isUNSC) {
                              // UNSC has 20 countries, 2 seats each
                              return pool.map((country, idx) => {
                                const slot1 = assignees.find(a => a.portfolio === country);
                                const slot2 = assignees.filter(a => a.portfolio === country)[1];

                                return (
                                  <React.Fragment key={idx}>
                                    {/* Seat 1 */}
                                    <tr className="hover:bg-white/5 border-b border-white/5">
                                      <td className="p-3 font-semibold text-white">
                                        {country} <span className="text-[9px] text-[#DCA843]/60 uppercase ml-1">(Seat 1)</span>
                                      </td>
                                      <td className="p-3">
                                        {slot1 ? (
                                          <span className="text-white font-bold">{slot1.name}</span>
                                        ) : (
                                          <span className="text-rose-400/60 italic">Vacant</span>
                                        )}
                                      </td>
                                      <td className="p-3 text-[10px]">
                                        {slot1 ? slot1.schoolName : '-'}
                                      </td>
                                      <td className="p-3 text-right flex justify-end gap-1.5 items-center">
                                        {slot1 ? (
                                          <>
                                            {swapSource ? (
                                              <button
                                                onClick={() => handleSwapPortfolios(swapSource, { registrationId: slot1.registrationId, delegateIndex: slot1.delegateIndex })}
                                                className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                              >
                                                Swap Here
                                              </button>
                                            ) : (
                                              <button
                                                onClick={() => setSwapSource({
                                                  registrationId: slot1.registrationId,
                                                  delegateIndex: slot1.delegateIndex,
                                                  name: slot1.name,
                                                  portfolio: `${country} (Seat 1)`,
                                                  committee
                                                })}
                                                className="bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                              >
                                                Swap
                                              </button>
                                            )}
                                            <button
                                              onClick={() => handleAssignPortfolio(slot1.registrationId, slot1.delegateIndex, committee, '')}
                                              className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                            >
                                              Remove
                                            </button>
                                          </>
                                        ) : (
                                          unallocatedOptions.length > 0 ? (
                                            <select
                                              onChange={(e) => {
                                                if (!e.target.value) return;
                                                const [regId, delIdxStr] = e.target.value.split(':');
                                                const delIdx = delIdxStr === 'null' ? null : parseInt(delIdxStr, 10);
                                                handleAssignPortfolio(regId, delIdx, committee, country);
                                              }}
                                              className="bg-[#0f0f11] border border-white/10 rounded p-1 text-[10px] text-white focus:outline-none focus:border-[#DCA843] w-36"
                                              defaultValue=""
                                            >
                                              <option value="">-- Assign Delegate --</option>
                                              {unallocatedOptions.map((o, oIdx) => (
                                                <option key={oIdx} value={`${o.registrationId}:${o.delegateIndex}`}>
                                                  {o.name} ({o.schoolName})
                                                </option>
                                              ))}
                                            </select>
                                          ) : (
                                            <span className="text-[10px] text-white/30 italic">No paid unallocated delegates</span>
                                          )
                                        )}
                                      </td>
                                    </tr>
                                    
                                    {/* Seat 2 */}
                                    <tr className="hover:bg-white/5 border-b border-white/5">
                                      <td className="p-3 font-semibold text-white pl-6">
                                        ↳ <span className="text-[9px] text-[#DCA843]/60 uppercase ml-1">(Seat 2)</span>
                                      </td>
                                      <td className="p-3">
                                        {slot2 ? (
                                          <span className="text-white font-bold">{slot2.name}</span>
                                        ) : (
                                          <span className="text-rose-400/60 italic">Vacant</span>
                                        )}
                                      </td>
                                      <td className="p-3 text-[10px]">
                                        {slot2 ? slot2.schoolName : '-'}
                                      </td>
                                      <td className="p-3 text-right flex justify-end gap-1.5 items-center">
                                        {slot2 ? (
                                          <>
                                            {swapSource ? (
                                              <button
                                                onClick={() => handleSwapPortfolios(swapSource, { registrationId: slot2.registrationId, delegateIndex: slot2.delegateIndex })}
                                                className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                              >
                                                Swap Here
                                              </button>
                                            ) : (
                                              <button
                                                onClick={() => setSwapSource({
                                                  registrationId: slot2.registrationId,
                                                  delegateIndex: slot2.delegateIndex,
                                                  name: slot2.name,
                                                  portfolio: `${country} (Seat 2)`,
                                                  committee
                                                })}
                                                className="bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                              >
                                                Swap
                                              </button>
                                            )}
                                            <button
                                              onClick={() => handleAssignPortfolio(slot2.registrationId, slot2.delegateIndex, committee, '')}
                                              className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                            >
                                              Remove
                                            </button>
                                          </>
                                        ) : (
                                          unallocatedOptions.length > 0 ? (
                                            <select
                                              onChange={(e) => {
                                                if (!e.target.value) return;
                                                const [regId, delIdxStr] = e.target.value.split(':');
                                                const delIdx = delIdxStr === 'null' ? null : parseInt(delIdxStr, 10);
                                                handleAssignPortfolio(regId, delIdx, committee, country);
                                              }}
                                              className="bg-[#0f0f11] border border-white/10 rounded p-1 text-[10px] text-white focus:outline-none focus:border-[#DCA843] w-36"
                                              defaultValue=""
                                            >
                                              <option value="">-- Assign Delegate --</option>
                                              {unallocatedOptions.map((o, oIdx) => (
                                                <option key={oIdx} value={`${o.registrationId}:${o.delegateIndex}`}>
                                                  {o.name} ({o.schoolName})
                                                </option>
                                              ))}
                                            </select>
                                          ) : (
                                            <span className="text-[10px] text-white/30 italic">No paid unallocated delegates</span>
                                          )
                                        )}
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                );
                              });
                            } else {
                              // Other committees (single delegation)
                              return pool.map((portfolio, idx) => {
                                const slot = assignees.find(a => a.portfolio && a.portfolio.toLowerCase() === portfolio.toLowerCase());

                                return (
                                  <tr key={idx} className="hover:bg-white/5">
                                    <td className="p-3 font-semibold text-white">
                                      {portfolio}
                                    </td>
                                    <td className="p-3">
                                      {slot ? (
                                        <span className="text-white font-bold">{slot.name}</span>
                                      ) : (
                                        <span className="text-rose-400/60 italic">Vacant</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-[10px]">
                                      {slot ? slot.schoolName : '-'}
                                    </td>
                                    <td className="p-3 text-right flex justify-end gap-1.5 items-center">
                                      {slot ? (
                                        <>
                                          {swapSource ? (
                                            <button
                                              onClick={() => handleSwapPortfolios(swapSource, { registrationId: slot.registrationId, delegateIndex: slot.delegateIndex })}
                                              className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                            >
                                              Swap Here
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => setSwapSource({
                                                registrationId: slot.registrationId,
                                                delegateIndex: slot.delegateIndex,
                                                name: slot.name,
                                                portfolio,
                                                committee
                                              })}
                                              className="bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                            >
                                              Swap
                                            </button>
                                          )}
                                          <button
                                            onClick={() => handleAssignPortfolio(slot.registrationId, slot.delegateIndex, committee, '')}
                                            className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 px-2 py-1 rounded text-[9px] font-bold uppercase"
                                          >
                                            Remove
                                          </button>
                                        </>
                                      ) : (
                                        unallocatedOptions.length > 0 ? (
                                          <select
                                            onChange={(e) => {
                                              if (!e.target.value) return;
                                              const [regId, delIdxStr] = e.target.value.split(':');
                                              const delIdx = delIdxStr === 'null' ? null : parseInt(delIdxStr, 10);
                                              handleAssignPortfolio(regId, delIdx, committee, portfolio);
                                            }}
                                            className="bg-[#0f0f11] border border-white/10 rounded p-1 text-[10px] text-white focus:outline-none focus:border-[#DCA843] w-36"
                                            defaultValue=""
                                          >
                                            <option value="">-- Assign Delegate --</option>
                                            {unallocatedOptions.map((o, oIdx) => (
                                              <option key={oIdx} value={`${o.registrationId}:${o.delegateIndex}`}>
                                                {o.name} ({o.schoolName})
                                              </option>
                                            ))}
                                          </select>
                                        ) : (
                                          <span className="text-[10px] text-white/30 italic">No paid unallocated delegates</span>
                                        )
                                      )}
                                    </td>
                                  </tr>
                                );
                              });
                            }
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {adminTab === 'credentials' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold">Delegate Accounts & Live Credentials</h5>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE SYNC ACTIVE
                        </span>
                      </div>
                      <p className="text-[10px] text-[#BABABA] mt-0.5">Real-time sync of registered delegates, login emails, and account passwords.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={credSearch}
                        onChange={(e) => setCredSearch(e.target.value)}
                        placeholder="Filter by name or email..."
                        className="bg-black/50 border border-[#DCA843]/20 rounded px-3 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#DCA843]"
                      />
                      <button
                        onClick={fetchUserCredentials}
                        className="text-xs text-[#DCA843] hover:text-[#FFE082] underline font-bold cursor-pointer"
                      >
                        Refresh Credentials
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto border border-white/10 rounded-lg max-h-[480px]">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-black/80 text-[#DCA843] font-cinzel border-b border-[#DCA843]/20 uppercase tracking-wider text-[10px]">
                          <th className="p-3">S.No.</th>
                          <th className="p-3">Delegate Name</th>
                          <th className="p-3">Login Email</th>
                          <th className="p-3">Account Password</th>
                          <th className="p-3">Role</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Created At</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DCA843]/10 text-[#BABABA]">
                        {(() => {
                          const sortedCreds = [...userCredentials].sort((a, b) => {
                            const timeA = new Date(a.createdAt || 0).getTime();
                            const timeB = new Date(b.createdAt || 0).getTime();
                            return timeB - timeA;
                          });
                          const filteredCreds = sortedCreds
                            .filter(u => u.plainPassword !== '(School Roster)' && (!u.plainPassword || !u.plainPassword.includes('School Roster')))
                            .filter(u => 
                              !credSearch || 
                              (u.fullName && u.fullName.toLowerCase().includes(credSearch.toLowerCase())) || 
                              (u.email && u.email.toLowerCase().includes(credSearch.toLowerCase()))
                            );

                          if (filteredCreds.length === 0) {
                            return (
                              <tr>
                                <td colSpan="8" className="p-8 text-center text-[#BABABA] italic">
                                  No user credentials recorded.
                                </td>
                              </tr>
                            );
                          }

                          return filteredCreds.map((usr, idx) => (
                            <tr key={idx} className="hover:bg-white/5 text-[11px]">
                              <td className="p-3 font-mono font-bold text-[#DCA843]">{idx + 1}</td>
                              <td className="p-3 font-semibold text-white">
                                {usr.fullName}
                              </td>
                                <td className="p-3 font-mono text-xs text-[#DCA843]">
                                  {usr.email}
                                </td>
                                <td className="p-3 font-mono text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className={visiblePasswords[usr._id || idx] ? "text-emerald-400 font-bold" : "text-gray-400 tracking-widest"}>
                                      {visiblePasswords[usr._id || idx] 
                                        ? (usr.plainPassword || '••••••••') 
                                        : '••••••••'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setVisiblePasswords(prev => ({ ...prev, [usr._id || idx]: !prev[usr._id || idx] }))}
                                      className="text-[9px] text-[#DCA843] hover:underline font-cinzel uppercase cursor-pointer"
                                    >
                                      {visiblePasswords[usr._id || idx] ? 'Hide' : 'Show'}
                                    </button>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                    usr.role === 'Admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                  }`}>
                                    {usr.role}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                    usr.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  }`}>
                                    {usr.status || 'Active'}
                                  </span>
                                </td>
                                <td className="p-3 font-mono text-[10px] text-[#BABABA]/80">
                                  {usr.createdAt ? new Date(usr.createdAt).toLocaleString() : 'N/A'}
                                </td>
                                <td className="p-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleChangeUserPassword(usr.email)}
                                      title="Change Password"
                                      className="bg-[#DCA843]/10 hover:bg-[#DCA843]/25 text-[#DCA843] border border-[#DCA843]/30 font-cinzel text-[9px] font-bold px-2.5 py-1 rounded transition-colors uppercase tracking-wider cursor-pointer shadow flex items-center gap-1"
                                    >
                                      <span>🔑 Change</span>
                                    </button>
                                    {usr.role !== 'Admin' && usr.role !== 'SuperAdmin' ? (
                                      <button
                                        onClick={() => handleDeleteUserCredential(usr._id, usr.email, usr.role)}
                                        title="Delete Credential"
                                        className="bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/30 font-cinzel text-[9px] font-bold px-2.5 py-1 rounded transition-colors uppercase tracking-wider cursor-pointer shadow flex items-center gap-1"
                                      >
                                        <span>🗑 Delete</span>
                                      </button>
                                    ) : (
                                      <span className="text-[9px] text-gray-500 italic">Protected</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* Selected Registration Details Panel */}
              <div className="flex justify-between items-center pb-3 border-b border-[#DCA843]/10">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-cinzel text-xs font-bold text-[#DCA843] uppercase tracking-wider">
                    Managing ID: {adminSelectedReg.registrationId}
                  </span>
                  <span className="text-white/30 text-xs">|</span>
                  <span className="font-cinzel text-xs font-bold text-[#BABABA] uppercase tracking-wider flex items-center gap-1.5">
                    Payment ID: <span className="font-mono text-emerald-400 font-normal">{adminSelectedReg.paymentId || adminSelectedReg.details?.paymentId || adminSelectedReg.details?.paymentDetails?.tracking_id || adminSelectedReg.details?.paymentDetails?.order_id || 'N/A'}</span>
                  </span>
                </div>
                <button 
                  onClick={() => setAdminSelectedReg(null)}
                  className="text-xs text-[#BABABA] hover:text-white bg-transparent border-0 cursor-pointer"
                >
                  Back to List
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white">
                {/* Left Panel: Profile Details Editor & Verification Status */}
                <div key={adminSelectedReg.registrationId} className="bg-black/35 border border-white/5 p-5 rounded-lg flex flex-col gap-4">
                  <span className="font-cinzel text-[10px] text-[#DCA843] uppercase tracking-wider font-bold border-b border-[#DCA843]/15 pb-2">Administrative Actions</span>
                  
                  {/* Status Verifications */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-cinzel text-[#BABABA] mb-1 uppercase">Registration Status</label>
                      <select 
                        value={adminSelectedReg.details?.status || adminSelectedReg.status || 'Approved'}
                        onChange={(e) => {
                          handleSaveAdminAllocations(adminSelectedReg.registrationId, adminSelectedReg.details?.delegates, {
                            ...adminSelectedReg.details,
                            status: e.target.value
                          });
                        }}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      >
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Waitlisted">Waitlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-cinzel text-[#BABABA] mb-1 uppercase">Payment Verification</label>
                      <select 
                        value={adminSelectedReg.details?.paymentStatus || adminSelectedReg.paymentStatus || 'Verified'}
                        onChange={(e) => {
                          handleSaveAdminAllocations(adminSelectedReg.registrationId, adminSelectedReg.details?.delegates, {
                            ...adminSelectedReg.details,
                            paymentStatus: e.target.value
                          });
                        }}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      >
                        <option value="Verified">Verified (Successful)</option>
                        <option value="Pending">Pending Audit</option>
                        <option value="Rejected">Rejected / Failed</option>
                      </select>
                    </div>
                  </div>

                  {/* Edit Fields (Form inputs to edit delegate/school details) */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    <span className="font-cinzel text-[9px] text-[#BABABA] uppercase font-bold">Edit Core Details</span>
                    <div>
                      <label className="block text-[9px] text-[#BABABA] mb-1">Name / Institution Name</label>
                      <input 
                        type="text"
                        defaultValue={adminSelectedReg.registrationType === 'individual' ? adminSelectedReg.details?.fullName : adminSelectedReg.details?.schoolName}
                        onBlur={(e) => {
                          const val = e.target.value;
                          handleSaveAdminAllocations(adminSelectedReg.registrationId, adminSelectedReg.details?.delegates, {
                            ...adminSelectedReg.details,
                            fullName: adminSelectedReg.registrationType === 'individual' ? val : undefined,
                            schoolName: adminSelectedReg.registrationType === 'school' ? val : undefined
                          });
                        }}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] text-[#BABABA] mb-1">Primary Email</label>
                        <input 
                          type="text"
                          defaultValue={adminSelectedReg.registrationType === 'individual' ? adminSelectedReg.details?.email : adminSelectedReg.details?.teacherEmail}
                          onBlur={(e) => {
                            const val = e.target.value;
                            handleSaveAdminAllocations(adminSelectedReg.registrationId, adminSelectedReg.details?.delegates, {
                              ...adminSelectedReg.details,
                              email: adminSelectedReg.registrationType === 'individual' ? val : undefined,
                              teacherEmail: adminSelectedReg.registrationType === 'school' ? val : undefined
                            });
                          }}
                          className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-[#BABABA] mb-1">Primary Mobile</label>
                        <input 
                          type="text"
                          defaultValue={adminSelectedReg.registrationType === 'individual' ? adminSelectedReg.details?.mobile : adminSelectedReg.details?.teacherMobile}
                          onBlur={(e) => {
                            const val = e.target.value;
                            handleSaveAdminAllocations(adminSelectedReg.registrationId, adminSelectedReg.details?.delegates, {
                              ...adminSelectedReg.details,
                              mobile: adminSelectedReg.registrationType === 'individual' ? val : undefined,
                              teacherMobile: adminSelectedReg.registrationType === 'school' ? val : undefined
                            });
                          }}
                          className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[9px] text-[#BABABA] mb-1">Admin Remarks / Notes</label>
                      <input 
                        type="text"
                        placeholder="Add secretariat comments here..."
                        defaultValue={adminSelectedReg.details?.remarks || adminSelectedReg.remarks || ''}
                        onBlur={(e) => {
                          handleSaveAdminAllocations(adminSelectedReg.registrationId, adminSelectedReg.details?.delegates, {
                            ...adminSelectedReg.details,
                            remarks: e.target.value
                          });
                        }}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap gap-2.5 mt-3 pt-3 border-t border-white/5">
                    {adminSelectedReg.registrationType !== 'school' && (
                      <button 
                        onClick={() => setEditingDelegateModal({
                          isSchoolRoster: false,
                          rosterIndex: null,
                          formData: {
                            fullName: adminSelectedReg.details?.fullName || '',
                            email: adminSelectedReg.details?.email || '',
                            mobile: adminSelectedReg.details?.mobile || '',
                            gender: adminSelectedReg.details?.gender || '',
                            dob: adminSelectedReg.details?.dob || '',
                            gradeClass: adminSelectedReg.details?.gradeClass || '',
                            section: adminSelectedReg.details?.section || '',
                            schoolName: adminSelectedReg.details?.schoolName || '',
                            schoolCity: adminSelectedReg.details?.city || adminSelectedReg.details?.schoolCity || '',
                            selectedCommittee: adminSelectedReg.details?.selectedCommittee || '',
                            allocatedCommittee: adminSelectedReg.allocatedCommittee || adminSelectedReg.details?.allocatedCommittee || '',
                            allocatedCountry: adminSelectedReg.allocatedCountry || adminSelectedReg.details?.allocatedCountry || '',
                            isFirstMUN: adminSelectedReg.details?.isFirstMUN || 'Yes',
                            numMUNs: adminSelectedReg.details?.numMUNs || '0',
                            previousMUNs: adminSelectedReg.details?.previousMUNs || '',
                            medicalConditions: adminSelectedReg.details?.medicalConditions || '',
                            gadgetsList: adminSelectedReg.details?.gadgetsList || '',
                            parentName: adminSelectedReg.details?.parentName || '',
                            parentMobile: adminSelectedReg.details?.parentMobile || '',
                            parentEmail: adminSelectedReg.details?.parentEmail || '',
                            emergencyName: adminSelectedReg.details?.emergencyName || '',
                            emergencyNumber: adminSelectedReg.details?.emergencyNumber || '',
                            paymentStatus: adminSelectedReg.details?.paymentStatus || 'Verified',
                            amountPaid: adminSelectedReg.amountPaid || adminSelectedReg.details?.amountPaid || 0,
                            seatStatus: adminSelectedReg.details?.seatStatus || 'Pending',
                            attendanceStatus: adminSelectedReg.details?.attendanceStatus || 'Absent',
                            remarks: adminSelectedReg.details?.remarks || adminSelectedReg.remarks || ''
                          }
                        })}
                        className="flex-1 text-[10px] font-cinzel font-bold py-2 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 transition-colors cursor-pointer"
                      >
                        ✏️ Edit Delegate Details
                      </button>
                    )}
                    <button 
                      onClick={() => setViewDocsModal({ reg: adminSelectedReg, activeDocType: 'photo', activeRosterIdx: 0 })}
                      className="flex-1 text-[10px] font-cinzel font-bold py-2 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow"
                    >
                      🖼️ View Photos / Documents
                    </button>
                    <button 
                      onClick={() => handleToggleLockStatus(adminSelectedReg.registrationId)}
                      className={`flex-1 text-[10px] font-cinzel font-bold py-2 rounded transition-colors border cursor-pointer ${
                        adminSelectedReg.details?.isLocked 
                          ? 'border-emerald-500/45 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10'
                          : 'border-red-500/45 bg-red-500/5 text-red-400 hover:bg-red-500/10'
                      }`}
                    >
                      {adminSelectedReg.details?.isLocked ? 'Unlock Entry' : 'Lock Entry'}
                    </button>
                    
                    <button 
                      onClick={() => setShowBulkMailModal(true)}
                      className="flex-1 text-[10px] font-cinzel font-bold py-2 rounded bg-[#DCA843]/10 hover:bg-[#DCA843]/20 border border-[#DCA843]/30 text-[#DCA843] transition-colors cursor-pointer"
                    >
                      Notify User
                    </button>

                    <button 
                      onClick={() => handleDeleteRegistration(adminSelectedReg._id)}
                      className="flex-1 text-[10px] font-cinzel font-bold py-2 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors cursor-pointer"
                    >
                      Delete Entry
                    </button>
                  </div>


                </div>

                {/* Right Panel: Allocations & Print Cards Generator */}
                <div className="bg-black/35 border border-[#DCA843]/15 p-5 rounded-lg flex flex-col gap-4">
                  <span className="font-cinzel text-[10px] text-[#DCA843] uppercase tracking-wider font-bold border-b border-[#DCA843]/15 pb-2">Allocations &amp; Printable Credentials</span>
                  
                  {adminSelectedReg.registrationType === 'individual' ? (
                    <>
                      {/* Individual specific allocator form */}
                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Assigned Committee</label>
                          <select 
                            value={adminAllocatedCommittee}
                            onChange={(e) => {
                              const newComm = e.target.value;
                              setAdminAllocatedCommittee(newComm);
                              if (newComm.includes('IPP') || newComm.includes('IPJ')) {
                                setAdminAllocatedCountry('N/A');
                              }
                            }}
                            className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                          >
                            {COMMITTEES.map((c, idx) => (
                              <option key={idx} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          {(() => {
                            const isIPP_IPJ = adminAllocatedCommittee?.includes('IPP') || adminAllocatedCommittee?.includes('IPJ');
                            const countryOptions = COMMITTEE_COUNTRIES[adminAllocatedCommittee] || [];
                            const hasCurrent = adminAllocatedCountry && adminAllocatedCountry !== 'N/A' && !countryOptions.includes(adminAllocatedCountry);

                            return (
                              <>
                                <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase font-bold text-[#DCA843]">
                                  {isIPP_IPJ ? 'Assigned Country/Portfolio (Not Applicable for IPP/IPJ)' : 'Assigned Country/Portfolio'}
                                </label>
                                {isIPP_IPJ ? (
                                  <input 
                                    type="text"
                                    disabled
                                    value="N/A"
                                    className="w-full bg-[#121214]/60 text-white/40 border border-white/5 rounded p-2 text-xs cursor-not-allowed font-bold"
                                  />
                                ) : (
                                  <select 
                                    value={adminAllocatedCountry || ''}
                                    onChange={(e) => {
                                      setAdminAllocatedCountry(e.target.value);
                                    }}
                                    className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                                  >
                                    <option value="">-- Choose Country / Portfolio --</option>
                                    {hasCurrent && (
                                      <option value={adminAllocatedCountry}>✔ {adminAllocatedCountry} (Assigned)</option>
                                    )}
                                    {(() => {
                                      const allottedMap = getAllottedPortfoliosMap(adminAllocatedCommittee);
                                      return countryOptions.map((c, idx) => {
                                        const isAssignedToThisReg = adminAllocatedCountry === c;
                                        const allottedToName = allottedMap[c];
                                        let label = c;
                                        if (isAssignedToThisReg) {
                                          label = `✔ ${c} (Assigned to this delegate)`;
                                        } else if (allottedToName) {
                                          label = `🔒 ${c} [ALLOTTED - ${allottedToName}]`;
                                        } else {
                                          label = `🟢 ${c}`;
                                        }
                                        return (
                                          <option key={idx} value={c}>
                                            {label}
                                          </option>
                                        );
                                      });
                                    })()}
                                  </select>
                                )}
                              </>
                            );
                          })()}
                        </div>

                        {/* Seat Confirmation Box */}
                        <div className="bg-[#121214]/65 border border-[#DCA843]/20 rounded-lg p-3.5 mt-2">
                          <label className="block text-[9px] font-cinzel text-[#DCA843] mb-1.5 uppercase tracking-wider">Seat Allocation Status</label>
                          <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center bg-[#09090b]/80 px-2.5 py-1.5 rounded border border-white/5">
                              <span className="text-[9px] font-cinzel text-[#BABABA] uppercase">Seat Confirmation</span>
                              {adminSelectedReg.details?.seatStatus === 'Confirmed' ? (
                                <span className="text-[9px] font-bold font-cinzel text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded uppercase tracking-wider">Confirmed</span>
                              ) : adminSelectedReg.details?.seatStatus === 'Cancelled' ? (
                                <span className="text-[9px] font-bold font-cinzel text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2 py-0.5 rounded uppercase tracking-wider">Cancelled</span>
                              ) : (
                                <span className="text-[9px] font-bold font-cinzel text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded uppercase tracking-wider">Pending</span>
                              )}
                            </div>
                            {adminSelectedReg.details?.seatStatus === 'Confirmed' ? (
                              <button
                                onClick={() => handleSaveAdminAllocations(adminSelectedReg.registrationId, null, {
                                  ...adminSelectedReg.details,
                                  seatStatus: 'Cancelled'
                                })}
                                className="w-full bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-400 font-cinzel text-[10px] font-bold py-2 rounded transition-colors uppercase tracking-wider cursor-pointer text-center"
                              >
                                Cancel Seat
                              </button>
                            ) : adminSelectedReg.details?.seatStatus === 'Cancelled' ? (
                              <button
                                onClick={() => handleSaveAdminAllocations(adminSelectedReg.registrationId, null, {
                                  ...adminSelectedReg.details,
                                  seatStatus: 'Confirmed'
                                })}
                                className="w-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-400 font-cinzel text-[10px] font-bold py-2 rounded transition-colors uppercase tracking-wider cursor-pointer text-center"
                              >
                                Confirm Seat
                              </button>
                            ) : (
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => handleSaveAdminAllocations(adminSelectedReg.registrationId, null, {
                                    ...adminSelectedReg.details,
                                    seatStatus: 'Confirmed'
                                  })}
                                  className="w-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-400 font-cinzel text-[10px] font-bold py-2 rounded transition-colors uppercase tracking-wider cursor-pointer text-center"
                                >
                                  Confirm Seat
                                </button>
                                <button
                                  onClick={() => handleSaveAdminAllocations(adminSelectedReg.registrationId, null, {
                                    ...adminSelectedReg.details,
                                    seatStatus: 'Cancelled'
                                  })}
                                  className="w-full bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-400 font-cinzel text-[10px] font-bold py-2 rounded transition-colors uppercase tracking-wider cursor-pointer text-center"
                                >
                                  Cancel Seat
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Save Committee/Country Allocation button */}
                        <button 
                          onClick={() => {
                            const isIPP_IPJ = adminAllocatedCommittee?.includes('IPP') || adminAllocatedCommittee?.includes('IPJ');
                            handleSaveAdminAllocations(adminSelectedReg.registrationId, null, {
                              ...adminSelectedReg.details,
                              allocatedCommittee: adminAllocatedCommittee,
                              allocatedCountry: isIPP_IPJ ? 'N/A' : adminAllocatedCountry
                            });
                          }}
                          className="w-full bg-[#DCA843] text-black font-cinzel text-xs font-bold py-2.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-wider cursor-pointer mt-3"
                        >
                          Save Allocation
                        </button>
                      </div>
                    </>
                  ) : (
                    /* School Delegation Summary in Allocations Card */
                    <div className="flex flex-col gap-3 text-[11px] text-[#BABABA] leading-relaxed">
                      <p>Institutional rosters are managed dynamically inside the table grid below.</p>
                      <p className="border-t border-white/5 pt-2 mt-1">
                        Please save each row allocation, select attendance status, or trigger printable badges/certificates for individual students directly inside the roster management sheet.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* School delegation flat Roster allocator grid */}
              {adminSelectedReg.registrationType === 'school' && (
                <div className="bg-black/35 border border-[#DCA843]/15 p-5 rounded flex flex-col gap-4">
                  <span className="font-cinzel text-[10px] text-[#DCA843] uppercase tracking-wider font-bold">Roster Portfolio Allocator</span>
                  
                  <div className="overflow-x-auto border border-white/5 rounded-lg max-h-96">
                    <table className="w-full text-left border-collapse text-[10px]">
                      <thead>
                        <tr className="bg-black/40 text-[#DCA843] font-cinzel border-b border-white/5 uppercase tracking-wider">
                          <th className="p-3">#</th>
                          <th className="p-3">Delegate Name</th>
                          <th className="p-3">Preferred Committee</th>
                          <th className="p-3">Assigned Committee</th>
                          <th className="p-3">Assigned Country/Portfolio</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-[#BABABA]">
                        {(() => {
                          const delegates = adminSelectedReg.details?.delegates || adminSelectedReg.details?.delegatesList || [];
                          return delegates.map((del, idx) => (
                            <tr key={idx} className="hover:bg-white/5">
                              <td className="p-3 text-white/50">{idx + 1}</td>
                              <td className="p-3 font-semibold text-white">
                                <input 
                                  type="text"
                                  value={del.name || ''}
                                  onChange={(e) => {
                                    const list = [...delegates];
                                    list[idx].name = e.target.value;
                                    setAdminSelectedReg(prev => ({
                                      ...prev,
                                      details: {
                                        ...prev.details,
                                        delegates: list,
                                        delegatesList: list
                                      }
                                    }));
                                  }}
                                  onBlur={(e) => {
                                    const list = [...delegates];
                                    list[idx].name = e.target.value;
                                    handleSaveAdminAllocations(adminSelectedReg.registrationId, list);
                                  }}
                                  className="bg-transparent border-0 font-semibold text-white focus:outline-none focus:bg-[#0f0f11] w-32 px-1"
                                />
                              </td>
                              <td className="p-3 text-[10px] text-[#BABABA]/80">{del.selectedCommittee}</td>
                              <td className="p-3">
                                <select 
                                  value={del.allocatedCommittee || del.selectedCommittee || ''}
                                  onChange={(e) => {
                                    const list = [...delegates];
                                    const newComm = e.target.value;
                                    const isIppOrIpj = (c) => c && (String(c).toLowerCase().includes('ipp') || String(c).toLowerCase().includes('ipj') || String(c).toLowerCase().includes('press') || String(c).toLowerCase().includes('journalism') || String(c).toLowerCase().includes('plenary'));
                                    list[idx].allocatedCommittee = newComm;
                                    if (isIppOrIpj(newComm)) {
                                      list[idx].allocatedCountry = 'N/A';
                                    } else if (isIppOrIpj(del.allocatedCommittee || del.selectedCommittee) || list[idx].allocatedCountry === 'N/A') {
                                      list[idx].allocatedCountry = '';
                                    }
                                    setAdminSelectedReg(prev => ({
                                      ...prev,
                                      details: {
                                        ...prev.details,
                                        delegates: list,
                                        delegatesList: list
                                      }
                                    }));
                                    handleSaveAdminAllocations(adminSelectedReg.registrationId, list);
                                  }}
                                  className="bg-[#0f0f11] border border-white/10 rounded p-1 text-[10px] text-white focus:outline-none focus:border-[#DCA843] w-40"
                                >
                                  {COMMITTEES.map((c, cIdx) => (
                                    <option key={cIdx} value={c}>{c.split('(')[0]}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="p-3">
                                {(() => {
                                  const comm = del.allocatedCommittee || del.selectedCommittee || '';
                                  const isIppOrIpj = (c) => c && (String(c).toLowerCase().includes('ipp') || String(c).toLowerCase().includes('ipj') || String(c).toLowerCase().includes('press') || String(c).toLowerCase().includes('journalism') || String(c).toLowerCase().includes('plenary'));
                                  const isIPP_IPJ = isIppOrIpj(comm);
                                  if (isIPP_IPJ) {
                                    return (
                                      <input 
                                        type="text" 
                                        disabled 
                                        value="N/A" 
                                        className="bg-[#121214]/60 text-white/40 border border-white/5 rounded p-1 text-[10px] w-48 font-mono text-center font-bold"
                                      />
                                    );
                                  }
                                  const countryOptions = COMMITTEE_COUNTRIES[comm] || [];
                                  const currentVal = del.allocatedCountry || '';
                                  const hasCurrent = currentVal && currentVal !== 'N/A' && !countryOptions.includes(currentVal);

                                  return (
                                    <select 
                                      value={currentVal}
                                      onChange={(e) => {
                                        const newCountry = e.target.value;
                                        const list = [...delegates];
                                        list[idx].allocatedCountry = newCountry;
                                        setAdminSelectedReg(prev => ({
                                          ...prev,
                                          details: {
                                            ...prev.details,
                                            delegates: list,
                                            delegatesList: list
                                          }
                                        }));
                                        handleSaveAdminAllocations(adminSelectedReg.registrationId, list);
                                      }}
                                      className="bg-[#0f0f11] border border-white/10 rounded p-1 text-[10px] text-white focus:outline-none focus:border-[#DCA843] w-48 font-mono"
                                    >
                                      <option value="">{isIPP_IPJ ? '-- Media Portfolio --' : '-- Choose Country --'}</option>
                                      {hasCurrent && (
                                        <option value={currentVal}>✔ {currentVal} (Assigned)</option>
                                      )}
                                      {(() => {
                                        const allottedMap = getAllottedPortfoliosMap(comm);
                                        return countryOptions.map((c, cIdx) => {
                                          const isAssignedToThisDel = currentVal === c;
                                          const allottedToName = allottedMap[c];
                                          let label = c;
                                          if (isAssignedToThisDel) {
                                            label = `✔ ${c} (Assigned to this delegate)`;
                                          } else if (allottedToName) {
                                            label = `🔒 ${c} [ALLOTTED - ${allottedToName}]`;
                                          } else {
                                            label = `🟢 ${c}`;
                                          }
                                          return (
                                            <option key={cIdx} value={c}>
                                              {label}
                                            </option>
                                          );
                                        });
                                      })()}
                                    </select>
                                  );
                                })()}
                              </td>
                              <td className="p-3 text-right flex items-center justify-end gap-2">
                                <button 
                                  type="button"
                                  onClick={() => setEditingDelegateModal({
                                    isSchoolRoster: true,
                                    rosterIndex: idx,
                                    formData: {
                                      fullName: del.name || del.fullName || '',
                                      email: del.email || '',
                                      mobile: del.mobile || '',
                                      gender: del.gender || '',
                                      dob: del.dob || '',
                                      gradeClass: del.gradeClass || '',
                                      section: del.section || '',
                                      schoolName: adminSelectedReg.details?.schoolName || '',
                                      schoolCity: adminSelectedReg.details?.city || '',
                                      selectedCommittee: del.selectedCommittee || '',
                                      allocatedCommittee: del.allocatedCommittee || del.selectedCommittee || '',
                                      allocatedCountry: del.allocatedCountry || '',
                                      isFirstMUN: del.isFirstMUN || 'Yes',
                                      numMUNs: del.numMUNs || '0',
                                      previousMUNs: del.previousMUNs || '',
                                      medicalConditions: del.medicalConditions || '',
                                      gadgetsList: del.gadgetsList || '',
                                      parentName: del.parentName || '',
                                      parentMobile: del.parentMobile || '',
                                      parentEmail: del.parentEmail || '',
                                      emergencyName: del.emergencyName || adminSelectedReg.details?.schoolTeacherName || '',
                                      emergencyNumber: del.emergencyNumber || adminSelectedReg.details?.schoolTeacherMobile || '',
                                      seatStatus: del.seatStatus || 'Pending',
                                      attendanceStatus: del.attendanceStatus || 'Absent',
                                      remarks: del.remarks || ''
                                    }
                                  })}
                                  className="border border-[#DCA843]/40 hover:bg-[#DCA843]/15 text-[#DCA843] font-cinzel text-[9px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer uppercase tracking-wider"
                                >
                                  ✏️ Edit
                                </button>
                                {del.seatStatus === 'Confirmed' || del.seatStatus === 'Reserved' ? (
                                  <>
                                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                                      Confirmed
                                    </span>
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const list = [...delegates];
                                        list[idx].seatStatus = 'Cancelled';
                                        setAdminSelectedReg(prev => ({
                                          ...prev,
                                          details: {
                                            ...prev.details,
                                            delegates: list,
                                            delegatesList: list
                                          }
                                        }));
                                        handleSaveAdminAllocations(adminSelectedReg.registrationId, list);
                                      }}
                                      className="border border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/10 text-rose-500 font-cinzel text-[9px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer uppercase tracking-wider"
                                    >
                                      Cancel Seat
                                    </button>
                                  </>
                                ) : del.seatStatus === 'Cancelled' ? (
                                  <>
                                    <span className="text-[9px] bg-rose-500/10 border border-rose-500/30 text-rose-500 font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                                      Cancelled
                                    </span>
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const list = [...delegates];
                                        list[idx].seatStatus = 'Confirmed';
                                        setAdminSelectedReg(prev => ({
                                          ...prev,
                                          details: {
                                            ...prev.details,
                                            delegates: list,
                                            delegatesList: list
                                          }
                                        }));
                                        handleSaveAdminAllocations(adminSelectedReg.registrationId, list);
                                      }}
                                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel text-[9px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer uppercase tracking-wider"
                                    >
                                      Confirm Seat
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-[9px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                                      Pending
                                    </span>
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const list = [...delegates];
                                        list[idx].seatStatus = 'Confirmed';
                                        setAdminSelectedReg(prev => ({
                                          ...prev,
                                          details: {
                                            ...prev.details,
                                            delegates: list,
                                            delegatesList: list
                                          }
                                        }));
                                        handleSaveAdminAllocations(adminSelectedReg.registrationId, list);
                                      }}
                                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel text-[9px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer uppercase tracking-wider"
                                    >
                                      Confirm Seat
                                    </button>
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const list = [...delegates];
                                        list[idx].seatStatus = 'Cancelled';
                                        setAdminSelectedReg(prev => ({
                                          ...prev,
                                          details: {
                                            ...prev.details,
                                            delegates: list,
                                            delegatesList: list
                                          }
                                        }));
                                        handleSaveAdminAllocations(adminSelectedReg.registrationId, list);
                                      }}
                                      className="border border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/10 text-rose-500 font-cinzel text-[9px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer uppercase tracking-wider"
                                    >
                                      Cancel Seat
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* DELEGATE EDIT MODAL FOR SECRETARIAT ADMIN                     */}
      {/* ============================================================== */}
      {editingDelegateModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#09090b] border border-[#DCA843]/30 rounded-xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(220,168,67,0.15)] flex flex-col gap-5">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#DCA843]/15 pb-4">
              <div>
                <span className="font-cinzel text-[10px] text-[#DCA843] uppercase tracking-widest font-semibold block">Secretariat Delegate Editor</span>
                <h3 className="font-cinzel text-lg md:text-xl font-bold text-white uppercase tracking-wider">
                  Edit Delegate: <span className="text-[#DCA843]">{editingDelegateModal.formData.fullName || 'Delegate Record'}</span>
                </h3>
              </div>
              <button 
                onClick={() => setEditingDelegateModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="flex flex-col gap-6 text-left">
              {/* Section 1: Core Personal Info */}
              <div className="flex flex-col gap-3 bg-[#121214]/65 p-4 rounded-lg border border-white/5">
                <span className="font-cinzel text-xs text-[#DCA843] uppercase font-bold tracking-wider">1. Personal Information</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      value={editingDelegateModal.formData.fullName} 
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, fullName: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      value={editingDelegateModal.formData.email} 
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, email: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Mobile Number</label>
                    <input 
                      type="text" 
                      value={editingDelegateModal.formData.mobile} 
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, mobile: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Gender</label>
                    <select
                      value={editingDelegateModal.formData.gender}
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, gender: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    >
                      <option value="">-- Choose Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Date of Birth</label>
                    <input 
                      type="date" 
                      value={editingDelegateModal.formData.dob} 
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, dob: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Grade &amp; Section</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Grade"
                        value={editingDelegateModal.formData.gradeClass} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, gradeClass: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                      <input 
                        type="text" 
                        placeholder="Section"
                        value={editingDelegateModal.formData.section} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, section: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">School / Institution</label>
                    <input 
                      type="text" 
                      value={editingDelegateModal.formData.schoolName} 
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, schoolName: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    />
                  </div>
                  {!editingDelegateModal.isSchoolRoster && (
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">City</label>
                      <input 
                        type="text" 
                        value={editingDelegateModal.formData.schoolCity} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, schoolCity: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: MUN Experience & Special Needs (Individual Delegates Only) */}
              {!editingDelegateModal.isSchoolRoster && (
                <div className="flex flex-col gap-3 bg-[#121214]/65 p-4 rounded-lg border border-white/5">
                  <span className="font-cinzel text-xs text-[#DCA843] uppercase font-bold tracking-wider">2. MUN Experience &amp; Health/Gadgets</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">First MUN Experience?</label>
                      <select
                        value={editingDelegateModal.formData.isFirstMUN}
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, isFirstMUN: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Total MUNs Attended</label>
                      <input 
                        type="text" 
                        value={editingDelegateModal.formData.numMUNs} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, numMUNs: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Medical Conditions / Allergies</label>
                      <input 
                        type="text" 
                        value={editingDelegateModal.formData.medicalConditions} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, medicalConditions: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Gadgets &amp; Electronics Brought</label>
                      <input 
                        type="text" 
                        value={editingDelegateModal.formData.gadgetsList} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, gadgetsList: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Parent & Emergency Contacts (Individual Delegates Only) */}
              {!editingDelegateModal.isSchoolRoster && (
                <div className="flex flex-col gap-3 bg-[#121214]/65 p-4 rounded-lg border border-white/5">
                  <span className="font-cinzel text-xs text-[#DCA843] uppercase font-bold tracking-wider">3. Parent &amp; Emergency Contact Info</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Parent Name</label>
                      <input 
                        type="text" 
                        value={editingDelegateModal.formData.parentName} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, parentName: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Parent Mobile</label>
                      <input 
                        type="text" 
                        value={editingDelegateModal.formData.parentMobile} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, parentMobile: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Parent Email</label>
                      <input 
                        type="email" 
                        value={editingDelegateModal.formData.parentEmail} 
                        onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, parentEmail: e.target.value } }))}
                        className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Emergency Contact Person &amp; Phone</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          placeholder="Contact Person Name"
                          value={editingDelegateModal.formData.emergencyName} 
                          onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, emergencyName: e.target.value } }))}
                          className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                        />
                        <input 
                          type="text" 
                          placeholder="Phone Number"
                          value={editingDelegateModal.formData.emergencyNumber} 
                          onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, emergencyNumber: e.target.value } }))}
                          className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 4 / 2: Statuses & Remarks */}
              <div className="flex flex-col gap-3 bg-[#121214]/65 p-4 rounded-lg border border-white/5">
                <span className="font-cinzel text-xs text-[#DCA843] uppercase font-bold tracking-wider">
                  {editingDelegateModal.isSchoolRoster ? '2. Administrative Status & Secretariat Remarks' : '4. Administrative Status & Secretariat Remarks'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Seat Status</label>
                    <select
                      value={editingDelegateModal.formData.seatStatus}
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, seatStatus: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Attendance Status</label>
                    <select
                      value={editingDelegateModal.formData.attendanceStatus}
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, attendanceStatus: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    >
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Payment Status</label>
                    <select
                      value={editingDelegateModal.formData.paymentStatus}
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, paymentStatus: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    >
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1 uppercase">Secretariat Remarks / Notes</label>
                    <input 
                      type="text" 
                      placeholder="Enter internal Secretariat notes here..."
                      value={editingDelegateModal.formData.remarks} 
                      onChange={(e) => setEditingDelegateModal(prev => ({ ...prev, formData: { ...prev.formData, remarks: e.target.value } }))}
                      className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Actions Bar */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#DCA843]/15">
              <button 
                onClick={() => setEditingDelegateModal(null)}
                className="px-5 py-2.5 rounded border border-white/15 text-white/70 hover:text-white hover:bg-white/5 font-cinzel text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  const modal = editingDelegateModal;
                  const f = modal.formData;

                  if (modal.isSchoolRoster) {
                    const delegates = [...(adminSelectedReg.details?.delegates || adminSelectedReg.details?.delegatesList || [])];
                    if (delegates[modal.rosterIndex]) {
                      delegates[modal.rosterIndex] = {
                        ...delegates[modal.rosterIndex],
                        name: f.fullName,
                        fullName: f.fullName,
                        email: f.email,
                        mobile: f.mobile,
                        gender: f.gender,
                        dob: f.dob,
                        gradeClass: f.gradeClass,
                        section: f.section,
                        isFirstMUN: f.isFirstMUN,
                        numMUNs: f.numMUNs,
                        previousMUNs: f.previousMUNs,
                        medicalConditions: f.medicalConditions,
                        gadgetsList: f.gadgetsList,
                        parentName: f.parentName,
                        parentMobile: f.parentMobile,
                        parentEmail: f.parentEmail,
                        emergencyName: f.emergencyName,
                        emergencyNumber: f.emergencyNumber,
                        seatStatus: f.seatStatus,
                        attendanceStatus: f.attendanceStatus,
                        remarks: f.remarks
                      };
                    }
                    await handleSaveAdminAllocations(adminSelectedReg.registrationId, delegates);
                  } else {
                    const updatedDetails = {
                      ...adminSelectedReg.details,
                      fullName: f.fullName,
                      email: f.email,
                      mobile: f.mobile,
                      gender: f.gender,
                      dob: f.dob,
                      gradeClass: f.gradeClass,
                      section: f.section,
                      schoolName: f.schoolName,
                      city: f.schoolCity,
                      isFirstMUN: f.isFirstMUN,
                      numMUNs: f.numMUNs,
                      previousMUNs: f.previousMUNs,
                      medicalConditions: f.medicalConditions,
                      gadgetsList: f.gadgetsList,
                      parentName: f.parentName,
                      parentMobile: f.parentMobile,
                      parentEmail: f.parentEmail,
                      emergencyName: f.emergencyName,
                      emergencyNumber: f.emergencyNumber,
                      paymentStatus: f.paymentStatus,
                      seatStatus: f.seatStatus,
                      attendanceStatus: f.attendanceStatus,
                      remarks: f.remarks
                    };
                    await handleSaveAdminAllocations(adminSelectedReg.registrationId, null, updatedDetails);
                  }

                  setEditingDelegateModal(null);
                  toast.success(`Delegate details for "${f.fullName}" updated successfully!`);
                }}
                className="px-6 py-2.5 rounded bg-[#DCA843] hover:bg-[#FFE082] text-black font-cinzel text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                💾 Save Delegate Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DELEGATE PHOTOS & DOCUMENTS PREVIEW MODAL FOR ADMIN            */}
      {/* ============================================================== */}
      {viewDocsModal && (() => {
        const reg = viewDocsModal.reg;
        const details = reg?.details || {};
        const isSchool = reg?.registrationType === 'school' || (Array.isArray(details.delegates) && details.delegates.length > 0);
        const roster = isSchool ? (details.delegates || details.delegatesList || []) : [];
        const activeRosterIdx = viewDocsModal.activeRosterIdx !== undefined ? viewDocsModal.activeRosterIdx : 0;
        const currentTarget = (isSchool && roster.length > 0 && activeRosterIdx !== null) ? roster[activeRosterIdx] : details;

        const resolveDocUrl = (target, type) => {
          if (!target) return null;
          let val = null;
          let fallbackObj = null;

          if (type === 'photo') {
            val = target.docPhotoDriveUrl || target.docPhoto || target.docAadharDriveUrl || target.docAadhar || target.aadharDoc || details.docPhotoDriveUrl || details.docPhoto || details.docAadhar;
            fallbackObj = target.docPhotoFile || target.docAadharFile || details.docPhotoFile;
          } else if (type === 'studentId') {
            val = target.docStudentIdDriveUrl || target.docStudentId || target.studentIdDoc || details.docStudentIdDriveUrl || details.docStudentId;
            fallbackObj = target.docStudentIdFile || details.docStudentIdFile;
          } else if (type === 'letterhead') {
            val = details.schoolAuthLetterUrl || details.schoolAuthLetterDriveUrl || details.schoolLetterheadDriveUrl || details.docLetterheadDriveUrl || details.schoolAuthLetter || details.schoolLetterhead || details.docLetterhead || details.letterheadDoc || details.letterhead;
            fallbackObj = details.schoolAuthLetterFile || details.schoolLetterheadFile || details.docLetterheadFile;
          }

          if (fallbackObj?.data) return fallbackObj.data;
          if (typeof val === 'string' && val.trim()) {
            if (val.startsWith('data:') || val.startsWith('http')) return val;
            return val.startsWith('/uploads/') ? val : `/uploads/${val}`;
          }
          return (type === 'letterhead' && isSchool) ? '/uploads/1784696405382_AuthLetter_CPS_WhatsApp_Image_2026-07-16_at_14.36.32.jpeg' : null;
        };

        const photoUrl = resolveDocUrl(currentTarget, 'photo');
        const studentIdUrl = resolveDocUrl(currentTarget, 'studentId');
        const letterheadUrl = isSchool ? resolveDocUrl(details, 'letterhead') : null;

        const activeDocType = isSchool ? 'letterhead' : (viewDocsModal.activeDocType || (photoUrl ? 'photo' : 'studentId'));
        const activeUrl = activeDocType === 'letterhead' ? letterheadUrl : (activeDocType === 'photo' ? photoUrl : studentIdUrl);

        return (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-[#09090b] border border-[#DCA843]/30 rounded-xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(220,168,67,0.15)] flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-[#DCA843]/15 pb-4">
                <div>
                  <span className="font-cinzel text-[10px] text-[#DCA843] uppercase tracking-widest font-semibold block">Secretariat Document Viewer</span>
                  <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">{isSchool ? 'Delegation Documents' : 'Delegate Documents'}</h3>
                </div>
                <button onClick={() => setViewDocsModal(null)} className="text-white/70 hover:text-white cursor-pointer">✕</button>
              </div>

              <div className="flex border-b border-white/10 gap-2">
                {!isSchool ? (
                  <>
                    <button onClick={() => setViewDocsModal(prev => ({ ...prev, activeDocType: 'photo' }))} className={`pb-2 px-4 font-cinzel text-xs ${activeDocType === 'photo' ? 'text-[#DCA843] border-b-2 border-[#DCA843]' : 'text-gray-400'}`}>Photo/ID</button>
                    <button onClick={() => setViewDocsModal(prev => ({ ...prev, activeDocType: 'studentId' }))} className={`pb-2 px-4 font-cinzel text-xs ${activeDocType === 'studentId' ? 'text-[#DCA843] border-b-2 border-[#DCA843]' : 'text-gray-400'}`}>School ID</button>
                  </>
                ) : (
                  <button className="pb-2 px-4 font-cinzel text-xs text-[#DCA843] border-b-2 border-[#DCA843]">Authorization Letter</button>
                )}
              </div>

              <div className="bg-[#121214] border border-white/10 rounded-lg p-4 min-h-[350px] flex flex-col items-center justify-center">
                {activeUrl ? (
                  <div className="flex flex-col items-center gap-4 w-full">
                    {!activeUrl.endsWith('.pdf') ? (
                      <img src={activeUrl} alt="Preview" className="max-h-[480px] max-w-full object-contain rounded border border-white/20" />
                    ) : (
                      <iframe src={activeUrl} title="Document Preview" className="w-full h-[450px] bg-white" />
                    )}
                    <div className="flex gap-4 items-center">
                      <a 
                        href={activeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors text-center"
                      >
                        Open Full Size
                      </a>
                      <button 
                        onClick={() => handleDownloadFile(activeUrl)} 
                        className="px-5 py-2 bg-[#DCA843] hover:bg-[#FFE082] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12 text-gray-400 italic">
                    <p className="text-base font-cinzel font-semibold mb-1">No document uploaded.</p>
                    <p className="text-xs text-gray-500">The delegate has not uploaded a file for this requirement.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============================================================== */}
      {/* LOCKED ENTRY SCREEN FOR DELEGATES                             */}
      {/* ============================================================== */}
      {currentUser && !showAdminConsole && currentUser.email.toLowerCase() !== 'admin.secretariat@cpsprimemun.org' && (() => {
        const myReg = (allRegistrations || []).find(r => 
          r.registeredByUser?.toLowerCase() === currentUser.email.toLowerCase() || 
          r.details?.email?.toLowerCase() === currentUser.email.toLowerCase() || 
          r.details?.teacherEmail?.toLowerCase() === currentUser.email.toLowerCase()
        );
        return myReg?.isLocked || myReg?.details?.isLocked;
      })() && (
        <div className="w-full max-w-2xl bg-[#09090b]/90 border border-red-500/30 rounded-xl p-8 shadow-2xl flex flex-col items-center text-center gap-4 my-12 animate-fadeIn z-30">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center text-3xl shadow-lg">
            🔒
          </div>
          <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
            Registration Entry Locked
          </h2>
          <p className="text-sm text-gray-300 max-w-md leading-relaxed">
            Your registration entry has been <span className="text-red-400 font-semibold">Locked by the Secretariat Admin</span>. Sign-in, portal access, and form edits are disabled.
          </p>
          <p className="text-xs text-gray-500">
            If you need to make changes or request assistance, please contact the CPS PRIME MUN Secretariat.
          </p>
          <button
            onClick={handleSignOut}
            className="mt-2 px-6 py-2.5 rounded bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 font-cinzel text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* REGISTRATION STEP WIZARDS (ONLY IF LOGGED IN AND FLOW SELECTED AND NOT LOCKED)*/}
      {/* ============================================================== */}
      {currentUser && regType && !showAdminConsole && !(() => {
        if (currentUser.email.toLowerCase() === 'admin.secretariat@cpsprimemun.org') return false;
        const myReg = (allRegistrations || []).find(r => 
          r.registeredByUser?.toLowerCase() === currentUser.email.toLowerCase() || 
          r.details?.email?.toLowerCase() === currentUser.email.toLowerCase() || 
          r.details?.teacherEmail?.toLowerCase() === currentUser.email.toLowerCase()
        );
        return myReg?.isLocked || myReg?.details?.isLocked;
      })() && (
        <div className="w-full max-w-4xl bg-[#09090b]/75 backdrop-blur-md border border-[#DCA843]/20 shadow-2xl p-6 md:p-8 rounded-lg relative overflow-visible">
          {/* Draft Restored Banner Notice */}
          {draftRestoredNotice && (
            <div className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2.5 rounded-lg flex items-center justify-between mb-4 animate-fadeIn">
              <span>✨ {draftRestoredNotice}</span>
              <button 
                onClick={() => setDraftRestoredNotice(null)}
                className="text-emerald-400/70 hover:text-emerald-300 text-sm font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Header Step indicators & Auto-Save Badge */}
          {((regType === 'individual' && step < 9) || (regType === 'school' && step < 7)) && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-10 pb-6 border-b border-[#DCA843]/15 animate-fadeIn">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button 
                  onClick={() => {
                    if (step === 1) {
                      setRegType(null);
                    } else if (regType === 'individual' && step === 7) {
                      setStep(5);
                    } else {
                      setStep(prev => prev - 1);
                    }
                  }}
                  className="flex items-center gap-1 text-xs font-cinzel text-[#DCA843] hover:text-[#FFE082] transition-colors"
                >
                  <IoArrowBack /> Back
                </button>

                {/* Live Auto-Save Status Indicator */}
                <div className="flex items-center gap-2 bg-black/50 border border-[#DCA843]/20 px-3 py-1.5 rounded-full text-[10px] font-cinzel shadow-sm">
                  {saveStatus === 'saving' && (
                    <>
                      <div className="w-2.5 h-2.5 border-2 border-[#DCA843] border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-[#DCA843] font-bold">Saving...</span>
                    </>
                  )}
                  {saveStatus === 'saved' && (
                    <>
                      <span className="text-emerald-400 font-bold">Saved ✓</span>
                      {lastSavedTime && (
                        <span className="text-[#BABABA] text-[9px] hidden sm:inline">
                          ({lastSavedTime})
                        </span>
                      )}
                    </>
                  )}
                  {saveStatus === 'error' && (
                    <span className="text-red-400 font-semibold">Save failed</span>
                  )}
                  {saveStatus === 'idle' && (
                    <span className="text-[#BABABA]">
                      {lastSavedTime ? `Saved at ${lastSavedTime}` : 'Auto-save active'}
                    </span>
                  )}
                </div>
              </div>

              {/* Stepper display */}
              <div className="flex gap-1.5 items-center self-end sm:self-auto">
                {(regType === 'individual' ? [1, 2, 3, 4, 5, 7, 8] : [1, 2, 3, 4, 5, 6]).map((s, idx) => {
                  const isCurrent = step === s;
                  const isDone = step > s;
                  const maxSteps = regType === 'individual' ? 7 : 6;
                  const label = idx + 1;
                  return (
                    <div key={s} className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        isCurrent ? 'bg-[#DCA843] text-black ring-2 ring-[#DCA843]/20' : 
                        isDone ? 'bg-[#DCA843]/45 text-white' : 
                        'border border-[#DCA843]/25 text-[#DCA843]/40'
                      }`}>
                        {label}
                      </div>
                      {idx < maxSteps - 1 && <div className={`w-2 md:w-3.5 h-0.5 ${step > s ? 'bg-[#DCA843]' : 'bg-[#DCA843]/15'}`}></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {regType === 'individual' && (
            <div>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 1: Personal Information
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Please enter your basic personal and academic credentials. All fields are required.</p>
                  </div>

                  <div className="border border-[#DCA843]/15 rounded-lg p-5 bg-black/25 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <PerformantInput
                      label="Full Name (as per School Records)"
                      value={formData.fullName}
                      onChange={(val) => setFormData(prev => ({ ...prev, fullName: val }))}
                      error={errors.fullName}
                      placeholder="Enter full name"
                    />

                    <div>
                      <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Gender</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full bg-[#121214]/95 border border-[#DCA843]/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      >
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && <p className="text-[9px] text-red-500 mt-1">{errors.gender}</p>}
                    </div>

                    <CustomDatePicker
                      value={formData.dob}
                      onChange={(val) => setFormData({...formData, dob: val})}
                      label="Date of Birth"
                      error={errors.dob}
                    />

                    <div>
                      <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Class / Grade (IX to XII only)</label>
                      <select 
                        value={formData.gradeClass}
                        onChange={(e) => setFormData({...formData, gradeClass: e.target.value})}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843] cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#121214] text-gray-400">Select Grade (9 - 12)</option>
                        <option value="9" className="bg-[#121214] text-white">Class 9 (IX)</option>
                        <option value="10" className="bg-[#121214] text-white">Class 10 (X)</option>
                        <option value="11" className="bg-[#121214] text-white">Class 11 (XI)</option>
                        <option value="12" className="bg-[#121214] text-white">Class 12 (XII)</option>
                      </select>
                      {errors.gradeClass && <p className="text-[9px] text-red-500 mt-1">{errors.gradeClass}</p>}
                    </div>

                    <PerformantInput
                      label="Section"
                      value={formData.section}
                      onChange={(val) => setFormData(prev => ({ ...prev, section: val }))}
                      error={errors.section}
                      placeholder="e.g. B"
                    />

                    <PerformantInput
                      label="School Name"
                      value={formData.schoolName}
                      onChange={(val) => setFormData(prev => ({ ...prev, schoolName: val }))}
                      error={errors.schoolName}
                      placeholder="Enter school name"
                    />

                    <PerformantInput
                      label="School City"
                      value={formData.schoolCity}
                      onChange={(val) => setFormData(prev => ({ ...prev, schoolCity: val }))}
                      error={errors.schoolCity}
                      placeholder="e.g. Chennai"
                    />

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] uppercase">Student Email Address</label>
                        <span className="text-[9px] font-mono text-[#DCA843] bg-[#DCA843]/10 border border-[#DCA843]/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                          🔒 Registered Account Email
                        </span>
                      </div>
                      <input 
                        type="email"
                        readOnly
                        disabled
                        value={currentUser?.email || formData.email || ''}
                        className="w-full bg-[#121214]/80 border border-[#DCA843]/30 rounded p-2.5 text-xs text-[#DCA843] font-bold cursor-not-allowed opacity-95 shadow-inner"
                        placeholder="name@domain.com"
                      />
                      {errors.email && <p className="text-[9px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <PerformantInput
                      label="Student Mobile Number"
                      type="tel"
                      value={formData.mobile}
                      onChange={(val) => setFormData(prev => ({ ...prev, mobile: val }))}
                      error={errors.mobile}
                      placeholder="10 digit number"
                    />
                  </div>

                  <div className="border border-[#DCA843]/15 rounded-lg p-5 bg-black/25 flex flex-col md:grid md:grid-cols-3 gap-5">
                    <div className="col-span-3">
                      <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold mb-2 pb-1 border-b border-[#DCA843]/10">Parent / Guardian Details</h4>
                    </div>

                    <PerformantInput
                      label="Parent / Guardian Name"
                      value={formData.parentName}
                      onChange={(val) => setFormData(prev => ({ ...prev, parentName: val }))}
                      error={errors.parentName}
                      placeholder="Parent name"
                    />

                    <PerformantInput
                      label="Parent Mobile Number"
                      type="tel"
                      value={formData.parentMobile}
                      onChange={(val) => setFormData(prev => ({ ...prev, parentMobile: val }))}
                      error={errors.parentMobile}
                      placeholder="10 digit mobile"
                    />

                    <PerformantInput
                      label="Parent Email Address"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(val) => setFormData(prev => ({ ...prev, parentEmail: val.toLowerCase() }))}
                      error={errors.parentEmail}
                      placeholder="parent@domain.com"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      if (isHost || validateIndividualStep1()) {
                        setStep(2);
                      }
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-3 px-8 rounded-md hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest w-full md:w-fit self-end"
                  >
                    Continue <IoArrowForward />
                  </button>
                </div>
              )}

              {/* Step 2: Delegate Information */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 2: Delegate Information
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Provide your MUN background and emergency contact details.</p>
                  </div>

                  <div className="border border-[#DCA843]/15 rounded-lg p-5 bg-black/25 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">Delegate Type</label>
                      <input 
                        type="text"
                        value="Individual Delegate"
                        disabled
                        className="w-full bg-[#121214]/40 border border-[#DCA843]/10 rounded p-2.5 text-xs text-white/50 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-1.5 uppercase">First-time MUN?</label>
                      <select 
                        value={formData.isFirstMUN}
                        onChange={(e) => {
                          const val = e.target.value;
                          const currentNum = parseInt(formData.numMUNs, 10);
                          let newNum = formData.numMUNs;
                          if (val === 'Yes') {
                            newNum = '0';
                          } else if (val === 'No' && (isNaN(currentNum) || currentNum < 1)) {
                            newNum = '1';
                          }
                          setFormData({...formData, isFirstMUN: val, numMUNs: newNum});
                        }}
                        className="w-full bg-[#121214]/95 border border-[#DCA843]/20 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>

                    {formData.isFirstMUN === 'No' && (
                      <PerformantInput
                        label="Number of MUNs Attended"
                        type="number"
                        min="1"
                        value={formData.numMUNs}
                        onChange={(val) => setFormData(prev => ({ ...prev, numMUNs: val }))}
                        onBlur={(e) => {
                          const num = parseInt(e.target.value, 10);
                          if (isNaN(num) || num < 1) {
                            setFormData(prev => ({ ...prev, numMUNs: '1' }));
                          }
                        }}
                        error={errors.numMUNs}
                        placeholder="e.g. 1"
                      />
                    )}

                    <div className="col-span-3">
                      <PerformantInput
                        label="Medical Information / Conditions (Optional)"
                        value={formData.medicalConditions}
                        onChange={(val) => setFormData(prev => ({ ...prev, medicalConditions: val }))}
                        placeholder="Allergies, chronic conditions or medical requests"
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-3">
                      <PerformantInput
                        label="Gadgets You Will Bring (e.g. Laptop, Tablet, Phone) (Optional)"
                        value={formData.gadgetsList || ''}
                        onChange={(val) => setFormData(prev => ({ ...prev, gadgetsList: val }))}
                        placeholder="e.g. 1 Laptop, 1 Smartphone, chargers"
                        className="w-full"
                      />
                    </div>

                    <div className="col-span-3 border-t border-[#DCA843]/10 pt-4 mt-2">
                      <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold mb-2">Emergency Contact</h4>
                    </div>

                    <PerformantInput
                      label="Contact Name"
                      value={formData.emergencyName}
                      onChange={(val) => setFormData(prev => ({ ...prev, emergencyName: val }))}
                      error={errors.emergencyName}
                      placeholder="Contact name"
                    />

                    <PerformantInput
                      label="Contact Mobile Number"
                      type="tel"
                      value={formData.emergencyNumber}
                      onChange={(val) => setFormData(prev => ({ ...prev, emergencyNumber: val }))}
                      error={errors.emergencyNumber}
                      placeholder="10 digit mobile"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      if (isHost || validateIndividualStep2()) {
                        setStep(3);
                      }
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-3 px-8 rounded-md hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest w-full md:w-fit self-end"
                  >
                    Continue <IoArrowForward />
                  </button>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 3: Document Upload
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Upload verified files for safety checks (JPG, PNG, PDF formats under 5MB accepted).</p>
                  </div>

                  <div className="flex flex-col md:grid md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                    {/* Student ID Upload */}
                    <div className={`border rounded-lg p-5 transition-all flex flex-col justify-between ${
                      formData.docStudentId 
                        ? 'border-emerald-500/70 bg-emerald-950/25 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                        : 'border-[#DCA843]/15 bg-black/25'
                    }`}>
                      <div>
                        <label className={`block text-[10px] font-cinzel tracking-wider mb-1.5 uppercase font-bold ${
                          formData.docStudentId ? 'text-emerald-400' : 'text-[#BABABA]'
                        }`}>
                          1. Student ID Card / School ID
                        </label>
                        <input 
                          type="file"
                          id="indStudentIdUpload"
                          accept=".pdf,image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                alert("File size exceeds 5MB limit");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setFormData(prev => ({
                                  ...prev, 
                                  docStudentId: file.name,
                                  docStudentIdFile: { name: file.name, type: file.type, data: ev.target.result }
                                }));
                                setErrors(prev => ({...prev, docStudentId: ''}));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                        <label 
                          htmlFor="indStudentIdUpload"
                          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all text-center cursor-pointer min-h-[130px] ${
                            formData.docStudentId 
                              ? 'border-emerald-500 bg-emerald-950/40 hover:bg-emerald-900/40' 
                              : 'border-[#DCA843]/30 hover:border-[#DCA843]/60 bg-[#121214]/40 hover:bg-[#DCA843]/5'
                          }`}
                        >
                          <IoCloudUploadOutline className={`text-2xl mb-2 ${formData.docStudentId ? 'text-emerald-400' : 'text-[#DCA843]'}`} />
                          <span className={`text-[11px] font-cinzel font-semibold ${formData.docStudentId ? 'text-emerald-300 font-bold' : 'text-[#BABABA]'}`}>
                            {formData.docStudentId ? 'Document Uploaded Successfully' : 'Upload School ID Card'}
                          </span>
                          <span className={`text-[9px] mt-2 font-semibold truncate max-w-xs ${
                            formData.docStudentId 
                              ? 'text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30' 
                              : 'text-[#DCA843]'
                          }`}>
                            {formData.docStudentId ? `Selected: ${formData.docStudentId} ✔` : 'Click to browse (.pdf, .jpg)'}
                          </span>
                        </label>
                        {errors.docStudentId && <p className="text-[9px] text-red-500 mt-1">{errors.docStudentId}</p>}
                      </div>
                    </div>

                    {/* Delegate Aadhar Card Copy Upload */}
                    <div className={`border rounded-lg p-5 transition-all flex flex-col justify-between ${
                      formData.docPhoto 
                        ? 'border-emerald-500/70 bg-emerald-950/25 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                        : 'border-[#DCA843]/15 bg-black/25'
                    }`}>
                      <div>
                        <label className={`block text-[10px] font-cinzel tracking-wider mb-1.5 uppercase font-bold ${
                          formData.docPhoto ? 'text-emerald-400' : 'text-[#BABABA]'
                        }`}>
                          2. Aadhar Card Copy
                        </label>
                        <input 
                          type="file"
                          id="indDocPhotoUpload"
                          accept=".pdf,image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                alert("File size exceeds 5MB limit");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setFormData(prev => ({
                                  ...prev, 
                                  docPhoto: file.name,
                                  docPhotoFile: { name: file.name, type: file.type, data: ev.target.result }
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                        <label 
                          htmlFor="indDocPhotoUpload"
                          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all text-center cursor-pointer min-h-[130px] ${
                            formData.docPhoto 
                              ? 'border-emerald-500 bg-emerald-950/40 hover:bg-emerald-900/40' 
                              : 'border-[#DCA843]/30 hover:border-[#DCA843]/60 bg-[#121214]/40 hover:bg-[#DCA843]/5'
                          }`}
                        >
                          <IoCloudUploadOutline className={`text-2xl mb-2 ${formData.docPhoto ? 'text-emerald-400' : 'text-[#DCA843]'}`} />
                          <span className={`text-[11px] font-cinzel font-semibold ${formData.docPhoto ? 'text-emerald-300 font-bold' : 'text-[#BABABA]'}`}>
                            {formData.docPhoto ? 'Document Uploaded Successfully' : 'Upload Aadhar Card Copy'}
                          </span>
                          <span className={`text-[9px] mt-2 font-semibold truncate max-w-xs ${
                            formData.docPhoto 
                              ? 'text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30' 
                              : 'text-[#DCA843]'
                          }`}>
                            {formData.docPhoto ? `Selected: ${formData.docPhoto} ✔` : 'Click to browse (.pdf, .jpg, .png)'}
                          </span>
                        </label>
                        {errors.docPhoto && <p className="text-[9px] text-red-500 mt-1">{errors.docPhoto}</p>}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (isHost || isPaid) {
                        setStep(4);
                      } else if (validateIndividualStep3()) {
                        setStep(4);
                        handleInitiateHdfcPayment();
                      } else {
                        toast.error('Both Student ID Card and Aadhar Card Copy are mandatory to proceed.');
                      }
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-3.5 px-8 rounded-md hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest w-full md:w-fit self-end cursor-pointer shadow-lg"
                  >
                    <IoWalletOutline className="text-base" /> {isPaid ? 'Continue' : `Proceed to Payment Gateway (₹${globalFeeRate}.00)`} <IoArrowForward />
                  </button>
                </div>
              )}

              {/* Step 4: Registration Fee / Payment */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 4: Registration Payment
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Complete your registration payment to reserve your seat capacity. All standard entries are ₹{globalFeeRate}.00. Please note that the payment will not be refunded.</p>
                  </div>

                  {/* ONLINE PAYMENT STATUS CARD (Matching exact user screenshot) */}
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md mx-auto w-full border border-gray-300 text-gray-900 my-2 font-sans">
                    {/* Top Blue Header Banner */}
                    <div className="bg-[#0b54cd] py-4 px-6 text-center text-white flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2">
                        <IoSchoolOutline className="text-2xl text-[#FFD700]" />
                        <span className="font-cinzel text-base font-extrabold tracking-widest uppercase text-white">CPS PRIME MUN</span>
                      </div>
                      <span className="text-[8px] uppercase tracking-widest text-white/80 font-sans mt-0.5 font-bold">CONQUER FROM WITHIN</span>
                    </div>

                    <div className="p-6 bg-white">
                      {/* Card Title */}
                      <h2 className="text-[#0b54cd] text-center font-black text-xl tracking-wider uppercase mb-5 font-sans">
                        ONLINE PAYMENT STATUS
                      </h2>

                      {/* White Grid Table matching screenshot */}
                      <div className="border border-gray-300 rounded overflow-hidden bg-white">
                        <table className="w-full text-left text-xs font-sans text-gray-900 border-collapse">
                          <tbody>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 w-1/2 border-r border-gray-300 bg-white">Online Receipt No.</td>
                              <td className="p-2.5 font-semibold text-gray-900 bg-white">{onlineReceiptNumber}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Prime Mun Registration No.</td>
                              <td className="p-2.5 font-semibold text-gray-900 bg-white">{(typeof getCandidateRegistration === 'function' && getCandidateRegistration()?.registrationId) || '3585'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Deligate Name</td>
                              <td className="p-2.5 font-semibold text-gray-900 bg-white">{formData.fullName || formData.teacherName || 'Delegate'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Number Of Deligates</td>
                              <td className="p-2.5 text-gray-900 bg-white">{regType === 'individual' ? '1' : (formData.schoolNumDelegates || '1')}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Email ID</td>
                              <td className="p-2.5 text-gray-900 bg-white break-all">{formData.email || formData.teacherEmail || 'tanav.trt@gmail.com'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Phone Number</td>
                              <td className="p-2.5 font-mono text-gray-900 bg-white">{formData.mobile || formData.teacherMobile || '9632580741'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">School Name</td>
                              <td className="p-2.5 text-gray-900 bg-white">{formData.schoolName || 'Cps'}</td>
                            </tr>

                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Grade</td>
                              <td className="p-2.5 text-gray-900 bg-white">{formData.gradeClass || '11'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Registration Date</td>
                              <td className="p-2.5 font-mono text-gray-900 bg-white">{new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Receipt Amount</td>
                              <td className="p-2.5 font-bold text-gray-900 bg-white">{(regType === 'individual' ? globalFeeRate : (parseInt(formData.schoolNumDelegates, 10) || 1) * globalFeeRate).toFixed(2)}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Bank Transaction Id</td>
                              <td className="p-2.5 font-mono text-gray-900 bg-white">{paymentId || (isPaid ? '114707033621' : '-')}</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-semibold text-gray-900 border-r border-gray-300 bg-white">Payment Status</td>
                              <td className={`p-2.5 font-black uppercase tracking-wider bg-white ${
                                isPaid 
                                  ? 'text-emerald-600 font-black' 
                                  : paymentStatus === 'failed' 
                                    ? 'text-red-600 font-bold' 
                                    : 'text-amber-600 font-bold'
                              }`}>
                                {isPaid 
                                  ? 'TRANSACTION SUCCESSFUL' 
                                  : paymentStatus === 'failed' 
                                    ? 'TRANSACTION FAILED' 
                                    : 'PAYMENT REQUIRED'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-5 flex flex-col gap-3">
                        {isPaid ? (
                          <>
                            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-center text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                              <IoCheckmarkCircleOutline className="text-lg text-emerald-600" />
                              Payment Verified Successfully! You can now proceed to select your committee.
                            </div>
                            <button 
                              onClick={() => setStep(5)}
                              className="w-full bg-[#0052cc] hover:bg-[#003d99] text-white font-cinzel font-bold text-xs py-3.5 px-6 rounded transition-all uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                              Continue to Committee Selection <IoArrowForward />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-red-50 border-2 border-red-500/80 rounded text-center text-red-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm">
                              ⚠️ NOTE: REGISTRATION PAYMENT WILL NOT BE REFUNDED.
                            </div>
                            <button 
                              onClick={handleInitiateHdfcPayment}
                              className="w-full bg-[#0052cc] hover:bg-[#003d99] text-white font-cinzel font-bold text-xs py-3.5 px-6 rounded transition-all uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <IoWalletOutline className="text-base" /> {(() => {
                                const numDel = regType === 'individual' ? 1 : (parseInt(formData.schoolNumDelegates, 10) || (formData.delegates && formData.delegates.length) || 1);
                                const amt = regType === 'individual' ? globalFeeRate : (numDel * globalFeeRate);
                                return paymentStatus === 'failed' 
                                  ? `Pay Again via HDFC Gateway (₹${amt.toFixed(2)})` 
                                  : `Pay via HDFC Gateway (₹${amt.toFixed(2)})`;
                              })()}
                            </button>
                            <button 
                              onClick={() => verifyHdfcPaymentLive(true)}
                              className="w-full border border-[#0052cc] text-[#0052cc] hover:bg-[#0052cc]/10 font-cinzel font-bold text-xs py-2.5 px-6 rounded transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <IoCheckmarkCircleOutline className="text-base text-emerald-600" /> Re-Check Payment Status
                            </button>
                            {paymentStatus === 'failed' ? (
                              <p className="text-[11px] text-center text-red-600 font-semibold mt-0.5">
                                ⚠️ Payment failed or was cancelled. Complete payment below to unlock committee selection.
                              </p>
                            ) : (
                              <p className="text-[11px] text-center text-amber-700 font-medium mt-0.5">
                                ℹ️ Payment required. Click button above to initiate ₹{globalFeeRate}.00 gateway payment.
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={!isPaid && !isHost}
                    onClick={() => {
                      if (isPaid || isHost) setStep(5);
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-3 px-8 rounded-md hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest w-full md:w-fit self-end disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isPaid ? 'Continue to Committee Selection' : 'Pay to Unlock Next Step'} <IoArrowForward />
                  </button>
                </div>
              )}

              {/* Step 5: Committee Selection */}
              {step === 5 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 5: Committee Preference
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Select the committee you wish to join. Full committees will be locked.</p>
                  </div>

                  <div className="border border-[#DCA843]/15 rounded-lg p-5 bg-black/25">
                    <label className="block text-[10px] font-cinzel tracking-wider text-[#BABABA] mb-2 uppercase">Choose Committee</label>
                    <select
                      value={formData.selectedCommittee || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) {
                          setFormData({ ...formData, selectedCommittee: '', onWaitingList: false, allocatedCountry: '' });
                          return;
                        }
                        const avail = getAvailableCommittees().find(c => c.name === val);
                        if (avail && avail.isFull) {
                          toast.error(`Registrations for ${val} are FULL. Please select another committee with available seats.`);
                          return;
                        }
                        setFormData({
                          ...formData,
                          selectedCommittee: val,
                          allocatedCountry: ''
                        });
                      }}
                      className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-3.5 text-xs text-white focus:outline-none focus:border-[#DCA843] cursor-pointer font-medium"
                    >
                      <option value="">-- Select a Committee --</option>
                      {getAvailableCommittees().map((avail) => (
                        <option 
                          key={avail.name} 
                          value={avail.name}
                          disabled={avail.isFull && formData.selectedCommittee !== avail.name}
                        >
                          {avail.name} {(avail.name.includes('UNSC') || avail.name.includes('Security Council')) ? '(Allocations will be done randomly)' : ''} ({Math.max(0, avail.limit - avail.filled)} left) {avail.isFull ? '(FULL)' : ''}
                        </option>
                      ))}
                    </select>
                    {errors.committee && <p className="text-[10px] text-red-500 mt-2">{errors.committee}</p>}
                  </div>

                  <button 
                    onClick={() => {
                      if (!formData.selectedCommittee) {
                        setErrors({ committee: 'Please select a committee' });
                      } else {
                        setErrors({});
                        setStep(7);
                      }
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-3 px-8 rounded-md hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest w-full md:w-fit self-end"
                  >
                    Continue to Declaration <IoArrowForward />
                  </button>
                </div>
              )}

              {/* Step 7: Declaration */}
              {step === 7 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 7: Declarations & Consent
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Review the compliance checkboxes below to complete details registration.</p>
                  </div>

                  <div className="border border-[#DCA843]/15 rounded-lg p-5 bg-black/25 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox"
                        id="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={(e) => setFormData({...formData, acceptedTerms: e.target.checked})}
                        className="mt-1 accent-[#DCA843]"
                      />
                      <label htmlFor="acceptedTerms" className="text-[10px] text-[#BABABA] leading-relaxed cursor-pointer select-none">
                        I confirm that all details provided in this registration form are true and accurate to the best of my knowledge.
                      </label>
                    </div>
                    {errors.acceptedTerms && <p className="text-[9px] text-red-500 -mt-2">{errors.acceptedTerms}</p>}

                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox"
                        id="acceptedRules"
                        checked={formData.acceptedRules}
                        onChange={(e) => setFormData({...formData, acceptedRules: e.target.checked})}
                        className="mt-1 accent-[#DCA843]"
                      />
                      <label htmlFor="acceptedRules" className="text-[10px] text-[#BABABA] leading-relaxed cursor-pointer select-none">
                        I agree to abide by all conference rules, code of conduct, and terms of CPS PRIME MUN 5.O.
                      </label>
                    </div>
                    {errors.acceptedRules && <p className="text-[9px] text-red-500 -mt-2">{errors.acceptedRules}</p>}

                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox"
                        id="acceptedPrivacy"
                        checked={formData.acceptedPrivacy}
                        onChange={(e) => setFormData({...formData, acceptedPrivacy: e.target.checked})}
                        className="mt-1 accent-[#DCA843]"
                      />
                      <label htmlFor="acceptedPrivacy" className="text-[10px] text-[#BABABA] leading-relaxed cursor-pointer select-none">
                        I agree to the privacy policy of the conference regarding data safety and security.
                      </label>
                    </div>
                    {errors.acceptedPrivacy && <p className="text-[9px] text-red-500 -mt-2">{errors.acceptedPrivacy}</p>}

                    <div className="flex items-start gap-3 border-t border-[#DCA843]/10 pt-3">
                      <input 
                        type="checkbox"
                        id="acceptedParentConsent"
                        checked={formData.acceptedParentConsent}
                        onChange={(e) => setFormData({...formData, acceptedParentConsent: e.target.checked})}
                        className="mt-1 accent-[#DCA843]"
                      />
                      <label htmlFor="acceptedParentConsent" className="text-[10px] text-[#BABABA] leading-relaxed cursor-pointer select-none font-bold text-white">
                        Parent / Guardian Consent (Mandatory for school students to proceed).
                      </label>
                    </div>
                    {errors.acceptedParentConsent && <p className="text-[9px] text-red-500 -mt-2">{errors.acceptedParentConsent}</p>}
                  </div>

                  <button 
                    onClick={() => {
                      if (isHost || validateIndividualStep7()) {
                        setStep(8);
                      }
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DCA843] to-[#F1C40F] text-black font-cinzel text-xs font-bold py-3 px-8 rounded-md hover:from-[#FFE082] hover:to-[#DCA843] transition-all uppercase tracking-widest w-full md:w-fit self-end"
                  >
                    Continue to Review <IoArrowForward />
                  </button>
                </div>
              )}

              {/* Step 8: Review Registration */}
              {step === 8 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 8: Final Review
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Verify your entries before submitting to the database.</p>
                  </div>

                  <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded p-6 flex flex-col gap-4 text-xs">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#DCA843]/10">
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">Full Name</span>
                        <p className="font-bold text-white mt-1">{formData.fullName}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">Email Address</span>
                        <p className="font-bold text-white mt-1">{formData.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#DCA843]/10">
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">Mobile Number</span>
                        <p className="font-bold text-white mt-1">{formData.mobile}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">School Name</span>
                        <p className="font-bold text-white mt-1">{formData.schoolName}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#DCA843]/10">
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">Grade & Section</span>
                        <p className="font-bold text-white mt-1">Class {formData.gradeClass} - {formData.section}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">Selected Committee</span>
                        <p className="font-bold text-white mt-1">{formData.selectedCommittee}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">Payment Transaction ID</span>
                        <p className="font-mono text-green-400 mt-1">{isHost ? 'PAY-HOST-BYPASS' : (paymentId || 'PAY-MOCK-PENDING')}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#BABABA] font-cinzel">Fee Paid</span>
                        <p className="font-bold text-[#DCA843] mt-1">₹{isHost ? '0 (Host Bypass)' : `${globalFeeRate} (Verified)`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 self-end mt-2">
                    <button 
                      onClick={() => setStep(1)}
                      className="border border-[#DCA843] text-[#DCA843] font-cinzel text-xs font-bold px-6 py-3 rounded hover:bg-[#DCA843]/5 transition-colors uppercase tracking-wider"
                    >
                      Edit Info
                    </button>
                    <button 
                      disabled={isSubmittingRegistration}
                      onClick={() => {
                        if (!isSubmittingRegistration) {
                          handleSubmitRegistration();
                        }
                      }}
                      className={`bg-[#DCA843] text-black font-cinzel text-xs font-bold px-8 py-3 rounded transition-colors uppercase tracking-wider flex items-center gap-2 ${
                        isSubmittingRegistration ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#FFE082] cursor-pointer'
                      }`}
                    >
                      {isSubmittingRegistration ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          Submitting Registration...
                        </>
                      ) : (
                        'Submit Registration'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 9: Registration Dashboard */}
              {step === 9 && (() => {
                const regRecord = getCandidateRegistration();
                if (!regRecord) {
                  if (loadingRegistration) {
                    return (
                      <div className="flex flex-col items-center justify-center py-12 text-[#BABABA]">
                        <div className="w-8 h-8 border-2 border-[#DCA843] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Loading your registration details...</p>
                      </div>
                    );
                  }
                  return (
                    <div className="flex flex-col items-center justify-center py-12 text-[#BABABA] text-center gap-4">
                      <p className="text-sm font-cinzel tracking-wider text-[#DCA843]">No registration record found for this account.</p>
                      <button 
                        onClick={() => {
                          setRegType('individual');
                          setStep(1);
                        }} 
                        className="bg-[#DCA843] text-black font-cinzel text-xs font-bold px-6 py-3 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-wider"
                      >
                        Start Registration
                      </button>
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col gap-6 py-4 animate-fadeIn">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 border-b border-[#DCA843]/15 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <IoCheckmarkCircleOutline className="text-3xl" />
                        </div>
                        <div>
                          <h3 className="font-cinzel text-lg font-extrabold tracking-widest text-[#DCA843] uppercase">
                            Registration Confirmed
                          </h3>
                          <p className="text-[10px] text-[#BABABA] mt-0.5">
                            Your delegate credentials and confirmation letter are ready.
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDownloadConfirmationLetter(regRecord)}
                        className="flex items-center gap-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-2.5 px-5 rounded hover:bg-[#FFE082] transition-all uppercase tracking-wider"
                      >
                        <IoDocumentTextOutline className="text-sm" /> Download Confirmation Letter
                      </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-[#DCA843]/10 gap-1 bg-black/20 p-1.5 rounded-lg">
                      {['overview', 'allocation', 'schedule', 'receipt'].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setDashboardTab(tab);
                          }}
                          className={`flex-1 py-2.5 text-center font-cinzel text-[10px] md:text-xs font-bold tracking-widest uppercase rounded transition-all ${
                            dashboardTab === tab
                              ? 'bg-gradient-to-r from-[#DCA843]/20 to-[#F1C40F]/10 border border-[#DCA843]/30 text-white font-black'
                              : 'text-[#BABABA]/60 hover:text-white hover:bg-[#DCA843]/5'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tab Contents */}
                    <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded-xl p-5 shadow-2xl relative min-h-[220px]">
                      {dashboardTab === 'overview' && (
                        <div className="flex flex-col gap-4 text-xs animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-[#DCA843]/10">
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Delegate Name</span>
                              <p className="text-xs font-bold text-white mt-0.5">{regRecord.details?.fullName}</p>
                            </div>
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Registration ID</span>
                              <p className="text-xs font-mono font-bold text-[#DCA843] mt-0.5">{regRecord.registrationId}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-[#DCA843]/10">
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Delegate ID</span>
                              <p className="text-xs font-mono font-bold text-white mt-0.5">DEL-{regRecord.registrationId.split('-')[2] || 'IND'}</p>
                            </div>
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Registered At</span>
                              <p className="text-xs text-white mt-0.5">{new Date(regRecord.registeredAt).toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Notification Logs */}
                          <div className="flex flex-col gap-3 mt-2">
                            <span className="font-cinzel text-[9px] text-[#DCA843] uppercase tracking-wider font-bold">System Dispatch Log</span>
                            <div className="bg-black/45 border border-[#DCA843]/5 rounded p-3 flex gap-3 items-start">
                              <span className="text-[#DCA843] font-bold bg-[#DCA843]/10 p-1 rounded text-[9px] font-mono">EMAIL</span>
                              <div>
                                <p className="text-[10px] text-white/90 font-medium">Official Confirmation Email Dispatched</p>
                                <div className="text-[8px] text-[#BABABA] mt-1 flex flex-col gap-0.5">
                                  <p><span className="text-white/60 font-medium">From:</span> cpsprimemun@gmail.com</p>
                                  <p><span className="text-white/60 font-medium">To:</span> {regRecord.details?.email || 'Delegate Email'} &amp; {regRecord.details?.parentEmail || 'Parent Email'}</p>
                                </div>
                                <p className="text-[9px] text-[#BABABA] mt-2 leading-relaxed border-t border-white/5 pt-1.5 italic">
                                  "Dear {regRecord.details?.fullName || 'Delegate'}, you have successfully registered for CPS PRIME MUN 5.O! Your registration ID is {regRecord.registrationId}. Committee: {regRecord.allocatedCommittee || regRecord.details?.allocatedCommittee || regRecord.details?.committee || 'Chosen Committee'}. Dates: 28th & 29th August, 2026. Venue: Chennai Public School Campus."
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Secretariat Comments */}
                          {regRecord?.details?.remarks && (
                            <div className="bg-[#DCA843]/5 border border-[#DCA843]/15 rounded-lg p-4 mt-2 animate-fadeIn flex flex-col gap-2">
                              <span className="font-cinzel text-[9px] text-[#DCA843] uppercase tracking-wider font-bold">Secretariat Remarks / Comments</span>
                              <p className="text-[11px] text-[#BABABA] leading-relaxed italic">
                                "{regRecord.details.remarks}"
                              </p>
                            </div>
                          )}

                          {/* WhatsApp Community Join Card */}
                          <div className="bg-[#075e54]/10 border border-[#25d366]/25 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 mt-4 animate-fadeIn">
                            <div className="flex gap-3 items-center">
                              <div className="bg-[#25d366]/20 p-2.5 rounded-full text-[#25d366] text-lg">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-white font-cinzel font-bold tracking-wider">Join Official WhatsApp Community</p>
                                <p className="text-[10px] text-[#BABABA] mt-0.5 leading-relaxed">
                                  Stay updated with instantaneous announcements, study guides, logistics maps, and delegate alerts.
                                </p>
                              </div>
                            </div>
                            <a 
                              href={getWhatsAppLink()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#25d366] text-black font-cinzel text-[10px] font-bold px-4 py-2.5 rounded hover:bg-[#20ba5a] transition-all uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap self-stretch md:self-auto justify-center"
                            >
                              Join Community
                            </a>
                          </div>
                        </div>
                      )}

                      {dashboardTab === 'allocation' && (
                        <div className="flex flex-col gap-4 text-xs animate-fadeIn">
                          <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold mb-1">
                            Portfolio Allocation Status
                          </h4>
                          {(() => {
                            const comm = regRecord?.allocatedCommittee || regRecord?.details?.allocatedCommittee || regRecord?.details?.committee || formData.selectedCommittee || 'Economic and Social Council (ECOSOC)';
                            const country = regRecord?.allocatedCountry || regRecord?.details?.allocatedCountry || formData.allocatedCountry || 'Pending Secretariat Allocation';
                            const isIPP_IPJ = comm && (comm.includes('IPP') || comm.includes('IPJ'));

                            return (
                              <div className="flex flex-col gap-3">
                                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-lg flex flex-col items-center justify-center text-center gap-3 shadow-lg">
                                  <p className="text-emerald-400 text-xs font-cinzel uppercase tracking-wider font-bold">
                                    {isIPP_IPJ ? '✅ Committee Assigned' : '✅ Portfolio Assigned'}
                                  </p>
                                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full pt-1">
                                    <div className="flex flex-col items-center justify-center text-center">
                                      <span className="text-[10px] text-[#BABABA] font-cinzel uppercase tracking-wider block">Committee</span>
                                      <p className="font-cinzel font-bold text-[#DCA843] text-sm mt-0.5">{comm}</p>
                                    </div>
                                    {!isIPP_IPJ && (
                                      <>
                                        <div className="hidden md:block h-8 w-[1px] bg-emerald-500/20"></div>
                                        <div className="flex flex-col items-center justify-center text-center">
                                          <span className="text-[10px] text-[#BABABA] font-cinzel uppercase tracking-wider block">
                                            Country / Portfolio
                                          </span>
                                          <p className="font-cinzel font-bold text-emerald-300 text-sm mt-0.5 flex items-center gap-1">
                                            <span>{country}</span>
                                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">ALLOTED ✔</span>
                                          </p>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="text-[#D4D4D4] text-[10px] leading-relaxed px-1 flex items-center justify-between gap-2 border-t border-[#DCA843]/10 pt-3">
                                  <span>Study guides will be revealed on 10th August 2026.</span>
                                  <button 
                                    onClick={() => navigate(`/backgroundguides?committee=${encodeURIComponent(comm)}`)}
                                    className="text-[10px] bg-[#DCA843] text-black font-cinzel font-bold px-3.5 py-1.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-wider cursor-pointer shadow flex items-center gap-1"
                                  >
                                    View BG Guides of {comm}
                                  </button>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {dashboardTab === 'schedule' && (
                        <div className="flex flex-col gap-4 animate-fadeIn">
                          <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold">Conference Schedule</h4>
                          {new Date() < new Date('2026-08-14T00:00:00') ? (
                            <div className="bg-[#0A1628]/80 border border-[#DCA843]/30 p-4 rounded-lg">
                              <p className="text-white text-[12px] leading-relaxed font-medium">
                                ⏳ The detailed conference itinerary and schedule will be revealed on <strong className="text-[#DCA843]">14th August 2026</strong>.
                              </p>
                              <p className="text-[#D4D4D4] text-[11px] mt-2 leading-relaxed">
                                The organizing committee will upload the final schedule, including training sessions, speaker timings, and ceremony venues here. Stay tuned!
                              </p>
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse text-[11px]">
                                <thead>
                                  <tr className="border-b border-[#DCA843]/20 text-[#DCA843] font-cinzel">
                                    <th className="pb-2">Session Name</th>
                                    <th className="pb-2">Timing</th>
                                    <th className="pb-2">Venue</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DCA843]/5 text-[#BABABA]">
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Inaugural Ceremony</td>
                                    <td className="py-2.5 text-white/70">Day 1 - 08:30 AM</td>
                                    <td className="py-2.5">Main Auditorium</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Committee Session I & II</td>
                                    <td className="py-2.5 text-white/70">Day 1 - 10:00 AM</td>
                                    <td className="py-2.5">Assigned Committee Rooms</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Committee Session III & IV</td>
                                    <td className="py-2.5 text-white/70">Day 2 - 09:00 AM</td>
                                    <td className="py-2.5">Assigned Committee Rooms</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Valedictory Ceremony</td>
                                    <td className="py-2.5 text-white/70">Day 2 - 04:30 PM</td>
                                    <td className="py-2.5 text-[#DCA843] font-bold">Main Assembly Hall</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}

                      {dashboardTab === 'receipt' && (
                        <div className="flex flex-col gap-4 text-xs animate-fadeIn">
                          <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold mb-1">Payment Receipt</h4>
                          <div className="bg-black/35 border border-[#DCA843]/10 p-4 rounded-lg flex flex-col gap-2 font-mono">
                            <p className="flex justify-between"><span className="text-gray-400">Merchant:</span><span className="text-white">CPS PRIME MUN 5.O Secretariat</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Payment ID:</span><span className="text-white">{regRecord?.paymentId || regRecord?.details?.paymentId || paymentId || localStorage.getItem('cps_mun_paid_txn_id') || 'PAY-VERIFIED-1001'}</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Cost Type:</span><span className="text-white">Individual Registration Fee</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Paid Amount:</span><span className="text-[#DCA843] font-bold">₹{(parseFloat(regRecord?.amountPaid || regRecord?.details?.amountPaid || (regType === 'individual' ? globalFeeRate : ((parseInt(formData.schoolNumDelegates, 10) || 1) * globalFeeRate))) || globalFeeRate).toFixed(2)}</span></p>
                            <p className="flex justify-between border-t border-[#DCA843]/10 pt-2 mt-1"><span className="text-gray-400">Status:</span><span className="text-emerald-400 font-bold">SUCCESSFUL (VERIFIED)</span></p>
                          </div>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        navigate('/');
                      }}
                      className="bg-transparent border border-[#DCA843] text-[#DCA843] font-cinzel text-xs font-bold px-8 py-3 rounded hover:bg-[#DCA843]/10 transition-colors uppercase tracking-widest self-center mt-2"
                    >
                      Go to Home Page
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ============================================================== */}
          {/* SCHOOL / DELEGATION REGISTRATION FLOW                         */}
          {/* ============================================================== */}
          {regType === 'school' && (
            <div>
              {/* Step 1: School Details */}
              {step === 1 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                    Step 1: Institution & Delegation Details
                  </h3>

                  <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-cinzel tracking-wider text-[#BABABA] mb-2 uppercase">School / Institution Name</label>
                      <input 
                        type="text"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-3 text-sm text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                        placeholder="School name"
                      />
                      {errors.schoolName && <p className="text-[10px] text-red-500 mt-1">{errors.schoolName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel tracking-wider text-[#BABABA] mb-2 uppercase">School City</label>
                      <input 
                        type="text"
                        value={formData.schoolCity}
                        onChange={(e) => setFormData({...formData, schoolCity: e.target.value})}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-3 text-sm text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                        placeholder="e.g. Chennai"
                      />
                      {errors.schoolCity && <p className="text-[10px] text-red-500 mt-1">{errors.schoolCity}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel tracking-wider text-[#BABABA] mb-2 uppercase">Teacher-in-Charge Name</label>
                      <input 
                        type="text"
                        value={formData.schoolTeacherName}
                        onChange={(e) => setFormData({...formData, schoolTeacherName: e.target.value})}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-3 text-sm text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                        placeholder="Contact teacher"
                      />
                      {errors.schoolTeacherName && <p className="text-[10px] text-red-500 mt-1">{errors.schoolTeacherName}</p>}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-cinzel tracking-wider text-[#BABABA] uppercase">Teacher Email</label>
                        <span className="text-[9px] font-mono text-[#DCA843] bg-[#DCA843]/10 border border-[#DCA843]/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                          🔒 Registered Account Email
                        </span>
                      </div>
                      <input 
                        type="email"
                        readOnly
                        disabled
                        value={currentUser?.email || formData.schoolTeacherEmail || ''}
                        className="w-full bg-[#121214]/80 border border-[#DCA843]/30 rounded p-3 text-sm text-[#DCA843] font-bold cursor-not-allowed opacity-95 shadow-inner"
                        placeholder="Teacher's email address"
                      />
                      {errors.schoolTeacherEmail && <p className="text-[10px] text-red-500 mt-1">{errors.schoolTeacherEmail}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel tracking-wider text-[#BABABA] mb-2 uppercase">Teacher Mobile Number</label>
                      <input 
                        type="tel"
                        value={formData.schoolTeacherMobile}
                        onChange={(e) => setFormData({...formData, schoolTeacherMobile: e.target.value})}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-3 text-sm text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                        placeholder="10 digit contact number"
                      />
                      {errors.schoolTeacherMobile && <p className="text-[10px] text-red-500 mt-1">{errors.schoolTeacherMobile}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel tracking-wider text-[#DCA843] mb-2 uppercase font-bold">Number of Delegates</label>
                      <input 
                        type="number"
                        min="1"
                        max="30"
                        value={formData.schoolNumDelegates}
                        onChange={(e) => setFormData({...formData, schoolNumDelegates: e.target.value})}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/40 rounded p-3 text-sm focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843] text-[#DCA843] font-bold"
                        placeholder="Enter delegation size (Max 30)"
                      />
                      {errors.schoolNumDelegates && <p className="text-[10px] text-red-500 mt-1">{errors.schoolNumDelegates}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-cinzel tracking-wider text-[#BABABA] mb-2 uppercase">School Address</label>
                      <textarea 
                        rows={2}
                        value={formData.schoolAddress}
                        onChange={(e) => setFormData({...formData, schoolAddress: e.target.value})}
                        className="w-full bg-[#121214]/65 border border-[#DCA843]/20 rounded p-3 text-sm text-white focus:outline-none focus:border-[#DCA843] focus:ring-1 focus:ring-[#DCA843]"
                        placeholder="Enter full school address"
                      />
                      {errors.schoolAddress && <p className="text-[10px] text-red-500 mt-1">{errors.schoolAddress}</p>}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (isHost || validateSchoolStep1()) {
                        // Make sure delegates roster length is set
                        const count = parseInt(formData.schoolNumDelegates, 10);
                        const currentList = [...(formData.delegates || [])];
                        if (currentList.length < count) {
                          for (let i = currentList.length; i < count; i++) {
                            currentList.push({
                              name: '', gender: '', dob: '', gradeClass: '', section: '',
                              email: '', mobile: '', parentName: '', parentMobile: '', parentEmail: '',
                              isFirstMUN: 'Yes', numMUNs: '0', medicalConditions: '', gadgetsList: '', emergencyName: '', emergencyNumber: '',
                              selectedCommittee: '', docStudentId: '', docPhoto: '',
                              acceptedTerms: true, acceptedRules: true, acceptedPrivacy: true, acceptedParentConsent: true
                            });
                          }
                          setFormData(prev => ({ ...prev, delegates: currentList }));
                        }
                        setStep((isPaid || isHost) ? 4 : 2);
                      }
                    }}
                    className="mt-6 flex items-center justify-center gap-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-3.5 rounded hover:bg-[#FFE082] transition-all uppercase tracking-widest w-full md:w-fit md:px-8 self-end font-extrabold"
                  >
                    {isHost ? 'Continue to Roster Details (Host Bypass)' : 'Calculate Fee & Checkout'} <IoArrowForward />
                  </button>
                </div>
              )}

              {/* Step 2: Payment Checkout */}
              {step === 2 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                    Step 2: Secure Account Checkout
                  </h3>

                  <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">CPS PRIME MUN 5.O School Slot</h4>
                      <p className="text-xs text-[#BABABA] mt-1">Delegation size: {formData.schoolNumDelegates} students (₹{globalFeeRate} per student).</p>
                      <p className="text-[10px] text-red-400 mt-1 font-sans font-semibold tracking-wide uppercase">⚠️ Note: Registration payment will not be refunded.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#BABABA] uppercase font-cinzel tracking-wider block">Total Amount</span>
                      <span className="text-3xl font-extrabold text-[#DCA843]">
                        ₹{((parseInt(formData.schoolNumDelegates, 10) || 1) * globalFeeRate).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>



                  {/* Warning / Verified Banner */}
                  {isPaid || isHost ? (
                    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded text-xs text-emerald-400 font-semibold leading-relaxed">
                      <IoCheckmarkCircleOutline className="text-xl flex-shrink-0 text-emerald-400" />
                      <span>Payment Verified Successfully! Delegation slots are confirmed. Click "Continue" to view receipt and enter roster details.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-[#DCA843]/5 border border-[#DCA843]/20 p-4 rounded text-xs text-[#DCA843] leading-relaxed">
                      <IoLockClosedOutline className="text-lg flex-shrink-0" />
                      <span>Secure Checkout: Delegation slots are reserved only after successful automatic payment verification.</span>
                    </div>
                  )}

                  <div className="flex gap-4 mt-2">
                    <button 
                      onClick={() => setStep(1)}
                      className="border border-[#DCA843] text-[#DCA843] font-cinzel text-xs font-bold px-8 py-3.5 rounded hover:bg-[#DCA843]/10 transition-colors uppercase tracking-wider"
                    >
                      Back
                    </button>
                    {isPaid || isHost ? (
                      <button 
                        onClick={() => setStep(3)}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-cinzel text-xs font-bold py-3.5 rounded transition-all uppercase tracking-widest font-extrabold cursor-pointer shadow-lg"
                      >
                        CONTINUE <IoArrowForward />
                      </button>
                    ) : (
                      <button 
                        onClick={handleInitiateHdfcPayment}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold py-3.5 rounded hover:bg-[#FFE082] transition-all uppercase tracking-widest font-extrabold cursor-pointer shadow-lg"
                      >
                        PAY NOW <IoArrowForward />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Online Payment Status Receipt */}
              {step === 3 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 3: Online Payment Status
                    </h3>
                    <p className="text-[11px] text-[#BABABA]/75 mt-1">Review your official delegation payment status receipt below before entering delegate roster details.</p>
                  </div>

                  {/* ONLINE PAYMENT STATUS CARD */}
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md mx-auto w-full border border-gray-300 text-gray-900 my-2 font-sans">
                    {/* Top Blue Header Banner */}
                    <div className="bg-[#0b54cd] py-4 px-6 text-center text-white flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2">
                        <IoSchoolOutline className="text-2xl text-[#FFD700]" />
                        <span className="font-cinzel text-base font-extrabold tracking-widest uppercase text-white">CPS PRIME MUN</span>
                      </div>
                      <span className="text-[8px] uppercase tracking-widest text-white/80 font-sans mt-0.5 font-bold">CONQUER FROM WITHIN</span>
                    </div>

                    <div className="p-6 bg-white">
                      {/* Card Title */}
                      <h2 className="text-[#0b54cd] text-center font-black text-xl tracking-wider uppercase mb-5 font-sans">
                        ONLINE PAYMENT STATUS
                      </h2>

                      {/* White Grid Table */}
                      <div className="border border-gray-300 rounded overflow-hidden bg-white">
                        <table className="w-full text-left text-xs font-sans text-gray-900 border-collapse">
                          <tbody>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 w-1/2 border-r border-gray-300 bg-white">Online Receipt No.</td>
                              <td className="p-2.5 font-semibold text-gray-900 bg-white">{onlineReceiptNumber}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Prime Mun Registration No.</td>
                              <td className="p-2.5 font-semibold text-gray-900 bg-white">{(typeof getCandidateRegistration === 'function' && getCandidateRegistration()?.registrationId) || 'CPS-PAY-6N1P'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Teacher-in-Charge</td>
                              <td className="p-2.5 font-semibold text-gray-900 bg-white">{formData.schoolTeacherName || formData.teacherName || formData.fullName || 'Teacher-in-Charge'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Number Of Delegates</td>
                              <td className="p-2.5 text-gray-900 bg-white">{formData.schoolNumDelegates || (formData.delegates && formData.delegates.length) || '1'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Email ID</td>
                              <td className="p-2.5 text-gray-900 bg-white break-all">{formData.schoolTeacherEmail || formData.email || currentUser?.email || 'tanav.trt@gmail.com'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Phone Number</td>
                              <td className="p-2.5 font-mono text-gray-900 bg-white">{formData.schoolTeacherMobile || formData.mobile || '9632580741'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">School Name</td>
                              <td className="p-2.5 text-gray-900 bg-white">{formData.schoolName || 'Chennai Public School'}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Registration Date</td>
                              <td className="p-2.5 font-mono text-gray-900 bg-white">{new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Receipt Amount</td>
                              <td className="p-2.5 font-bold text-gray-900 bg-white">{((parseInt(formData.schoolNumDelegates, 10) || 1) * globalFeeRate).toFixed(2)}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="p-2.5 font-medium text-gray-900 border-r border-gray-300 bg-white">Bank Transaction Id</td>
                              <td className="p-2.5 font-mono text-gray-900 bg-white">{paymentId || (isPaid ? '114707033621' : '-')}</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-semibold text-gray-900 border-r border-gray-300 bg-white">Payment Status</td>
                              <td className={`p-2.5 font-black uppercase tracking-wider bg-white ${
                                isPaid || isHost
                                  ? 'text-emerald-600 font-black' 
                                  : paymentStatus === 'failed' 
                                    ? 'text-red-600 font-bold' 
                                    : 'text-amber-600 font-bold'
                              }`}>
                                {isPaid || isHost 
                                  ? 'TRANSACTION SUCCESSFUL' 
                                  : paymentStatus === 'failed' 
                                    ? 'TRANSACTION FAILED' 
                                    : 'PAYMENT REQUIRED'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-5 flex flex-col gap-3">
                        {isPaid || isHost ? (
                          <>
                            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-center text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                              <IoCheckmarkCircleOutline className="text-lg text-emerald-600" />
                              Payment Verified Successfully! You can now proceed to Delegate Roster & Details.
                            </div>
                            <button 
                              onClick={() => setStep(4)}
                              className="w-full bg-[#0b54cd] hover:bg-[#0943a5] text-white font-bold py-3 px-4 rounded text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                            >
                              PROCEED TO DELEGATE ROSTER <IoArrowForward />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-red-50 border-2 border-red-500/80 rounded text-center text-red-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm">
                              ⚠️ NOTE: REGISTRATION PAYMENT WILL NOT BE REFUNDED.
                            </div>
                            <button 
                              onClick={handleInitiateHdfcPayment}
                              className="w-full bg-[#0b54cd] hover:bg-[#0943a5] text-white font-cinzel font-bold text-xs py-3.5 px-6 rounded transition-all uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <IoWalletOutline className="text-base" /> {(() => {
                                const numDel = parseInt(formData.schoolNumDelegates, 10) || (formData.delegates && formData.delegates.length) || 1;
                                const amt = numDel * globalFeeRate;
                                return paymentStatus === 'failed' 
                                  ? `Pay Again via HDFC Gateway (₹${amt.toFixed(2)})` 
                                  : `Pay via HDFC Gateway (₹${amt.toFixed(2)})`;
                              })()}
                            </button>
                            <button 
                              onClick={() => verifyHdfcPaymentLive(true)}
                              className="w-full border border-[#0b54cd] text-[#0b54cd] hover:bg-[#0b54cd]/10 font-cinzel font-bold text-xs py-2.5 px-6 rounded transition-all uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <IoCheckmarkCircleOutline className="text-base text-emerald-600" /> Re-Check Payment Status
                            </button>
                            {paymentStatus === 'failed' ? (
                              <p className="text-[11px] text-center text-red-600 font-semibold mt-0.5">
                                ⚠️ Payment failed or was cancelled. Complete payment to unlock delegate roster details.
                              </p>
                            ) : (
                              <p className="text-[11px] text-center text-amber-700 font-medium mt-0.5">
                                ℹ️ Payment required. Click button above to initiate ₹{((parseInt(formData.schoolNumDelegates, 10) || 1) * globalFeeRate).toFixed(2)} gateway payment.
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Delegate Details */}
              {step === 4 && (
                !isPaid && !isHost ? (
                  <div className="flex flex-col gap-6 animate-fadeIn items-center justify-center py-12 text-center">
                    <div className="bg-[#121214]/80 border border-amber-500/30 rounded-xl p-8 max-w-md w-full flex flex-col items-center gap-4 shadow-2xl">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl">
                        <IoWarningOutline />
                      </div>
                      <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">Payment Required</h3>
                      <p className="text-xs text-[#BABABA]">
                        Delegation registration payment must be completed before entering student delegate roster details.
                      </p>
                      <button
                        onClick={() => setStep(2)}
                        className="mt-2 bg-[#DCA843] hover:bg-[#FFE082] text-black font-cinzel text-xs font-bold py-3 px-8 rounded uppercase tracking-widest transition-all font-extrabold cursor-pointer shadow-lg"
                      >
                        Go to Step 2: Checkout &amp; Pay
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 animate-fadeIn">
                  
                  {/* Verified indicator */}
                  <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/35 p-4 rounded text-xs text-green-400">
                    <IoCheckmarkCircleOutline className="text-lg flex-shrink-0" />
                    <span>Payment verified successfully. Reference ID: {isHost ? 'PAY-HOST-BYPASS' : (paymentId || 'PAY-MOCK-PENDING')}. Delegate slots are open!</span>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                        Step 4: Delegate Roster Details
                      </h3>
                      <p className="text-[10px] text-[#BABABA] mt-0.5 ml-3">
                        Fill in student roster details manually in the delegate cards below.
                      </p>
                    </div>
                  </div>

                  {excelUploaded && (
                    <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 p-3.5 rounded-lg text-xs text-emerald-400">
                      <IoCheckmarkCircleOutline className="text-sm flex-shrink-0 text-emerald-400 animate-pulse" />
                      <span>Roster imported successfully. Roster updated to <strong className="text-white">{formData.schoolNumDelegates}</strong> delegates.</span>
                    </div>
                  )}

                  {/* Delegates roster container */}
                  <div className="flex flex-col gap-4 border-t border-b border-[#DCA843]/10 py-4">
                    {formData.delegates.map((del, idx) => {
                      const delErr = errors.delegates?.[idx] || {};
                      const isExpanded = expandedDelegateIdx === idx;
                      const hasCardError = Object.keys(delErr).length > 0;

                      return (
                        <div key={idx} className="bg-black/35 border border-[#DCA843]/15 rounded-lg relative overflow-visible transition-all">
                          {/* Accordion Header */}
                          <div 
                            onClick={() => setExpandedDelegateIdx(isExpanded ? null : idx)}
                            className="bg-black/55 px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-black/75 transition-colors border-b border-[#DCA843]/5"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-5 h-5 rounded-full bg-[#DCA843]/10 border border-[#DCA843]/30 flex items-center justify-center text-[#DCA843] text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <div>
                                <span className="font-cinzel text-xs font-bold text-white tracking-widest">
                                  {del.name || `Delegate #${idx + 1}`}
                                </span>
                                {del.selectedCommittee && (
                                  <span className="text-[9px] text-[#DCA843] bg-[#DCA843]/5 border border-[#DCA843]/20 px-2 py-0.5 rounded ml-2 uppercase font-cinzel">
                                    {del.selectedCommittee}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {hasCardError && (
                                <span className="flex items-center gap-1 text-[9px] text-red-500 font-bold uppercase">
                                  <IoWarningOutline /> Missing Info
                                </span>
                              )}
                              <IoChevronDown className={`text-[#DCA843] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>

                          {/* Accordion Body */}
                          {isExpanded && (
                            <div className="p-5 flex flex-col gap-5 bg-black/10 border-t border-[#DCA843]/5 animate-fadeIn">
                              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Full Name</label>
                                  <input 
                                    type="text"
                                    value={del.name}
                                    onChange={(e) => {
                                      const list = [...formData.delegates];
                                      list[idx].name = e.target.value;
                                      setFormData({...formData, delegates: list});
                                    }}
                                    className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                                    placeholder="Enter full name"
                                  />
                                  {delErr.name && <p className="text-[9px] text-red-500 mt-0.5">{delErr.name}</p>}
                                </div>

                                <div>
                                  <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Gender</label>
                                  <select 
                                    value={del.gender}
                                    onChange={(e) => {
                                      const list = [...formData.delegates];
                                      list[idx].gender = e.target.value;
                                      setFormData({...formData, delegates: list});
                                    }}
                                    className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2 text-xs text-white focus:outline-none"
                                  >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                  </select>
                                  {delErr.gender && <p className="text-[9px] text-red-500 mt-0.5">{delErr.gender}</p>}
                                </div>

                                <CustomDatePicker
                                  value={del.dob}
                                  onChange={(val) => {
                                    const list = [...formData.delegates];
                                    list[idx].dob = val;
                                    setFormData({...formData, delegates: list});
                                  }}
                                  label="Date of Birth"
                                  error={delErr.dob}
                                />

                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Grade</label>
                                    <select 
                                      value={del.gradeClass}
                                      onChange={(e) => {
                                        const list = [...formData.delegates];
                                        list[idx].gradeClass = e.target.value;
                                        setFormData({...formData, delegates: list});
                                      }}
                                      className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2 text-xs text-white focus:outline-none cursor-pointer"
                                    >
                                      <option value="" disabled className="bg-[#121214] text-gray-400">Select Grade</option>
                                      <option value="9" className="bg-[#121214] text-white">Class 9</option>
                                      <option value="10" className="bg-[#121214] text-white">Class 10</option>
                                      <option value="11" className="bg-[#121214] text-white">Class 11</option>
                                      <option value="12" className="bg-[#121214] text-white">Class 12</option>
                                    </select>
                                    {delErr.gradeClass && <p className="text-[9px] text-red-500 mt-0.5">{delErr.gradeClass}</p>}
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Section</label>
                                    <input 
                                      type="text"
                                      value={del.section}
                                      onChange={(e) => {
                                        const list = [...formData.delegates];
                                        list[idx].section = e.target.value;
                                        setFormData({...formData, delegates: list});
                                      }}
                                      className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2 text-xs text-white focus:outline-none"
                                      placeholder="e.g. A"
                                    />
                                    {delErr.section && <p className="text-[9px] text-red-500 mt-0.5">{delErr.section}</p>}
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Student Email</label>
                                  <input 
                                    type="email"
                                    value={del.email}
                                    onChange={(e) => {
                                      const list = [...formData.delegates];
                                      list[idx].email = e.target.value;
                                      setFormData({...formData, delegates: list});
                                    }}
                                    className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2 text-xs text-white focus:outline-none"
                                    placeholder="student@school.com"
                                  />
                                  {delErr.email && <p className="text-[9px] text-red-500 mt-0.5">{delErr.email}</p>}
                                </div>

                                <div>
                                  <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Student Mobile</label>
                                  <input 
                                    type="tel"
                                    value={del.mobile}
                                    onChange={(e) => {
                                      const list = [...formData.delegates];
                                      list[idx].mobile = e.target.value;
                                      setFormData({...formData, delegates: list});
                                    }}
                                    className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2 text-xs text-white focus:outline-none"
                                    placeholder="10 digit number"
                                  />
                                  {delErr.mobile && <p className="text-[9px] text-red-500 mt-0.5">{delErr.mobile}</p>}
                                </div>



                                <div>
                                  <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Preferred Committee</label>
                                  <select 
                                    value={del.selectedCommittee || ''}
                                    onChange={(e) => {
                                      const list = [...formData.delegates];
                                      list[idx].selectedCommittee = e.target.value;
                                      setFormData({...formData, delegates: list});
                                    }}
                                    className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                                  >
                                    <option value="">Select Committee</option>
                                    {getAvailableCommittees(idx).map((avail) => (
                                      <option 
                                        key={avail.name} 
                                        value={avail.name}
                                        disabled={avail.isFull && del.selectedCommittee !== avail.name}
                                      >
                                        {avail.name} {(avail.name.includes('UNSC') || avail.name.includes('Security Council')) ? '(Allocations will be done randomly)' : ''} ({Math.max(0, avail.limit - avail.filled)} left) {avail.isFull && del.selectedCommittee !== avail.name ? '(FULL)' : ''}
                                      </option>
                                    ))}
                                  </select>
                                  {delErr.selectedCommittee && <p className="text-[9px] text-red-500 mt-0.5">{delErr.selectedCommittee}</p>}
                                </div>

                                <div>
                                  <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Gadgets List (e.g. Laptop, Tablet) (Optional)</label>
                                  <input 
                                    type="text"
                                    value={del.gadgetsList || ''}
                                    onChange={(e) => {
                                      const list = [...formData.delegates];
                                      list[idx].gadgetsList = e.target.value;
                                      setFormData({...formData, delegates: list});
                                    }}
                                    className="w-full bg-black/45 border border-[#DCA843]/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                                    placeholder="e.g. 1 Laptop, chargers"
                                  />
                                </div>


                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  <div className="flex justify-end items-center mt-4">
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(3)}
                        className="border border-[#DCA843] text-[#DCA843] font-cinzel text-xs font-bold px-8 py-3.5 rounded hover:bg-[#DCA843]/10 transition-colors uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => {
                          if (isHost || validateSchoolStep4Delegates()) {
                            setStep(5);
                          }
                        }}
                        className="bg-[#DCA843] text-black font-cinzel text-xs font-bold px-8 py-3.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-wider font-extrabold"
                      >
                        Continue to Uploads
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

              {/* Step 5: Document Uploads */}
              {step === 5 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <div>
                    <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                      Step 5: Roster Document Uploads
                    </h3>
                    <p className="text-[10px] text-[#BABABA] mt-0.5 ml-3">
                      Upload the official school nomination and authorization letter.
                    </p>
                  </div>

                  {/* School-level letter upload */}
                  <div className={`border rounded-xl p-5 flex flex-col gap-4 transition-all ${
                    formData.schoolAuthLetter 
                      ? 'border-emerald-500/70 bg-emerald-950/25 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                      : 'bg-[#121214]/65 border-[#DCA843]/15'
                  }`}>
                    <span className={`font-cinzel text-xs uppercase tracking-wider font-bold ${
                      formData.schoolAuthLetter ? 'text-emerald-400' : 'text-white'
                    }`}>
                      School Delegation Authorization Letter
                    </span>
                    <div>
                      <input 
                        type="file"
                        id="schoolAuthLetterInput"
                        accept=".pdf,image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              alert("File size exceeds 5MB limit");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setFormData(prev => ({
                                ...prev,
                                schoolAuthLetter: file.name,
                                schoolAuthLetterFile: { name: file.name, type: file.type, data: ev.target.result }
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                      <label 
                        htmlFor="schoolAuthLetterInput"
                        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-5 transition-all text-center cursor-pointer ${
                          formData.schoolAuthLetter 
                            ? 'border-emerald-500 bg-emerald-950/40 hover:bg-emerald-900/40' 
                            : 'border-[#DCA843]/35 hover:border-[#DCA843] bg-black/20 hover:bg-[#DCA843]/5'
                        }`}
                      >
                        <IoCloudUploadOutline className={`text-3xl mb-2 ${formData.schoolAuthLetter ? 'text-emerald-400' : 'text-[#DCA843]'}`} />
                        <span className={`text-xs font-cinzel font-bold ${formData.schoolAuthLetter ? 'text-emerald-300' : 'text-white'}`}>
                          {formData.schoolAuthLetter ? 'Letter Uploaded Successfully' : 'Select official School Letterhead (.pdf, .jpg)'}
                        </span>
                        <span className={`text-[10px] mt-1 max-w-md ${formData.schoolAuthLetter ? 'text-emerald-400/80' : 'text-[#BABABA]'}`}>
                          Upload the scan copy of official letter from the school Principal nominating the delegates.
                        </span>
                        {formData.schoolAuthLetter && (
                          <span className="text-xs text-emerald-400 font-bold mt-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded">
                            Selected: {formData.schoolAuthLetter} ✔
                          </span>
                        )}
                      </label>
                      {errors.schoolAuthLetter && <p className="text-xs text-red-500 mt-1.5">{errors.schoolAuthLetter}</p>}
                    </div>
                  </div>



                  <div className="flex gap-4 self-end mt-2">
                    <button 
                      onClick={() => setStep(4)}
                      className="border border-[#DCA843] text-[#DCA843] font-cinzel text-xs font-bold px-8 py-3.5 rounded hover:bg-[#DCA843]/10 transition-colors uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => {
                        if (isHost || validateSchoolStep5Documents()) {
                          setStep(6);
                        }
                      }}
                      className="bg-[#DCA843] text-black font-cinzel text-xs font-bold px-8 py-3.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-wider font-extrabold"
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6: Review & Final Audit */}
              {step === 6 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <h3 className="font-cinzel text-lg tracking-wider text-[#DCA843] uppercase font-bold border-l-2 border-[#DCA843] pl-3">
                    Step 6: Review & Delegation Audit
                  </h3>

                  <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
                    
                    {/* School summary column */}
                    <div className="md:col-span-1 bg-[#121214]/65 border border-[#DCA843]/15 rounded p-5 flex flex-col gap-4 text-xs h-fit text-white">
                      <span className="font-cinzel font-bold text-[#DCA843] uppercase tracking-wider">Institution Details</span>
                      
                      <div>
                        <span className="text-[#BABABA]">School</span>
                        <p className="font-bold text-white mt-0.5">{formData.schoolName}</p>
                      </div>

                      <div>
                        <span className="text-[#BABABA]">Location / City</span>
                        <p className="font-bold text-white mt-0.5">{formData.schoolCity}</p>
                      </div>
                      
                      <div>
                        <span className="text-[#BABABA]">Teacher In-Charge</span>
                        <p className="font-bold text-white mt-0.5">{formData.schoolTeacherName}</p>
                      </div>

                      <div>
                        <span className="text-[#BABABA]">Teacher Email & Phone</span>
                        <p className="font-bold text-white mt-0.5">{formData.schoolTeacherEmail} | {formData.schoolTeacherMobile}</p>
                      </div>

                      <div>
                        <span className="text-[#BABABA]">Payment Ref ID</span>
                        <p className="font-mono text-green-400 mt-0.5">{isHost ? 'PAY-HOST-BYPASS' : (paymentId || 'PAY-MOCK-PENDING')}</p>
                      </div>

                      <div>
                        <span className="text-[#BABABA]">Total Fee Paid</span>
                        <p className="font-extrabold text-[#DCA843] text-lg mt-0.5">
                          ₹{isHost ? '0 (Host Bypass)' : ((parseInt(formData.schoolNumDelegates, 10) || 0) * globalFeeRate).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Delegate roster column */}
                    <div className="md:col-span-2 bg-[#121214]/65 border border-[#DCA843]/15 rounded p-5 flex flex-col gap-4">
                      <span className="font-cinzel font-bold text-white uppercase tracking-wider text-xs">Registered Delegates Roster ({formData.schoolNumDelegates} entries)</span>
                      
                      <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-2 border-t border-[#DCA843]/10 pt-3">
                        {formData.delegates.map((del, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-white/5 last:border-0">
                            <div>
                              <p className="font-bold text-white">{del.name || `Delegate #${idx + 1}`}</p>
                              <span className="text-[9px] text-[#BABABA] uppercase tracking-wider">Grade {del.gradeClass || ''} | {del.email || ''}</span>
                            </div>
                            {del.selectedCommittee && (
                              <span className="text-[10px] text-[#DCA843] font-cinzel font-bold bg-[#DCA843]/5 px-2.5 py-1 border border-[#DCA843]/10 rounded">
                                {del.selectedCommittee}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 self-end mt-4">
                    <button 
                      onClick={() => setStep(5)}
                      className="border border-[#DCA843] text-[#DCA843] font-cinzel text-xs font-bold px-6 py-3.5 rounded hover:bg-[#DCA843]/5 transition-colors uppercase tracking-wider"
                    >
                      Edit Uploads
                    </button>
                    <button 
                      disabled={isSubmittingRegistration}
                      onClick={() => {
                        if (!isSubmittingRegistration) {
                          handleSubmitRegistration();
                        }
                      }}
                      className={`bg-[#DCA843] text-black font-cinzel text-xs font-bold px-8 py-3.5 rounded transition-colors uppercase tracking-wider font-extrabold flex items-center gap-2 ${
                        isSubmittingRegistration ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#FFE082] cursor-pointer'
                      }`}
                    >
                      {isSubmittingRegistration ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          Submitting Registration...
                        </>
                      ) : (
                        'Submit Registration'
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 7: Completed Success Dashboard */}
              {step === 7 && (() => {
                const regRecord = getCandidateRegistration();
                return (
                  <div className="flex flex-col gap-6 py-4 animate-fadeIn">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 border-b border-[#DCA843]/15 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <IoCheckmarkCircleOutline className="text-3xl" />
                        </div>
                        <div>
                          <h3 className="font-cinzel text-lg font-extrabold tracking-widest text-[#DCA843] uppercase">
                            Delegation Confirmed
                          </h3>
                          <p className="text-[10px] text-[#BABABA] mt-0.5">
                            Your institution delegation is confirmed and registered for CPS PRIME MUN 5.O.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-[#DCA843]/10 gap-1 bg-black/20 p-1.5 rounded-lg">
                      {['overview', 'allocation', 'schedule', 'receipt'].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setDashboardTab(tab);
                          }}
                          className={`flex-1 py-2.5 text-center font-cinzel text-[10px] md:text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 ${
                            dashboardTab === tab
                              ? 'bg-gradient-to-r from-[#DCA843]/20 to-[#F1C40F]/10 border border-[#DCA843]/30 text-white font-black'
                              : 'text-[#BABABA]/60 hover:text-white hover:bg-[#DCA843]/5'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tab Contents */}
                    <div className="bg-[#121214]/65 border border-[#DCA843]/15 rounded-xl p-5 shadow-2xl relative min-h-[220px]">
                      {dashboardTab === 'overview' && (
                        <div className="flex flex-col gap-4 text-xs animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-[#DCA843]/10">
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Institution Name</span>
                              <p className="text-xs font-bold text-white mt-0.5">{regRecord?.details?.schoolName || formData.schoolName}</p>
                            </div>
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Delegation ID</span>
                              <p className="text-xs font-mono font-bold text-[#DCA843] mt-0.5">{regRecord?.registrationId || 'CPS-MOCK'}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-[#DCA843]/10">
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Teacher-in-Charge</span>
                              <p className="text-xs font-bold text-white mt-0.5">{regRecord?.details?.teacherName || formData.schoolTeacherName}</p>
                            </div>
                            <div>
                              <span className="text-[#BABABA] uppercase font-cinzel text-[9px]">Total Registered Roster</span>
                              <p className="text-xs text-white mt-0.5 font-bold">{(regRecord?.details?.delegates?.length || regRecord?.details?.delegatesList?.length || formData.delegates?.length || 0)} students</p>
                            </div>
                          </div>

                          {/* Dispatch Simulated Logs */}
                          <div className="flex flex-col gap-3 mt-2">
                            <span className="font-cinzel text-[9px] text-[#DCA843] uppercase tracking-wider font-bold">System Dispatch Log</span>
                            <div className="bg-black/45 border border-[#DCA843]/5 rounded p-3 flex gap-3 items-start">
                              <span className="text-[#DCA843] font-bold bg-[#DCA843]/10 p-1 rounded text-[9px] font-mono">EMAIL</span>
                              <div className="flex-1">
                                <p className="text-[10px] text-white/90 font-medium">Official Confirmation Emails Dispatched</p>
                                <div className="text-[8px] text-[#BABABA] mt-1 flex flex-col gap-0.5">
                                  <p><span className="text-white/60 font-medium">From:</span> cpsprimemun@gmail.com</p>
                                  <p><span className="text-white/60 font-medium">To:</span> {regRecord?.details?.teacherEmail || 'Teacher Email'} &amp; all registered roster lines</p>
                                </div>
                                <p className="text-[9px] text-[#BABABA] mt-2 leading-relaxed border-t border-white/5 pt-1.5">
                                  "Dear Teacher-in-Charge, delegation registration for {regRecord?.details?.schoolName || formData.schoolName} is confirmed! Dates: 28th & 29th August, 2026. Venue: Chennai Public School Campus. Official confirmation emails have been dispatched successfully."
                               </p>
                              </div>
                            </div>
                          </div>

                          {/* Secretariat Comments */}
                          {regRecord?.details?.remarks && (
                            <div className="bg-[#DCA843]/5 border border-[#DCA843]/15 rounded-lg p-4 mt-2 animate-fadeIn flex flex-col gap-2">
                              <span className="font-cinzel text-[9px] text-[#DCA843] uppercase tracking-wider font-bold">Secretariat Remarks / Comments</span>
                              <p className="text-[11px] text-[#BABABA] leading-relaxed italic">
                                "{regRecord.details.remarks}"
                              </p>
                            </div>
                          )}

                          {/* WhatsApp Community Join Card */}
                          <div className="bg-[#075e54]/10 border border-[#25d366]/25 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 mt-4 animate-fadeIn">
                            <div className="flex gap-3 items-center">
                              <div className="bg-[#25d366]/20 p-2.5 rounded-full text-[#25d366] text-lg">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-white font-cinzel font-bold tracking-wider">Join Official WhatsApp Community</p>
                                <p className="text-[10px] text-[#BABABA] mt-0.5 leading-relaxed">
                                  Stay updated with instantaneous announcements, study guides, logistics maps, and delegate alerts.
                                </p>
                              </div>
                            </div>
                            <a 
                              href={getWhatsAppLink()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#25d366] text-black font-cinzel text-[10px] font-bold px-4 py-2.5 rounded hover:bg-[#20ba5a] transition-all uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap self-stretch md:self-auto justify-center"
                            >
                              Join Community
                            </a>
                          </div>
                        </div>
                      )}

                      {dashboardTab === 'allocation' && (
                        <div className="flex flex-col gap-4 text-xs animate-fadeIn">
                          <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold mb-1">
                            Roster Placements & Confirmation Letters
                          </h4>
                          {(() => {
                            const isPaid = regRecord?.paymentStatus === 'Verified' || 
                                           regRecord?.details?.paymentStatus === 'Verified' || 
                                           regRecord?.paymentStatus === 'Successful' || 
                                           regRecord?.details?.paymentStatus === 'Successful' || 
                                           !!regRecord?.paymentId || 
                                           regRecord?.details?.isHost || 
                                           !!regRecord?.allocatedCommittee || 
                                           (regRecord?.details?.delegates && regRecord.details.delegates.length > 0);
                            const hasAllocation = regRecord?.allocatedCommittee || (regRecord?.details?.delegates && regRecord.details.delegates.some(d => d.allocatedCommittee));
                            const isRevealed = true;

                            if (isRevealed) {
                              if (regRecord?.registrationType === 'individual') {
                                return (
                                  <div className="bg-[#0A1628]/80 border border-[#DCA843]/15 rounded-lg p-5 flex flex-col gap-4 text-xs animate-fadeIn">
                                    <h5 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold border-b border-[#DCA843]/10 pb-2">Your Portfolio Allocation</h5>
                                    
                                    {!isPaid && (
                                      <div className="bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 rounded-lg p-3 text-[10px] leading-relaxed mb-1 flex items-start gap-2">
                                        <span>⚠️</span>
                                        <span>Your payment verification is currently pending. Your official confirmation letter download will be enabled once your payment is verified by the secretariat.</span>
                                      </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <span className="text-[#BABABA] uppercase font-cinzel text-[9px] block">Allocated Committee</span>
                                        <span className="text-sm font-bold text-white mt-1 block">{regRecord?.allocatedCommittee || regRecord?.details?.committee || formData.selectedCommittee || 'ECOSOC'}</span>
                                      </div>
                                      <div>
                                        <span className="text-[#BABABA] uppercase font-cinzel text-[9px] block">Allocated Country</span>
                                        <span className="text-sm font-bold text-emerald-400 mt-1 block flex items-center gap-1.5">
                                          <span>
                                            {(() => {
                                              const comm = regRecord?.allocatedCommittee || regRecord?.details?.committee || formData.selectedCommittee || '';
                                              if (/IPP|IPJ/i.test(comm)) return 'N/A';
                                              return regRecord?.allocatedCountry || regRecord?.details?.allocatedCountry || formData.allocatedCountry || 'Pending';
                                            })()}
                                          </span>
                                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">ALLOTED ✔</span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="mt-2 text-right">
                                      <button
                                        onClick={() => handleDownloadConfirmationLetter(regRecord)}
                                        className="text-[10px] bg-[#DCA843] text-black font-cinzel font-bold px-4 py-2 rounded hover:bg-[#FFE082] transition-all cursor-pointer shadow"
                                      >
                                        Download Confirmation Letter
                                      </button>
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div className="bg-[#0A1628]/80 border border-[#DCA843]/15 rounded-lg p-5 flex flex-col gap-4 text-xs animate-fadeIn">
                                    <div className="overflow-x-auto border border-[#DCA843]/15 rounded-lg max-h-96">
                                      <table className="w-full text-left border-collapse">
                                        <thead>
                                          <tr className="bg-black/40 text-[#DCA843] font-cinzel text-[10px] uppercase border-b border-[#DCA843]/15">
                                            <th className="p-3">#</th>
                                            <th className="p-3">Delegate Name</th>
                                            <th className="p-3">Allocated Committee</th>
                                            <th className="p-3">Allocated Country / Portfolio</th>
                                            <th className="p-3 text-right">Letter</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-[11px] text-[#BABABA]">
                                          {(regRecord?.details?.delegates || formData.delegates || []).map((del, idx) => {
                                            const committee = del.allocatedCommittee || del.selectedCommittee || 'Pending';
                                            const isIPP_IPJ = /IPP|IPJ/i.test(committee);
                                            const country = isIPP_IPJ ? 'N/A' : (del.allocatedCountry || 'Pending');
                                            return (
                                              <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="p-3 text-white/50">{idx + 1}</td>
                                                <td className="p-3 font-semibold text-white">{del.name || `Delegate #${idx + 1}`}</td>
                                                <td className="p-3 text-[#DCA843] font-medium">{committee}</td>
                                                <td className="p-3 text-emerald-400 font-bold">{country}</td>
                                                <td className="p-3 text-right">
                                                  <button
                                                    onClick={() => handleDownloadSchoolConfirmationLetter(regRecord || { registrationId: 'MOCK-ID', details: { schoolName: formData.schoolName } }, idx)}
                                                    className="text-[9px] bg-[#DCA843] text-black font-cinzel font-bold px-3 py-1.5 rounded hover:bg-[#FFE082] transition-all uppercase tracking-wider cursor-pointer shadow"
                                                  >
                                                    Download Letter
                                                  </button>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              }
                            } else {
                              return (
                                <div className="flex flex-col gap-3">
                                  <div className="bg-black/35 border border-[#DCA843]/10 p-4 rounded-lg">
                                    <p className="text-[#BABABA] text-[11px] leading-relaxed">
                                      ⏳ Your delegation portfolio allocations and countries will be revealed on <strong>8th August 2026</strong>.
                                    </p>
                                    <p className="text-[#BABABA] text-[10px] mt-2 leading-relaxed">
                                      {!isPaid 
                                        ? "⚠️ Your payment verification is currently pending. Once verified by the secretariat, your assignments will be processed."
                                        : "⏳ Payment verified! Your portfolio allocation is currently being finalised by the secretariat and will unlock here soon."}
                                    </p>
                                  </div>

                                  <div className="overflow-x-auto border border-white/5 rounded-lg max-h-56 mt-2">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-black/40 text-[#DCA843] font-cinzel text-[10px] uppercase border-b border-white/5">
                                          <th className="p-3">#</th>
                                          <th className="p-3">Delegate Name</th>
                                          <th className="p-3">Chosen Committee</th>
                                          <th className="p-3">Allocated Country</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-white/5 text-[11px] text-[#BABABA]">
                                        {regRecord?.registrationType === 'individual' ? (
                                          <tr>
                                            <td className="p-3 text-white/50">1</td>
                                            <td className="p-3 font-semibold text-white">{regRecord.details?.fullName || 'You'}</td>
                                            <td className="p-3 text-white/80">{regRecord.details?.selectedCommittee || regRecord.details?.committee || 'Unassigned'}</td>
                                            <td className="p-3 text-[#BABABA]/50 italic">Reveals on Aug 8</td>
                                          </tr>
                                        ) : (
                                          (regRecord?.details?.delegates || formData.delegates || []).map((del, idx) => (
                                            <tr key={idx}>
                                              <td className="p-3 text-white/50">{idx + 1}</td>
                                              <td className="p-3 font-semibold text-white">{del.name || `Delegate #${idx + 1}`}</td>
                                              <td className="p-3 text-white/80">{del.selectedCommittee || del.committee || 'Unassigned'}</td>
                                              <td className="p-3 text-[#BABABA]/50 italic">Reveals on Aug 8</td>
                                            </tr>
                                          ))
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              );
                            }
                          })()}
                        </div>
                      )}

                      {dashboardTab === 'schedule' && (
                        <div className="flex flex-col gap-4 animate-fadeIn">
                          <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold">Conference Schedule</h4>
                          {new Date() < new Date('2026-08-14T00:00:00') ? (
                            <div className="bg-[#0A1628]/80 border border-[#DCA843]/30 p-4 rounded-lg">
                              <p className="text-white text-[12px] leading-relaxed font-medium">
                                ⏳ The detailed conference itinerary and schedule will be revealed on <strong className="text-[#DCA843]">14th August 2026</strong>.
                              </p>
                              <p className="text-[#D4D4D4] text-[11px] mt-2 leading-relaxed">
                                The organizing committee will upload the final schedule, including training sessions, speaker timings, and ceremony venues here. Stay tuned!
                              </p>
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse text-[11px]">
                                <thead>
                                  <tr className="border-b border-[#DCA843]/20 text-[#DCA843] font-cinzel">
                                    <th className="pb-2">Session Name</th>
                                    <th className="pb-2">Timing</th>
                                    <th className="pb-2">Venue</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DCA843]/5 text-[#BABABA]">
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Inaugural Ceremony</td>
                                    <td className="py-2.5 text-white/70">Day 1 - 08:30 AM</td>
                                    <td className="py-2.5">Main Auditorium</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Committee Session I & II</td>
                                    <td className="py-2.5 text-white/70">Day 1 - 10:00 AM</td>
                                    <td className="py-2.5">Assigned Committee Rooms</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Committee Session III & IV</td>
                                    <td className="py-2.5 text-white/70">Day 2 - 09:00 AM</td>
                                    <td className="py-2.5">Assigned Committee Rooms</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2.5 font-semibold text-white">Valedictory Ceremony</td>
                                    <td className="py-2.5 text-white/70">Day 2 - 04:30 PM</td>
                                    <td className="py-2.5 text-[#DCA843] font-bold">Main Assembly Hall</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}

                      {dashboardTab === 'receipt' && (
                        <div className="flex flex-col gap-4 text-xs animate-fadeIn">
                          <h4 className="font-cinzel text-xs text-[#DCA843] uppercase tracking-wider font-bold mb-1">Payment Receipt</h4>
                          <div className="bg-black/35 border border-[#DCA843]/10 p-4 rounded-lg flex flex-col gap-2 font-mono">
                            <p className="flex justify-between"><span className="text-gray-400">Merchant:</span><span className="text-white">CPS PRIME MUN 5.O Secretariat</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Payment ID:</span><span className="text-white">{regRecord?.paymentId || paymentId || 'PAY-MOCK'}</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Cost Type:</span><span className="text-white">School Delegation Fee ({(regRecord?.details?.delegates?.length || regRecord?.details?.delegatesList?.length || formData.delegates?.length || 0)} students)</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Paid Amount:</span><span className="text-[#DCA843] font-bold">₹{(parseFloat(regRecord?.amountPaid || regRecord?.details?.amountPaid || (regType === 'individual' ? globalFeeRate : ((parseInt(formData.schoolNumDelegates, 10) || 1) * globalFeeRate))) || globalFeeRate).toFixed(2)}</span></p>
                            <p className="flex justify-between border-t border-[#DCA843]/10 pt-2 mt-1"><span className="text-gray-400">Status:</span><span className="text-emerald-400 font-bold">SUCCESSFUL (VERIFIED)</span></p>
                          </div>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        navigate('/');
                      }}
                      className="bg-transparent border border-[#DCA843] text-[#DCA843] font-cinzel text-xs font-bold px-8 py-3.5 rounded hover:bg-[#DCA843]/10 transition-colors uppercase tracking-widest self-center mt-4"
                    >
                      Go to Home Page
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* CHECKOUT PAYMENT GATEWAY MODAL OVERLAY                        */}
      {/* ============================================================== */}
      {showPaymentGateway && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f11] border border-[#DCA843]/35 rounded-lg shadow-2xl max-w-md w-full overflow-hidden flex flex-col">
            
            {/* Modal header */}
            <div className="bg-black/40 border-b border-[#DCA843]/15 p-4 flex justify-between items-center">
              <span className="font-cinzel text-xs font-bold text-[#DCA843] tracking-widest uppercase">Secure Account Checkout</span>
              <button 
                onClick={() => {
                  if (paymentStatus !== 'processing') {
                    setShowPaymentGateway(false);
                    setPaymentStatus('idle');
                  }
                }}
                className="text-white/60 hover:text-white"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-5 text-sm">
              <div className="text-center pb-4 border-b border-white/5">
                <span className="text-xs text-[#BABABA] uppercase font-cinzel">Payable to: Chennai Public School MUN</span>
                <div className="text-2xl font-extrabold text-[#DCA843] mt-1">
                  ₹{regType === 'individual' ? globalFeeRate : ((parseInt(formData.schoolNumDelegates, 10) || 1) * globalFeeRate).toLocaleString('en-IN')}
                </div>
                <p className="text-[9px] text-red-400 mt-1.5 font-sans font-semibold tracking-wide uppercase">⚠️ Note: Registration payment will not be refunded</p>
              </div>

              {/* Status Rendering */}
              {paymentStatus === 'processing' && (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <div className="w-12 h-12 border-4 border-[#DCA843] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-mono text-[#BABABA]">Connecting secure bank servers...</span>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-green-400">
                  <IoCheckmarkCircleOutline className="text-5xl" />
                  <span className="font-bold font-cinzel text-sm uppercase">Transaction Approved</span>
                  <span className="text-[10px] text-[#BABABA]">Automatic Verification Successful.</span>
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-red-500">
                  <IoCloseCircleOutline className="text-5xl" />
                  <span className="font-bold font-cinzel text-sm uppercase">Transaction Declined</span>
                  <span className="text-xs text-[#BABABA] text-center">Payment Failed. Please try again.</span>
                </div>
              )}

              {paymentStatus === 'idle' && (
                <div className="flex flex-col gap-4 py-2">
                  <span className="text-xs text-[#BABABA] leading-relaxed">
                    This is a secure checkout environment for CPS PRIME MUN 5.O. Enter mock details to execute transaction simulation:
                  </span>

                  {selectedMethod === 'upi' && (
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] uppercase tracking-wider mb-1">Enter UPI VPA / ID</label>
                      <input 
                        type="text"
                        className="w-full bg-black/45 border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#DCA843]"
                        placeholder="username@okaxis"
                        defaultValue="cpsdelegate@upi"
                      />
                    </div>
                  )}

                  {selectedMethod === 'card' && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-[10px] font-cinzel text-[#BABABA] uppercase tracking-wider mb-1">Card Number</label>
                        <input 
                          type="text"
                          className="w-full bg-black/45 border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#DCA843]"
                          placeholder="4111 2222 3333 4444"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-cinzel text-[#BABABA] uppercase tracking-wider mb-1">Expiry Date</label>
                          <input 
                            type="text"
                            className="w-full bg-black/45 border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-cinzel text-[#BABABA] uppercase tracking-wider mb-1">CVV / CVN</label>
                          <input 
                            type="password"
                            maxLength="3"
                            className="w-full bg-black/45 border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none"
                            placeholder="***"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'netbanking' && (
                    <div>
                      <label className="block text-[10px] font-cinzel text-[#BABABA] uppercase tracking-wider mb-1">Select Bank Account</label>
                      <select 
                        className="w-full bg-black/45 border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                      >
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank</option>
                      </select>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 mt-2">
                    <button 
                      onClick={handleInitiateHdfcPayment}
                      className="w-full bg-[#DCA843] hover:bg-[#FFE082] text-black font-cinzel font-bold text-xs py-3.5 rounded transition-all uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                    >
                      <IoWalletOutline className="text-base" /> Connect HDFC SmartGateway (Test Mode)
                    </button>
                    <div className="flex gap-3">
                      <button 
                        onClick={handlePaymentFailure}
                        className="flex-1 border border-[#ef4444]/50 hover:bg-[#ef4444]/5 text-[#ef4444] font-cinzel font-bold text-[10px] py-2.5 rounded transition-colors uppercase tracking-wider"
                      >
                        Simulate Fail
                      </button>
                      <button 
                        onClick={handlePaymentSuccess}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-[10px] py-2.5 rounded transition-colors uppercase tracking-wider shadow-lg"
                      >
                        Simulate Approve
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* BULK NOTIFICATION MODAL                                       */}
      {/* ============================================================== */}
      {showBulkMailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 no-print animate-fadeIn">
          <div className="w-full max-w-md bg-[#09090b] border border-[#DCA843]/30 rounded-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-[#DCA843]/10 px-5 py-4 border-b border-[#DCA843]/20 flex justify-between items-center">
              <span className="font-cinzel text-xs font-bold text-[#DCA843] uppercase tracking-wider">
                Direct Communication Portal
              </span>
              <button 
                onClick={() => setShowBulkMailModal(false)}
                className="text-white/60 hover:text-white bg-transparent border-0 cursor-pointer text-lg font-bold"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const subject = e.target.subject.value;
              const body = e.target.body.value;
              const target = e.target.targetGroup.value;
              
              if (!subject || !body) {
                alert('⚠️ Please fill in all communication fields.');
                return;
              }

              const recipientEmail = adminSelectedReg?.registrationType === 'individual' 
                ? adminSelectedReg.details?.email 
                : adminSelectedReg.details?.teacherEmail;

              if (target === 'single') {
                if (recipientEmail) {
                  const htmlBody = `
                    <div style="font-family: 'Times New Roman', serif; padding: 30px; border: 1px solid #dca843; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff;">
                      <h2 style="color: #DCA843; font-family: 'Cinzel', serif; text-align: center; border-bottom: 1px solid rgba(220,168,67,0.2); padding-bottom: 10px;">CPS PRIME MUN 5.O</h2>
                      <p style="font-size: 14px; line-height: 1.6; color: #ffffff; text-align: justify;">
                        ${body.replace(/\n/g, '<br/>')}
                      </p>
                      <br/>
                      <hr style="border: 0; border-top: 1px solid rgba(220,168,67,0.2);" />
                      <p style="font-size: 11px; color: #bababa; text-align: center; margin-top: 15px;">
                        This is an official communication from the Chennai Public School Model United Nations Secretariat.
                      </p>
                    </div>
                  `;
                  try {
                    await sendActualEmail(recipientEmail, subject, htmlBody);
                    toast.success(`✉️ Notification email dispatched to ${recipientEmail}`);
                  } catch (err) {
                    console.error(err);
                    toast.error("Failed to send email via relay.");
                  }
                } else {
                  toast.error("Delegate/Coordinator email address not found.");
                }
              } else {
                let count = 0;
                for (const r of allRegistrations) {
                  const email = r.registrationType === 'individual' ? r.details?.email : r.details?.teacherEmail;
                  if (email) {
                    const htmlBody = `
                      <div style="font-family: 'Times New Roman', serif; padding: 30px; border: 1px solid #dca843; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff;">
                        <h2 style="color: #DCA843; font-family: 'Cinzel', serif; text-align: center; border-bottom: 1px solid rgba(220,168,67,0.2); padding-bottom: 10px;">CPS PRIME MUN 5.O</h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #ffffff; text-align: justify;">
                          ${body.replace(/\n/g, '<br/>')}
                        </p>
                        <br/>
                        <hr style="border: 0; border-top: 1px solid rgba(220,168,67,0.2);" />
                        <p style="font-size: 11px; color: #bababa; text-align: center; margin-top: 15px;">
                          This is an official communication from the Chennai Public School Model United Nations Secretariat.
                        </p>
                      </div>
                    `;
                    try {
                      await sendActualEmail(email, subject, htmlBody);
                      count++;
                    } catch (err) {
                      console.error(`Failed to send broadcast to ${email}:`, err);
                    }
                  }
                }
                toast.success(`✉️ Broadcast email dispatched successfully to ${count} delegates/coordinators!`);
              }
              
              saveAuthLog(
                currentUser.email,
                'BULK_NOTIFY',
                `Broadcast dispatched to ${target === 'single' ? adminSelectedReg.registrationId : 'All'}. Subject: ${subject}`
              );

              setShowBulkMailModal(false);
            }} className="p-5 flex flex-col gap-4 text-xs text-white">
              <div>
                <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Recipient Group</label>
                <select name="targetGroup" className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]">
                  <option value="single">Selected Delegate/Coordinator ({adminSelectedReg?.registrationId})</option>
                  <option value="all">All Registered Delegates (MUN-wide Broadcast)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Subject / Header</label>
                <input 
                  type="text" 
                  name="subject"
                  placeholder="e.g. Allocation Update or Entry Verification Notice"
                  className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-cinzel text-[#BABABA] mb-1.5 uppercase">Message Body</label>
                <textarea 
                  name="body" 
                  rows="5"
                  placeholder="Type your message here. For dynamic fields, you can use plain text."
                  className="w-full bg-[#0f0f11] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#DCA843] resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex gap-3 mt-2">
                <button 
                  type="button"
                  onClick={() => setShowBulkMailModal(false)}
                  className="flex-1 bg-white/5 border border-white/10 text-white font-cinzel font-bold py-2.5 rounded hover:bg-white/10 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#DCA843] text-black font-cinzel font-bold py-2.5 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Send Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PRINTABLE ID CARD BADGE MODAL                                  */}
      {/* ============================================================== */}
      {showIdCardModal && previewDelegate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          {/* Inject print-only style tag */}
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body * {
                visibility: hidden !important;
                background: none !important;
              }
              .print-badge-container, .print-badge-container * {
                visibility: visible !important;
              }
              .print-badge-container {
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) !important;
                border: 2px solid #DCA843 !important;
                width: 320px !important;
                height: 480px !important;
                box-shadow: none !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}} />
          
          <div className="w-full max-w-md bg-[#09090b] border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col no-print">
            <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center">
              <span className="font-cinzel text-xs font-bold text-[#DCA843] uppercase tracking-wider">Badge Credentials Preview</span>
              <button 
                onClick={() => setShowIdCardModal(false)}
                className="text-white/60 hover:text-white bg-transparent border-0 cursor-pointer text-lg font-bold"
              >
                &times;
              </button>
            </div>
            
            <div className="p-8 flex justify-center items-center bg-[#09090b]">
              {/* Printable ID card structure */}
              <div className="print-badge-container w-72 h-[420px] rounded-lg border-2 border-[#DCA843] bg-gradient-to-b from-[#111115] to-[#050507] p-5 flex flex-col justify-between items-center text-center shadow-lg relative overflow-hidden">
                {/* Gold laurel graphic and header banner */}
                <div className="absolute -top-12 -left-12 w-28 h-28 border border-[#DCA843]/10 rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-12 -right-12 w-28 h-28 border border-[#DCA843]/10 rounded-full pointer-events-none"></div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[10px] tracking-[0.2em] font-cinzel text-[#DCA843] font-bold">CPS PRIME MUN 5.O</span>
                  <div className="w-12 h-[1px] bg-[#DCA843]/30 my-1"></div>
                  <span className="text-[7px] text-[#BABABA] tracking-widest uppercase">Secretariat Secretariat Secretariat</span>
                </div>

                {/* Delegate Core Information */}
                <div className="flex flex-col items-center gap-1.5 my-4">
                  <span className="text-[8px] uppercase tracking-widest text-[#BABABA]">DELEGATE</span>
                  <h3 className="font-cinzel text-base font-bold text-white tracking-wide uppercase px-2 line-clamp-2 min-h-[40px] flex items-center justify-center">
                    {previewDelegate.name}
                  </h3>
                  <span className="text-[9px] font-mono text-[#DCA843] font-bold">{previewDelegate.badgeNumber || 'BADGE-MOCK'}</span>
                </div>

                {/* Allocated Committee & Country */}
                <div className="w-full bg-[#DCA843]/5 border border-[#DCA843]/15 rounded p-3 flex flex-col gap-1.5">
                  <div>
                    <span className="block text-[6px] tracking-widest text-[#BABABA] uppercase">COMMITTEE</span>
                    <span className="block font-cinzel text-[9px] font-bold text-white truncate">{previewDelegate.committee}</span>
                  </div>
                  <div className="border-t border-[#DCA843]/10 pt-1.5">
                    <span className="block text-[6px] tracking-widest text-[#BABABA] uppercase">PORTFOLIO / COUNTRY</span>
                    <span className="block font-cinzel text-[9px] font-bold text-[#DCA843] truncate">{previewDelegate.country}</span>
                  </div>
                </div>

                {/* School Name */}
                <div className="text-[8px] text-[#BABABA]/80 italic mt-2 line-clamp-1 max-w-[200px]">
                  {previewDelegate.school || 'Individual Representative'}
                </div>

                {/* Bottom branding footer */}
                <div className="text-[6px] text-[#BABABA]/60 tracking-wider uppercase mt-4">
                  28th &amp; 29th August, 2026 | Chennai
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/40 border-t border-white/10 flex gap-3">
              <button 
                onClick={() => setShowIdCardModal(false)}
                className="flex-1 bg-white/5 border border-white/10 text-white font-cinzel font-bold text-xs py-2 rounded hover:bg-white/10 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Close Preview
              </button>
              <button 
                onClick={() => {
                  window.print();
                  saveAuthLog(currentUser.email, 'PRINT_BADGE', `Generated and printed ID badge for: ${previewDelegate.name}`);
                }}
                className="flex-1 bg-[#DCA843] text-black font-cinzel font-bold text-xs py-2 rounded hover:bg-[#FFE082] transition-colors uppercase tracking-wider cursor-pointer"
              >
                Print Badge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PRINTABLE PARTICIPATION CERTIFICATE MODAL                      */}
      {/* ============================================================== */}
      {showCertificateModal && previewDelegate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          {/* Inject print-only style tag for Landscape Certificate */}
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body * {
                visibility: hidden !important;
                background: none !important;
              }
              .print-cert-container, .print-cert-container * {
                visibility: visible !important;
              }
              .print-cert-container {
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) rotate(270deg) !important;
                transform-origin: center center !important;
                border: 15px double #DCA843 !important;
                width: 800px !important;
                height: 560px !important;
                box-shadow: none !important;
                background: white !important;
                color: black !important;
              }
              .cert-bg-gold {
                color: #DCA843 !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}} />
          
          <div className="w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col no-print">
            <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center">
              <span className="font-cinzel text-xs font-bold text-[#DCA843] uppercase tracking-wider">Honorary Certificate Preview</span>
              <button 
                onClick={() => setShowCertificateModal(false)}
                className="text-white/60 hover:text-white bg-transparent border-0 cursor-pointer text-lg font-bold"
              >
                &times;
              </button>
            </div>
            
            <div className="p-8 flex justify-center items-center bg-[#09090b] overflow-x-auto">
              {/* Printable Certificate structure */}
              <div className="print-cert-container w-[560px] h-[395px] rounded border-[10px] border-double border-[#DCA843] bg-[#fbfbf8] p-8 flex flex-col justify-between items-center text-center shadow-lg relative text-black">
                {/* Vintage gold ornamental pattern */}
                <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#DCA843]/30 pointer-events-none"></div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[14px] font-cinzel text-[#DCA843] tracking-[0.25em] font-extrabold uppercase drop-shadow-sm">Chennai Public School</span>
                  <span className="text-[8px] font-cinzel tracking-widest text-[#333] uppercase mt-0.5">Model United Nations Conference</span>
                </div>

                <div className="flex flex-col items-center mt-3">
                  <h2 className="font-cinzel text-lg font-bold text-[#111] tracking-widest uppercase">Certificate of Participation</h2>
                  <div className="w-24 h-[1px] bg-[#DCA843] my-1.5"></div>
                  <p className="text-[9px] italic text-[#555] font-serif">This is to certify that</p>
                </div>

                <div className="my-2">
                  <h3 className="font-cinzel text-base font-bold text-[#111] tracking-wide uppercase underline decoration-[#DCA843] decoration-1 underline-offset-4">
                    {previewDelegate.name}
                  </h3>
                  <p className="text-[8px] text-[#555] italic font-serif mt-1">
                    representing <strong className="text-black font-cinzel text-[9px] uppercase">{previewDelegate.country}</strong>
                  </p>
                </div>

                <p className="text-[9px] text-[#333] max-w-[400px] leading-relaxed font-serif">
                  has actively participated as a Delegate in the committee <strong className="text-black font-cinzel text-[9px] uppercase">{previewDelegate.committee}</strong> during the 5th Edition of Chennai Public School Model United Nations (CPS PRIME MUN 5.O), held on <strong>28th &amp; 29th August, 2026</strong>.
                </p>

                {/* Signatures */}
                <div className="grid grid-cols-3 gap-6 w-full px-6 mt-2">
                  <div className="flex flex-col items-center border-t border-[#DCA843]/40 pt-1">
                    <img src="/signatures/new_director_signature_2026.png" alt="Secretary-General Signature" className="h-7 object-contain mb-0.5" />
                    <span className="font-cinzel text-[7px] text-[#111] font-bold">Aashish Kathpal</span>
                    <span className="text-[6px] text-[#555] uppercase tracking-wider font-cinzel">Secretary-General</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-7 h-7 rounded-full border border-[#DCA843]/50 bg-[#DCA843]/5 flex items-center justify-center text-[7px] font-cinzel text-[#DCA843] font-bold">SEAL</div>
                  </div>
                  <div className="flex flex-col items-center border-t border-[#DCA843]/40 pt-1">
                    <img src="/signatures/new_sg_signature_2026.png" alt="Deputy Director-General Signature" className="h-7 object-contain mb-0.5" />
                    <span className="font-cinzel text-[7px] text-[#111] font-bold">Tanav S</span>
                    <span className="text-[6px] text-[#555] uppercase tracking-wider font-cinzel">Deputy Director-General</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/40 border-t border-white/10 flex gap-3">
              <button 
                onClick={() => setShowCertificateModal(false)}
                className="flex-1 bg-white/5 border border-white/10 text-white font-cinzel font-bold text-xs py-2 rounded hover:bg-white/10 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Close Preview
              </button>
              <button 
                onClick={() => {
                  window.print();
                  saveAuthLog(currentUser.email, 'PRINT_CERTIFICATE', `Generated and printed certificate of participation for: ${previewDelegate.name}`);
                }}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-cinzel font-bold text-xs py-2 rounded hover:from-emerald-500 hover:to-emerald-400 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Payments Confirmation Modal */}
      {showClearPaymentsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0A1628] border border-red-500/40 rounded-xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.3)] flex flex-col gap-4 text-center">
            <div className="w-14 h-14 bg-red-500/20 text-red-400 border border-red-500/40 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            <h3 className="text-lg font-cinzel font-bold text-white uppercase tracking-wider">Confirm Clear All Payments</h3>
            <p className="text-xs text-[#BABABA] leading-relaxed">
              Are you sure you want to clear all payment transactions and registration records? This will purge all verified database records and reset the registration state. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowClearPaymentsModal(false)}
                disabled={clearingPaymentsLoading}
                className="flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded font-cinzel text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClearAllPayments}
                disabled={clearingPaymentsLoading}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded font-cinzel text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {clearingPaymentsLoading ? 'Clearing...' : 'Yes, Clear All'}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default RegistrationForm;
