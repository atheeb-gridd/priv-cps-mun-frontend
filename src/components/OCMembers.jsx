import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const OCMembers = () => {
  // Target date: July 19, 2026 at 10:00 AM
  const revealDate = dayjs('2026-07-19T10:00:00');
  const isLocked = dayjs().isBefore(revealDate);

  const calculateTimeLeft = useCallback(() => {
    const now = dayjs();
    const diff = revealDate.diff(now);

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return { days, hours, minutes, seconds };
  }, [revealDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const padZero = (num) => String(num).padStart(2, '0');

  const [selectedBio, setSelectedBio] = useState(null);

  const tanavParagraphs = [
    "Driven by curiosity, discipline, and a commitment to excellence, Tanav S serves as the Deputy Director-General of CPS PRIME MUN 5.O and the Developer of the Official CPS PRIME MUN Website. Combining leadership with technical expertise, he strives to create meaningful experiences that inspire delegates and elevate the conference to new standards of professionalism.",
    "A strategic thinker with a calm and solution-oriented mindset, Tanav believes that true leadership is built on integrity, responsibility, and the ability to empower others. His approachable nature, strong work ethic, and attention to detail enable him to work effectively under pressure while maintaining a positive and collaborative environment.",
    "As the architect behind the official conference website, Tanav designed and developed a modern digital platform that reflects the vision, identity, and global spirit of CPS PRIME MUN. His focus on innovation, accessibility, and user experience ensures that every participant enjoys a seamless journey from registration to conference day.",
    "Previously serving as the Vice-Captain of Plasma House, he demonstrated exceptional leadership by coordinating initiatives, motivating peers, and fostering teamwork. These experiences strengthened his confidence, communication skills, and ability to manage responsibilities with dedication and professionalism.",
    "Passionate about diplomacy, innovation, and continuous self-improvement, Tanav believes that every challenge is an opportunity to learn, lead, and leave a meaningful impact. Guided by his personal philosophy, \"Conquer From Within,\" he exemplifies resilience, integrity, and unwavering determination in every responsibility he undertakes. With a vision to inspire others through service, excellence, and innovation, he remains committed to shaping CPS PRIME MUN 5.O into a benchmark of professionalism, collaboration, and transformative leadership, ensuring that every delegate departs with unforgettable experiences, lasting connections, and a renewed passion for global diplomacy."
  ];

  const rishwanthParagraphs = [
    "Presenting Rishwanth Krishna, CPS Prime MUN USG Finance Head. A true jack of all trades who brings a dynamic blend of discipline and charisma to the secretariat.",
    "One of the school's finest footballers and a dedicated athlete, he served as the Cultural Secretary of the Student Council '24 batch. He approaches leadership with the elite work ethic of his idol, Cristiano.",
    "Off the pitch, Rishwanth Krishna is a talented pianist, an avid cinephile, and an individual deeply interested in day-to-day finance and money matters around the globe. Known for a character that balances intense hard work with a very friendly, approachable, and open-minded energy, he ensures this MUN's financial operations run seamlessly, taking pressure as privilege."
  ];

  const annapooraniParagraphs = [
    "“It always seems impossible until it’s done.” — Nelson Mandela",
    "If there’s one thing Annapoorani has learned, it’s that the most rewarding opportunities often begin with a little uncertainty. From organizing community events to stepping into the role of Director General, she’s discovered that growth comes from saying “yes” first and figuring things out along the way.",
    "An avid debater and lifelong learner, she has represented her school in competitions including the World Scholar’s Cup, earning multiple accolades along the way. She also holds the Cambridge English C1 qualification, a reflection of her love for communication, collaboration, and exchanging ideas.",
    "Inspired by Ratan Tata’s philosophy of creating value through leadership and service, Annapoorani dreams of becoming an entrepreneur who builds not only successful businesses but also meaningful social impact. She hopes to one day establish an NGO, believing that the best leaders solve problems that matter and leave people better than they found them.",
    "Outside committee sessions, you’ll probably find her planning her next project, following a cricket match with unmatched enthusiasm, or asking “just one more question” until everything finally makes sense. As a true fan of RCB — if there’s one thing being an RCB fan teaches you, it’s persistence.",
    "As Director General of CPS Prime MUN 5.O, she hopes to create a conference where every delegate feels challenged to think critically, encouraged to speak confidently, and inspired to discover that diplomacy is ultimately about people."
  ];

  const hansiniParagraphs = [
    "Jack of all trades but.. Oh you've heard of that? Of course you have. What about, “So the winner takes it all, and the..” that too? Well, Hansini more often than not relates to that.",
    "Being an avid enthusiast in the geopolitical affairs of the world and a passionate advocate of feminism and inclusive policymaking, she believes that she can bring upon a change to the current world and your neighborhood society on how they perceive women for the better.",
    "She has an experience of 10 years of Carnatic music training with her vocal coach, Hannah Preeti Jean. Reading and being a cinephile are among her many interests that she extremely loves (especially sci-fi and true crime).",
    "Outside of MUNs, you can probably find her engaging in discussions about the challenges affecting women across diverse societies and fostering meaningful dialogue on racial discrimination and oppression of the poor by big corporations — or cooking up something she's learnt through all the MasterChef Australia seasons she's watched.",
    "With experience engaging in a range of Model United Nations committees, from UNEP and World Bank to the chaotic but fascinating Joint Crisis Committee and AIPPM, she believes that as the USG of Delegate Affairs, she can make the committee you participate in one of the most memorable MUNs for you alongside her co-USGs and the Secretariat."
  ];

  const ashmitaParagraphs = [
    "“The art of communication is the language of leadership.” — James Humes",
    "It is an honour to serve as the Under Secretary-General for Public Relations at CPS MUN 5.O. I believe that effective communication is the foundation of every successful conference, bringing together ideas, people, and opportunities through collaboration and mutual respect.",
    "As a member of the Secretariat, I look forward to strengthening the conference's outreach, building meaningful connections, and ensuring that the vision of CPS MUN 5.O reaches every delegate and partner. Public Relations is not just about promotion — it is about creating trust, encouraging engagement, and representing the conference with professionalism and integrity.",
    "I am grateful for the confidence placed in me and excited to work alongside an exceptional Secretariat. Together, I hope to create an enriching and memorable experience that inspires diplomacy, leadership, and meaningful dialogue, making CPS MUN 5.O a truly impactful conference for everyone."
  ];

  const mahaaHasiniParagraphs = [
    "Mahaa Hasini is a Grade XI student at Chennai Public School, Thirumazhisai, and has the honour of serving as the Under-Secretary-General for Logistics at CPS Prime MUN 5.O. She also serves as the Sports Secretary '26, where she has developed leadership, organisational, and coordination skills through active involvement in school initiatives and events.",
    "She believes that efficiency, adaptability, and teamwork form the foundation of successful execution. As USG for Logistics, Hasini is committed to ensuring seamless coordination behind the scenes while striving to deliver a conference experience defined by professionalism, precision, and excellence for every participant."
  ];

  const darshanParagraphs = [
    "“Every successful flight begins with coordination; every lasting peace begins with diplomacy.”",
    "As the Under-Secretary-General for Media and Design of CPS PRIME MUN 5.O, Mr. Darshan DJ extends his warmest welcome to every delegate, faculty advisor, and distinguished guest to Chennai Public School, Thirumazhisai.",
    "For Mr. Darshan DJ, Model United Nations is far more than a conference—it is a platform where ideas inspire action, perspectives shape the future, and leadership is born through meaningful dialogue. As the individual leading Media and Design, his vision is to ensure that every moment of CPS PRIME MUN 5.O reflects the prestige, professionalism, and excellence that define this conference.",
    "Through creativity, innovation, and attention to detail, he has worked towards creating a visual identity that captures the true spirit of diplomacy. Every design, every frame, and every story shared throughout the conference is intended not only to preserve memories but also to showcase the passion, dedication, and collaborative spirit of every participant.",
    "On behalf of the Secretariat, Mr. Darshan DJ warmly welcomes each delegate to this extraordinary gathering of young leaders. He encourages every participant to embrace every committee session with confidence, engage in thoughtful debate with respect, and seize every opportunity to learn, lead, and leave a lasting impact.",
    "May CPS PRIME MUN 5.O become a defining chapter in your journey—one that challenges your perspectives, strengthens your voice, and inspires you to become a leader capable of shaping a better tomorrow.",
    "Welcome to CPS PRIME MUN 5.O—where diplomacy is celebrated, excellence is cultivated, and every delegate has the opportunity to make history."
  ];

  const aashishParagraphs = [
    "“A leader is one who knows the way, goes the way, and shows the way.” — John C. Maxwell",
    "Aashish Kathpal is a Grade XI student at Chennai Public School, Thirumazhisai, and has the honour of serving as the Secretary-General of CPS Prime MUN 5.O. His MUN journey began in 2025, where curiosity quickly grew into a passion for diplomacy, public speaking, and international relations. At his very first conference, he was awarded an Honourable Mention, an achievement that inspired him to continue pursuing excellence in MUN.",
    "Beyond MUN, Aashish has a strong interest in public speaking, debate, entrepreneurship, business, and law. These pursuits have strengthened his critical thinking, leadership, and communication skills while shaping his aspiration to pursue Hospitality Management.",
    "Believing that leadership is defined by service, integrity, and the willingness to inspire others, Aashish views Model United Nations as more than an academic exercise. To him, it is a platform that encourages meaningful dialogue, nurtures empathy, and equips young individuals with the confidence to address complex global challenges. He hopes to foster an environment where every delegate feels empowered to voice their ideas, embrace diverse perspectives, and grow both intellectually and personally.",
    "As Secretary-General, Aashish envisions CPS Prime MUN 5.O as a platform where delegates challenge perspectives, collaborate with purpose, and develop solutions through meaningful dialogue. He believes that true diplomacy lies in transforming disagreement into progress and that the finest delegates lead with integrity, respect, and conviction."
  ];

  const rohithParagraphs = [
    "“Knowing is not enough, we must apply. Willing is not enough, we must do.” — Bruce Lee",
    "The measure of a conference is seldom found in the resolutions it passes, but in the minds it transforms.",
    "Every committee room is more than a space for debate; it is where convictions are questioned, perspectives are broadened, and leadership is quietly forged through the discipline of listening as much as speaking. In a world too often divided by certainty, the ability to understand before seeking to be understood remains one of the rarest forms of strength.",
    "As Deputy Secretary-General of CPS Prime MUN 5.O, my hope is not simply that delegates leave with sharper arguments, but with greater curiosity, deeper respect for differing perspectives, and the confidence to lead with both reason and humility.",
    "Whether this conference marks your first step into diplomacy or another chapter in your MUN journey, I invite you to make every speech purposeful, every negotiation meaningful, and every interaction memorable. The conversations you begin here may last far longer than the conference itself.",
    "I look forward to welcoming each one of you to CPS Prime MUN 5.O, where we come together not merely to debate the world as it is, but to Conquer From Within."
  ];

  return (
    <div className="w-full bg-transparent text-white pt-28 md:pt-36 pb-20 px-4 md:px-8 flex flex-col items-center gap-16 min-h-screen relative overflow-hidden">
      <div className="text-center max-w-3xl">
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-wider text-[#DCA843] mb-4">
          Our Secretariat
        </h1>
        <p className="font-allotrix-font-secondary text-sm md:text-base text-cps-grey leading-relaxed">
          Meet the dedicated team steering the committees, operations, and leadership of CPS Prime MUN 5.O
        </p>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/30 to-transparent w-full mt-6"></div>
      </div>

      <div className="relative w-full max-w-7xl">
        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[8px] z-20 flex flex-col items-center justify-center text-center p-6 border border-[#DCA843]/20 rounded-lg min-h-[480px]">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#DCA843]/40 flex items-center justify-center mb-6 shadow-lg shadow-black">
              <svg className="w-8 h-8 text-[#DCA843]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: '#DCA843' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h4 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest mb-3" style={{ color: '#ffffff' }}>
              Secretariat Locked
            </h4>
            
            <p className="font-allotrix-font-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-6" style={{ color: '#DCA843' }}>
              Revealing in
            </p>

            {/* Live Countdown digits */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 w-full max-w-sm sm:max-w-md mx-auto py-2 mb-8">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center bg-[#09090b]/90 border border-[#DCA843]/30 rounded-md py-4 px-2 sm:py-5 sm:px-3 shadow-xl">
                  <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: '#DCA843' }}>
                    {padZero(item.val)}
                  </span>
                  <span className="font-allotrix-font-secondary text-[8px] sm:text-[9px] tracking-widest text-[#FFF]/60 uppercase mt-2 font-bold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-allotrix-font-secondary text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed">
              The full Secretariat structure and member profiles will unlock on <strong style={{ color: '#DCA843' }}>July 19th, 2026</strong>.
            </p>
          </div>
        )}

        {/* Content (Blurred if locked) */}
        <div className={`w-full flex flex-col gap-16 ${isLocked ? 'filter blur-[5px] pointer-events-none select-none' : ''}`}>
          
          {/* Senior Secretariat Section */}
          <div className="w-full max-w-7xl flex flex-col items-center gap-8">
            <h2 className="font-cinzel text-lg md:text-xl font-bold uppercase tracking-widest text-[#DCA843]/80 border-b border-[#DCA843]/15 pb-2 w-full text-center">
              Senior Secretariat
            </h2>

            <div className="flex flex-wrap justify-center gap-6 w-full">
              {[
                { 
                  role: "Secretary-General", 
                  name: "Mr. Aashish Kathpal", 
                  initials: "AK",
                  img: "/images/aashish.jpg",
                  objectPosition: "center 18%",
                  transform: "scale(1.75) translateY(2%)",
                  paragraphs: aashishParagraphs
                },
                { 
                  role: "Deputy Secretary-General", 
                  name: "Mr. K. J. Rohith", 
                  initials: "KR",
                  img: "/images/rohith.jpg",
                  objectPosition: "center 12%",
                  transform: "scale(2.2) translateY(-2%)",
                  paragraphs: rohithParagraphs
                },
                { 
                  role: "Director-General", 
                  name: "Ms. Annapoorani Kamalakannan", 
                  initials: "AK",
                  img: "/images/annapoorani.jpg",
                  objectPosition: "center 12%",
                  transform: "scale(2.0) translateY(-2%)",
                  paragraphs: annapooraniParagraphs
                },
                { 
                  role: "Deputy Director-General & Website Developer", 
                  name: "Mr. Tanav S", 
                  initials: "TS",
                  img: "/images/tanav_s.jpg",
                  objectPosition: "center 20%",
                  transform: "scale(1.75) translateY(10%)",
                  paragraphs: tanavParagraphs 
                }
              ].map((sec, idx) => (
                <div 
                  key={idx} 
                  onClick={() => sec.paragraphs && setSelectedBio(sec)}
                  className={`border border-[#DCA843]/30 bg-[#09090b]/55 backdrop-blur-md rounded-xl shadow-lg relative group overflow-hidden transition-all duration-300 hover:border-[#DCA843]/70 w-[270px] h-[340px] flex flex-col justify-end ${sec.paragraphs ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-[#DCA843]/20 hover:shadow-2xl' : ''}`}
                >
                  {sec.img ? (
                    <>
                      {/* Full box background image container with overflow-hidden */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">
                        <img 
                          src={sec.img} 
                          alt={sec.name} 
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          style={{
                            objectPosition: sec.objectPosition || 'center top',
                            transform: sec.transform || 'none',
                          }} 
                        />
                      </div>
                      {/* Dark gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
                      
                      {/* Decorative top gold border */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DCA843] to-transparent z-20"></div>
 
                      {/* Content overlay */}
                      <div className="relative z-20 flex flex-col items-center justify-end p-5 text-center w-full">
                        <p className="font-cinzel text-base font-bold text-white tracking-wider drop-shadow-md">{sec.name}</p>
                        <span className="font-allotrix-font-secondary text-[9.5px] text-[#DCA843] font-bold tracking-widest uppercase mt-1.5 pt-2 border-t border-[#DCA843]/30 w-full drop-shadow-sm">
                          {sec.role}
                        </span>
                        {sec.paragraphs && (
                          <span className="text-[8.5px] font-cinzel text-[#000] font-bold tracking-wider uppercase bg-[#DCA843] px-2.5 py-1 rounded-md mt-2 shadow-md hover:bg-[#FFE082] transition-colors">
                            Click for Bio ➔
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Decorative gold line */}
                      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

                      <div className="flex flex-col items-center justify-center gap-3 w-full h-full p-6">
                        {/* Initial Box Container */}
                        <div className="w-20 h-20 rounded-full border-2 border-[#DCA843]/40 overflow-hidden bg-black/80 flex items-center justify-center shadow-md group-hover:border-[#DCA843] group-hover:scale-105 transition-all duration-300">
                          <span className="font-cinzel text-base font-bold text-[#DCA843]">{sec.initials}</span>
                        </div>

                        {/* Appointed Name Card */}
                        <p className="font-cinzel text-sm font-bold text-white tracking-wider">{sec.name}</p>

                        {/* Role Title */}
                        <span className="font-allotrix-font-secondary text-[9px] text-[#DCA843] font-bold tracking-widest uppercase mt-1 pt-2 border-t border-[#DCA843]/10 w-full">
                          {sec.role}
                        </span>

                        {sec.paragraphs && (
                          <span className="text-[8px] font-cinzel text-[#DCA843] font-semibold tracking-wider uppercase bg-[#DCA843]/10 border border-[#DCA843]/20 px-2 py-0.5 rounded mt-1 group-hover:bg-[#DCA843] group-hover:text-black transition-colors">
                            Click for Bio ➔
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Under Secretaries-General (USG) & Backup Section */}
          <div className="w-full max-w-7xl flex flex-col items-center gap-8">
            <h2 className="font-cinzel text-lg md:text-xl font-bold uppercase tracking-widest text-[#DCA843]/80 border-b border-[#DCA843]/15 pb-2 w-full text-center">
              Under Secretaries-General (USG)
            </h2>

            <div className="flex flex-wrap justify-center gap-6 w-full mt-4">
              {[
                { 
                  name: "Ms. Matsa Hansini", 
                  role: "USG — Delegate Affairs",
                  initials: "MH",
                  img: "/images/matsa_hansini.jpg",
                  objectPosition: "center 25%",
                  transform: "scale(1.15)",
                  paragraphs: hansiniParagraphs
                },
                { 
                  name: "Mr. Rishwanth Krishna", 
                  role: "USG — Finance",
                  initials: "RK",
                  img: "/images/rishwanth.jpg",
                  objectPosition: "center 20%",
                  transform: "scale(1.65) translateY(-9%) translateX(-5%)",
                  paragraphs: rishwanthParagraphs
                },
                { 
                  name: "Ms. Ashmita K", 
                  role: "USG — Public Relations",
                  initials: "AK",
                  img: "/images/ashmita.jpg",
                  objectPosition: "center 35%",
                  transform: "scale(1.9)",
                  paragraphs: ashmitaParagraphs
                },
                { 
                  name: "Mr. Darshan DJ", 
                  role: "USG — Media & Design", 
                  initials: "DD",
                  img: "/images/darshan.jpg",
                  objectPosition: "center 15%",
                  transform: "scale(2.7) translateY(-14%) translateX(7%)",
                  paragraphs: darshanParagraphs
                },
                { 
                  name: "Ms. Mahaa Hasini", 
                  role: "USG — Logistics", 
                  initials: "MH",
                  img: "/images/mahaa_hasini.jpg",
                  objectPosition: "center 33%",
                  transform: "scale(1.8)",
                  paragraphs: mahaaHasiniParagraphs 
                }
              ].map((member, idx) => (
                <div 
                  key={idx} 
                  onClick={() => member.paragraphs && setSelectedBio(member)}
                  className={`border border-[#DCA843]/30 bg-[#09090b]/55 backdrop-blur-md rounded-xl shadow-lg relative group overflow-hidden transition-all duration-300 hover:border-[#DCA843]/70 w-[240px] h-[250px] flex flex-col justify-end ${member.paragraphs ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[#DCA843]/20 hover:shadow-2xl' : ''}`}
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
                      <div className="relative z-20 flex flex-col items-center justify-end p-4 text-center w-full">
                        <p className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wider drop-shadow-md">{member.name}</p>
                        <span className="font-allotrix-font-secondary text-[8.5px] text-[#DCA843] font-bold tracking-widest uppercase mt-1 pt-1.5 border-t border-[#DCA843]/30 w-full drop-shadow-sm">
                          {member.role}
                        </span>
                        {member.paragraphs && (
                          <span className="text-[7.5px] font-cinzel text-[#000] font-bold tracking-wider uppercase bg-[#DCA843] px-2 py-0.5 rounded mt-1.5 shadow-md hover:bg-[#FFE082] transition-colors">
                            Click for Bio ➔
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Decorative gold line */}
                      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

                      <div className="flex flex-col items-center justify-center gap-3 w-full h-full p-4">
                        {/* Initial Box Container */}
                        <div className="w-14 h-14 rounded-full border-2 border-[#DCA843]/40 overflow-hidden bg-black/80 flex items-center justify-center shadow-md group-hover:border-[#DCA843] group-hover:scale-105 transition-all duration-300">
                          <span className="font-cinzel text-xs font-bold text-[#DCA843]">{member.initials}</span>
                        </div>

                        {/* Appointed Name Card */}
                        <p className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wider">{member.name}</p>

                        {/* Role Title */}
                        <span className="font-allotrix-font-secondary text-[8.5px] text-[#DCA843] font-bold tracking-widest uppercase mt-1 pt-1.5 border-t border-[#DCA843]/15 w-full">
                          {member.role}
                        </span>

                        {member.paragraphs && (
                          <span className="text-[7.5px] font-cinzel text-[#000] font-bold tracking-wider uppercase bg-[#DCA843] px-2 py-0.5 rounded mt-1.5 shadow-md hover:bg-[#FFE082] transition-colors">
                            Click for Bio ➔
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Core Team Section */}
          <div className="w-full max-w-7xl flex flex-col items-center gap-8">
            <h2 className="font-cinzel text-lg md:text-xl font-bold uppercase tracking-widest text-[#DCA843]/80 border-b border-[#DCA843]/15 pb-2 w-full text-center">
              Main Core Team
            </h2>

            <div className="flex flex-wrap justify-center gap-6 w-full">
              {[
                { name: "Ms. Aadhira Sekar", role: "Core Team — Delegate Affairs", img: "/images/aadhira.jpg", objectPosition: "center 15%", transform: "scale(1.4) translateY(6%)" },
                { name: "Ms. G. Vidhulaa", role: "Core Team — Craft & Design", img: "/images/vidhulaa.jpg", objectPosition: "center 8%", transform: "scale(1.55) translateY(-2%)" },
                { name: "Mr. Harshith Sai", role: "Core Team — Delegate Affairs", img: "/images/harshith_sai.jpg", objectPosition: "center 15%", transform: "scale(1.45) translateY(6%)" },
                { name: "Mr. Prabhakaran", role: "Core Team — Social Media Handling", img: "/images/prabhakaran.jpg", objectPosition: "center 15%", transform: "scale(1.4) translateY(6%)" },
                { name: "Mr. Sai Harish", role: "Core Team — Finance", img: "/images/sai_harish.jpg", objectPosition: "center 15%" },
                { name: "Mr. Saiyam S", role: "Core Team — Public Relations", img: "/images/saiyam.jpg", objectPosition: "center 15%", transform: "scale(1.6) translateY(-10%)" },
                { name: "Mr. Shravan", role: "Core Team — Media & Design", img: "/images/shravan.jpg", objectPosition: "center 15%", transform: "scale(1.6) translateY(-10%)" },
                { name: "Ms. Sushikka Jagarlamudi", role: "Core Team — Logistics", img: "/images/sushikka.jpg", objectPosition: "center 15%", transform: "scale(1.4) translateY(6%)" }
              ].map((member, idx) => (
                <div 
                  key={idx} 
                  className={`border border-[#DCA843]/20 bg-[#09090b]/55 backdrop-blur-md rounded-md p-6 flex flex-col items-center text-center shadow-lg relative group overflow-hidden transition-all duration-300 hover:border-[#DCA843]/50 w-[260px] ${member.img ? 'h-[280px] justify-end pb-5' : 'min-h-[140px] justify-center'}`}
                >
                  {member.img ? (
                    <>
                      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-md">
                        <img 
                          src={member.img} 
                          alt={member.name} 
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                          style={{
                            objectPosition: member.objectPosition || 'center top',
                            transform: member.transform || 'none',
                          }} 
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                      <div className="flex flex-col items-center gap-1.5 w-full relative z-20">
                        <p className="font-cinzel text-sm font-bold text-white tracking-wider drop-shadow-md">{member.name}</p>
                        <span className="font-allotrix-font-secondary text-[9px] text-[#DCA843] font-bold tracking-widest uppercase pt-1.5 border-t border-[#DCA843]/30 w-full drop-shadow">
                          {member.role}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Decorative gold line */}
                      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#DCA843]/40 to-transparent"></div>

                      <div className="flex flex-col items-center gap-3 w-full">
                        <p className="font-cinzel text-sm font-bold text-white tracking-wider">{member.name}</p>
                        <span className="font-allotrix-font-secondary text-[9px] text-[#DCA843] font-bold tracking-widest uppercase mt-2 pt-2 border-t border-[#DCA843]/15 w-full">
                          {member.role}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Biography Modal */}
      {selectedBio && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedBio(null)}
        >
          <div 
            className="bg-[#0b0b0e] border border-[#DCA843]/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 relative shadow-2xl shadow-black text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedBio(null)}
              className="absolute top-4 right-4 text-[#DCA843] hover:text-white w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-lg font-bold border border-[#DCA843]/20"
            >
              ✕
            </button>

             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-[#DCA843]/20 pb-6">
              <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-xl border-2 border-[#DCA843]/60 overflow-hidden shrink-0 shadow-xl shadow-black bg-[#09090b] flex items-center justify-center">
                {selectedBio.img ? (
                  <img src={selectedBio.img} alt={selectedBio.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <span className="font-cinzel text-3xl font-extrabold text-[#DCA843] tracking-widest">{selectedBio.initials || "MUN"}</span>
                )}
              </div>
              <div className="flex flex-col text-center sm:text-left gap-1.5 justify-center">
                <span className="font-cinzel text-[10px] font-bold text-[#DCA843] uppercase tracking-widest bg-[#DCA843]/10 border border-[#DCA843]/20 px-2.5 py-1 rounded w-fit mx-auto sm:mx-0">
                  CPS PRIME MUN 5.O Secretariat
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wider mt-1">{selectedBio.name}</h2>
                <p className="font-cinzel text-xs text-[#DCA843]/90 font-semibold tracking-wider">{selectedBio.role}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#BABABA] leading-relaxed font-allotrix-font-secondary">
              {selectedBio.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="border-l border-[#DCA843]/20 pl-3.5 hover:border-[#DCA843]/60 transition-colors">
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-2 border-t border-[#DCA843]/10 flex justify-end">
              <button 
                onClick={() => setSelectedBio(null)}
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

export default OCMembers;
