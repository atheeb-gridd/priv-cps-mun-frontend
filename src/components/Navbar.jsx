import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/un_logo_gold.svg';
import { FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ openNav, setOpenNav }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleScrollToSection = (sectionId, route = '/') => {
    setOpenNav(false);
    if (window.location.pathname !== route) {
      navigate(route);
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-[#DCA843]/20 px-4 py-1.5 flex justify-between items-center transition-all duration-300">
      {/* Logo & Title */}
      <Link to="/" className="flex items-center gap-2 md:gap-3" onClick={() => setOpenNav(false)}>
        <img 
          src={Logo} 
          alt="CPS Logo" 
          className="h-[46px] w-[46px] sm:h-[55px] sm:w-[55px] md:h-[65px] md:w-[65px] xl:h-[75px] xl:w-[75px] object-contain transition-all duration-300 filter drop-shadow(0 2px 10px rgba(220,168,67,0.25))" 
        />
        <div className="flex flex-col justify-center">
          <span 
            className="font-cinzel font-bold text-xs sm:text-sm md:text-base xl:text-lg tracking-wider leading-none whitespace-nowrap transition-all duration-300" 
            style={{ color: '#DCA843' }}
          >
            CPS PRIME MUN
          </span>
          <span 
            className="font-cinzel font-bold text-[9px] sm:text-xs md:text-sm xl:text-base tracking-widest leading-none mt-1.5 whitespace-nowrap transition-all duration-300" 
            style={{ color: '#DCA843' }}
          >
            5.O
          </span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="hidden xl:flex items-center gap-4 2xl:gap-8 font-allotrix-font-secondary text-sm xl:text-base font-bold text-cps-grey">
        <li className="hover:text-[#DCA843] transition-colors duration-300">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-[#DCA843] transition-colors duration-300 cursor-pointer">
          <span onClick={() => handleScrollToSection('about')}>About</span>
        </li>
        <li className="hover:text-[#DCA843] transition-colors duration-300">
          <Link to="/committees">Committees</Link>
        </li>
        <li className="hover:text-[#DCA843] transition-colors duration-300">
          <Link to="/agendas">Agendas</Link>
        </li>
        <li className="hover:text-[#DCA843] transition-colors duration-300">
          <Link to="/backgroundguides">BG Guides</Link>
        </li>
        <li className="hover:text-[#DCA843] transition-colors duration-300">
          <Link to="/itinerary">Itinerary</Link>
        </li>
        <li className="hover:text-[#DCA843] transition-colors duration-300">
          <Link to="/ocmembers">Secretariat</Link>
        </li>
        <li className="hover:text-[#DCA843] transition-colors duration-300 cursor-pointer">
          <span onClick={() => handleScrollToSection('gallery')}>Gallery</span>
        </li>

        <li className="hover:text-[#DCA843] transition-colors duration-300">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Register / Dashboard Button */}
      <div className="hidden xl:flex items-center gap-3">
        {user ? (
          <Link to={user.registrationCompleted ? "/dashboard" : "/registration-form"}>
            <button className="flex items-center gap-2 border border-[#DCA843] bg-[#DCA843] text-black hover:bg-[#FFE082] font-cinzel text-xs font-semibold px-4 py-2.5 rounded-md transition-all duration-300 uppercase tracking-widest">
              Dashboard <FaArrowRight className="text-xs" />
            </button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="border border-[#DCA843]/60 bg-transparent text-[#DCA843] hover:bg-[#DCA843] hover:text-[#000] font-cinzel text-xs font-semibold px-4 py-2.5 rounded-md transition-all duration-300 uppercase tracking-widest">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="flex items-center gap-2 border border-[#DCA843]/60 bg-transparent text-[#DCA843] hover:bg-[#DCA843] hover:text-[#000] font-cinzel text-xs font-semibold px-4 py-2.5 rounded-md transition-all duration-300 uppercase tracking-widest">
                Register <FaArrowRight className="text-xs" />
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Nav Toggle */}
      <div className="xl:hidden flex items-center pr-1">
        <button
          className="text-[#fff] text-2xl hover:text-[#DCA843] p-2 transition-colors focus:outline-none"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <IoCloseSharp className="text-3xl" /> : (
            <div className="flex flex-col gap-1.5 w-6">
              <span className="h-0.5 w-full bg-[#fff] rounded-full"></span>
              <span className="h-0.5 w-3/4 bg-[#fff] rounded-full self-end"></span>
              <span className="h-0.5 w-full bg-[#fff] rounded-full"></span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 h-[100vh] w-full bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out xl:hidden ${openNav ? 'left-0' : 'left-[-100%]'}`}>
        <button className="text-4xl text-[#fff] absolute top-6 right-6 p-2 focus:outline-none hover:text-[#DCA843] transition-colors" onClick={() => setOpenNav(false)}>
          <IoCloseSharp />
        </button>
        <ul className="flex flex-col items-center gap-6 font-cinzel text-2xl font-semibold text-[#fff]">
          <li>
            <Link to="/" onClick={() => setOpenNav(false)} className="hover:text-[#DCA843] transition-colors">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-[#DCA843] transition-colors" onClick={() => handleScrollToSection('about')}>
            About
          </li>
          <li>
            <Link to="/committees" onClick={() => setOpenNav(false)} className="hover:text-[#DCA843] transition-colors">Committees</Link>
          </li>
          <li>
            <Link to="/agendas" onClick={() => setOpenNav(false)} className="hover:text-[#DCA843] transition-colors">Agendas</Link>
          </li>
          <li>
            <Link to="/backgroundguides" onClick={() => setOpenNav(false)} className="hover:text-[#DCA843] transition-colors">BG Guides</Link>
          </li>
          <li>
            <Link to="/itinerary" onClick={() => setOpenNav(false)} className="hover:text-[#DCA843] transition-colors">Itinerary</Link>
          </li>
          <li>
            <Link to="/ocmembers" onClick={() => setOpenNav(false)} className="hover:text-[#DCA843] transition-colors">Secretariat</Link>
          </li>
          <li className="cursor-pointer hover:text-[#DCA843] transition-colors" onClick={() => handleScrollToSection('gallery')}>
            Gallery
          </li>

          <li>
            <Link to="/contact" onClick={() => setOpenNav(false)} className="hover:text-[#DCA843] transition-colors">Contact</Link>
          </li>
        </ul>
        {user ? (
          <Link to={user.registrationCompleted ? "/dashboard" : "/registration-form"} onClick={() => setOpenNav(false)} className="mt-4">
            <button className="flex items-center gap-2 border border-[#DCA843] bg-[#DCA843] text-black font-cinzel text-sm font-semibold px-8 py-3 rounded-md uppercase tracking-wider">
              Dashboard <FaArrowRight />
            </button>
          </Link>
        ) : (
          <div className="flex flex-col gap-4 mt-4 w-full px-8 animate-fadeIn">
            <Link to="/login" onClick={() => setOpenNav(false)} className="w-full text-center">
              <button className="w-full border border-[#DCA843]/60 text-[#DCA843] font-cinzel text-sm font-semibold py-3 rounded-md uppercase tracking-wider">
                Sign In
              </button>
            </Link>
            <Link to="/register" onClick={() => setOpenNav(false)} className="w-full text-center">
              <button className="w-full bg-[#DCA843] text-black font-cinzel text-sm font-semibold py-3 rounded-md uppercase tracking-wider">
                Register <FaArrowRight />
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;