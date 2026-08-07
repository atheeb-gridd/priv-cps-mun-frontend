import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const Timer = ({ endDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const now = dayjs();
    const end = dayjs(endDate);
    const diff = end.diff(now);

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const padZero = (num) => {
    return String(num).padStart(2, '0');
  };

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-md mx-auto py-2">
      {/* Days */}
      <div className="flex flex-col items-center justify-center bg-[#09090b]/80 border border-[#DCA843]/15 rounded-md py-4 px-2 shadow-md hover:border-[#DCA843]/30 transition-all duration-300">
        <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wider" style={{ color: '#DCA843' }}>
          {padZero(timeLeft.days)}
        </span>
        <span className="font-allotrix-font-secondary text-[8px] md:text-[10px] font-semibold tracking-widest text-cps-grey uppercase mt-2">
          Days
        </span>
      </div>

      {/* Hours */}
      <div className="flex flex-col items-center justify-center bg-[#09090b]/80 border border-[#DCA843]/15 rounded-md py-4 px-2 shadow-md hover:border-[#DCA843]/30 transition-all duration-300">
        <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wider" style={{ color: '#DCA843' }}>
          {padZero(timeLeft.hours)}
        </span>
        <span className="font-allotrix-font-secondary text-[8px] md:text-[10px] font-semibold tracking-widest text-cps-grey uppercase mt-2">
          Hours
        </span>
      </div>

      {/* Minutes */}
      <div className="flex flex-col items-center justify-center bg-[#09090b]/80 border border-[#DCA843]/15 rounded-md py-4 px-2 shadow-md hover:border-[#DCA843]/30 transition-all duration-300">
        <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wider" style={{ color: '#DCA843' }}>
          {padZero(timeLeft.minutes)}
        </span>
        <span className="font-allotrix-font-secondary text-[8px] md:text-[10px] font-semibold tracking-widest text-cps-grey uppercase mt-2">
          Minutes
        </span>
      </div>

      {/* Seconds */}
      <div className="flex flex-col items-center justify-center bg-[#09090b]/80 border border-[#DCA843]/15 rounded-md py-4 px-2 shadow-md hover:border-[#DCA843]/30 transition-all duration-300">
        <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wider" style={{ color: '#DCA843' }}>
          {padZero(timeLeft.seconds)}
        </span>
        <span className="font-allotrix-font-secondary text-[8px] md:text-[10px] font-semibold tracking-widest text-cps-grey uppercase mt-2">
          Seconds
        </span>
      </div>
    </div>
  );
};

export default Timer;
