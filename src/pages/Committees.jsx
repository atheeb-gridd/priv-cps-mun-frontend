import React, { useState, useEffect } from 'react';
import apiClient from '../lib/axios';
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

const COMMITTEE_COUNTRY_POOL = {
  'Crisis Committee': [
    'United States of America', 'Iran', 'Israel', 'Russian Federation', 'China',
    'United Kingdom', 'France', 'Saudi Arabia', 'United Arab Emirates', 'Qatar',
    'Iraq', 'Syria', 'Jordan', 'Turkey', 'Pakistan', 'India', 'Germany', 'Japan',
    'South Korea', 'Egypt', 'Lebanon', 'Yemen', 'Oman', 'Kuwait', 'Bahrain',
    'North Korea', 'Ukraine', 'Brazil', 'South Africa', 'Australia'
  ],
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
    'United States of America', 'Germany', 'Japan', 'India', 'China', 'France',
    'United Kingdom', 'Brazil', 'South Africa', 'Sweden', 'Denmark', 'Russian Federation',
    'South Korea', 'Bangladesh', 'Qatar', 'Saudi Arabia', 'Nigeria', 'Kenya',
    'Mexico', 'Argentina', 'Canada', 'Australia', 'Netherlands', 'Italy',
    'Indonesia', 'DPRK', 'Spain', 'Pakistan', 'Egypt', 'Sudan'
  ],
  'Social, Humanitarian and Cultural Committee (SOCHUM)': [
    'United States of America', 'China', 'Russian Federation', 'Germany', 'France',
    'United Kingdom', 'India', 'Israel', 'Brazil', 'South Africa', 'Iran',
    'North Korea', 'Saudi Arabia', 'Turkey', 'Egypt', 'Pakistan', 'Mexico',
    'Nigeria', 'Sweden', 'Netherlands', 'Switzerland', 'Japan', 'South Korea',
    'Australia', 'Canada', 'Estonia', 'Singapore', 'Belarus', 'Venezuela', 'Cuba',
    'Vietnam', 'Belgium', 'Norway', 'Denmark', 'Finland', 'Ireland', 'New Zealand',
    'Argentina', 'Kenya', 'Indonesia'
  ],
  'UN Environment Programme (UNEP)': [
    'China', 'United States of America', 'Norway', 'India', 'Japan', 'South Korea',
    'United Kingdom', 'France', 'Germany', 'Canada', 'Australia', 'Chile', 'Mexico',
    'Brazil', 'Russian Federation', 'Nauru', 'Tonga', 'Fiji', 'Kiribati', 'Cook Islands',
    'Papua New Guinea', 'Indonesia', 'New Zealand', 'Netherlands', 'Jamaica',
    'Costa Rica', 'Palau', 'Belgium', 'Tuvalu', 'Solomon Islands', 'Vanuatu', 'Samoa',
    'Maldives', 'Seychelles', 'Bangladesh', 'Philippines', 'South Africa', 'Kenya',
    'Denmark', 'Sweden'
  ],
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
  'International Press Plenary (IPP)': [
    'Reuters', 'Associated Press', 'BBC', 'CNN', 'Al Jazeera',
    'The New York Times', 'The Guardian', 'Le Monde', 'Der Spiegel',
    'Mainichi Shimbun', 'The Hindu', 'Xinhua', 'Bloomberg', 'AFP',
    'TASS', 'El Pais', 'Washington Post', 'Wall Street Journal',
    'Times of India', 'NHK', 'DW', 'France 24', 'RT', 'NDTV', 'Euronews',
    'The Telegraph', 'South China Morning Post', 'Nikkei Asia',
    'Arab News', 'Daily Mail', 'The Australian'
  ],
  'International Press Journalism (IPJ)': [
    'Senior Correspondent', 'War Correspondent', 'Political Reporter',
    'Investigative Journalist', 'Foreign Affairs Reporter', 'Science Reporter',
    'Economic Analyst', 'Feature Writer', 'Opinion Columnist',
    'News Anchor', 'Field Reporter', 'Photo Journalist',
    'Data Journalist', 'Digital Reporter', 'Editorial Writer',
    'Human Interest Reporter', 'Environment Correspondent', 'Sports Journalist',
    'Business Reporter', 'Cultural Correspondent', 'Health Reporter',
    'Tech Reporter', 'Diplomatic Reporter', 'Crisis Reporter', 'Desk Editor',
    'Copy Editor', 'Sub-Editor', 'Visual Journalist', 'Podcast Host', 'Social Media Journalist'
  ],
  'UN Security Council (UNSC) (Double delegation)': [
    'United States of America', 'United Kingdom', 'France', 'Russian Federation', 'China',
    'India', 'Japan', 'South Korea', 'Israel', 'Iran', 'Saudi Arabia', 'United Arab Emirates',
    'Turkey', 'Pakistan', 'Egypt', 'Indonesia', 'Qatar', 'Australia', 'Netherlands', 'Nigeria'
  ]
};

const Committees = () => {
  const [seatCounts, setSeatCounts] = useState({});
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [allocations, setAllocations] = useState([]);
  const [modalSearch, setModalSearch] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data } = await apiClient.get('/registration/seat-counts');
        setSeatCounts(data.counts || {});
      } catch (err) {
        console.error('Failed to fetch seat counts:', err);
      }
    };
    const fetchAllocations = async () => {
      try {
        const { data } = await apiClient.get('/registration/committee-allocations');
        setAllocations(data.allocations || []);
      } catch (err) {
        console.error('Failed to fetch allocations:', err);
      }
    };
    fetchCounts();
    fetchAllocations();

    const interval = setInterval(() => {
      fetchCounts();
      fetchAllocations();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const committeesList = [
    {
      name: 'UN Human Rights Council',
      shortName: 'UNHRC',
      canonicalName: 'UN Human Rights Council (UNHRC)',
      agenda: 'Addressing the Rohingya Refugee Crisis with Special Emphasis on Accountability, Safe Repatriation, and the Protection of Human Rights',
      logo: UnhrcGold,
      bg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max',
      limit: 40
    },
    {
      name: 'UN General Assembly',
      shortName: 'UNGA',
      canonicalName: 'UN General Assembly (UNGA)',
      agenda: 'Reforming International Sanctions while Preventing the Misuse of Unilateral Coercive Measures',
      logo: UngaGold,
      bg: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=400',
      capacity: '60 max',
      limit: 60
    },
    {
      name: 'UN Security Council (Double delegation)',
      shortName: 'UNSC',
      canonicalName: 'UN Security Council (UNSC) (Double delegation)',
      agenda: 'Protection of International Shipping in the Red Sea',
      logo: UnscGold,
      bg: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max',
      limit: 40
    },
    {
      name: 'Economic and Social Council',
      shortName: 'ECOSOC',
      canonicalName: 'Economic and Social Council (ECOSOC)',
      agenda: 'Promoting the Responsible Development and Use of Artificial Intelligence for Sustainable Economic and Social Development',
      logo: EcosocGold,
      bg: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max',
      limit: 40
    },
    {
      name: 'International Labour Organization',
      shortName: 'ILO',
      canonicalName: 'International Labour Organization (ILO)',
      agenda: "Addressing the Future of Work with Special Emphasis on Automation, Artificial Intelligence, and Workforce Reskilling",
      logo: IloGold,
      bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
      capacity: '30 max',
      limit: 30
    },
    {
      name: 'Social, Humanitarian and Cultural Committee',
      shortName: 'SOCHUM',
      canonicalName: 'Social, Humanitarian and Cultural Committee (SOCHUM)',
      agenda: 'Human Rights Implications of Mass Digital Surveillance',
      logo: SochumGold,
      bg: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max',
      limit: 40
    },
    {
      name: 'UN Environment Programme',
      shortName: 'UNEP',
      canonicalName: 'UN Environment Programme (UNEP)',
      agenda: 'Sea Mining and Environmental Protection',
      logo: UnepGold,
      bg: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max',
      limit: 40
    },
    {
      name: 'International Press Plenary',
      shortName: 'IPP',
      canonicalName: 'International Press Plenary (IPP)',
      agenda: '',
      logo: IppGold,
      bg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400',
      capacity: '30 max',
      limit: 30
    },
    {
      name: 'International Press Journalism',
      shortName: 'IPJ',
      canonicalName: 'International Press Journalism (IPJ)',
      agenda: '',
      logo: IpjGold,
      bg: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400',
      capacity: '30 max',
      limit: 30
    },
    {
      name: 'United States Senate',
      shortName: 'US SENATE',
      canonicalName: 'United States Senate (US SENATE)',
      agenda: 'Continuation of Military Aid to Ukraine',
      logo: SenateGold,
      bg: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=400',
      capacity: '40 max',
      limit: 40
    },
    {
      name: 'Lok Sabha',
      shortName: 'LOKSABHA',
      canonicalName: 'Lok Sabha',
      agenda: 'Discussion on the Conduct of the National Census with Special Emphasis on Data Accuracy, Delimitation, and Inclusive Governance',
      logo: LoksabhaGold,
      bg: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Inside_view_of_Lok_Sabha_chamber_in_New_Parliament_building.jpg',
      capacity: '40 max',
      limit: 40
    },
    {
      name: 'Crisis Committee',
      shortName: 'Crisis committee',
      canonicalName: 'Crisis Committee',
      agenda: 'Operation Midnight Hammer: Assessing the legality, Strategic implication, and impact on international Peace and Security',
      logo: CrisisGold,
      bg: 'https://images.unsplash.com/photo-1461088945293-0c17689e48ac?auto=format&fit=crop&q=80&w=400',
      capacity: '30 max',
      limit: 30
    }
  ];

  return (
    <div className="bg-transparent text-[white] min-h-screen pt-28 px-4 md:px-8 pb-12 font-allotrix-font-secondary flex flex-col items-center">
      
      {/* Page Header */}
      <div className="w-full max-w-7xl mb-12 text-center">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#DCA843] mb-4">
          Our Committees
        </h1>
        <p className="font-cinzel text-xs md:text-sm uppercase tracking-widest text-[#FFF]/80 font-semibold max-w-2xl mx-auto">
          Explore the committees of CPS Prime MUN 5.O
        </p>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/30 to-transparent w-full mt-6"></div>
      </div>

      {/* Committees Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl items-stretch">
        {committeesList.map((committee, idx) => {
          const isIP = ['ipp', 'ipj'].includes(committee.shortName.toLowerCase());
          return (
            <div 
              key={idx} 
              onClick={() => {
                if (!isIP) {
                  setSelectedCommittee(committee);
                }
              }}
            className={`border border-[#DCA843]/30 bg-black/75 backdrop-blur-sm rounded-md p-5 flex flex-col justify-between items-center text-center h-full shadow-lg relative group overflow-hidden min-h-[320px] ${
                isIP 
                  ? '' 
                  : 'cursor-pointer hover:border-[#DCA843]/60 transform hover:-translate-y-1 transition-all duration-300'
              }`}
              style={committee.bg ? { 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url(${committee.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
            {/* Gold border decorative line top */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

            {/* Committee Emblem */}
            <div className="w-20 h-20 rounded-full border border-[#DCA843]/30 bg-[#000]/80 p-1.5 flex items-center justify-center mb-5 group-hover:border-[#DCA843]/60 transition-colors">
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
              <h3 className="font-cinzel text-[12px] uppercase font-bold text-[white] tracking-widest leading-snug min-h-[32px] group-hover:text-[#DCA843] transition-colors">
                {committee.name}
              </h3>
              <span className="font-allotrix-font-secondary text-[12px] text-[#DCA843] font-bold tracking-widest uppercase">
                {committee.shortName}
              </span>
            </div>

            {/* Agenda & Capacity details */}
            <div className="flex flex-col gap-3 mt-auto w-full pt-4 border-t border-[#DCA843]/15">
              {!['ipp', 'ipj'].includes(committee.shortName.toLowerCase()) && (
                <p className="font-allotrix-font-secondary text-[10px] text-[#BABABA] leading-relaxed text-center line-clamp-3">
                  <strong className="text-[#DCA843] block text-[9px] uppercase tracking-wider mb-1">Agenda:</strong>
                  {committee.agenda || "To be revealed"}
                </p>
              )}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-1">
                <div className="flex justify-center items-center gap-1.5 bg-[#DCA843]/5 border border-[#DCA843]/20 rounded py-1 px-3 w-fit mx-auto">
                  <span className="text-[9px] uppercase font-cinzel font-bold text-[#DCA843] tracking-wider">Capacity:</span>
                  <span className="text-[10px] font-bold font-allotrix-font-secondary" style={{ color: '#ffffff' }}>{committee.capacity}</span>
                </div>
                {(() => {
                  const filled = seatCounts[committee.canonicalName] || 0;
                  const limit = committee.limit || 30;
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
          );
        })}
      </div>

      {/* Country Matrix Modal Overlay */}
      {selectedCommittee && (() => {
        const committeeName = selectedCommittee.canonicalName;
        const pool = COMMITTEE_COUNTRY_POOL[committeeName] || [];
        const isUNSC = committeeName.toLowerCase().includes('unsc') || committeeName.toLowerCase().includes('security council');

        // Normalize committee name check
        const normCanonical = committeeName.toLowerCase();
        const normShort = selectedCommittee.shortName.toLowerCase();
        const committeeAllocations = allocations.filter(a => {
          const aComm = (a.committee || '').toLowerCase();
          return aComm === normCanonical || aComm.includes(normShort);
        });

        // Filter countries based on modalSearch
        const filteredPool = pool.filter(country => {
          const s = modalSearch.toLowerCase();
          if (!s) return true;

          const countryMatch = country.toLowerCase().includes(s);
          
          if (isUNSC) {
            const countryDels = committeeAllocations.filter(a => a.country === country);
            const del1Match = countryDels[0] && (
              countryDels[0].delegateName.toLowerCase().includes(s) || 
              countryDels[0].schoolName.toLowerCase().includes(s)
            );
            const del2Match = countryDels[1] && (
              countryDels[1].delegateName.toLowerCase().includes(s) || 
              countryDels[1].schoolName.toLowerCase().includes(s)
            );
            return countryMatch || del1Match || del2Match;
          } else {
            const del = committeeAllocations.find(a => a.country && a.country.toLowerCase() === country.toLowerCase());
            const delMatch = del && (
              del.delegateName.toLowerCase().includes(s) || 
              del.schoolName.toLowerCase().includes(s)
            );
            return countryMatch || delMatch;
          }
        });

        // Occupancy calculation
        const totalLimit = isUNSC ? 40 : pool.length;
        const filledSeats = committeeAllocations.length;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-[#09090b] border border-[#DCA843]/30 max-w-2xl w-full rounded-lg shadow-2xl relative flex flex-col max-h-[85vh] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#DCA843]/55 to-transparent"></div>
              
              {/* Modal Header */}
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-[#DCA843]/20 bg-[#000]/60 p-1 flex items-center justify-center shrink-0">
                    <img 
                      src={selectedCommittee.logo} 
                      alt={selectedCommittee.shortName} 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://i.ibb.co/bgxxbr9c/UNHRC-1.png';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-sm md:text-base font-bold text-white tracking-wider uppercase">
                      {selectedCommittee.name} Matrix
                    </h3>
                    <p className="text-[10px] text-[#DCA843] uppercase tracking-wider font-semibold">
                      {selectedCommittee.shortName} · Country & Portfolio Allotments
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedCommittee(null);
                    setModalSearch('');
                  }}
                  className="text-[#DCA843] hover:text-[#FFE082] transition-colors border-0 bg-transparent text-xl cursor-pointer p-1 font-bold"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Stats & Search Bar */}
              <div className="p-4 border-b border-white/5 bg-black/15 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[9px] font-cinzel text-[#BABABA] uppercase tracking-wider">Allotment Occupancy</span>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {filledSeats} / {totalLimit} Slots Filled ({Math.round((filledSeats/totalLimit)*100)}%)
                  </p>
                </div>
                
                <input
                  type="text"
                  placeholder="Search country or representative name..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  className="w-full sm:w-64 bg-black/55 border border-[#DCA843]/20 rounded p-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#DCA843]"
                />
              </div>

              {/* Matrix List / Table */}
              <div className="overflow-y-auto p-4 flex-1">
                {filteredPool.length === 0 ? (
                  <div className="p-12 text-center text-[#BABABA] italic text-xs">
                    No matching countries or representatives found.
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-black/55 text-[#DCA843] font-cinzel border-b border-[#DCA843]/10 uppercase tracking-wider text-[9px]">
                        <th className="p-2.5">Portfolio / Country</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5">Allotted Representative</th>
                        <th className="p-2.5">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DCA843]/5 text-[#BABABA]">
                      {filteredPool.map((country, idx) => {
                        if (isUNSC) {
                          const countryDels = committeeAllocations.filter(a => a.country === country);
                          const seat1 = countryDels[0];
                          const seat2 = countryDels[1];

                          return (
                            <React.Fragment key={idx}>
                              {/* Seat 1 */}
                              <tr className="hover:bg-white/5">
                                <td className="p-2.5 font-semibold text-white">
                                  {country} <span className="text-[9px] text-[#DCA843]/60 uppercase ml-1">(Seat 1)</span>
                                </td>
                                <td className="p-2.5">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                    seat1 
                                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                                      : 'bg-red-500/10 border border-red-500/20 text-rose-400'
                                  }`}>
                                    {seat1 ? 'Allocated' : 'Vacant'}
                                  </span>
                                </td>
                                <td className="p-2.5 font-medium text-white/80">
                                  {seat1 ? seat1.delegateName : '—'}
                                </td>
                                <td className="p-2.5 text-[10px]">
                                  {seat1 ? (
                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                      seat1.registrationType === 'Individual'
                                        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                                        : 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
                                    }`}>
                                      {seat1.registrationType || 'Individual'}
                                    </span>
                                  ) : '—'}
                                </td>
                              </tr>
                              
                              {/* Seat 2 */}
                              <tr className="hover:bg-white/5 border-b border-white/5">
                                <td className="p-2.5 font-semibold text-white pl-5">
                                  ↳ <span className="text-[9px] text-[#DCA843]/60 uppercase ml-1">(Seat 2)</span>
                                </td>
                                <td className="p-2.5">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                    seat2 
                                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                                      : 'bg-red-500/10 border border-red-500/20 text-rose-400'
                                  }`}>
                                    {seat2 ? 'Allocated' : 'Vacant'}
                                  </span>
                                </td>
                                <td className="p-2.5 font-medium text-white/80">
                                  {seat2 ? seat2.delegateName : '—'}
                                </td>
                                <td className="p-2.5 text-[10px]">
                                  {seat2 ? (
                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                      seat2.registrationType === 'Individual'
                                        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                                        : 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
                                    }`}>
                                      {seat2.registrationType || 'Individual'}
                                    </span>
                                  ) : '—'}
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        } else {
                          const del = committeeAllocations.find(a => a.country && a.country.toLowerCase() === country.toLowerCase());
                          return (
                            <tr key={idx} className="hover:bg-white/5">
                              <td className="p-2.5 font-semibold text-white">
                                {country}
                              </td>
                              <td className="p-2.5">
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                  del 
                                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                                    : 'bg-red-500/10 border border-red-500/20 text-rose-400'
                                }`}>
                                  {del ? 'Allocated' : 'Vacant'}
                                </span>
                              </td>
                              <td className="p-2.5 font-medium text-white/80">
                                {del ? del.delegateName : '—'}
                              </td>
                              <td className="p-2.5 text-[10px]">
                                {del ? (
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                    del.registrationType === 'Individual'
                                      ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                                      : 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
                                  }`}>
                                    {del.registrationType || 'Individual'}
                                  </span>
                                ) : '—'}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              
              {/* Modal Footer */}
              <div className="p-3 border-t border-white/15 bg-black/40 text-center text-[9px] text-[#BABABA] uppercase tracking-wider font-semibold">
                CPS PRIME MUN 5.O Allotment Registry Matrix System
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default Committees;
