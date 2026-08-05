

export const BlogDetailsBanner = () => {

    return (
        <section
            className="section-banner"
            style={{ backgroundImage: `url("https://ahaanmedia.com/ahaanwebsite/Banner/Blog-Details.webp")`, }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 z-1" />

            {/* Banner Content Container constrained to max-w-[1600px] */}
            <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
                <div className="max-w-[900px] ">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                        Blogs Details
                    </h1>

                    <p className=" max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
                        Insights, trends, and expert perspectives designed to help you stay ahead
                        in the fast-evolving digital landscape, empowering your business with
                        knowledge-driven strategies and informed decision-making.
                    </p>
                </div>
            </div>
        </section>
    );
};