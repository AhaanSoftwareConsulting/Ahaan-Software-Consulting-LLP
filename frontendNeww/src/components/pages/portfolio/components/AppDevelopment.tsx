import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAppDevelopmentsAPI } from "../../../../api/Api";

// --------------------------------------------------
// App Development Item
// --------------------------------------------------

type AppDevelopmentItem = {
  id: number;
  image: string;
};

// --------------------------------------------------
// Accent colors — purely visual
// --------------------------------------------------

const ACCENTS = [
  "#DFA53A",
  "#7C3AED",
  "#2563EB",
  "#16A34A",
];

// --------------------------------------------------
// App Card
// --------------------------------------------------

type AppCardProps = {
  src: string;
  index: number;
  accent: string;
};

const AppCard = memo(
  ({ src, index, accent }: AppCardProps) => {
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
        style={{
          ["--accent" as string]: accent,
        }}
      >
        {/* Loading skeleton */}
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

        {/* App Design Image */}
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
  }
);

// --------------------------------------------------
// App Development Section
// --------------------------------------------------

export default function AppDevelopment() {
  const [apps, setApps] = useState<AppDevelopmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Only show 4 on homepage
  const visibleCount = 4;

  useEffect(() => {
    let cancelled = false;

    const loadAppDevelopments = async () => {
      try {
        setLoading(true);

        const response = await getAllAppDevelopmentsAPI();

        let data: AppDevelopmentItem[] = [];

        /*
         * Expected backend response:
         *
         * {
         *   success: true,
         *   total: 10,
         *   data: [...]
         * }
         */

        if (Array.isArray(response)) {
          data = response;
        } else if (Array.isArray(response?.data)) {
          data = response.data;
        }

        if (!cancelled) {
          setApps(data);
        }
      } catch (error) {
        console.error(
          "Failed to load app development projects:",
          error
        );

        if (!cancelled) {
          setApps([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAppDevelopments();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleApps = apps.slice(0, visibleCount);

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
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-[250px]
                  animate-pulse
                  rounded-2xl
                  bg-gray-100
                "
              />
            ))}
          </div>
        )}

        {/* No data */}
        {!loading && apps.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500">
              No app development designs available.
            </p>
          </div>
        )}

        {/* Gallery */}
        {!loading && visibleApps.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {visibleApps.map((app, index) => (
              <AppCard
                key={app.id}
                src={app.image}
                index={index}
                accent={ACCENTS[index % ACCENTS.length]}
              />
            ))}
          </div>
        )}
      </div>

      {/* View All */}
      {!loading && apps.length > 4 && (
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