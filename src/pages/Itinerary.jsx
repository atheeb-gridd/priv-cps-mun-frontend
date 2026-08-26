import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  IoChevronBack, 
  IoClose, 
  IoChevronForward, 
  IoDownloadOutline, 
  IoSearchOutline,
  IoCalendarOutline
} from "react-icons/io5";

// Day 1 Poster Imports
import ItinDay1UNSC from '../assets/itinerary/1.jpg';
import ItinDay1UNGA from '../assets/itinerary/2.jpg';
import ItinDay1UNHRC from '../assets/itinerary/3.jpg';
import ItinDay1UNEP from '../assets/itinerary/4.jpg';
import ItinDay1IPP from '../assets/itinerary/5.jpg';
import ItinDay1IPJ from '../assets/itinerary/6.jpg';
import ItinDay1SOCHUM from '../assets/itinerary/7.jpg';
import ItinDay1ECOSOC from '../assets/itinerary/8.jpg';
import ItinDay1ILO from '../assets/itinerary/9.jpg';
import ItinDay1LOKSABHA from '../assets/itinerary/10.jpg';
import ItinDay1CRISIS from '../assets/itinerary/11.jpg';

// Day 2 Poster Imports
import ItinDay2UNSC from '../assets/itinerary/12.jpg';
import ItinDay2UNGA from '../assets/itinerary/13.jpg';
import ItinDay2UNHRC from '../assets/itinerary/14.jpg';
import ItinDay2UNEP from '../assets/itinerary/15.jpg';
import ItinDay2IPP from '../assets/itinerary/16.jpg';
import ItinDay2IPJ from '../assets/itinerary/17.jpg';
import ItinDay2SOCHUM from '../assets/itinerary/18.jpg';
import ItinDay2ECOSOC from '../assets/itinerary/19.jpg';
import ItinDay2ILO from '../assets/itinerary/20.jpg';
import ItinDay2LOKSABHA from '../assets/itinerary/21.jpg';
import ItinDay2CRISIS from '../assets/itinerary/22.jpg';

// Complete 22 Itinerary items
const ITINERARY_DATA = [
  // --- DAY 1 ---
  { id: 1, title: 'UNSC', day: 'Day 1', committee: 'United Nations Security Council', img: ItinDay1UNSC },
  { id: 2, title: 'UNGA', day: 'Day 1', committee: 'United Nations General Assembly', img: ItinDay1UNGA },
  { id: 3, title: 'UNHRC', day: 'Day 1', committee: 'United Nations Human Rights Council', img: ItinDay1UNHRC },
  { id: 4, title: 'UNEP', day: 'Day 1', committee: 'United Nations Environment Programme', img: ItinDay1UNEP },
  { id: 5, title: 'IPP', day: 'Day 1', committee: 'International Press Plenary', img: ItinDay1IPP },
  { id: 6, title: 'IPJ', day: 'Day 1', committee: 'International Press Journalism', img: ItinDay1IPJ },
  { id: 7, title: 'SOCHUM', day: 'Day 1', committee: 'Social, Humanitarian and Cultural Committee', img: ItinDay1SOCHUM },
  { id: 8, title: 'ECOSOC', day: 'Day 1', committee: 'Economic and Social Council', img: ItinDay1ECOSOC },
  { id: 9, title: 'ILO', day: 'Day 1', committee: 'International Labour Organization', img: ItinDay1ILO },
  { id: 10, title: 'LOK SABHA', day: 'Day 1', committee: 'Lok Sabha', img: ItinDay1LOKSABHA },
  { id: 11, title: 'CRISIS', day: 'Day 1', committee: 'Crisis Committee', img: ItinDay1CRISIS },

  // --- DAY 2 ---
  { id: 12, title: 'UNSC', day: 'Day 2', committee: 'United Nations Security Council', img: ItinDay2UNSC },
  { id: 13, title: 'UNGA', day: 'Day 2', committee: 'United Nations General Assembly', img: ItinDay2UNGA },
  { id: 14, title: 'UNHRC', day: 'Day 2', committee: 'United Nations Human Rights Council', img: ItinDay2UNHRC },
  { id: 15, title: 'UNEP', day: 'Day 2', committee: 'United Nations Environment Programme', img: ItinDay2UNEP },
  { id: 16, title: 'IPP', day: 'Day 2', committee: 'International Press Plenary', img: ItinDay2IPP },
  { id: 17, title: 'IPJ', day: 'Day 2', committee: 'International Press Journalism', img: ItinDay2IPJ },
  { id: 18, title: 'SOCHUM', day: 'Day 2', committee: 'Social, Humanitarian and Cultural Committee', img: ItinDay2SOCHUM },
  { id: 19, title: 'ECOSOC', day: 'Day 2', committee: 'Economic and Social Council', img: ItinDay2ECOSOC },
  { id: 20, title: 'ILO', day: 'Day 2', committee: 'International Labour Organization', img: ItinDay2ILO },
  { id: 21, title: 'LOK SABHA', day: 'Day 2', committee: 'Lok Sabha', img: ItinDay2LOKSABHA },
  { id: 22, title: 'CRISIS', day: 'Day 2', committee: 'Crisis Committee', img: ItinDay2CRISIS },
];

const Itinerary = () => {
  const [activeDay, setActiveDay] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter items based on selected tab and search term
  const filteredData = ITINERARY_DATA.filter((item) => {
    const matchesDay = activeDay === 'All' || item.day === activeDay;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.committee.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDay && matchesSearch;
  });

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredData.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredData.length]);

  return (
    <div className="bg-transparent text-white min-h-screen pt-28 px-4 md:px-8 pb-16 font-allotrix-font-secondary flex flex-col items-center">
      
      {/* Back button */}
      <div className="w-full max-w-7xl mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm text-[#DCA843] hover:text-white transition-colors uppercase tracking-widest font-semibold font-cinzel">
          <IoChevronBack className="text-base" /> Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <div className="w-full max-w-4xl text-center mb-8">
        <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#DCA843] bg-[#DCA843]/10 border border-[#DCA843]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
          CPS Prime MUN 5.O
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-wider text-white mb-3">
          Conference <span className="text-[#DCA843]">Itinerary</span>
        </h1>
        <p className="font-cinzel text-xs md:text-sm uppercase tracking-widest text-[#BABABA] max-w-xl mx-auto leading-relaxed">
          Committee-wise Day 1 & Day 2 Schedule Timelines
        </p>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent w-full mt-6"></div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#09090b]/60 border border-[#DCA843]/25 backdrop-blur-md p-4 rounded-xl shadow-xl">
        
        {/* Day Filter Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['All', 'Day 1', 'Day 2'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveDay(tab)}
              className={`px-5 py-2 rounded-lg text-xs font-cinzel font-bold tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-none flex items-center justify-center gap-2 ${
                activeDay === tab
                  ? 'bg-[#DCA843] text-black shadow-[0_0_12px_rgba(220,168,67,0.4)]'
                  : 'bg-white/5 text-[#E4E4E7] hover:bg-white/10 hover:text-[#DCA843] border border-white/5'
              }`}
            >
              <IoCalendarOutline className="text-sm" />
              {tab === 'All' ? `All (${ITINERARY_DATA.length})` : tab}
            </button>
          ))}
        </div>

        {/* Committee Search Input */}
        <div className="relative w-full sm:w-72">
          <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#DCA843] text-base" />
          <input
            type="text"
            placeholder="Search committee (e.g. UNSC, IPP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#000]/60 border border-[#DCA843]/30 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#DCA843] transition-colors"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Itinerary Poster Cards */}
      {filteredData.length === 0 ? (
        <div className="w-full max-w-md py-16 text-center border border-white/10 rounded-xl bg-black/40 backdrop-blur-sm">
          <p className="text-sm text-gray-400 font-cinzel tracking-wider">No schedule posters found for "{searchTerm}".</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveDay('All'); }}
            className="mt-3 text-xs text-[#DCA843] underline hover:text-white font-cinzel tracking-widest"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl">
          {filteredData.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer border border-[#DCA843]/30 hover:border-[#DCA843] bg-[#09090b]/70 backdrop-blur-md rounded-xl p-3.5 flex flex-col gap-3 shadow-xl hover:shadow-[0_0_20px_rgba(220,168,67,0.25)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Badge for Day */}
              <div className="flex items-center justify-between px-1">
                <span className="font-cinzel text-[10px] font-bold tracking-widest uppercase text-[#DCA843] bg-[#DCA843]/15 border border-[#DCA843]/30 px-2.5 py-0.5 rounded">
                  {item.day}
                </span>
                <span className="font-cinzel text-[11px] font-bold tracking-wider text-white">
                  {item.title}
                </span>
              </div>

              {/* Poster Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-black/80 border border-white/5 flex items-center justify-center">
                {item.img ? (
                  <img
                    src={item.img}
                    alt={`${item.day} ${item.title}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  // Elegant Fallback preview until image is inserted
                  <div className="flex flex-col items-center justify-center p-4 text-center gap-2">
                    <div className="w-12 h-12 rounded-full border border-[#DCA843]/40 flex items-center justify-center bg-[#DCA843]/10 text-[#DCA843] font-cinzel font-bold text-sm">
                      {item.title.substring(0, 3)}
                    </div>
                    <h3 className="font-cinzel text-xs font-bold text-[#DCA843] tracking-widest uppercase">
                      {item.day} — {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-allotrix-font-secondary line-clamp-2">
                      {item.committee}
                    </p>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="font-cinzel text-[11px] font-bold tracking-widest text-[#DCA843] uppercase bg-black/80 border border-[#DCA843]/50 px-3 py-1.5 rounded-lg shadow-lg">
                    Click to View Poster
                  </span>
                </div>
              </div>

              {/* Footer info */}
              <div className="px-1 text-center">
                <p className="text-[11px] font-semibold text-gray-300 truncate">
                  {item.committee}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredData[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 animate-fadeIn select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Modal Header */}
          <div 
            className="w-full max-w-6xl mx-auto flex items-center justify-between border-b border-white/10 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-cinzel text-xs md:text-sm font-bold uppercase tracking-widest text-[#DCA843] bg-[#DCA843]/15 border border-[#DCA843]/30 px-3 py-1 rounded">
                {filteredData[lightboxIndex].day}
              </span>
              <h2 className="font-cinzel text-base md:text-lg font-bold tracking-wider text-white">
                {filteredData[lightboxIndex].title} &mdash; <span className="text-gray-400 text-xs md:text-sm">{filteredData[lightboxIndex].committee}</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {filteredData[lightboxIndex].img && (
                <a
                  href={filteredData[lightboxIndex].img}
                  download={`${filteredData[lightboxIndex].day}_${filteredData[lightboxIndex].title}_Schedule.png`}
                  className="text-gray-300 hover:text-[#DCA843] p-2 text-xl transition-colors"
                  title="Download Poster"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IoDownloadOutline />
                </a>
              )}
              <button
                onClick={() => setLightboxIndex(null)}
                className="text-gray-300 hover:text-[#DCA843] p-2 text-2xl transition-colors"
                aria-label="Close"
              >
                <IoClose />
              </button>
            </div>
          </div>

          {/* Modal Main View */}
          <div 
            className="relative w-full max-w-4xl mx-auto my-auto flex items-center justify-between gap-4 h-[75vh] md:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length)}
              className="bg-black/60 hover:bg-black/90 text-white hover:text-[#DCA843] border border-white/10 hover:border-[#DCA843]/50 p-3.5 rounded-full transition-all duration-200 text-xl md:text-2xl shrink-0 shadow-2xl"
              aria-label="Previous"
            >
              <IoChevronBack />
            </button>

            {/* Poster Display */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl border border-[#DCA843]/30 bg-[#09090b]/80 shadow-2xl p-2 md:p-4">
              {filteredData[lightboxIndex].img ? (
                <img
                  src={filteredData[lightboxIndex].img}
                  alt={`${filteredData[lightboxIndex].day} ${filteredData[lightboxIndex].title}`}
                  className="max-w-full max-h-full object-contain rounded shadow-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center gap-3">
                  <div className="w-20 h-20 rounded-full border-2 border-[#DCA843] flex items-center justify-center bg-[#DCA843]/10 text-[#DCA843] font-cinzel font-bold text-2xl">
                    {filteredData[lightboxIndex].title}
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-white tracking-widest">
                    {filteredData[lightboxIndex].day} &bull; {filteredData[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-[#BABABA] max-w-sm">
                    {filteredData[lightboxIndex].committee}
                  </p>
                  <span className="text-xs text-[#DCA843] border border-[#DCA843]/30 bg-[#DCA843]/10 px-4 py-1.5 rounded-full mt-2">
                    Image file will appear here once linked
                  </span>
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredData.length)}
              className="bg-black/60 hover:bg-black/90 text-white hover:text-[#DCA843] border border-white/10 hover:border-[#DCA843]/50 p-3.5 rounded-full transition-all duration-200 text-xl md:text-2xl shrink-0 shadow-2xl"
              aria-label="Next"
            >
              <IoChevronForward />
            </button>
          </div>

          {/* Modal Footer / Counter */}
          <div 
            className="w-full max-w-6xl mx-auto flex items-center justify-center pt-2 text-xs font-cinzel tracking-widest text-gray-400"
            onClick={(e) => e.stopPropagation()}
          >
            Poster {lightboxIndex + 1} of {filteredData.length} &bull; Use Left/Right Arrow keys to navigate
          </div>
        </div>
      )}

    </div>
  );
};

export default Itinerary;
