import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isLoading?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading = true }) => {
  const LOGO_URL = "https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp";

  const CIRCLE_RADIUS = 140;
  const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isRendering = true;

    // Device Pixel Ratio & Mesh Column Dynamic Adjustment for smooth mobile rendering
    let cols = Math.min(width < 640 ? 60 : 100, Math.floor(width / 14));
    let rows = width < 640 ? 22 : 30;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.min(width < 640 ? 60 : 100, Math.floor(width / 14));
      rows = width < 640 ? 22 : 30;
    };
    window.addEventListener('resize', handleResize);

    let count = 0;

    const render = () => {
      if (!isRendering) return;

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

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRendering = false;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
          className="fixed inset-0 w-full h-full h-[100dvh] z-[9999] flex flex-col items-center justify-center bg-[#030303] overflow-hidden select-none px-4"
        >
          {/* ========================================== */}
          {/* FULL WIDTH SMOOTH 3D MESH WAVE            */}
          {/* ========================================== */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            {/* Safe Ambient Golden Illumination */}
            <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[95%] sm:w-[90%] h-[200px] sm:h-[300px] bg-amber-500/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-[#030303] pointer-events-none" />
          </div>

          {/* ========================================== */}
          {/* MAIN CIRCULAR LOADER FRAME & LOGO          */}
          {/* ========================================== */}
          <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] z-10 scale-90 sm:scale-100">

            {/* 1. Animated SVG Gold Circle Path */}
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

              {/* Dim Base Circle Guide */}
              <circle
                cx="160"
                cy="160"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="#1c1917"
                strokeWidth="1"
              />

              {/* Completing Circle Animation */}
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
                transition={{
                  delay: 0.5,
                  duration: 2.0,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* 2. Independent Yellow Glowing Dot Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{
                opacity: { delay: 0.8, duration: 0.5 },
                rotate: { delay: 1.0, duration: 3.5, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <div className="absolute top-[20px] left-[50%] -translate-x-1/2 h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_2px_#f59e0b]" />
            </motion.div>

            {/* 3. Main ASC Logo Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                delay: 0.3,
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-20 flex items-center justify-center p-4 sm:p-6"
            >
              <img 
                src={LOGO_URL} 
                alt="Ahaan Software Consulting" 
                className="w-35 sm:w-52 md:w-60 max-w-[50vw] h-auto object-contain drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              />
            </motion.div>

            {/* 4. Animated LOADING Text & Animated Dots */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-6 sm:bottom-10 z-20 flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-amber-500/90 uppercase"
            >
              <span>LOADING</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};