import { memo, useState } from "react";
import { Link } from "react-router-dom";
import finanzaly from  "../../../../assets/finanzally.webp";
import johatngo from  "../../../../assets/johatngo.webp";
import johatllc from  "../../../../assets/johatllc.webp";
import psitpops from  "../../../../assets/psitpops.webp";
import boss from "../../../../assets/boss.webp";
import innovare from "../../../../assets/innovare.webp";


const imageLinks = [
  finanzaly,
  johatngo,
  johatllc,
  psitpops,
  boss,
  innovare,
  "https://ahaanmedia.com/ahaanwebsite/AppDevelopment/2.webp",
  "https://ahaanmedia.com/ahaanwebsite/AppDevelopment/3.webp",
  "https://ahaanmedia.com/ahaanwebsite/AppDevelopment/4.webp",
  "https://ahaanmedia.com/ahaanwebsite/AppDevelopment/5.webp",
  
];

// Cycles through if there are more cards than colors —
// purely a visual accent, unrelated to the image data.
const ACCENTS = ["#DFA53A", "#7C3AED", "#2563EB", "#16A34A"];

type AppCardProps = {
  src: string;
  index: number;
  accent: string;
};

const AppCard = memo(({ src, index, accent }: AppCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      bg-white
      p-4
      shadow-xl
      transition-all
      duration-300
      hover:-translate-y-3
      hover:scale-105
      hover:shadow-[0_25px_45px_-12px_var(--accent)]
    "
      style={{ ["--accent" as string]: accent }}
    >
      {!loaded && (
        <div
          className="
          absolute
          inset-0
          animate-pulse
          rounded-2xl
          bg-gradient-to-r
          from-gray-200
          via-gray-100
          to-gray-200
        "
        />
      )}

      <img
        src={src}
        alt={`App Design ${index + 1}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`
          w-full
          rounded-xl
          transition-opacity
          duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
});

export default function AppDevelopment() {
  const visibleImages = imageLinks.slice(0, 4);
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-[1600px] px-4">
        {/* Heading */}
        <div className="mb-10 text-center lg:mb-14">

          <h2 className="heading-primary">

          App Development Designs
        </h2>

        <p className="lg:text-lg text-sm px-0 sm:px-8 mt-2">

         
            Clean and modern designs for mobile and web applications
          </p>
        </div>

        {/* Gallery */}
        <div
  className="
    grid
    grid-cols-1
    gap-6
    sm:grid-cols-2
    lg:grid-cols-4
  "
>
          {visibleImages.map((img, index) => (
  <AppCard
    key={img}
    src={img}
    index={index}
    accent={ACCENTS[index % ACCENTS.length]}
  />
))}
        </div>
      </div>
      <div className="text-center mt-12">
      
              <Link  to="/all-app-development"
                    className="shine-btn relative overflow-hidden uppercase
                      bg-gradient-to-r
                      from-[#C48A18]
                      to-[#E6B33C]
                      px-5
                      xl:px-6
                      2xl:px-8
                      py-3
                      xl:py-3.5
                      text-sm
                      xl:text-base
                      font-semibold
                      text-black
                      shadow-xl
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:from-[#B57A0C]
                      hover:to-[#D69D20]"
                  >View All
                  </Link>
      
            </div>
      
    </section>
  );
}
