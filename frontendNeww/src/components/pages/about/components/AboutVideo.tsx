

export const AboutVideo = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 font-['Outfit',sans-serif]">
      <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-6 2xl:px-10">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            {/* Video Card Container */}
            <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl transition-all duration-300">
              <video
                className="h-auto w-full rounded-2xl object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://ahaanmedia.com/ahaanwebsite/video/about-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};