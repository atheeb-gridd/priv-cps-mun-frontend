import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { IoPinOutline } from "react-icons/io5";
import Logo from '../assets/un_logo_gold.svg';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId, route = '/') => {
    if (window.location.pathname !== route) {
      navigate(route);
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
    <footer className="bg-black border-t border-[#DCA843]/20 text-[#fff] py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* Left Column: Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="CPS Logo" className="w-18 h-18 object-contain" />
            <span className="font-cinzel text-[#fff] font-bold text-lg md:text-xl tracking-wider">
              CPS PRIME <span className="text-[#DCA843]">MUN 5.O</span>
            </span>
          </div>
          <p className="font-allotrix-font-secondary text-sm text-cps-grey leading-relaxed max-w-sm">
            Empowering tomorrow's leaders to build a better world today.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://instagram.com/cpsprime_mun" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[#DCA843]/30 flex items-center justify-center text-cps-grey hover:text-[#DCA843] hover:border-[#DCA843] transition-all duration-300">
              <FaInstagram className="text-base" />
            </a>
            <a href="https://wa.me/+919650204929" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[#DCA843]/30 flex items-center justify-center text-cps-grey hover:text-[#DCA843] hover:border-[#DCA843] transition-all duration-300">
              <FaWhatsapp className="text-base" />
            </a>
          </div>
        </div>

        {/* Center Column: Quick Links */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 md:pl-16">
          <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#DCA843] font-bold">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 font-allotrix-font-secondary text-sm text-cps-grey">
            <li className="hover:text-[#DCA843] transition-colors duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-[#DCA843] transition-colors duration-300 cursor-pointer">
              <span onClick={() => handleScrollToSection('about')}>About</span>
            </li>
            <li className="hover:text-[#DCA843] transition-colors duration-300">
              <Link to="/itinerary">Itinerary</Link>
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
            <li className="hover:text-[#DCA843] transition-colors duration-300 cursor-pointer">
              <span onClick={() => handleScrollToSection('gallery')}>Gallery</span>
            </li>
            <li className="hover:text-[#DCA843] transition-colors duration-300">
              <Link to="/ocmembers">Secretariat</Link>
            </li>

            <li className="hover:text-[#DCA843] transition-colors duration-300 cursor-pointer">
              <span onClick={() => handleScrollToSection('sponsors')}>Sponsors</span>
            </li>
            <li className="hover:text-[#DCA843] transition-colors duration-300">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Contact Us */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
          <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#DCA843] font-bold">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3 font-allotrix-font-secondary text-sm text-cps-grey">
            <li className="flex items-start gap-3 justify-center md:justify-start">
              <IoMdMail className="text-lg text-[#DCA843] shrink-0 mt-0.5" />
              <a href="mailto:cpsprimemun@gmail.com" className="hover:text-[#DCA843] transition-colors">
                cpsprimemun@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3 justify-center md:justify-start">
              <IoMdCall className="text-lg text-[#DCA843] shrink-0 mt-0.5" />
              <div className="flex flex-col text-left text-sm text-cps-grey">
                <span>Head Teacher In-charge:</span>
                <a href="tel:+917010525692" className="hover:text-[#DCA843] transition-colors mt-0.5">
                  +91 70105 25692
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 justify-center md:justify-start">
              <IoMdCall className="text-lg text-[#DCA843] shrink-0 mt-0.5" />
              <div className="flex flex-col text-left text-sm text-cps-grey">
                <span>Teacher In-charge:</span>
                <a href="tel:+919746289412" className="hover:text-[#DCA843] transition-colors mt-0.5">
                  +91 97462 89412
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 justify-center md:justify-start">
              <IoMdCall className="text-lg text-[#DCA843] shrink-0 mt-0.5" />
              <div className="flex flex-col text-left text-sm text-cps-grey">
                <span>Secretary General:</span>
                <a href="tel:+919650204929" className="hover:text-[#DCA843] transition-colors mt-0.5">
                  +91 96502 04929
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 justify-center md:justify-start">
              <IoPinOutline className="text-xl text-[#DCA843] shrink-0 mt-0.5" />
              <a 
                href="https://maps.google.com/?q=Chennai+Public+School,+Thirumazhisai,+Tamil+Nadu+-+600124"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#DCA843] transition-colors"
              >
                Chennai Public School, Thirumazhisai,<br />
                Tamil Nadu - 600124
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto border-t border-[#DCA843]/10 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-allotrix-font-secondary text-cps-grey/60">
        <p>© 2026 CPS PRIME MUN 5.O | All Rights Reserved</p>
        <div className="flex gap-6">
          <Link to="/register" className="hover:text-[#DCA843] transition-colors">Register</Link>
          <Link to="/contact" className="hover:text-[#DCA843] transition-colors">Queries</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;