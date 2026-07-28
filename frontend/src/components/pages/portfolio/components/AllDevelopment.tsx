import { useEffect, useState } from "react";
import { getAllDevelopmentsAPI } from "../../../../api/Api";
import AllDevBanner from "./AllDevBanner";

type DevelopmentItem = {
  _id?: string;
  title: string;
  image: string;
  link: string;
};

export  function AllDevelopment() {
  const [items, setItems] = useState<DevelopmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const res = await getAllDevelopmentsAPI();

        const data =
          res?.data?.data && Array.isArray(res.data.data)
            ? res.data.data
            : [];

        if (!cancelled) {
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to load developments:", error);

        if (!cancelled) {
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
<AllDevBanner/>
    <div className="py-6 sm:py-10 lg:py-16">
        
        
      <div className="relative mx-auto max-w-[1600px] px-4">

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-lg"
              >
                <div className="h-60 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                <div className="h-14 animate-pulse bg-gray-100" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {items.map((item, index) => (
              <a
                key={item._id ?? index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  bg-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="
                      h-60
                      w-full
                      object-cover
                      object-top
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                <div
                  className="
                    bg-white
                    px-4
                    py-4
                    text-center
                    text-sm
                    font-semibold
                    text-gray-800
                    sm:text-base
                  "
                >
                  {item.title}
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
    </>
  );
}