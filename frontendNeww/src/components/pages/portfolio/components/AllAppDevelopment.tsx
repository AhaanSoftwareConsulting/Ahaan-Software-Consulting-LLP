import { memo, useEffect, useState } from "react";
import AllAppBanner from "./AllAppBanner";
import { getAllAppDevelopmentsAPI } from "../../../../api/Api";

type AppDevelopmentItem = {
  id: number;
  image: string;
};

type AppCardProps = {
  src: string;
  index: number;
};

const AppCard = memo(({ src, index }: AppCardProps) => {
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
        hover:shadow-2xl
      "
    >
      {/* Loading Skeleton */}
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

      {/* Image */}
      <img
        src={src}
        alt={`App Design ${index + 1}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
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

export function AllAppDevelopment() {
  const [apps, setApps] = useState<AppDevelopmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadAppDevelopments = async () => {
      try {
        setLoading(true);

        const response = await getAllAppDevelopmentsAPI();

        let data: AppDevelopmentItem[] = [];

        /*
         * Expected API response:
         *
         * {
         *   success: true,
         *   total: 10,
         *   data: [
         *     {
         *       id: 1,
         *       image: "https://..."
         *     }
         *   ]
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

  return (
    <>
      <AllAppBanner />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="relative mx-auto max-w-[1600px] px-4">

          {/* Heading */}
          <div className="mb-10 text-center lg:mb-14">
            <h2 className="heading-primary">
              App Development Designs
            </h2>

            <p className="mt-2 px-4 text-sm sm:px-8 lg:text-lg">
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
                    bg-red-100
                  "
                />
              ))}
            </div>
          )}

          {/* No Data */}
          {!loading && apps.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-500">
                No app development designs available.
              </p>
            </div>
          )}

          {/* Gallery */}
          {!loading && apps.length > 0 && (
            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {apps.map((app, index) => (
                <AppCard
                  key={app.id}
                  src={app.image}
                  index={index}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}