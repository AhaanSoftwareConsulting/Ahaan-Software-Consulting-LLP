import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCaseStudyBySlug, getMediaById } from "../../../../api/WordpressAPI";
import type { WPCustomPost, WPMediaResponse } from "../../../../api/WordpressAPI";
import type { AcfFields, ImagesState, Solution } from "../../../../types/caseStudies";


interface CaseStudyPost extends WPCustomPost {
    acf: AcfFields;
}

const CARD_SHADOW =
    "shadow-[-20px_20px_30px_rgba(0,0,0,0.4),-35px_35px_30px_rgba(135,135,135,0.4)]";

export const CaseStudyDetails = () => {
    const { slug } = useParams<{ slug: string }>();

    const [data, setData] = useState<CaseStudyPost | null>(null);
    const [images, setImages] = useState<ImagesState>({});

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const loadData = async () => {
        if (!slug) return;

        try {
            const response = (await getCaseStudyBySlug(
                slug,
            )) as CaseStudyPost | null;

            if (!response) return;

            setData(response);

            const acf = response.acf || {};

            const mediaIds = [
                acf.project_overview_image,
                acf.challenges_image,
                acf.technology_1_logo,
                acf.technology_2_logo,
                acf.technology_3_logo,
                acf.technology_4_logo,
                acf.technology_5_logo,
                acf.solution_1_image,
                acf.solution_2_image,
                acf.solution_3_image,
                acf.solution_4_image,
                acf.solution_5_image,
                acf["key_features_&_benefits_image"],
                acf.business_impact_image,
                acf.design_highlights_image,
                acf.project_details_image,
            ];

            const mediaResponses: (WPMediaResponse | null)[] = await Promise.all(
                mediaIds.map((id) => (id ? getMediaById(id) : Promise.resolve(null))),
            );

            setImages({
                projectOverview: mediaResponses[0]?.source_url,
                challenges: mediaResponses[1]?.source_url,
                tech1: mediaResponses[2]?.source_url,
                tech2: mediaResponses[3]?.source_url,
                tech3: mediaResponses[4]?.source_url,
                tech4: mediaResponses[5]?.source_url,
                tech5: mediaResponses[6]?.source_url,
                solution1: mediaResponses[7]?.source_url,
                solution2: mediaResponses[8]?.source_url,
                solution3: mediaResponses[9]?.source_url,
                solution4: mediaResponses[10]?.source_url,
                solution5: mediaResponses[11]?.source_url,
                featureImage: mediaResponses[12]?.source_url,
                businessImpact: mediaResponses[13]?.source_url,
                designHighlights: mediaResponses[14]?.source_url,
                projectDetails: mediaResponses[15]?.source_url,
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) return <div className="text-center py-16 text-lg">Loading...</div>;

    const acf = data.acf || {};

    const solutions: Solution[] = [
        {
            title: acf.solution_1_title,
            description: acf.solution_1_description,
            image: images.solution1,
        },
        {
            title: acf.solution_2_title,
            description: acf.solution_2_description,
            image: images.solution2,
        },
        {
            title: acf.solution_3_title,
            description: acf.solution_3_description,
            image: images.solution3,
        },
        {
            title: acf.solution_4_title,
            description: acf.solution_4_description,
            image: images.solution4,
        },
        {
            title: acf.solution_5_title,
            description: acf.solution_5_description,
            image: images.solution5,
        },
    ].filter((item) => item.title && item.description && item.image);

    return (
        <div className="w-full bg-white text-[#111111]">
            <style>{`
        @keyframes textShine {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
      `}</style>

            {/* HERO SECTION */}
            <section
                className="relative flex max-h-[600px] items-center bg-cover bg-center bg-no-repeat "
                style={{
                    backgroundImage:
                        "url('https://ahaanmedia.com/ahaanwebsite/Banner/CaseStudy.jpg')",
                }}
            >
                <div className="w-full py-16 md:py-24">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <div className="flex sm:grid grid-cols-2 gap-4 lg:gap-6 items-center">
                            {/* Left Content */}
                            <div>
                                <h1 className="mb-6 text-2xl sm:text-4xl lg:text-6xl font-bold text-white ">
                                    {data.title.rendered}
                                </h1>

                                <div
                                    className="text-white text-sm sm:text-base"
                                    dangerouslySetInnerHTML={{
                                        __html: data.content.rendered,
                                    }}
                                />
                            </div>

                            {/* Right Featured Image */}
                            <div className="flex justify-center">
                                <img
                                    src={data?._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                                    alt={data.title.rendered}
                                    className="w-full  min-w-[80px] max-w-[200px] rounded-[20px] object-cover shadow-[20px_20px_30px_rgba(0,0,0,0.7),35px_35px_30px_rgba(135,135,135,0.7)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT OVERVIEW (Left: Content | Right: Image) */}
            {acf.project_overview && images.projectOverview && (
                <section className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
                            <div>
                                <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize leading-tight text-black">
                                    Project Overview
                                </h2>
                                <p className="text-sm lg:text-base leading-relaxed text-[#111]">
                                    {acf.project_overview}
                                </p>
                            </div>

                            <div className="flex justify-center lg:justify-end">
                                <img
                                    src={images.projectOverview}
                                    className={`w-full max-w-[560px] rounded-[20px] object-cover ${CARD_SHADOW}`}
                                    alt="Project Overview"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CHALLENGES (Left: Image | Right: Content) */}
            {acf.challenges && images.challenges && (
                <section className="bg-white py-6 lg:py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
                            <div className="order-2 md:order-1 flex justify-center lg:justify-start">
                                <img
                                    src={images.challenges}
                                    className={`w-full max-w-[560px] rounded-[20px] object-cover ${CARD_SHADOW}`}
                                    alt="Challenges"
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize text-black">
                                    Challenges
                                </h2>

                                <div
                                    className="text-sm lg:text-base text-[#111] [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-3 "
                                    dangerouslySetInnerHTML={{
                                        __html: acf.challenges,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* KEY FEATURES & BENEFITS (Left: Content | Right: Image) */}
            {acf["key_features_&_benefits"] && images.featureImage && (
                <section className="bg-[#f3f3f3] py-6 lg:py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
                            <div>
                                <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize text-black">
                                    Key Features &amp; Benefits
                                </h2>

                                <div
                                    className="text-sm lg:text-base text-[#111] [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-5 [&_li]:mb-3 "
                                    dangerouslySetInnerHTML={{
                                        __html: acf["key_features_&_benefits"],
                                    }}
                                />
                            </div>

                            <div className="flex justify-center lg:justify-end">
                                <img
                                    src={images.featureImage}
                                    className={`w-full max-w-[560px] rounded-[20px] object-cover ${CARD_SHADOW}`}
                                    alt="Key Features & Benefits"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* TECHNOLOGIES */}
            {images.tech1 &&
                images.tech2 &&
                images.tech3 &&
                images.tech4 &&
                images.tech5 && (
                    <section className="bg-[#161616] py-16 md:py-24 text-center">
                        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                            <h2 className="mb-10 lg:mb-12 text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize text-[#e1aa23]">
                                Technologies &amp; Methodologies Used
                            </h2>

                            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
                                {[
                                    images.tech1,
                                    images.tech2,
                                    images.tech3,
                                    images.tech4,
                                    images.tech5,
                                ].map((src, i) => (
                                    <div
                                        key={i}
                                        className="flex h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 items-center justify-center rounded-full bg-white shrink-0"
                                    >
                                        <img
                                            src={src}
                                            alt="Technology Logo"
                                            className="h-11 w-11 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            {/* SOLUTIONS TIMELINE */}
            {solutions.length > 0 && (
                <section className="bg-white py-6 lg:py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-12 lg:mb-16 text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize text-black">
                            The Solutions Provided
                        </h2>

                        <div className="relative mx-auto max-w-[1100px] before:absolute before:left-5 md:before:left-1/2 before:top-0 before:h-full before:w-1 before:-translate-x-1/2 before:bg-black">
                            {solutions.map((item, index) => {
                                const isRight = index % 2 !== 0;
                                return (
                                    <div
                                        key={index}
                                        className={`relative mb-12 lg:mb-16 w-full pl-14 md:pl-0 md:w-1/2 ${isRight
                                            ? "md:left-1/2 md:pl-10 text-left"
                                            : "md:left-0 md:pr-10 md:text-right text-left"
                                            }`}
                                    >
                                        {/* Timeline Dot */}
                                        <div
                                            className={`absolute top-[15px] z-10 h-[18px] w-[18px] rounded-full border-[3px] border-[#060501] bg-[#e8b826] left-[11px] ${isRight ? "md:-left-[9px]" : "md:left-auto md:-right-[9px]"
                                                }`}
                                        />

                                        <div>
                                            <h3 className="mb-2 text-xl sm:text-2xl lg:text-3xl font-extrabold capitalize text-[#cea21c]">
                                                {item.title}
                                            </h3>

                                            <p className="mb-5 text-base font-medium leading-relaxed">
                                                {item.description}
                                            </p>

                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className={`w-full max-w-[320px] rounded-[20px] object-cover ${CARD_SHADOW} ${isRight ? "mr-auto" : "ml-0 lg:ml-auto"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* BUSINESS IMPACT (Left: Image | Right: Content) */}
            {acf.business_impact && images.businessImpact && (
                <section className="bg-white py-6 lg:py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
                            <div className="order-2 md:order-1 flex justify-center lg:justify-start">
                                <img
                                    src={images.businessImpact}
                                    className={`w-full max-w-[560px] rounded-[20px] object-cover ${CARD_SHADOW}`}
                                    alt="Business Impact"
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize text-black">
                                    Business Impact
                                </h2>

                                <div
                                    className="text-sm lg:text-base text-[#111] [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pl-5 [&_li]:mb-3 "
                                    dangerouslySetInnerHTML={{
                                        __html: acf.business_impact,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* DESIGN HIGHLIGHTS (Left: Content | Right: Image) */}
            {acf.design_highlights && images.designHighlights && (
                <section className="bg-white py-6 lg:py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
                            <div>
                                <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize text-black">
                                    Design Highlights
                                </h2>

                                <div
                                    className="text-sm lg:text-lg  text-[#111] [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pl-5 [&_li]:mb-3"
                                    dangerouslySetInnerHTML={{
                                        __html: acf.design_highlights,
                                    }}
                                />
                            </div>

                            <div className="flex justify-center lg:justify-end">
                                <img
                                    src={images.designHighlights}
                                    className={`w-full max-w-[560px] rounded-[20px] object-cover ${CARD_SHADOW}`}
                                    alt="Design Highlights"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* WHY THIS PROJECT STANDS OUT */}
            {acf.why_this_project_stands_out && (
                <section className="relative overflow-hidden bg-[#0b0f1f] py-8 md:py-16 before:absolute before:-left-[100px] before:-top-[100px] before:h-[350px] before:w-[350px] before:rounded-full before:bg-[rgba(255,193,7,0.08)] before:blur-[80px] after:absolute after:-bottom-[100px] after:-right-[100px] after:h-[300px] after:w-[300px] after:rounded-full after:bg-[rgba(255,193,7,0.06)] after:blur-[80px]">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="rounded-[24px] border border-[rgba(255,193,7,0.15)] bg-[rgba(255,255,255,0.04)] p-8 sm:p-12 lg:p-16 backdrop-blur-[10px] text-white">
                            <h2 className="relative mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-white after:mt-4 after:block after:h-1 after:w-[90px] after:rounded-full after:bg-[#ffc107]">
                                Why This Project Stands Out
                            </h2>

                            <div
                                className="text-base lg:text-lg leading-relaxed [&_ul]:pl-5 [&_li]:mb-4 [&_li]:leading-relaxed [&_li::marker]:text-[#ffc107]"
                                dangerouslySetInnerHTML={{
                                    __html: acf.why_this_project_stands_out,
                                }}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* PROJECT DETAILS (Left: Image | Right: Content) */}
            {acf.project_details && images.projectDetails && (
                <section className="bg-white py-6 lg:py-16">
                    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                            <div className="order-2 md:order-1 flex justify-center lg:justify-start">
                                <img
                                    src={images.projectDetails}
                                    className={`w-full max-w-[560px] rounded-[20px] object-cover ${CARD_SHADOW}`}
                                    alt="Project Details"
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize text-black">
                                    Project Details
                                </h2>

                               <div
  className="text-sm lg:text-lg  text-[#111]
             [&_ul]:list-disc [&_ul]:list-outside [&_ul]:pl-5
             [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:pl-5
             [&_li]:mb-3 "
  dangerouslySetInnerHTML={{
    __html: acf.project_details,
  }}
/>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
