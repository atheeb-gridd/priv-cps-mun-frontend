import React, { useState } from 'react';
import UnhrcGold from '../assets/unhrc_gold.png';
import UngaGold from '../assets/unga_gold.png';
import UnscGold from '../assets/unsc_gold.png';
import LoksabhaGold from '../assets/loksabha_gold.png';
import CrisisGold from '../assets/crisis_gold.png';
import UnepGold from '../assets/unep_gold.png';
import EcosocGold from '../assets/ecosoc_gold.png';
import SochumGold from '../assets/sochum_gold.png';
import IppGold from '../assets/ipp_gold.png';
import IpjGold from '../assets/ipj_gold.png';
import IloGold from '../assets/ilo_gold.png';
import SenateGold from '../assets/senate_gold.png';

const Agendas = () => {
  const [selectedCommittee, setSelectedCommittee] = useState(null);

  const committeesList = [
    {
      name: 'UN Security Council',
      shortName: 'UNSC',
      logo: UnscGold,
      bg: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
      agenda: 'Deliberation on the Red Sea Crisis: Ensuring Maritime Security and Regional Stability'
    },
    {
      name: 'UN Human Rights Council',
      shortName: 'UNHRC',
      logo: UnhrcGold,
      bg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
      agenda: 'Addressing Human Rights Violations in Conflict Zones with Special Emphasis on Myanmar'
    },
    {
      name: 'UN General Assembly',
      shortName: 'UNGA',
      logo: UngaGold,
      bg: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=400',
      agenda: 'Strengthening Global Cooperation for Sustainable Development and International Peace'
    },
    {
      name: 'Economic and Social Council',
      shortName: 'ECOSOC',
      logo: EcosocGold,
      bg: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
      agenda: 'Bridging the Global Digital Divide for Inclusive Economic and Social Development'
    },
    {
      name: 'International Labour Organization',
      shortName: 'ILO',
      logo: IloGold,
      bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
      agenda: "Ensuring Decent Work and Protecting Workers' Rights in the Age of Artificial Intelligence"
    },
    {
      name: 'Social, Humanitarian and Cultural Committee',
      shortName: 'SOCHUM',
      logo: SochumGold,
      bg: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400',
      agenda: 'Combating Human Trafficking and Protecting Vulnerable Communities During Humanitarian Crises'
    },
    {
      name: 'UN Environment Programme',
      shortName: 'UNEP',
      logo: UnepGold,
      bg: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400',
      agenda: 'Addressing Climate Change Through Global Carbon Reduction and Climate Adaptation Strategies'
    },
    {
      name: 'Crisis Committee',
      shortName: 'Crisis',
      logo: CrisisGold,
      bg: 'https://images.unsplash.com/photo-1461088945293-0c17689e48ac?auto=format&fit=crop&q=80&w=400',
      agenda: 'Escalation of the Middle East Conflict: Managing Regional Security, Diplomacy, and Humanitarian Response'
    },
    {
      name: 'United States Senate',
      shortName: 'US SENATE',
      logo: SenateGold,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=400',
      agenda: 'United States Foreign Policy in the Indo-Pacific: National Security, Trade, and Strategic Alliances'
    },
    {
      name: 'Lok Sabha',
      shortName: 'LOK SABHA',
      logo: LoksabhaGold,
      bg: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Inside_view_of_Lok_Sabha_chamber_in_New_Parliament_building.jpg',
      agenda: 'One Nation, One Election: Evaluating Constitutional, Political, and Administrative Implications'
    },
    {
      name: 'International Press Plenary',
      shortName: 'IPP',
      logo: IppGold,
      bg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400',
      agenda: null
    },
    {
      name: 'International Press Journalism',
      shortName: 'IPJ',
      logo: IpjGold,
      bg: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400',
      agenda: null
    }
  ];

  return (
    <div className="bg-transparent text-[white] min-h-screen pt-28 px-4 md:px-8 pb-16 font-allotrix-font-secondary flex flex-col items-center">
      
      {/* Page Header */}
      <div className="w-full max-w-7xl mb-12 text-center">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#DCA843] mb-4">
          Committee Agendas
        </h1>
        <p className="font-cinzel text-xs md:text-sm uppercase tracking-widest text-[#FFF]/70 font-semibold max-w-2xl mx-auto">
          Click on a committee to view its full agenda
        </p>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/30 to-transparent w-full mt-6"></div>
      </div>

      {/* Agendas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {committeesList.map((committee, idx) => {
          const hasAgenda = !!committee.agenda;
          return (
            <div
              key={idx}
              onClick={() => hasAgenda && setSelectedCommittee(committee)}
              className={`border border-[#DCA843]/30 bg-black/75 backdrop-blur-sm rounded-md p-8 flex flex-col justify-between items-center text-center h-full shadow-lg relative group overflow-hidden min-h-[320px] ${
                hasAgenda
                  ? 'cursor-pointer hover:border-[#DCA843]/70 transform hover:-translate-y-1 transition-all duration-300'
                  : 'opacity-70'
              }`}
              style={committee.bg ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.74), rgba(0,0,0,0.74)), url(${committee.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {/* Top gold line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

              {/* Committee Emblem */}
              <div className={`w-20 h-20 rounded-full border border-[#DCA843]/30 bg-[#000]/80 p-1.5 flex items-center justify-center mb-5 ${hasAgenda ? 'group-hover:border-[#DCA843]/70' : ''} transition-colors`}>
                <img
                  src={committee.logo}
                  alt={committee.shortName}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://i.ibb.co/bgxxbr9c/UNHRC-1.png';
                  }}
                />
              </div>

              {/* Title & Short Name */}
              <div className="flex flex-col gap-2 mb-4 w-full">
                <h3 className={`font-cinzel text-[13px] uppercase font-bold text-white tracking-widest leading-snug min-h-[36px] transition-colors ${hasAgenda ? 'group-hover:text-[#DCA843]' : ''}`}>
                  {committee.name}
                </h3>
                <span className="font-allotrix-font-secondary text-[12px] text-[#DCA843] font-bold tracking-widest uppercase">
                  {committee.shortName}
                </span>
              </div>

              {/* Agenda / No-agenda status */}
              <div className="flex flex-col gap-2 mt-auto w-full pt-4 border-t border-[#DCA843]/15">
                {hasAgenda ? (
                  <>
                    <p className="font-allotrix-font-secondary text-[10px] text-[#BABABA] leading-relaxed text-center line-clamp-3">
                      <strong className="text-[#DCA843] block text-[9px] uppercase tracking-wider mb-1">Agenda:</strong>
                      {committee.agenda}
                    </p>
                    <span className="mt-2 text-[9px] font-cinzel uppercase tracking-widest text-[#DCA843]/70 group-hover:text-[#DCA843] transition-colors">
                      Click to view full agenda →
                    </span>
                  </>
                ) : (
                  <p className="font-allotrix-font-secondary text-[10px] text-[#BABABA]/60 italic text-center">
                    No fixed agenda
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Agenda Modal */}
      {selectedCommittee && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedCommittee(null)}
        >
          <div
            className="relative bg-[#09090b] border border-[#DCA843]/40 rounded-xl shadow-2xl max-w-2xl w-full p-8 md:p-10 flex flex-col items-center text-center"
            style={{ boxShadow: '0 0 60px rgba(220,168,67,0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-xl bg-gradient-to-r from-transparent via-[#DCA843]/70 to-transparent"></div>

            {/* Close button */}
            <button
              onClick={() => setSelectedCommittee(null)}
              className="absolute top-4 right-4 text-[#BABABA] hover:text-[#DCA843] transition-colors text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#DCA843]/10"
              aria-label="Close"
            >
              ×
            </button>

            {/* Committee Logo */}
            <div className="w-20 h-20 rounded-full border border-[#DCA843]/40 bg-black p-2 flex items-center justify-center mb-5">
              <img
                src={selectedCommittee.logo}
                alt={selectedCommittee.shortName}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.target.src = 'https://i.ibb.co/bgxxbr9c/UNHRC-1.png'; }}
              />
            </div>

            {/* Committee name */}
            <h2 className="font-cinzel text-xl md:text-2xl font-bold uppercase tracking-widest text-[#DCA843] mb-1">
              {selectedCommittee.shortName}
            </h2>
            <p className="font-cinzel text-xs text-[#BABABA] uppercase tracking-wider mb-6">
              {selectedCommittee.name}
            </p>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/30 to-transparent mb-6"></div>

            {/* Agenda label */}
            <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#DCA843]/70 mb-3">
              Official Agenda
            </span>

            {/* Agenda text */}
            <p className="font-allotrix-font-secondary text-base md:text-lg text-white leading-relaxed font-semibold">
              {selectedCommittee.agenda}
            </p>

            {/* Bottom close button */}
            <button
              onClick={() => setSelectedCommittee(null)}
              className="mt-8 font-cinzel text-xs font-bold uppercase tracking-widest px-8 py-3 rounded border border-[#DCA843]/40 text-[#DCA843] hover:bg-[#DCA843]/10 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Agendas;