import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { IoChevronBack, IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import ItineraryTimerBg from '../assets/itinerary_timer_bg.jpg';

dayjs.extend(duration);

const Itinerary = () => {
  // Target date: August 14, 2026 at 10:00 AM
  const revealDate = dayjs('2026-08-14T10:00:00');
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

  const highLevelEvents = [
    {
      day: "Day 1",
      date: "August 28, 2026",
      schedule: [
        { time: "08:00 AM - 09:30 AM", event: "Delegate Registrations & Kit Distribution" },
        { time: "09:30 AM - 10:30 AM", event: "Opening Ceremony & Keynote Addresses" },
        { time: "10:45 AM - 01:00 PM", event: "Committee Session I" },
        { time: "01:00 PM - 02:00 PM", event: "Networking Lunch" },
        { time: "02:00 PM - 04:30 PM", event: "Committee Session II" },
        { time: "04:30 PM - 05:00 PM", event: "High Tea & Day 1 Wrap-up" }
      ]
    },
    {
      day: "Day 2",
      date: "August 29, 2026",
      schedule: [
        { time: "08:30 AM - 09:00 AM", event: "Morning Assembly & Briefing" },
        { time: "09:00 AM - 12:30 PM", event: "Committee Session III" },
        { time: "12:30 PM - 01:30 PM", event: "Executive Lunch" },
        { time: "01:30 PM - 03:30 PM", event: "Committee Session IV (Draft Resolution Voting)" },
        { time: "03:45 PM - 05:30 PM", event: "Grand Closing & Awards Ceremony" }
      ]
    }
  ];

  return (
    <div className="bg-transparent text-white min-h-screen pt-28 px-4 md:px-8 pb-16 font-allotrix-font-secondary flex flex-col items-center">
      
      {/* Back button */}
      <div className="w-full max-w-4xl mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm text-[#DCA843] hover:text-white transition-colors uppercase tracking-widest font-semibold font-cinzel">
          <IoChevronBack className="text-base" /> Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#DCA843] mb-4">
          Conference Itinerary
        </h1>
        <p className="font-cinzel text-xs md:text-sm uppercase tracking-widest text-[#FFF]/80 font-semibold max-w-xl mx-auto leading-relaxed">
          Plan your debates and sessions for CPS Prime MUN 5.O
        </p>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#DCA843]/30 to-transparent w-full mt-6"></div>
      </div>

      {/* Countdown Card */}
      <div className="w-full max-w-3xl border border-[#DCA843]/30 bg-[#030303]/60 backdrop-blur-md rounded-lg p-5 md:py-6 md:px-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center gap-4 mb-12">
        {/* Background Image */}
        <div 
          className="absolute -inset-2 bg-no-repeat opacity-100 pointer-events-none z-0"
          style={{ 
            backgroundImage: `url(${ItineraryTimerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <span className="font-cinzel text-xs tracking-widest text-[#DCA843] font-semibold uppercase z-10">
          Official Release Countdown
        </span>
        <h2 className="font-cinzel text-lg md:text-xl font-bold uppercase tracking-wider max-w-md z-10" style={{ color: '#ffffff' }}>
          Detailed Itinerary Will Be Revealed In
        </h2>

        {/* Live Countdown digits */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-sm mx-auto py-2 z-10">
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Mins', val: timeLeft.minutes },
            { label: 'Secs', val: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center bg-[#09090b]/50 backdrop-blur-sm border border-[#DCA843]/15 rounded-md py-4 px-1 shadow-md hover:border-[#DCA843]/30 transition-all duration-300">
              <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wider" style={{ color: '#DCA843' }}>
                {padZero(item.val)}
              </span>
              <span className="font-allotrix-font-secondary text-[8px] md:text-[9px] font-semibold tracking-widest text-cps-grey uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-allotrix-font-secondary text-xs md:text-sm text-cps-grey/85 leading-relaxed max-w-md z-10">
          The full committee-wise room layout and detailed session timetables will unlock on <strong className="text-white">August 14th, 2026</strong>.
        </p>
      </div>

      {/* High Level Event Schedule Timeline */}
      <div className="w-full max-w-3xl flex flex-col gap-8 relative mt-4">
        <div className="flex items-center gap-4 w-full justify-center mb-2">
          <span className="h-px bg-[#DCA843]/20 w-8"></span>
          <h3 className="font-cinzel text-sm md:text-base font-bold uppercase tracking-widest text-[#DCA843]">
            Conference Overview Schedule
          </h3>
          <span className="h-px bg-[#DCA843]/20 w-8"></span>
        </div>

        <div className="relative w-full rounded-lg overflow-hidden">
          {/* Locked Overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px] z-20 flex flex-col items-center justify-center text-center p-6 border border-[#DCA843]/20 rounded-lg">
              <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-[#DCA843]/40 flex items-center justify-center mb-4 shadow-lg shadow-black">
                <svg className="w-6 h-6 text-[#DCA843]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-cinzel text-sm md:text-base font-bold text-white uppercase tracking-widest mb-2">
                Schedule Locked
              </h4>
              <p className="font-allotrix-font-secondary text-xs text-cps-grey max-w-xs leading-relaxed">
                The detailed event timeline will automatically reveal here on August 14th.
              </p>
            </div>
          )}

          {/* Schedule Content (Blurred if locked) */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch ${isLocked ? 'filter blur-[5px] pointer-events-none select-none' : ''}`}>
            {highLevelEvents.map((dayPlan, idx) => (
              <div key={idx} className="border border-[#DCA843]/20 bg-[#09090b]/40 backdrop-blur-md rounded-lg p-6 flex flex-col gap-6 relative shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-[#DCA843]/15 pb-3">
                  <h4 className="font-cinzel text-base font-bold text-[#DCA843] uppercase tracking-wider">{dayPlan.day}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-cps-grey font-medium">
                    <IoCalendarOutline className="text-[#DCA843]" />
                    <span>{dayPlan.date}</span>
                  </div>
                </div>

                {/* Day Timeline */}
                <div className="flex flex-col gap-4">
                  {dayPlan.schedule.map((item, sIdx) => (
                    <div key={sIdx} className="flex gap-4 items-start group">
                      <div className="flex items-center gap-1 text-[10px] md:text-xs text-[#DCA843] font-mono shrink-0 w-[110px] mt-0.5">
                        <IoTimeOutline className="shrink-0" />
                        <span>{item.time.split(' - ')[0]}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs font-semibold text-white leading-snug group-hover:text-[#DCA843] transition-colors">
                          {item.event}
                        </p>
                        <span className="text-[10px] text-cps-grey">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Itinerary;
