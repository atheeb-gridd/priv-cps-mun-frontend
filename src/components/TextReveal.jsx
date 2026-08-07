import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TextReveal = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const line = textRef.current.querySelector('.line');

    gsap.fromTo(
      line,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: false,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <div style={{height: "0vh", padding: '50px' }}>
      <div
        ref={textRef}
        className="text-container"
        style={{ fontSize: '24px', lineHeight: '32px', overflow: 'hidden' }}
      >
        <div className="text-5xl font-bold text-[#fff] line">
         We do it Best, <span className='line text-cps-gold'> Welcome to CPS Prime MUN</span>
        </div>
      </div>
    </div>
  );
};

export default TextReveal;
