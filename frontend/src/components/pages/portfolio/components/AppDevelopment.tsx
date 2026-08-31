import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAppDevelopmentsAPI } from "../../../../api/Api";

const ACCENTS = ["#DFA53A", "#7C3AED", "#2563EB", "#16A34A"];

type AppDevelopmentItem = {
  id: number;
  image: string;
};

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
  const [appDevelopments, setAppDevelopments] = useState<
    AppDevelopmentItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppDevelopments = async () => {
      try {
        setLoading(true);

        const data = await getAllAppDevelopmentsAPI();

        console.log("App Development API Data:", data);

        setAppDevelopments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "❌ Failed to fetch app development projects:",
          error
        );
        setAppDevelopments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppDevelopments();
  }, []);

  // Show only first 4 designs on homepage
  const visibleImages = appDevelopments.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-[1600px] px-4">
        {/* Heading */}
        <div className="mb-10 text-center lg:mb-14">
          <h2 className="heading-primary">
            App Development Designs
          </h2>

          <p className="mt-2 px-0 text-sm sm:px-8 lg:text-lg">
            Clean and modern designs for mobile and web applications
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <p className="text-sm text-gray-500">
              Loading app development designs...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && appDevelopments.length === 0 && (
          <div className="flex justify-center py-10">
            <p className="text-sm text-gray-500">
              No app development designs found.
            </p>
          </div>
        )}

        {/* Gallery */}
        {!loading && visibleImages.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {visibleImages.map((item, index) => (
              <AppCard
                key={item.id}
                src={item.image}
                index={index}
                accent={ACCENTS[index % ACCENTS.length]}
              />
            ))}
          </div>
        )}
      </div>

      {/* View All */}
      {!loading && appDevelopments.length > 4 && (
        <div className="mt-12 text-center">
          <Link
            to="/all-app-development"
            className="
              shine-btn
              relative
              overflow-hidden
              uppercase
              bg-gradient-to-r
              from-[#C48A18]
              to-[#E6B33C]
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:from-[#B57A0C]
              hover:to-[#D69D20]
              xl:px-6
              xl:py-3.5
              xl:text-base
              2xl:px-8
            "
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
}

