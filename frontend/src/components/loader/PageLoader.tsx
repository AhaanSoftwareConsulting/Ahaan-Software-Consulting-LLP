import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isLoading?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading = true }) => {
  // 1. Performance Critical: If not loading, unmount immediately from DOM
  if (!isLoading) return null;

  const LOGO_URL = "https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp";
  const CIRCLE_RADIUS = 140;
  const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Performance optimization: alpha false where background is dark
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isRendering = true;

    // Reduced density for lower CPU/GPU usage
    let cols = Math.min(width < 640 ? 40 : 70, Math.floor(width / 18));
    let rows = width < 640 ? 18 : 24;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.min(width < 640 ? 40 : 70, Math.floor(width / 18));
      rows = width < 640 ? 18 : 24;
    };
    window.addEventListener('resize', handleResize);

    let count = 0;
    let lastTime = 0;
    const fps = 30; // 30 FPS Cap to prevent CPU throttle
    const interval = 1000 / fps;

    const render = (currentTime: number) => {
      if (!isRendering) return;
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      ctx.clearRect(0, 0, width, height);
      count += 0.02;

      const fov = width < 640 ? 180 : 260;
      const centerY = height * (width < 640 ? 0.70 : 0.65);
      const xSpacing = width / (cols - 4);

      const yellowGlow = `rgba(254, 240, 138, `;
      const baseAmber = `rgba(245, 158, 11, `;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const xPos = (x - cols / 2) * xSpacing;
          const zPos = y * (width < 640 ? 12 : 16) + 80;

          const wave1 = Math.sin(x * 0.12 + count) * (width < 640 ? 20 : 32);
          const wave2 = Math.cos(y * 0.15 + count * 0.8) * (width < 640 ? 14 : 22);
          const yPos = wave1 + wave2;

          const scale = fov / (fov + zPos);
          const screenX = width / 2 + xPos * scale;
          const screenY = centerY + yPos * scale;

          const alpha = (1 - zPos / 560) * scale * 0.85;
          if (alpha <= 0) continue;

          const particleSize = Math.max(0.6, scale * (width < 640 ? 1.8 : 2.4));

          ctx.beginPath();
          ctx.arc(screenX, screenY, particleSize, 0, Math.PI * 2);

          if (yPos < -8) {
            ctx.fillStyle = `${yellowGlow}${Math.min(1, alpha * 1.2)})`;
          } else {
            ctx.fillStyle = `${baseAmber}${alpha * 0.65})`;
          }
          ctx.fill();
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRendering = false;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          scale: 1.02,
          transition: { duration: 0.5, ease: "easeOut" } 
        }}
        className="fixed inset-0 w-full h-full h-[100dvh] z-[9999] flex flex-col items-center justify-center bg-[#030303] overflow-hidden select-none px-4"
      >
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block [will-change:transform]" />
          <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[95%] sm:w-[90%] h-[200px] sm:h-[300px] bg-amber-500/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-[#030303] pointer-events-none" />
        </div>

        <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] z-10 scale-90 sm:scale-100">
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none overflow-visible z-0" 
            viewBox="0 0 320 320"
          >
            <defs>
              <linearGradient id="goldRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#451a03" stopOpacity="0.1" />
              </linearGradient>
              <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <circle
              cx="160"
              cy="160"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="#1c1917"
              strokeWidth="1"
            />

            <motion.circle
              cx="160"
              cy="160"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="url(#goldRingGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#goldGlow)"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 0.2, duration: 1.8, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              opacity: { delay: 0.5, duration: 0.3 },
              rotate: { delay: 0.6, duration: 3.5, repeat: Infinity, ease: "linear" }
            }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            <div className="absolute top-[20px] left-[50%] -translate-x-1/2 h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_2px_#f59e0b]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 1.0, ease: "easeOut" }}
            className="relative z-20 flex items-center justify-center p-4 sm:p-6"
          >
            <img 
              src={LOGO_URL} 
              alt="Ahaan Software Consulting" 
              className="w-35 sm:w-52 md:w-60 max-w-[50vw] h-auto object-contain drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-6 sm:bottom-10 z-20 flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-amber-500/90 uppercase"
          >
            <span>LOADING</span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2, times: [0, 0.5, 1] }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4, times: [0, 0.5, 1] }}>.</motion.span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};