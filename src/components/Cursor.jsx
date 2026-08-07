import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Cursor = () => {
  const [showSwipeContent, setShowSwipeContent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorRef = useRef(null);
  const swipeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: posX, clientY: posY } = e;

      // Direct DOM updates for zero-lag instant follow speed
      if (cursorRef.current) {
        cursorRef.current.style.left = `${posX}px`;
        cursorRef.current.style.top = `${posY}px`;
      }
      
      if (swipeRef.current) {
        swipeRef.current.style.left = `${posX + 20}px`;
        swipeRef.current.style.top = `${posY + 20}px`;
      }

      const container = document.getElementById('previous-mun-photos');
      if (container) {
        const rect = container.getBoundingClientRect();
        if (
          posX >= rect.left &&
          posX <= rect.right &&
          posY >= rect.top &&
          posY <= rect.bottom
        ) {
          setShowSwipeContent(true);
        } else {
          setShowSwipeContent(false);
        }
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className='cursor-dot hidden md:block'
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: 99999,
          pointerEvents: 'none',
          willChange: 'top, left',
        }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.1s ease-out',
            filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.6))'
          }}
        >
          <defs>
            <linearGradient id="goldCursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="50%" stopColor="#DCA843" />
              <stop offset="100%" stopColor="#8A6421" />
            </linearGradient>
          </defs>
          <path 
            d="M2 2 L2 22 L8 8 L22 2 Z" 
            fill={isHovered ? "url(#goldCursorGradient)" : "rgba(0, 0, 0, 0.7)"} 
            stroke="url(#goldCursorGradient)" 
            strokeWidth="2.2" 
            strokeLinejoin="miter"
          />
        </svg>
      </div>
      {showSwipeContent && (
        <div
          ref={swipeRef}
          className='swipe-content gap-1 text-[#fff] justify-center items-center hidden md:flex'
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: 100,
            willChange: 'top, left',
          }}
        >
          <FaArrowLeft /> Swipe <FaArrowRight />
        </div>
      )}
    </>
  );
};

export default Cursor;
