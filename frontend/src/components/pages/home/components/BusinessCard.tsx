

// Left, Middle, and Right images
const leftImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery1.webp", // Image 1
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery2.webp", // Image 2
];

const middleImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery3.webp", // Image 3
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery4.webp", // Image 4
];

const rightImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery5.webp", // Image 5
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery6.webp", // Image 6
];

const middleRightImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery7.webp", // Image 7
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery8.webp", // Image 8
];

// Reusable class strings -----------------------------------------------

// .side-image-card
const cardBase =
  "max-w-[130px] h-[150px] overflow-hidden rounded-md " +
  "shadow-[0_10px_20px_rgba(0,0,0,0.15),0_20px_40px_rgba(0,0,0,0.25),0_30px_60px_rgba(0,0,0,0.15)]";

// .image-column
const imageColumn = "flex flex-col gap-2.5 min-[501px]:max-[991px]:gap-[5px]";

// .first-column  -> hidden below 992px, opacity 80% between 992-1023px
const firstColumn =
  "relative bottom-[-100px] hidden min-[992px]:flex min-[992px]:max-[1023px]:opacity-80";

// .second-column -> hidden below 992px, opacity 90% between 992-1023px
const secondColumn =
  "relative top-[20px] hidden min-[992px]:flex min-[992px]:max-[1023px]:opacity-90";

// .third-column -> always visible
const thirdColumn = "relative top-[100px]";

// .fourth-column -> hidden 992-1023px and hidden below/at 500px
const fourthColumn =
  "relative top-[30px] block min-[992px]:max-[1023px]:hidden max-[500px]:hidden";

// .final-column -> always visible, top offset changes per breakpoint
const finalColumn =
  "relative top-[80px] min-[992px]:max-[1023px]:top-[40px] min-[501px]:max-[991px]:top-[20px]";

// .third-column-mobile / .final-column-mobile -> only visible at <=500px
const thirdColumnMobile = "relative top-[50px] min-[501px]:hidden";
const finalColumnMobile = "relative top-[70px] min-[501px]:hidden";

export const BusinessCard = () => {
  return (
    <div
      className="pt-5"
      style={{
        background:
          "linear-gradient(180deg, #f1e7c6 0%, #E6E6E6 80%, #e6dbbb 100%)",
      }}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        {/* --- Main image layout row --- */}
        <div
          className={
            "flex items-start relative justify-center gap-2.5 min-h-[200px] " +
            "min-[992px]:max-[1023px]:min-h-[150px] " +
            "min-[501px]:max-[991px]:gap-2 min-[501px]:max-[991px]:min-h-[150px] " +
            "max-[500px]:gap-1.5 max-[500px]:min-h-[250px]"
          }
        >
          {/* --- Left Column (Images 1, 2) --- */}
          <div className={`${imageColumn} ${firstColumn}`}>
            {leftImages.map((url, index) => (
              <div key={`L-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Left Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* --- Middle Column (Images 3, 4) --- */}
          <div className={`${imageColumn} ${secondColumn}`}>
            {middleImages.map((url, index) => (
              <div key={`M-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Middle Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className={`${cardBase} ${thirdColumn}`}>
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery8.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className={`${cardBase} ${fourthColumn}`}>
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery10.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${cardBase} ${finalColumn}`}>
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery9.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${cardBase} ${fourthColumn}`}>
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery12.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${cardBase} ${thirdColumn}`}>
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery11.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* --- Right Column (Images 5, 6) --- */}
          <div className={`${imageColumn} ${secondColumn}`}>
            {rightImages.map((url, index) => (
              <div key={`R-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Right Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* --- Middle-Right Column (Images 7, 8) --- */}
          <div className={`${imageColumn} ${firstColumn}`}>
            {middleRightImages.map((url, index) => (
              <div key={`MR-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Middle-Right Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Central content --- */}
        <div
          className={
            "relative -top-5 text-center max-w-[60%] " +
            "min-[992px]:max-[1023px]:top-0 min-[992px]:max-[1023px]:max-w-[40%] " +
            "min-[501px]:max-[991px]:top-[40px] " +
            "max-[500px]:top-[20px] max-[500px]:max-w-[80%]"
          }
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#161616] leading-tight"
          >
            Trusted by Businesses Worldwide
          </h2>
          <p
            className=
            "lg:text-base text-sm px-4 sm:px-8 mt-3 text-[#000] leading-7  mx-auto"
          >
            We aren't just another service provider. We act as a high-velocity extension of your core engine, combining modern workflows with precise tactical execution.
          </p>
        </div>

        {/* --- Mobile-only image row --- */}
        <div className="flex items-start relative justify-center gap-2.5 min-h-[200px]">
          <div className={`${cardBase} ${thirdColumnMobile}`}>
            <img
              src="https://ahaanmedia.com/asc/gallery/gallery1.jpg"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${cardBase} ${finalColumnMobile}`}>
            <img
              src="https://ahaanmedia.com/asc/gallery/gallery2.jpg"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${cardBase} ${thirdColumnMobile}`}>
            <img
              src="https://ahaanmedia.com/asc/gallery/gallery3.jpg"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Animated gradient text - not expressible via plain Tailwind utilities */}
      <style>{`
        .gradient-title {
          background: linear-gradient(90deg, #000000, #cfa74a, #000000);
          background-size: 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 4s ease-in-out infinite;
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};


