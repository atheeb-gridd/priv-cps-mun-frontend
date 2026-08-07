import React, { useEffect, useRef } from 'react';

const PremiumBackground = () => {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  // 1. CANVAS STARFIELD ANIMATION
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    // Adjust star density based on screen width
    const numStars = window.innerWidth < 768 ? 35 : 85;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.6 + 0.4,
          speedY: Math.random() * 0.12 + 0.04,
          opacity: Math.random() * 0.55 + 0.15,
          twinkleSpeed: Math.random() * 0.008 + 0.003,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          color: Math.random() > 0.35 ? 'rgba(255, 255, 255, ' : 'rgba(220, 168, 67, '
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Drift upwards
        star.y -= star.speedY;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Twinkle opacity oscillation
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity > 0.8) {
          star.opacity = 0.8;
          star.twinkleDir = -1;
        } else if (star.opacity < 0.1) {
          star.opacity = 0.1;
          star.twinkleDir = 1;
        }

        // Draw star with soft glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. CURSOR TRACKING GLOW
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
        glowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-[-20] bg-[#020203]">
      
      {/* Canvas Starfield */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[-18]" />

      {/* Subtle Structural Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-[-16]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220, 168, 67, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 168, 67, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px'
        }}
      />

      {/* Floating Glow Sphere 1 (Gold - Top Right) */}
      <div 
        className="fixed rounded-full pointer-events-none z-[-14] animate-float-1 blur-[130px] opacity-85"
        style={{
          top: '-10%',
          right: '5%',
          width: '45vw',
          height: '45vw',
          maxWidth: '550px',
          maxHeight: '550px',
          background: 'radial-gradient(circle, rgba(220, 168, 67, 0.14) 0%, rgba(220, 168, 67, 0) 70%)',
        }}
      />

      {/* Floating Glow Sphere 2 (Deep Bronze - Bottom Left) */}
      <div 
        className="fixed rounded-full pointer-events-none z-[-14] animate-float-2 blur-[120px] opacity-75"
        style={{
          bottom: '-5%',
          left: '-5%',
          width: '40vw',
          height: '40vw',
          maxWidth: '480px',
          maxHeight: '480px',
          background: 'radial-gradient(circle, rgba(138, 100, 33, 0.10) 0%, rgba(138, 100, 33, 0) 70%)',
        }}
      />

      {/* Floating Glow Sphere 3 (Midnight Indigo/Navy - Center Right) */}
      <div 
        className="fixed rounded-full pointer-events-none z-[-14] animate-float-3 blur-[140px] opacity-75"
        style={{
          top: '30%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          maxWidth: '600px',
          maxHeight: '600px',
          background: 'radial-gradient(circle, rgba(67, 102, 220, 0.08) 0%, rgba(67, 102, 220, 0) 70%)',
        }}
      />

      {/* Interactive Cursor Tracking Glow */}
      <div
        ref={glowRef}
        className="fixed rounded-full pointer-events-none z-[-12] blur-[150px] opacity-0 transition-opacity duration-700 hidden md:block"
        style={{
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(220, 168, 67, 0.1) 0%, rgba(220, 168, 67, 0) 70%)',
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
          left: '-999px',
          top: '-999px'
        }}
      />
    </div>
  );
};

export default PremiumBackground;
