
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

export function AllAppDevelopment() {
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
            <div className="flex justify-center py-16">
              <p className="text-sm text-gray-500">
                Loading app development designs...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && appDevelopments.length === 0 && (
            <div className="flex justify-center py-16">
              <p className="text-sm text-gray-500">
                No app development designs found.
              </p>
            </div>
          )}

          {/* Gallery */}
          {!loading && appDevelopments.length > 0 && (
            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {appDevelopments.map((item, index) => (
                <AppCard
                  key={item.id}
                  src={item.image}
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

