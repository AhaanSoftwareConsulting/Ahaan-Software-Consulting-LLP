import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getMediaById,
  getSolutionBySlug,
  type WPMediaResponse,
  type WPSolution,
} from "../../../../api/WordpressAPI";

export const SolutionDetails = () => {
  const { slug } = useParams();

  const [solution, setSolution] = useState<WPSolution | null>(null);
  const [loading, setLoading] = useState(true);

  const [heroImage, setHeroImage] = useState("");

  const [featureImages, setFeatureImages] = useState<string[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchSolution = async () => {
      try {
        const data = await getSolutionBySlug(slug);

        if (!data) return;

        setSolution(data);

        const hero = await getMediaById(
          data.acf.hero_section_image
        );

        setHeroImage(hero?.source_url || "");

        const imageIds = [
          data.acf.feature_1_image,
          data.acf.feature_2_image,
          data.acf.feature_3_image,
          data.acf.feature_4_image,
          data.acf.feature_5_image,
        ];

        const images = await Promise.all(
          imageIds.map(async (id) => {
            if (!id) return "";

            const media: WPMediaResponse | null =
              await getMediaById(id);

            return media?.source_url || "";
          })
        );

        setFeatureImages(images);
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [slug]);

  if (loading) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-3xl font-bold">
          Loading...
        </h2>
      </section>
    );
  }

  if (!solution) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-3xl font-bold">
          Solution Not Found
        </h2>
      </section>
    );
  }

  const features = [
    {
      title: solution.acf.feature_1_title,
      description: solution.acf.feature_1_description,
      image: featureImages[0],
    },
    {
      title: solution.acf.feature_2_title,
      description: solution.acf.feature_2_description,
      image: featureImages[1],
    },
    {
      title: solution.acf.feature_3_title,
      description: solution.acf.feature_3_description,
      image: featureImages[2],
    },
    {
      title: solution.acf.feature_4_title,
      description: solution.acf.feature_4_description,
      image: featureImages[3],
    },
    {
      title: solution.acf.feature_5_title,
      description: solution.acf.feature_5_description,
      image: featureImages[4],
    },
  ].filter((item) => item.title);

    return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white text-[#1c1d20]">
        <div className="max-w-[1600px] mx-auto space-y-24">

          {/* HERO */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-6 space-y-6">

              <span className="text-sm font-bold tracking-widest text-[#d29b38] uppercase bg-amber-50 px-4 py-2 rounded-full border border-amber-200 inline-block">
                {solution.title.rendered}
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                {solution.acf.hero_section_title}
              </h2>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {solution.acf.hero_section_description}
              </p>

            </div>

            <div className="lg:col-span-6 h-[350px] sm:h-[450px] overflow-hidden shadow-2xl border border-gray-100 bg-gray-100">

              {heroImage && (
                <img
                  src={heroImage}
                  alt={solution.title.rendered}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              )}

            </div>

          </div>

          {/* Highlight */}

          {(solution.acf.highlight_title ||
            solution.acf.highlight_description) && (

            <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 sm:p-12 text-center shadow-xl">

              <div className="relative z-10 max-w-5xl mx-auto">

                {solution.acf.highlight_title && (
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#d29b38]">
                    {solution.acf.highlight_title}
                  </h3>
                )}

                {solution.acf.highlight_description && (
                  <p className="text-gray-300 mt-5 whitespace-pre-line">
                    {solution.acf.highlight_description}
                  </p>
                )}

              </div>

            </div>
          )}

          {/* Feature Heading */}

          <div className="text-center">

            <h3 className="text-3xl sm:text-4xl font-extrabold">

              {solution.acf.key_features_heading}

            </h3>

            <div className="w-24 h-1.5 bg-[#d29b38] mx-auto mt-4 rounded-full"></div>

          </div>

          {/* FEATURES */}

          <div className="space-y-24">

            {features.map((feature, index) => {

              const reverse = index % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    reverse ? "lg:flex-row-reverse" : ""
                  }`}
                >

                  <div className="lg:w-1/2 w-full h-[320px] sm:h-[420px] overflow-hidden shadow-lg ">

                    {feature.image && (
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    )}

                  </div>

                  <div className="lg:w-1/2 space-y-5">

                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 border text-[#d29b38] font-bold">

                      {String(index + 1).padStart(2, "0")}

                    </div>

                    <h3 className="text-3xl font-extrabold">

                      {feature.title}

                    </h3>

                    <p className="text-gray-600 whitespace-pre-line leading-8">

                      {feature.description}

                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>
    </>
  );
};

export default SolutionDetails;