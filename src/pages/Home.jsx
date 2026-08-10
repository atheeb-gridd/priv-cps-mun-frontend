import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Timer from '../components/Timer';
import { MUNPICS } from '../constants/Const';
import apiClient from '../lib/axios';

// Icons
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoStarOutline,
  IoMicOutline,
  IoPodiumOutline,
  IoArrowForward,
  IoClose,
  IoChevronBack,
  IoChevronForward,
} from 'react-icons/io5';
import { FaBuildingColumns, FaClipboardList, FaCalendarDays, FaTrophy, FaBookOpen, FaEarthAmericas, FaScroll } from 'react-icons/fa6';
import { FaSchool, FaHandshake } from 'react-icons/fa';

// Assets
import UNLogoGold from '../assets/un_logo_gold.svg';
import TimelineBoxBg from '../assets/timeline_box_bg.jpg';
import CtaBoxBg from '../assets/cta_box_bg.jpg';
import HeroBg from '../assets/hero_box_bg.jpg';
// import CPSLogoGold from '../assets/cps_logo_gold.jpg';
import UnhrcGold from '../assets/unhrc_gold.png';
import UngaGold from '../assets/unga_gold.png';
import UnscGold from '../assets/unsc_gold.png';
import LoksabhaGold from '../assets/loksabha_gold.png';
import CrisisGold from '../assets/crisis_gold.png';
// import Client1 from '../assets/client1.png';
// import Client2 from '../assets/client2.png';
// import Client3 from '../assets/client3.png';
// import Client4 from '../assets/client4.png';
// import Client5 from '../assets/client5.png';
// import Client6 from '../assets/client6.png';
// import Client7 from '../assets/client7.png';


const Home = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [seatCounts, setSeatCounts] = useState({});
  const [selectedBioModal, setSelectedBioModal] = useState(null);

  useEffect(() => {
    const fetchSeatCounts = async () => {
      try {
        const { data } = await apiClient.get('/registration/seat-counts');
        setSeatCounts(data.counts || {});
      } catch (err) {
        console.error('Failed to fetch seat counts:', err);
      }
    };
    fetchSeatCounts();
    const interval = setInterval(fetchSeatCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => {
        const maxIndex = MUNPICS.length - visibleItems;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [visibleItems]);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? MUNPICS.length - visibleItems : prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev >= MUNPICS.length - visibleItems ? 0 : prev + 1));
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleAcknowledge = () => {
    setShowToast(false);
    const path = pendingPath;
    setPendingPath(null);
    if (path) {
      if (path === '#schedule') {
        const scheduleSection = document.getElementById('schedule');
        if (scheduleSection) {
          scheduleSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(path);
      }
    }
  };

  // Target date matching the timeline countdown: August 28, 2026
  const endDate = dayjs('2026-08-28T09:00:00');



  const handleTimelineClick = (idx) => {
    switch (idx) {
      case 0:
        navigate('/register');
        break;
      case 1:
        navigate('/agendas');
        break;
      case 2:
        triggerToast("The background guides will be revealed on 10th of August.");
        setPendingPath('/backgroundguides');
        break;
      case 3:
        triggerToast("Register now to know your country!");
        setPendingPath('/register');
        break;
      case 4:
      case 5:
        triggerToast("The itinerary will be revealed on 14th of August.");
        setPendingPath('/itinerary');
        break;
      default:
        break;
    }
  };

  const committeesList = [
    {
      name: 'UN Human Rights Council',
      shortName: 'UNHRC',
      canonicalName: 'UN Human Rights Council (UNHRC)',
      limit: 40,
      agenda: 'Addressing the Rohingya Refugee Crisis with Special Emphasis on Accountability, Safe Repatriation, and the Protection of Human Rights',
      logo: UnhrcGold,
      bg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max'
    },
    {
      name: 'UN General Assembly',
      shortName: 'UNGA',
      canonicalName: 'UN General Assembly (UNGA)',
      limit: 60,
      agenda: 'Reforming International Sanctions while Preventing the Misuse of Unilateral Coercive Measures',
      logo: UngaGold,
      bg: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=400',
      capacity: '60 max'
    },
    {
      name: 'UN Security Council (Double delegation)',
      shortName: 'UNSC',
      canonicalName: 'UN Security Council (UNSC) (Double delegation)',
      limit: 40,
      agenda: 'Protection of International Shipping in the Red Sea',
      logo: UnscGold,
      bg: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max'
    },
    {
      name: 'Lok Sabha',
      shortName: 'LOKSABHA',
      canonicalName: 'Lok Sabha',
      limit: 40,
      agenda: 'Discussion on the Conduct of the National Census with Special Emphasis on Data Accuracy, Delimitation, and Inclusive Governance',
      logo: LoksabhaGold,
      bg: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Inside_view_of_Lok_Sabha_chamber_in_New_Parliament_building.jpg',
      capacity: '40 max'
    },
    {
      name: 'Crisis Committee',
      shortName: 'Crisis committee',
      canonicalName: 'Crisis Committee',
      limit: 30,
      agenda: 'Operation Midnight Hammer: Assessing the legality, Strategic implication, and impact on international Peace and Security',
      logo: CrisisGold,
      bg: 'https://images.unsplash.com/photo-1461088945293-0c17689e48ac?auto=format&fit=crop&q=80&w=400',
      capacity: '30 max'
    }
  ];

  /* const secretariatMembers = [
    {
      name: 'Yash Agarwal',
      role: 'Secretary General',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Ananya Srivastava',
      role: 'Deputy Secretary General',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Arjun Pratap Singh',
      role: 'USG - Operations',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Priyanshi Maheshwari',
      role: 'USG - Delegate Affairs',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Vedant Bansal',
      role: 'USG - External Affairs',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
    }
  ]; */

  const timelineItems = [
    {
      title: ['Registration', 'Opens'],
      date: '15th July',
      icon: <FaClipboardList className="text-[#DCA843] text-base" />
    },
    {
      title: ['Agenda', 'Reveal'],
      date: '15th & 16th July',
      icon: <FaBookOpen className="text-[#DCA843] text-base" />
    },
    {
      title: ['BG Guides', 'Reveal'],
      date: '10th August',
      icon: <FaScroll className="text-[#DCA843] text-base" />
    },
    {
      title: ['Country', 'Allocation'],
      date: 'Register Now',
      icon: <FaEarthAmericas className="text-[#DCA843] text-base" />
    },
    {
      title: ['Conference', 'Day 1'],
      date: '28th August',
      icon: <FaCalendarDays className="text-[#DCA843] text-base" />
    },
    {
      title: ['Conference', 'Day 2'],
      date: '29th August',
      icon: <FaTrophy className="text-[#DCA843] text-base" />
    }
  ];

  const sponsorLogos = [
    // Add new sponsor image variables here when available
  ];


  return (
    <div className="bg-transparent text-white min-h-screen overflow-x-hidden font-allotrix-font-secondary pt-24 px-4 md:px-8 pb-12">
      
      <section className="border border-[#DCA843]/30 bg-black/60 backdrop-blur-md rounded-lg p-6 md:p-10 mb-8 w-full max-w-7xl mx-auto shadow-2xl relative overflow-hidden">

        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-65" 
          style={{
            backgroundImage: `url(${HeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        {/* Seamless background blending gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/65 via-black/45 to-transparent pointer-events-none z-0"></div>

        {/* Glow Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#DCA843]/10 blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#DCA843]/7 blur-[100px] pointer-events-none z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <span className="font-cinzel text-xs md:text-sm tracking-widest text-[#DCA843] font-semibold uppercase flex items-center gap-2">
              <span className="text-[#DCA843] text-lg">✦</span> The 5th Year of Excellence
            </span>
            <h1 className="font-cinzel text-5xl md:text-7xl font-bold leading-none tracking-wide">
              <span style={{ color: '#ffffff' }}>CPS PRIME</span> <br />
              <span className="text-[#DCA843] font-extrabold tracking-wide drop-shadow-[0_4px_12px_rgba(220,168,67,0.25)]">
                MUN 5.O
              </span>
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-xl md:text-3xl text-[#DCA843] tracking-wide font-semibold mt-1 uppercase">
              CONquer from within
            </p>
            <p className="font-allotrix-font-secondary text-sm md:text-base text-cps-grey max-w-lg leading-relaxed mt-2">
              The stage is global. The debates are real.<br />
              The leaders of tomorrow are waiting.<br />
              Will you take your seat?
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <Link to="/register" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#DCA843] text-black font-cinzel text-xs font-bold px-8 py-4 rounded-md hover:bg-[#FFE082] transition-all duration-300 uppercase tracking-widest shadow-lg shadow-[#DCA843]/20">
                  Register Now <IoArrowForward className="text-base" />
                </button>
              </Link>
              <a href="#committees" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#DCA843] bg-transparent text-[#DCA843] font-cinzel text-xs font-bold px-8 py-4 rounded-md hover:bg-[#DCA843]/10 transition-all duration-300 uppercase tracking-widest">
                  Explore Committees
                </button>
              </a>
            </div>

            {/* Date/Location Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-6 text-xs font-semibold tracking-wider text-cps-grey/80 border-t border-[#DCA843]/15 pt-4 w-fit mx-auto lg:mx-0 justify-center lg:justify-start relative z-10">
              <div className="flex items-center gap-2">
                <IoCalendarOutline className="text-base text-[#DCA843]" />
                <span>28th & 29th August, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <IoLocationOutline className="text-base text-[#DCA843]" />
                <span>Chennai Public School, Thirumazhisai, Tamil Nadu - 600124</span>
              </div>
            </div>

          </div>

          {/* Right Hero Space (acts as a spacer for the background image) */}
          <div className="lg:col-span-5 h-[280px] lg:h-0 w-full"></div>
        </div>

        {/* Stats Ribbon (Merged into Hero Card) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4 pt-3 border-t border-[#DCA843]/15 relative z-10">
          <div className="flex flex-col items-center gap-1 justify-center py-1 md:border-r border-[#DCA843]/15">
            <IoPeopleOutline className="text-2xl text-[#DCA843]" />
            <span className="font-cinzel text-lg md:text-xl font-extrabold text-white" style={{ color: '#ffffff' }}>450+</span>
            <span className="font-allotrix-font-secondary text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-[#fff]/50">Delegates</span>
          </div>

          <div className="flex flex-col items-center gap-1 justify-center py-1 md:border-r border-[#DCA843]/15">
            <FaBuildingColumns className="text-xl text-[#DCA843]" />
            <span className="font-cinzel text-lg md:text-xl font-extrabold text-white" style={{ color: '#ffffff' }}>12+</span>
            <span className="font-allotrix-font-secondary text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-[#fff]/50">Committees</span>
          </div>

          <div className="flex flex-col items-center gap-1 justify-center py-1 md:border-r border-[#DCA843]/15">
            <FaSchool className="text-xl text-[#DCA843]" />
            <span className="font-cinzel text-lg md:text-xl font-extrabold text-white" style={{ color: '#ffffff' }}>30+</span>
            <span className="font-allotrix-font-secondary text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-[#fff]/50">Schools</span>
          </div>

          <div className="flex flex-col items-center gap-1 justify-center py-1">
            <IoStarOutline className="text-2xl text-[#DCA843]" />
            <span className="font-cinzel text-lg md:text-xl font-extrabold text-white" style={{ color: '#ffffff' }}>5th</span>
            <span className="font-allotrix-font-secondary text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-[#fff]/50">Prime Edition</span>
          </div>
        </div>
      </section>

      {/* 3. ABOUT PANEL */}
      <section 
        id="about" 
        className="relative border border-[#DCA843]/30 bg-[#09090b]/80 backdrop-blur-md rounded-lg py-6 px-4 md:py-8 md:px-12 mb-8 w-full max-w-7xl mx-auto shadow-[0_0_50px_-12px_rgba(220,168,67,0.18)] overflow-hidden flex flex-col items-center justify-center z-10"
      >
        {/* Subtle gold glow elements in the corners or background */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#DCA843]/15 blur-[80px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#DCA843]/15 blur-[80px] pointer-events-none z-0"></div>
        
        {/* Center glowing gold radial blur */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-[#DCA843]/12 blur-[100px] pointer-events-none z-0"></div>

        {/* Top-center golden light line sweep */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/60 to-transparent pointer-events-none z-0"></div>

        {/* Fine gold micro-grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(220,168,67,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,168,67,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

        {/* Vector UN watermark emblem in center background */}
        <img 
          src={UNLogoGold} 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 h-auto opacity-[0.12] pointer-events-none z-0 select-none" 
          alt="" 
        />

        {/* Left vertical laurel branch vector */}
        <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 md:w-20 h-[70%] opacity-80 pointer-events-none z-0 select-none">
          <svg className="w-full h-full text-[#DCA843]" viewBox="0 0 100 300" fill="currentColor">
            <path d="M 50,280 C 30,200 30,100 50,20" fill="none" stroke="#DCA843" strokeWidth="2" strokeLinecap="round" />
            <path d="M 45,260 Q 30,250 35,240 Q 48,245 45,260" />
            <path d="M 49,260 Q 64,250 59,240 Q 46,245 49,260" />
            <path d="M 42,220 Q 25,210 30,200 Q 44,205 42,220" />
            <path d="M 48,220 Q 65,210 60,200 Q 46,205 48,220" />
            <path d="M 39,180 Q 20,170 25,160 Q 40,165 39,180" />
            <path d="M 47,180 Q 66,170 61,160 Q 46,165 47,180" />
            <path d="M 38,140 Q 18,130 23,120 Q 38,125 38,140" />
            <path d="M 47,140 Q 67,130 62,120 Q 47,125 47,140" />
            <path d="M 38,100 Q 20,90 25,80 Q 39,85 38,100" />
            <path d="M 46,100 Q 64,90 59,80 Q 45,85 46,100" />
            <path d="M 41,60 Q 25,50 30,40 Q 43,45 41,60" />
            <path d="M 47,60 Q 63,50 58,40 Q 45,45 47,60" />
            <path d="M 50,20 Q 45,5 50,0 Q 55,5 50,20" />
          </svg>
        </div>

        {/* Right vertical laurel branch vector (Mirrored) */}
        <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 md:w-20 h-[70%] opacity-80 pointer-events-none z-0 select-none transform scale-x-[-1]">
          <svg className="w-full h-full text-[#DCA843]" viewBox="0 0 100 300" fill="currentColor">
            <path d="M 50,280 C 30,200 30,100 50,20" fill="none" stroke="#DCA843" strokeWidth="2" strokeLinecap="round" />
            <path d="M 45,260 Q 30,250 35,240 Q 48,245 45,260" />
            <path d="M 49,260 Q 64,250 59,240 Q 46,245 49,260" />
            <path d="M 42,220 Q 25,210 30,200 Q 44,205 42,220" />
            <path d="M 48,220 Q 65,210 60,200 Q 46,205 48,220" />
            <path d="M 39,180 Q 20,170 25,160 Q 40,165 39,180" />
            <path d="M 47,180 Q 66,170 61,160 Q 46,165 47,180" />
            <path d="M 38,140 Q 18,130 23,120 Q 38,125 38,140" />
            <path d="M 47,140 Q 67,130 62,120 Q 47,125 47,140" />
            <path d="M 38,100 Q 20,90 25,80 Q 39,85 38,100" />
            <path d="M 46,100 Q 64,90 59,80 Q 45,85 46,100" />
            <path d="M 41,60 Q 25,50 30,40 Q 43,45 41,60" />
            <path d="M 47,60 Q 63,50 58,40 Q 45,45 47,60" />
            <path d="M 50,20 Q 45,5 50,0 Q 55,5 50,20" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-5xl">
          
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="font-cinzel text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#DCA843]">
              ABOUT CPS PRIME MUN
            </h2>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#DCA843] to-transparent mt-2 mx-auto"></div>
          </div>

          {/* Subtitle Tagline */}
          <div className="font-cinzel text-sm md:text-base lg:text-lg tracking-widest font-bold uppercase flex items-center justify-center gap-2 mt-2 w-full" style={{ color: '#DCA843' }}>
            <span style={{ color: '#DCA843' }} className="text-xs md:text-sm">✦</span>
            CONQUER FROM WITHIN
            <span style={{ color: '#DCA843' }} className="text-xs md:text-sm">✦</span>
          </div>

          {/* Description */}
          <p className="font-allotrix-font-secondary text-sm md:text-base text-white/90 leading-relaxed text-center max-w-4xl px-4 md:px-8 mt-1">
            <span className="text-[#DCA843] font-bold">CPS PRIME MUN</span> is the flagship Model United Nations conference of Chennai Public School, Thirumazhisai. Now in its fifth edition, the conference has established itself as a distinguished platform for young diplomats to debate global issues, cultivate leadership, and develop innovative solutions through diplomacy. Bringing together delegates from diverse schools, <span className="text-[#DCA843] font-bold">CPS PRIME MUN</span> fosters critical thinking, collaboration, and public speaking while inspiring the next generation of responsible global citizens.
          </p>

          {/* Value Pillars Horizontal Container */}
          <div className="w-full mt-4 border border-[#DCA843]/30 bg-black/70 backdrop-blur-sm rounded-lg py-3.5 px-5 md:py-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Debate */}
            <div className="flex items-center gap-3 px-2 md:border-r border-[#DCA843]/15">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                {/* Laurel wreath decoration */}
                <svg className="absolute inset-0 w-full h-full text-[#DCA843]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 35 85 C 20 75 15 50 25 25" />
                  <path d="M 28 75 Q 18 73 22 65 Q 28 68 28 75" fill="currentColor" />
                  <path d="M 22 60 Q 12 55 18 48 Q 25 50 22 60" fill="currentColor" />
                  <path d="M 21 43 Q 12 35 20 30 Q 26 35 21 43" fill="currentColor" />
                  <path d="M 25 28 Q 18 20 27 18 Q 30 25 25 28" fill="currentColor" />
                  
                  <path d="M 65 85 C 80 75 85 50 75 25" />
                  <path d="M 72 75 Q 82 73 78 65 Q 72 68 72 75" fill="currentColor" />
                  <path d="M 78 60 Q 88 55 82 48 Q 75 50 78 60" fill="currentColor" />
                  <path d="M 79 43 Q 88 35 80 30 Q 74 35 79 43" fill="currentColor" />
                  <path d="M 75 28 Q 82 20 73 18 Q 70 25 75 28" fill="currentColor" />
                </svg>
                {/* Inner circle with gold border */}
                <div className="w-8.5 h-8.5 rounded-full border border-[#DCA843] bg-black flex items-center justify-center text-[#DCA843] shadow-md shadow-[#DCA843]/15 relative z-10">
                  <IoMicOutline className="text-base" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-cinzel text-xs font-bold tracking-wider text-[#DCA843] uppercase">DEBATE</span>
                <p className="font-allotrix-font-secondary text-[11px] text-[#fff]/70 leading-normal mt-0.5">
                  Articulate your thoughts and engage in meaningful discussions.
                </p>
              </div>
            </div>

            {/* Diplomacy */}
            <div className="flex items-center gap-3 px-2 md:border-r border-[#DCA843]/15">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                {/* Laurel wreath decoration */}
                <svg className="absolute inset-0 w-full h-full text-[#DCA843]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 35 85 C 20 75 15 50 25 25" />
                  <path d="M 28 75 Q 18 73 22 65 Q 28 68 28 75" fill="currentColor" />
                  <path d="M 22 60 Q 12 55 18 48 Q 25 50 22 60" fill="currentColor" />
                  <path d="M 21 43 Q 12 35 20 30 Q 26 35 21 43" fill="currentColor" />
                  <path d="M 25 28 Q 18 20 27 18 Q 30 25 25 28" fill="currentColor" />
                  
                  <path d="M 65 85 C 80 75 85 50 75 25" />
                  <path d="M 72 75 Q 82 73 78 65 Q 72 68 72 75" fill="currentColor" />
                  <path d="M 78 60 Q 88 55 82 48 Q 75 50 78 60" fill="currentColor" />
                  <path d="M 79 43 Q 88 35 80 30 Q 74 35 79 43" fill="currentColor" />
                  <path d="M 75 28 Q 82 20 73 18 Q 70 25 75 28" fill="currentColor" />
                </svg>
                {/* Inner circle with gold border */}
                <div className="w-8.5 h-8.5 rounded-full border border-[#DCA843] bg-black flex items-center justify-center text-[#DCA843] shadow-md shadow-[#DCA843]/15 relative z-10">
                  <FaHandshake className="text-base" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-cinzel text-xs font-bold tracking-wider text-[#DCA843] uppercase">DIPLOMACY</span>
                <p className="font-allotrix-font-secondary text-[11px] text-[#fff]/70 leading-normal mt-0.5">
                  Negotiate, collaborate and build international relations.
                </p>
              </div>
            </div>

            {/* Leadership */}
            <div className="flex items-center gap-3 px-2 md:border-r border-[#DCA843]/15">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                {/* Laurel wreath decoration */}
                <svg className="absolute inset-0 w-full h-full text-[#DCA843]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 35 85 C 20 75 15 50 25 25" />
                  <path d="M 28 75 Q 18 73 22 65 Q 28 68 28 75" fill="currentColor" />
                  <path d="M 22 60 Q 12 55 18 48 Q 25 50 22 60" fill="currentColor" />
                  <path d="M 21 43 Q 12 35 20 30 Q 26 35 21 43" fill="currentColor" />
                  <path d="M 25 28 Q 18 20 27 18 Q 30 25 25 28" fill="currentColor" />
                  
                  <path d="M 65 85 C 80 75 85 50 75 25" />
                  <path d="M 72 75 Q 82 73 78 65 Q 72 68 72 75" fill="currentColor" />
                  <path d="M 78 60 Q 88 55 82 48 Q 75 50 78 60" fill="currentColor" />
                  <path d="M 79 43 Q 88 35 80 30 Q 74 35 79 43" fill="currentColor" />
                  <path d="M 75 28 Q 82 20 73 18 Q 70 25 75 28" fill="currentColor" />
                </svg>
                {/* Inner circle with gold border */}
                <div className="w-8.5 h-8.5 rounded-full border border-[#DCA843] bg-black flex items-center justify-center text-[#DCA843] shadow-md shadow-[#DCA843]/15 relative z-10">
                  <IoPodiumOutline className="text-base" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-cinzel text-xs font-bold tracking-wider text-[#DCA843] uppercase">LEADERSHIP</span>
                <p className="font-allotrix-font-secondary text-[11px] text-[#fff]/70 leading-normal mt-0.5">
                  Enhance your leadership skills and become a changemaker.
                </p>
              </div>
            </div>

            {/* Networking */}
            <div className="flex items-center gap-3 px-2">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                {/* Laurel wreath decoration */}
                <svg className="absolute inset-0 w-full h-full text-[#DCA843]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 35 85 C 20 75 15 50 25 25" />
                  <path d="M 28 75 Q 18 73 22 65 Q 28 68 28 75" fill="currentColor" />
                  <path d="M 22 60 Q 12 55 18 48 Q 25 50 22 60" fill="currentColor" />
                  <path d="M 21 43 Q 12 35 20 30 Q 26 35 21 43" fill="currentColor" />
                  <path d="M 25 28 Q 18 20 27 18 Q 30 25 25 28" fill="currentColor" />
                  
                  <path d="M 65 85 C 80 75 85 50 75 25" />
                  <path d="M 72 75 Q 82 73 78 65 Q 72 68 72 75" fill="currentColor" />
                  <path d="M 78 60 Q 88 55 82 48 Q 75 50 78 60" fill="currentColor" />
                  <path d="M 79 43 Q 88 35 80 30 Q 74 35 79 43" fill="currentColor" />
                  <path d="M 75 28 Q 82 20 73 18 Q 70 25 75 28" fill="currentColor" />
                </svg>
                {/* Inner circle with gold border */}
                <div className="w-8.5 h-8.5 rounded-full border border-[#DCA843] bg-black flex items-center justify-center text-[#DCA843] shadow-md shadow-[#DCA843]/15 relative z-10">
                  <IoPeopleOutline className="text-base" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-cinzel text-xs font-bold tracking-wider text-[#DCA843] uppercase">NETWORKING</span>
                <p className="font-allotrix-font-secondary text-[11px] text-[#fff]/70 leading-normal mt-0.5">
                  Connect with like-minded individuals from across the globe.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. COMMITTEES PANEL */}
      <section id="committees" className="border border-[#DCA843]/30 bg-[#09090b]/55 backdrop-blur-md rounded-lg p-6 md:p-12 mb-8 w-full max-w-7xl mx-auto shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 mb-10 pb-4 border-b border-[#DCA843]/15">
          <div className="flex items-center gap-4 w-full">
            <h2 className="font-cinzel text-xl md:text-2xl font-bold uppercase tracking-wider text-[white] shrink-0">
              Our Committees
            </h2>
            <div className="h-px bg-[#DCA843]/20 w-full hidden sm:block"></div>
          </div>
          <Link to="/committees" className="shrink-0">
            <button className="border border-[#DCA843]/60 bg-transparent text-[#DCA843] hover:bg-[#DCA843] hover:text-[#000] font-cinzel text-xs font-semibold px-5 py-2.5 rounded-md transition-all duration-300 uppercase tracking-widest">
              View All Committees
            </button>
          </Link>
        </div>

        {/* Committees grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {committeesList.map((committee, idx) => (
            <div 
              key={idx} 
              className="border border-[#DCA843]/30 rounded-md p-6 flex flex-col justify-between items-center text-center h-full shadow-lg relative group overflow-hidden min-h-[310px]"
              style={committee.bg ? { 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url(${committee.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {/* Gold border decorative line top */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

              {/* Committee Emblem */}
              <div className="w-20 h-20 rounded-full border border-[#DCA843]/30 bg-black/80 p-1.5 flex items-center justify-center mb-5 group-hover:border-[#DCA843]/60 transition-colors">
                <img 
                  src={committee.logo} 
                  alt={committee.shortName} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://i.ibb.co/bgxxbr9c/UNHRC-1.png';
                  }}
                />
              </div>

              <div className="flex flex-col gap-2 mb-4 w-full">
                <h3 className="font-cinzel text-[13px] uppercase font-bold text-[white] tracking-widest leading-snug min-h-[36px] group-hover:text-[#DCA843] transition-colors">
                  {committee.name}
                </h3>
                <span className="font-allotrix-font-secondary text-[12px] text-[#DCA843] font-bold tracking-widest uppercase">
                  {committee.shortName}
                </span>
              </div>

              {/* Agenda & Capacity details */}
              <div className="flex flex-col gap-3 mt-auto w-full pt-4 border-t border-[#DCA843]/15">
                <p className="font-allotrix-font-secondary text-[11px] text-cps-grey leading-relaxed text-center min-h-[30px]">
                  <strong className="text-[#DCA843] block text-[9px] uppercase tracking-wider mb-1">Agenda:</strong>
                  {committee.agenda || "To be revealed"}
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-1">
                  <div className="flex justify-center items-center gap-1.5 bg-[#DCA843]/5 border border-[#DCA843]/20 rounded py-1 px-3 w-fit mx-auto">
                    <span className="text-[9px] uppercase font-cinzel font-bold text-[#DCA843] tracking-wider">Capacity:</span>
                    <span className="text-[10px] font-bold font-allotrix-font-secondary" style={{ color: '#ffffff' }}>{committee.capacity}</span>
                  </div>
                  {(() => {
                    const canonical = committee.canonicalName || committee.name;
                    const filled = seatCounts[canonical] || seatCounts[committee.shortName] || 0;
                    const limit = committee.limit || (committee.shortName === 'UNGA' ? 60 : 40);
                    const seatsLeft = Math.max(0, limit - filled);
                    return (
                      <div className={`flex justify-center items-center gap-1.5 border rounded py-1 px-3 w-fit mx-auto ${
                        seatsLeft === 0 
                          ? 'bg-red-500/10 border-red-500/35 text-red-400' 
                          : 'bg-green-500/5 border-green-500/20 text-green-400'
                      }`}>
                        <span className="text-[9px] uppercase font-cinzel font-bold tracking-wider">Seats Left:</span>
                        <span className="text-[10px] font-bold font-allotrix-font-secondary text-white">
                          {seatsLeft === 0 ? '0 (Full)' : seatsLeft}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. SECRETARIAT PANEL */}
      <section id="secretariat" className="border border-[#DCA843]/30 bg-[#09090b]/55 backdrop-blur-md rounded-lg p-6 md:p-12 mb-8 w-full max-w-7xl mx-auto shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 mb-4">
          <div className="flex items-center gap-4 w-full">
            <h2 className="font-cinzel text-xl md:text-2xl font-bold uppercase tracking-wider text-[white] shrink-0">
              Our Secretariat
            </h2>
            <div className="h-px bg-[#DCA843]/20 w-full hidden sm:block"></div>
          </div>
          <Link to="/ocmembers" className="shrink-0">
            <button className="border border-[#DCA843]/60 bg-transparent text-[#DCA843] hover:bg-[#DCA843] hover:text-[#000] font-cinzel text-xs font-semibold px-5 py-2.5 rounded-md transition-all duration-300 uppercase tracking-widest">
              View Full Secretariat
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-4 w-full mb-6">
          <p className="font-cinzel text-xs uppercase tracking-widest text-[#DCA843]/65 font-bold shrink-0 text-center sm:text-left">
            Meet The Minds Behind CPS Prime MUN 5.O
          </p>
          <div className="h-px bg-[#DCA843]/20 w-full hidden sm:block"></div>
        </div>

        {/* Secretariat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[
            { 
              name: "Mr. Aashish Kathpal", 
              role: "Secretary-General", 
              initials: "AK",
              img: "/images/aashish.jpg",
              objectPosition: "center 18%",
              transform: "scale(1.75) translateY(2%)",
              paragraphs: [
                "“A leader is one who knows the way, goes the way, and shows the way.” — John C. Maxwell",
                "Aashish Kathpal is a Grade XI student at Chennai Public School, Thirumazhisai, and has the honour of serving as the Secretary-General of CPS Prime MUN 5.O. His MUN journey began in 2025, where curiosity quickly grew into a passion for diplomacy, public speaking, and international relations. At his very first conference, he was awarded an Honourable Mention, an achievement that inspired him to continue pursuing excellence in MUN.",
                "Beyond MUN, Aashish has a strong interest in public speaking, debate, entrepreneurship, business, and law. These pursuits have strengthened his critical thinking, leadership, and communication skills while shaping his aspiration to pursue Hospitality Management.",
                "Believing that leadership is defined by service, integrity, and the willingness to inspire others, Aashish views Model United Nations as more than an academic exercise. To him, it is a platform that encourages meaningful dialogue, nurtures empathy, and equips young individuals with the confidence to address complex global challenges. He hopes to foster an environment where every delegate feels empowered to voice their ideas, embrace diverse perspectives, and grow both intellectually and personally.",
                "As Secretary-General, Aashish envisions CPS Prime MUN 5.O as a platform where delegates challenge perspectives, collaborate with purpose, and develop solutions through meaningful dialogue. He believes that true diplomacy lies in transforming disagreement into progress and that the finest delegates lead with integrity, respect, and conviction."
              ]
            },
            { 
              name: "Mr. K. J. Rohith", 
              role: "Deputy Secretary-General", 
              initials: "KR",
              img: "/images/rohith.jpg",
              objectPosition: "center 12%",
              transform: "scale(2.2) translateY(-2%)",
              paragraphs: [
                "“Knowing is not enough, we must apply. Willing is not enough, we must do.” — Bruce Lee",
                "The measure of a conference is seldom found in the resolutions it passes, but in the minds it transforms.",
                "Every committee room is more than a space for debate; it is where convictions are questioned, perspectives are broadened, and leadership is quietly forged through the discipline of listening as much as speaking. In a world too often divided by certainty, the ability to understand before seeking to be understood remains one of the rarest forms of strength.",
                "As Deputy Secretary-General of CPS Prime MUN 5.O, my hope is not simply that delegates leave with sharper arguments, but with greater curiosity, deeper respect for differing perspectives, and the confidence to lead with both reason and humility.",
                "Whether this conference marks your first step into diplomacy or another chapter in your MUN journey, I invite you to make every speech purposeful, every negotiation meaningful, and every interaction memorable. The conversations you begin here may last far longer than the conference itself.",
                "I look forward to welcoming each one of you to CPS Prime MUN 5.O, where we come together not merely to debate the world as it is, but to Conquer From Within."
              ]
            },
            { 
              name: "Ms. Annapoorani Kamalakannan", 
              role: "Director-General", 
              initials: "AK",
              img: "/images/annapoorani.jpg",
              objectPosition: "center 12%",
              transform: "scale(2.0) translateY(-2%)",
              paragraphs: [
                "“It always seems impossible until it’s done.” — Nelson Mandela",
                "If there’s one thing Annapoorani has learned, it’s that the most rewarding opportunities often begin with a little uncertainty. From organizing community events to stepping into the role of Director General, she’s discovered that growth comes from saying “yes” first and figuring things out along the way.",
                "An avid debater and lifelong learner, she has represented her school in competitions including the World Scholar’s Cup, earning multiple accolades along the way. She also holds the Cambridge English C1 qualification, a reflection of her love for communication, collaboration, and exchanging ideas.",
                "Inspired by Ratan Tata’s philosophy of creating value through leadership and service, Annapoorani dreams of becoming an entrepreneur who builds not only successful businesses but also meaningful social impact. She hopes to one day establish an NGO, believing that the best leaders solve problems that matter and leave people better than they found them.",
                "Outside committee sessions, you’ll probably find her planning her next project, following a cricket match with unmatched enthusiasm, or asking “just one more question” until everything finally makes sense. As a true fan of RCB — if there’s one thing being an RCB fan teaches you, it’s persistence.",
                "As Director General of CPS Prime MUN 5.O, she hopes to create a conference where every delegate feels challenged to think critically, encouraged to speak confidently, and inspired to discover that diplomacy is ultimately about people."
              ]
            },
            { 
              name: "Mr. Tanav S", 
              role: "Deputy Director-General & Website Developer", 
              initials: "TS",
              img: "/images/tanav_s.jpg",
              objectPosition: "center 20%",
              transform: "scale(1.75) translateY(10%)",
              paragraphs: [
                "Driven by curiosity, discipline, and a commitment to excellence, Tanav S serves as the Deputy Director-General of CPS PRIME MUN 5.O and the Developer of the Official CPS PRIME MUN Website. Combining leadership with technical expertise, he strives to create meaningful experiences that inspire delegates and elevate the conference to new standards of professionalism.",
                "A strategic thinker with a calm and solution-oriented mindset, Tanav believes that true leadership is built on integrity, responsibility, and the ability to empower others. His approachable nature, strong work ethic, and attention to detail enable him to work effectively under pressure while maintaining a positive and collaborative environment.",
                "As the architect behind the official conference website, Tanav designed and developed a modern digital platform that reflects the vision, identity, and global spirit of CPS PRIME MUN. His focus on innovation, accessibility, and user experience ensures that every participant enjoys a seamless journey from registration to conference day.",
                "Previously serving as the Vice-Captain of Plasma House, he demonstrated exceptional leadership by coordinating initiatives, motivating peers, and fostering teamwork. These experiences strengthened his confidence, communication skills, and ability to manage responsibilities with dedication and professionalism.",
                "Passionate about diplomacy, innovation, and continuous self-improvement, Tanav believes that every challenge is an opportunity to learn, lead, and leave a meaningful impact. Guided by his personal philosophy, \"Conquer From Within,\" he exemplifies resilience, integrity, and unwavering determination in every responsibility he undertakes. With a vision to inspire others through service, excellence, and innovation, he remains committed to shaping CPS PRIME MUN 5.O into a benchmark of professionalism, collaboration, and transformative leadership, ensuring that every delegate departs with unforgettable experiences, lasting connections, and a renewed passion for global diplomacy."
              ]
            }
          ].map((member, idx) => (
            <div 
              key={idx} 
              onClick={() => member.paragraphs && setSelectedBioModal(member)}
              className={`border border-[#DCA843]/30 bg-[#09090b]/55 backdrop-blur-md rounded-xl shadow-lg relative group overflow-hidden transition-all duration-300 hover:border-[#DCA843]/70 w-[270px] mx-auto h-[340px] justify-end flex flex-col ${member.paragraphs ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-[#DCA843]/20 hover:shadow-2xl' : ''}`}
            >
              {member.img ? (
                <>
                  {/* Full box background image container with overflow-hidden */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                      style={{
                        objectPosition: member.objectPosition || 'center top',
                        transform: member.transform || 'none',
                      }}
                    />
                  </div>
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
                  
                  {/* Decorative top gold border */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DCA843] to-transparent z-20"></div>

                  {/* Content overlay */}
                  <div className="relative z-20 flex flex-col items-center justify-end p-5 text-center w-full">
                    <p className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wider drop-shadow-md">{member.name}</p>
                    <span className="font-allotrix-font-secondary text-[9.5px] text-[#DCA843] font-bold tracking-widest uppercase mt-1.5 pt-2 border-t border-[#DCA843]/30 w-full drop-shadow-sm">
                      {member.role}
                    </span>
                    {member.paragraphs && (
                      <span className="text-[8.5px] font-cinzel text-[#000] font-bold tracking-wider uppercase bg-[#DCA843] px-2.5 py-1 rounded-md mt-2 shadow-md hover:bg-[#FFE082] transition-colors">
                        Click for Bio ➔
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Gold border decorative line top */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

                  <div className="flex flex-col items-center justify-center gap-3 w-full h-full p-6">
                    {/* Avatar Initial Box */}
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-[#DCA843]/40 bg-[#000]/80 flex items-center justify-center shadow-md group-hover:border-[#DCA843] group-hover:scale-105 transition-all duration-300">
                      <span className="font-cinzel text-sm font-bold text-[#DCA843]">
                        {member.initials}
                      </span>
                    </div>

                    {/* Member Name */}
                    <p className="font-cinzel text-xs font-bold text-white tracking-wider mb-1">
                      {member.name}
                    </p>

                    {/* Role / Designation */}
                    <span className="font-allotrix-font-secondary text-[9px] text-[#DCA843]/85 font-bold tracking-widest uppercase mt-1 pt-2 border-t border-[#DCA843]/10 w-full">
                      {member.role}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. TIMELINE & COUNTDOWN COMBINED PANEL */}
      <section id="schedule" className="max-w-7xl mx-auto w-full mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Journey to CPS Prime MUN 5.O Timeline */}
          <div className="lg:col-span-7 border border-[#DCA843]/40 bg-gradient-to-b from-[#090b12] via-[#05060a] to-[#08090f] backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_0_25px_rgba(220,168,67,0.12)] relative overflow-hidden flex flex-col justify-center items-center gap-6 md:gap-8 w-full">
            {/* Background overlay and glow */}
            <div 
              className="absolute -inset-4 bg-no-repeat opacity-30 pointer-events-none z-0"
              style={{ 
                backgroundImage: `url(${TimelineBoxBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left center'
              }}
            ></div>
            <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] rounded-full bg-[#DCA843]/5 blur-[100px] pointer-events-none z-0"></div>
            
            {/* Card Title */}
            <div className="flex items-center gap-3 w-full justify-center z-10">
              <span className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/50 to-transparent flex-1 max-w-[80px]"></span>
              <h2 className="font-cinzel text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.2em] text-[#DCA843] text-center">
                JOURNEY TO CPS PRIME MUN 5.O
              </h2>
              <span className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/50 to-transparent flex-1 max-w-[80px]"></span>
            </div>

            {/* Desktop horizontal timeline */}
            <div className="hidden sm:flex justify-center items-start relative w-full px-1 py-1 z-10 gap-0">
              {/* Horizontal connector line passing through node centers */}
              <div className="absolute left-[8%] right-[8%] top-[22px] md:top-[24px] h-[1.5px] bg-[#DCA843]/40 z-0"></div>

              {timelineItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative flex flex-col items-center z-10 w-[15%] px-0.5 cursor-pointer group"
                  onClick={() => handleTimelineClick(idx)}
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#07080c] border border-[#DCA843]/60 flex items-center justify-center shadow-[0_0_12px_rgba(220,168,67,0.25)] group-hover:border-[#DCA843] group-hover:bg-[#DCA843]/20 group-hover:shadow-[0_0_20px_rgba(220,168,67,0.5)] transition-all duration-300 relative z-10 shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="font-cinzel text-[9px] md:text-[11px] font-bold text-[#DCA843] tracking-wider text-center mt-3 leading-snug w-full group-hover:text-white transition-colors uppercase">
                    {Array.isArray(item.title) ? (
                      <>
                        {item.title[0]}
                        <br />
                        {item.title[1]}
                      </>
                    ) : (
                      item.title
                    )}
                  </h4>
                </div>
              ))}
            </div>

            {/* Mobile vertical timeline */}
            <div className="flex sm:hidden relative border-l border-[#DCA843]/30 ml-3 pl-7 flex flex-col gap-4 py-2 z-10">
              {timelineItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative flex flex-col gap-0.5 items-start cursor-pointer group"
                  onClick={() => handleTimelineClick(idx)}
                >
                  <div className="absolute -left-[43px] top-0 w-8 h-8 rounded-full bg-[#07080c] border border-[#DCA843]/60 flex items-center justify-center shadow-[0_0_10px_rgba(220,168,67,0.25)] group-hover:border-[#DCA843] group-hover:bg-[#DCA843]/20 transition-all">
                    {item.icon}
                  </div>
                  <h4 className="font-cinzel text-[11px] font-bold text-[#DCA843] tracking-widest group-hover:text-white transition-colors uppercase">
                    {Array.isArray(item.title) ? (
                      <>
                        {item.title[0]} {item.title[1]}
                      </>
                    ) : (
                      item.title
                    )}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Countdown Timer Box */}
          <div className="lg:col-span-5 border border-[#DCA843]/40 bg-black/85 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_0_25px_rgba(220,168,67,0.12)] relative overflow-hidden flex flex-col justify-center items-center text-center w-full gap-4">
            <div 
              className="absolute -inset-4 bg-no-repeat opacity-30 pointer-events-none z-0"
              style={{ 
                backgroundImage: `url(${TimelineBoxBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center'
              }}
            ></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[250px] h-[250px] rounded-full bg-[#DCA843]/5 blur-[80px] pointer-events-none z-0"></div>

            <h3 className="font-cinzel text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.2em] text-[#DCA843] z-10">
              CPS PRIME MUN 5.O BEGINS IN
            </h3>
            
            <div className="z-10 w-full flex justify-center">
              <Timer endDate={endDate} />
            </div>
            
            <p className="font-allotrix-font-secondary text-xs text-cps-grey leading-relaxed z-10 max-w-xs">
              Secure your slots and complete registrations before allocations close.
            </p>
          </div>

        </div>
      </section>

      {/* 7. PREVIOUS EDITION GALLERY PANEL */}
      <section id="gallery" className="border border-[#DCA843]/30 bg-[#09090b]/55 backdrop-blur-md rounded-lg p-6 md:p-12 mb-8 w-full max-w-7xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 mb-10 pb-4 border-b border-[#DCA843]/15">
          <div className="flex items-center gap-4 w-full">
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold uppercase tracking-wider text-[white] shrink-0">
              Glimpses From Previous Editions
            </h2>
            <div className="h-px bg-[#DCA843]/20 w-full hidden sm:block"></div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* Carousel navigation buttons */}
            <button 
              onClick={handlePrevSlide}
              className="border border-[#DCA843]/30 bg-transparent text-[#DCA843] hover:bg-[#DCA843] hover:text-[#000] p-2.5 rounded-md transition-all duration-300"
              aria-label="Previous Slide"
            >
              <IoChevronBack className="text-sm" />
            </button>
            <button 
              onClick={handleNextSlide}
              className="border border-[#DCA843]/30 bg-transparent text-[#DCA843] hover:bg-[#DCA843] hover:text-[#000] p-2.5 rounded-md transition-all duration-300"
              aria-label="Next Slide"
            >
              <IoChevronForward className="text-sm" />
            </button>
            <button 
              onClick={() => {
                setCurrentImageIndex(0);
                setLightboxOpen(true);
              }}
              className="border border-[#DCA843]/60 bg-transparent text-[#DCA843] hover:bg-[#DCA843] hover:text-[#000] font-cinzel text-xs font-semibold px-5 py-2.5 rounded-md transition-all duration-300 uppercase tracking-widest"
            >
              View Gallery
            </button>
          </div>
        </div>

        {/* Sliding images wrapper */}
        <div className="overflow-hidden w-full relative">
          <div 
            className="flex"
            style={{ 
              transform: `translateX(-${carouselIndex * (100 / visibleItems)}%)`,
              transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {MUNPICS.map((pic, idx) => (
              <div 
                key={idx} 
                style={{ flex: `0 0 ${100 / visibleItems}%` }}
                onClick={() => {
                  setCurrentImageIndex(idx);
                  setLightboxOpen(true);
                }}
                className="px-2 shrink-0 select-none cursor-pointer"
              >
                <div className="h-48 md:h-64 rounded-md overflow-hidden border border-[#DCA843]/20 hover:border-[#DCA843]/50 transition-all duration-300 shadow-md w-full relative group">
                  <img 
                    src={pic.img} 
                    alt={pic.alt || 'Previous MUN Edition'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER PANEL */}
      <section className="max-w-7xl mx-auto w-full mb-8 px-4 md:px-0">
        <div className="relative border border-[#DCA843]/30 bg-black/75 backdrop-blur-md rounded-lg py-8 px-6 md:py-10 md:px-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden shadow-2xl">
          {/* Luxury Background Image */}
          <div 
            className="absolute -inset-4 bg-no-repeat opacity-90 pointer-events-none z-0"
            style={{ 
              backgroundImage: `url(${CtaBoxBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Logo Watermark in the middle space */}
          <div 
            className="absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2 h-[170%] aspect-square bg-no-repeat bg-center bg-contain opacity-[0.08] pointer-events-none z-0"
            style={{ 
              backgroundImage: `url(${UNLogoGold})`
            }}
          ></div>
          
          <div className="flex flex-col gap-2 max-w-xl z-10">
            <h2 className="font-cinzel text-xl md:text-3xl font-extrabold tracking-wider text-[#DCA843] leading-snug">
              YOUR SEAT AT THE TABLE OF DIPLOMACY AWAITS.
            </h2>
            <p className="font-allotrix-font-secondary text-xs md:text-sm text-cps-grey leading-relaxed">
              Step up to solve global stalemates. Join the best minds in the MUN circuit to debate agendas that matter.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 shrink-0 z-10 w-full md:w-auto">
            <Link to="/register" className="w-full md:w-auto">
              <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#DCA843] text-black font-cinzel text-xs font-bold px-8 py-4 rounded-md hover:bg-[#FFE082] transition-all duration-300 uppercase tracking-widest shadow-lg shadow-[#DCA843]/20">
                Register Now <IoArrowForward className="text-sm" />
              </button>
            </Link>
            <p className="font-allotrix-font-secondary text-[10px] md:text-xs text-cps-grey/70 text-center max-w-[280px] leading-relaxed mt-1">
              Register early to secure your preferred committee before seats are filled.
            </p>
          </div>
        </div>
      </section>
      {/* 9. SPONSORS PANEL */}
      <section id="sponsors" className="border border-[#DCA843]/30 bg-[#09090b]/55 backdrop-blur-md rounded-lg p-8 w-full max-w-7xl mx-auto shadow-2xl overflow-hidden flex flex-col items-center gap-8">
        
        {/* Centered Heading framed by lines */}
        <div className="flex items-center gap-4 text-[#DCA843] font-cinzel text-xs font-bold uppercase tracking-widest justify-center w-full">
          <span className="h-px bg-[#DCA843]/20 w-16"></span>
          <span>Our Sponsors & Partners</span>
          <span className="h-px bg-[#DCA843]/20 w-16"></span>
        </div>
        
        {/* Logos container */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center justify-center gap-8 md:gap-16 w-full flex-wrap">
            {sponsorLogos.map((logo, idx) => (
              <img 
                key={idx} 
                src={logo} 
                alt={`Sponsor Logo ${idx + 1}`} 
                className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300" 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Premium Centered Modal Notification */}
      {showToast && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] transition-opacity duration-300 cursor-pointer"
            onClick={handleAcknowledge}
          ></div>
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4 pointer-events-none">
            <div className="border border-[#DCA843]/30 bg-[#000] p-6 rounded-lg shadow-2xl max-w-sm w-full flex flex-col items-center gap-4 text-center animate-modal pointer-events-auto">
              <style>{`
                @keyframes modalZoomIn {
                  from { opacity: 0; transform: scale(0.95); }
                  to { opacity: 1; transform: scale(1); }
                }
                .animate-modal {
                  animation: modalZoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
              `}</style>
              <div className="w-12 h-12 rounded-full border border-[#DCA843]/20 flex items-center justify-center bg-[#DCA843]/5 text-[#DCA843] mb-1">
                <IoCalendarOutline className="text-2xl animate-pulse" />
              </div>
              <span className="font-cinzel text-[10px] tracking-widest text-[#DCA843] font-semibold uppercase">
                Announcement
              </span>
              <p className="font-allotrix-font-secondary text-xs text-[#E4E4E7] leading-relaxed">
                {toastMessage}
              </p>
              <button 
                onClick={handleAcknowledge} 
                className="mt-2 px-6 py-2.5 border border-[#DCA843] text-[#DCA843] bg-[#000] rounded-md text-[10px] font-cinzel font-bold uppercase tracking-widest hover:bg-[#DCA843] hover:text-[#000] transition-all duration-300 w-full"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </>
      )}

      {/* Gallery Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-[#000]/95 backdrop-blur-md z-[30000] flex flex-col items-center justify-between p-4 md:p-8 animate-fadeIn select-none">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fadeIn {
              animation: fadeIn 0.25s ease-out forwards;
            }
          `}</style>

          {/* Header */}
          <div className="w-full max-w-6xl flex justify-between items-center pb-2 border-b border-white/10">
            <span className="font-cinzel text-sm md:text-lg tracking-widest text-[#DCA843] font-bold">
              Gallery &mdash; {currentImageIndex + 1} / {MUNPICS.length}
            </span>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="text-white hover:text-[#DCA843] transition-colors p-2 text-2xl"
              aria-label="Close Gallery"
            >
              <IoClose />
            </button>
          </div>

          {/* Main Container */}
          <div className="relative w-full max-w-5xl flex items-center justify-between gap-4 my-auto h-[60vh] md:h-[68vh]">
            {/* Prev Button */}
            <button 
              onClick={() => {
                setCurrentImageIndex((prev) => (prev === 0 ? MUNPICS.length - 1 : prev - 1));
              }}
              className="bg-black/40 hover:bg-black/80 text-white hover:text-[#DCA843] border border-white/10 hover:border-[#DCA843]/30 p-3 rounded-full transition-all duration-300 text-xl md:text-2xl shrink-0"
              aria-label="Previous Image"
            >
              <IoChevronBack />
            </button>

            {/* Active Image */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-[#121212]/50 shadow-2xl">
              <img 
                src={MUNPICS[currentImageIndex].img} 
                alt={MUNPICS[currentImageIndex].alt || 'Gallery View'} 
                className="max-w-full max-h-full object-contain pointer-events-none transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            <button 
              onClick={() => {
                setCurrentImageIndex((prev) => (prev === MUNPICS.length - 1 ? 0 : prev + 1));
              }}
              className="bg-black/40 hover:bg-black/80 text-white hover:text-[#DCA843] border border-white/10 hover:border-[#DCA843]/30 p-3 rounded-full transition-all duration-300 text-xl md:text-2xl shrink-0"
              aria-label="Next Image"
            >
              <IoChevronForward />
            </button>
          </div>

          {/* Thumbnails Navigation */}
          <div className="w-full max-w-xl flex justify-center gap-2 md:gap-3 py-2 overflow-x-auto">
            {MUNPICS.map((pic, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-14 h-10 md:w-20 md:h-14 rounded overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  idx === currentImageIndex 
                    ? 'border-[#DCA843] scale-105 opacity-100 shadow-[0_0_8px_rgba(220,168,67,0.4)]' 
                    : 'border-transparent opacity-40 hover:opacity-80'
                }`}
              >
                <img src={pic.img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Secretariat Biography Modal */}
      {selectedBioModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedBioModal(null)}
        >
          <div 
            className="bg-[#0b0b0e] border border-[#DCA843]/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl shadow-black text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedBioModal(null)}
              className="absolute top-4 right-4 text-[#DCA843] hover:text-white w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-lg font-bold border border-[#DCA843]/20"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-[#DCA843]/20 pb-6">
              <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-xl border-2 border-[#DCA843]/60 overflow-hidden shrink-0 shadow-xl shadow-black bg-black">
                <img src={selectedBioModal.img} alt={selectedBioModal.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex flex-col text-center sm:text-left gap-1.5 justify-center">
                <span className="font-cinzel text-[10px] font-bold text-[#DCA843] uppercase tracking-widest bg-[#DCA843]/10 border border-[#DCA843]/20 px-2.5 py-1 rounded w-fit mx-auto sm:mx-0">
                  CPS PRIME MUN 5.O Secretariat
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wider mt-1">{selectedBioModal.name}</h2>
                <p className="font-cinzel text-xs text-[#DCA843]/90 font-semibold tracking-wider">{selectedBioModal.role}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#BABABA] leading-relaxed font-allotrix-font-secondary">
              {selectedBioModal.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="border-l border-[#DCA843]/20 pl-3.5 hover:border-[#DCA843]/60 transition-colors">
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-2 border-t border-[#DCA843]/10 flex justify-end">
              <button 
                onClick={() => setSelectedBioModal(null)}
                className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#DCA843] hover:text-white border border-[#DCA843]/40 hover:border-[#DCA843] px-5 py-2 rounded-lg transition-all"
              >
                Close Biography
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
