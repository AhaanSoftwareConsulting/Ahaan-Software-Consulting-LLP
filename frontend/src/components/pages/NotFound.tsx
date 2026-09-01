import { Link, useLocation } from "react-router-dom";

// 👈 ১. SEO Component Import (প্রজেক্টের সঠিক পাথ অনুযায়ী প্রয়োজন হলে আপডেট করুন)
import { SEO } from "../seo/SEO";

export const NotFoundComponent = () => {
  const location = useLocation();
  return (
    <>
      {/* 👈 ২. Static 404 SEO Integration */}
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        path={location.pathname}
      />

      <section className="nf-flicker relative min-h-screen w-full overflow-hidden bg-[#07080B] text-slate-200">
        <style>{`
          /* room flicker — irregular, like a dying bulb, not a strobe */
          @keyframes nf-room-flicker {
            0%, 100% { opacity: 1; }
            3%  { opacity: .35; }
            6%  { opacity: 1; }
            7%  { opacity: .5; }
            9%  { opacity: 1; }
            40% { opacity: 1; }
            41% { opacity: .3; }
            43% { opacity: 1; }
            71% { opacity: 1; }
            72% { opacity: .45; }
            74% { opacity: 1; }
          }
          .nf-flicker::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 20%, rgba(153,27,27,0.10), transparent 55%);
            animation: nf-room-flicker 7s infinite;
            pointer-events: none;
          }

          /* one on-load jolt, then it settles — the "jump" */
          @keyframes nf-jolt {
            0%   { transform: translate(0,0); }
            4%   { transform: translate(-6px,3px); }
            8%   { transform: translate(5px,-4px); }
            12%  { transform: translate(-3px,2px); }
            16%  { transform: translate(0,0); }
            100% { transform: translate(0,0); }
          }
          .nf-jolt { animation: nf-jolt 1.2s ease-out 1; }

          /* heartbeat scale, steady thump-thump then a long gap — like a real pulse */
          @keyframes nf-heartbeat {
            0%   { transform: scale(1); }
            6%   { transform: scale(1.09); }
            12%  { transform: scale(1); }
            18%  { transform: scale(1.14); }
            26%  { transform: scale(1); }
            100% { transform: scale(1); }
          }
          .nf-heartbeat { animation: nf-heartbeat 2.4s infinite; transform-origin: center; }

          /* the EKG line: draws in, flatlines, then spikes hard */
          .nf-ekg-path {
            stroke-dasharray: 900;
            stroke-dashoffset: 900;
            animation: nf-ekg-draw 6s linear infinite;
          }
          @keyframes nf-ekg-draw {
            0%   { stroke-dashoffset: 900; }
            70%  { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -20; }
          }

          /* red flash the instant the line flatlines then spikes back */
          @keyframes nf-scare-flash {
            0%, 65%, 100% { background-color: transparent; }
            68% { background-color: rgba(220,38,38,0.18); }
            70% { background-color: transparent; }
          }
          .nf-scare-flash { animation: nf-scare-flash 6s infinite; }

          .nf-glitch-text {
            text-shadow: 0 0 24px rgba(220,38,38,0.35);
          }

          @media (prefers-reduced-motion: reduce) {
            .nf-flicker::before,
            .nf-jolt,
            .nf-heartbeat,
            .nf-ekg-path,
            .nf-scare-flash {
              animation: none !important;
            }
          }
        `}</style>

        {/* full-bleed flash overlay tied to the flatline beat */}
        <div className="nf-scare-flash pointer-events-none absolute inset-0" />

        <div className="nf-jolt mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          {/* left: copy */}
          <div className="relative flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500/70">
              Vitals Monitor · Room 404
            </span>

            <h1 className="nf-heartbeat nf-glitch-text mt-4 text-7xl font-black leading-none tracking-tight text-white sm:text-8xl">
              404
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
              This page's pulse dropped to zero at{" "}
              <span className="text-red-400">03:04 AM</span>. IT has been
              notified.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Something is still moving in the server room. It isn't this
              page anymore.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#07080B] transition hover:bg-slate-200"
              >
                Run back to homepage
              </Link>
              <Link
                to="/contact-us"
                className="rounded-md border border-red-500/40 px-6 py-3 text-sm font-semibold text-red-300 transition hover:border-red-400"
              >
                Report the sighting
              </Link>
            </div>
          </div>

          {/* right: heart monitor */}
          <div className="flex flex-col justify-center">
            <div className="rounded-lg border border-red-900/40 bg-black/40 p-6">
              <div className="mb-4 flex items-center justify-between font-mono text-xs text-slate-500">
                <span>PATIENT: PAGE_404</span>
                <span className="text-red-500">FLATLINE DETECTED</span>
              </div>

              <svg viewBox="0 0 400 140" className="w-full overflow-visible">
                <line x1="0" y1="35" x2="400" y2="35" stroke="#ffffff08" strokeWidth="1" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="#ffffff08" strokeWidth="1" />
                <line x1="0" y1="105" x2="400" y2="105" stroke="#ffffff08" strokeWidth="1" />

                <path
                  className="nf-ekg-path"
                  d="M0,70 L60,70 L75,70 L85,20 L95,120 L105,70 L160,70 L175,70 L185,35 L195,105 L205,70 L400,70"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="mt-4 flex justify-between font-mono text-[10px] text-slate-600">
                <span>LAST SEEN</span>
                <span>NO SIGNAL</span>
                <span>NOW</span>
              </div>
            </div>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-slate-600">
              Do not turn off the lights.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundComponent;