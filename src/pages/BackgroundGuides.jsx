import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoDownloadOutline, IoDocumentTextOutline } from 'react-icons/io5';
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

const BackgroundGuides = () => {
  const [searchParams] = useSearchParams();
  const highlightedCommittee = searchParams.get('committee');

  const committeesList = [
    {
      name: 'UN Human Rights Council',
      shortName: 'UNHRC',
      logo: UnhrcGold,
      bg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1LS7He6Pg58fJBjbhCKGbDkVRnvpjkOZP'
    },
    {
      name: 'UN General Assembly',
      shortName: 'UNGA',
      logo: UngaGold,
      bg: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1343XVJtNIh9PUZ0hd_1NiYpmR81YR6qz'
    },
    {
      name: 'UN Security Council (Double delegation)',
      shortName: 'UNSC',
      logo: UnscGold,
      bg: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1njUAUP82sE6xQMJGDdmFmTBaRv-c_cA0'
    },
    {
      name: 'Economic and Social Council',
      shortName: 'ECOSOC',
      logo: EcosocGold,
      bg: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1gGHgOnmA6ZPlxcdP4eJey9J_YATLP3tU'
    },
    {
      name: 'International Labour Organization',
      shortName: 'ILO',
      logo: IloGold,
      bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=10s1ACJVItIDLeBivKEfNn1VF5bIPxhar'
    },
    {
      name: 'Social, Humanitarian and Cultural Committee',
      shortName: 'SOCHUM',
      logo: SochumGold,
      bg: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1I75zSdgkN5H0V_MlHFVCE4eULDnRK7dS'
    },
    {
      name: 'UN Environment Programme',
      shortName: 'UNEP',
      logo: UnepGold,
      bg: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1IfCtGd6pGt6TlPjnufK_BSlNWi1Dkx1f'
    },
    {
      name: 'International Press Plenary',
      shortName: 'IPP',
      logo: IppGold,
      bg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1vAC05Amu3enWFwfNYj4d2TjrpAUUuOoI'
    },
    {
      name: 'International Press Journal',
      shortName: 'IPJ',
      logo: IpjGold,
      bg: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1skVpQQt-HtDqOQuOKyQaH50DRyaHxNzK'
    },
    {
      name: 'United States Senate',
      shortName: 'US SENATE',
      logo: SenateGold,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=400',
      pdfUrl: ''
    },
    {
      name: 'Lok Sabha',
      shortName: 'LOKSABHA',
      logo: LoksabhaGold,
      bg: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Inside_view_of_Lok_Sabha_chamber_in_New_Parliament_building.jpg',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=13b624VX1CoijP6ko785LMldguRmzF5X5'
    },
    {
      name: 'Crisis Committee',
      shortName: 'Crisis committee',
      logo: CrisisGold,
      bg: 'https://images.unsplash.com/photo-1461088945293-0c17689e48ac?auto=format&fit=crop&q=80&w=400',
      pdfUrl: 'https://drive.google.com/uc?export=download&id=1WRp_1cJrLP7efU3XtS4j0iYARTTfZtv7'
    }
  ];

  return (
    <div className="py-20 px-4 md:px-12 flex flex-col items-center gap-12 bg-transparent min-h-screen pt-28 md:pt-36">
      
      {/* Title Header */}
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl w-full">
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-wider text-[#DCA843]">
          Background Guides
        </h1>
        <p className="font-allotrix-font-secondary text-sm md:text-base text-[#DCA843] font-semibold uppercase tracking-widest leading-relaxed">
          Official Study Materials & Background Guides
        </p>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/30 to-transparent w-full mt-6"></div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {committeesList.map((committee, idx) => {
          const isHighlighted = highlightedCommittee && (
            committee.shortName.toLowerCase() === highlightedCommittee.toLowerCase() ||
            committee.name.toLowerCase().includes(highlightedCommittee.toLowerCase())
          );

          return (
            <div 
              key={idx} 
              className={`border transition-all duration-300 bg-black/75 backdrop-blur-sm rounded-md p-6 flex flex-col justify-between items-center text-center h-full shadow-lg relative group overflow-hidden min-h-[360px] ${
                isHighlighted 
                  ? 'border-[#DCA843] ring-2 ring-[#DCA843] shadow-[0_0_30px_rgba(220,168,67,0.35)] scale-[1.02]' 
                  : 'border-[#DCA843]/30 hover:border-[#DCA843]/70 hover:shadow-[0_0_20px_rgba(220,168,67,0.2)]'
              }`}
              style={committee.bg ? { 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.78)), url(${committee.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {/* Gold border decorative line top */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

              {/* Committee Emblem */}
              <div className="w-20 h-20 rounded-full border border-[#DCA843]/30 bg-[#000]/80 p-1.5 flex items-center justify-center mb-4 group-hover:border-[#DCA843]/60 transition-colors">
                <img 
                  src={committee.logo} 
                  alt={committee.shortName} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://i.ibb.co/bgxxbr9c/UNHRC-1.png';
                  }}
                />
              </div>

              {/* Title & Short Name (Clickable link to PDF) */}
              <a 
                href={committee.pdfUrl || '#'}
                target={committee.pdfUrl ? '_blank' : '_self'} 
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5 mb-4 w-full group/link block no-underline"
                title={committee.pdfUrl ? `Download ${committee.shortName} Background Guide` : 'Background Guide'}
              >
                <h3 className="font-cinzel text-[14px] uppercase font-bold text-white tracking-widest leading-snug min-h-[40px] group-hover/link:text-[#DCA843] transition-colors">
                  {committee.name}
                </h3>
                <span className="font-allotrix-font-secondary text-[12px] text-[#DCA843] font-bold tracking-widest uppercase">
                  {committee.shortName}
                </span>
              </a>

              {/* Download Button Action */}
              <div className="flex flex-col gap-2 mt-auto w-full pt-4 border-t border-[#DCA843]/15">
                {committee.pdfUrl ? (
                  <a
                    href={committee.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="w-full flex items-center justify-center gap-2 bg-[#DCA843] hover:bg-[#FFE082] text-black font-cinzel text-xs font-bold py-2.5 px-4 rounded transition-all duration-300 uppercase tracking-wider shadow-lg shadow-[#DCA843]/20 cursor-pointer"
                  >
                    <IoDownloadOutline className="text-base flex-shrink-0" />
                    <span>Download Guide</span>
                  </a>
                ) : (
                  <a
                    href={committee.pdfUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#DCA843]/15 hover:bg-[#DCA843] text-[#DCA843] hover:text-black border border-[#DCA843]/50 py-2.5 px-4 rounded font-cinzel text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <IoDocumentTextOutline className="text-base flex-shrink-0" />
                    <span>Download Guide</span>
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default BackgroundGuides;
