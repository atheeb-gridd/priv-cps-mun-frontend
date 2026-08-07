import React from 'react';
import { IoMdCall, IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { IoPinOutline } from 'react-icons/io5';
import LogoBanner from '../assets/logo_banner.jpg';

const Contact = () => {
  return (
    <main className="bg-transparent text-white min-h-screen pt-36 pb-20 px-6 flex flex-col items-center justify-center font-allotrix-font-secondary">
      {/* Title */}
      <div className="text-center max-w-2xl mb-12 flex flex-col items-center gap-3">
        <span className="font-cinzel text-xs tracking-widest text-[#DCA843] font-semibold uppercase">
          Contact Details
        </span>
        <img 
          src={LogoBanner} 
          alt="CPS Prime MUN 5.O Logo Banner" 
          className="w-full max-w-md object-contain py-2" 
        />
        <div className="h-0.5 w-16 bg-[#DCA843] mt-1"></div>
        <p className="font-allotrix-font-secondary text-sm text-cps-grey mt-2">
          Feel free to reach out to the Secretariat or Tech support team for any queries regarding slots, fees, or itineraries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Card 1: Official Channels */}
        <div className="border border-[#DCA843]/20 bg-[#09090b]/55 backdrop-blur-md p-8 rounded-md flex flex-col hover:border-[#DCA843]/50 transition-all duration-300 shadow-2xl relative">
          <h2 className="font-cinzel text-lg font-bold text-[#DCA843] tracking-widest uppercase mb-6 pb-2 border-b border-[#DCA843]/15">
            Official Channels
          </h2>
          <ul className="flex flex-col gap-6 text-sm text-cps-grey">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#DCA843]/20 flex items-center justify-center text-[#DCA843] shrink-0">
                <IoMdMail className="text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-semibold tracking-wider text-white">Email Us</span>
                <a href="mailto:cpsprimemun@gmail.com" className="hover:text-[#DCA843] transition-colors mt-0.5">
                  cpsprimemun@gmail.com
                </a>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#DCA843]/20 flex items-center justify-center text-[#DCA843] shrink-0 mt-0.5">
                <IoMdCall className="text-lg" />
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs uppercase font-semibold tracking-wider text-white">Call Support</span>
                <div className="text-xs text-cps-grey/75 leading-tight flex flex-col gap-1.5">
                  <span>Head Teacher In-charge:</span>
                  <a href="tel:+917010525692" className="text-sm text-cps-grey hover:text-[#DCA843] transition-colors font-medium flex items-center gap-1.5">
                    <IoMdCall className="text-xs text-[#DCA843]" />
                    <span>+91 70105 25692</span>
                  </a>
                </div>
                <div className="text-xs text-cps-grey/75 leading-tight flex flex-col gap-1.5">
                  <span>Teacher In-charge:</span>
                  <a href="tel:+919746289412" className="text-sm text-cps-grey hover:text-[#DCA843] transition-colors font-medium flex items-center gap-1.5">
                    <IoMdCall className="text-xs text-[#DCA843]" />
                    <span>+91 97462 89412</span>
                  </a>
                </div>
                <div className="text-xs text-cps-grey/75 leading-tight flex flex-col gap-1.5">
                  <span>Secretary General:</span>
                  <a href="tel:+919650204929" className="text-sm text-cps-grey hover:text-[#DCA843] transition-colors font-medium flex items-center gap-1.5">
                    <IoMdCall className="text-xs text-[#DCA843]" />
                    <span>+91 96502 04929</span>
                  </a>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#DCA843]/20 flex items-center justify-center text-[#DCA843] shrink-0">
                <IoPinOutline className="text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-semibold tracking-wider text-white">Venue Address</span>
                <a 
                  href="https://maps.google.com/?q=Chennai+Public+School,+Thirumazhisai,+Tamil+Nadu+-+600124"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#DCA843] transition-colors leading-relaxed mt-0.5 text-xs"
                >
                  Chennai Public School, Thirumazhisai,<br />
                  Tamil Nadu - 600124
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Card 2: Interactive Chat & Socials */}
        <div className="border border-[#DCA843]/20 bg-[#09090b]/55 backdrop-blur-md p-8 rounded-md flex flex-col justify-start gap-8 hover:border-[#DCA843]/50 transition-all duration-300 shadow-2xl relative">
          
          {/* Chat */}
          <div className="flex flex-col gap-4">
            <h2 className="font-cinzel text-lg font-bold text-[#DCA843] tracking-widest uppercase pb-2 border-b border-[#DCA843]/15">
              Chat With Us
            </h2>
            <p className="text-xs text-cps-grey leading-relaxed mb-2">
              Get in touch directly with our support team on WhatsApp for fast resolutions.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a 
                href="https://chat.whatsapp.com/ISziD5uOFDC2rwjuxqCWOR?s=cl&p=a&mlu=0&ilr=0" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 border border-emerald-500/30 px-3 py-1.5 rounded-md hover:border-emerald-500 hover:bg-emerald-500/5 text-[10px] font-semibold text-emerald-400 transition-colors w-full justify-center sm:w-auto"
              >
                <IoLogoWhatsapp className="text-[#25D366] text-base animate-pulse" />
                <span className="uppercase tracking-wider">Join Official Support Group</span>
              </a>
              <a 
                href="https://wa.me/+917010525692" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 border border-[#DCA843]/30 px-3 py-1.5 rounded-md hover:border-[#DCA843] hover:bg-[#DCA843]/5 text-[10px] font-semibold text-cps-grey transition-colors"
              >
                <IoLogoWhatsapp className="text-[#25D366] text-base" />
                <span>Head Teacher</span>
              </a>
              <a 
                href="https://wa.me/+919746289412" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 border border-[#DCA843]/30 px-3 py-1.5 rounded-md hover:border-[#DCA843] hover:bg-[#DCA843]/5 text-[10px] font-semibold text-cps-grey transition-colors"
              >
                <IoLogoWhatsapp className="text-[#25D366] text-base" />
                <span>Teacher In-charge</span>
              </a>
              <a 
                href="https://wa.me/+919650204929" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 border border-[#DCA843]/30 px-3 py-1.5 rounded-md hover:border-[#DCA843] hover:bg-[#DCA843]/5 text-[10px] font-semibold text-cps-grey transition-colors"
              >
                <IoLogoWhatsapp className="text-[#25D366] text-base" />
                <span>Sec Gen</span>
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h2 className="font-cinzel text-xs uppercase tracking-widest text-[#DCA843] font-bold">
              Follow Our Updates
            </h2>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/cpsprime_mun" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#DCA843]/30 flex items-center justify-center text-cps-grey hover:text-[#DCA843] hover:border-[#DCA843] transition-all duration-300 bg-black">
                <FaInstagram className="text-lg" />
              </a>
              <a href="https://wa.me/+919650204929" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#DCA843]/30 flex items-center justify-center text-cps-grey hover:text-[#DCA843] hover:border-[#DCA843] transition-all duration-300 bg-black">
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
};

export default Contact;