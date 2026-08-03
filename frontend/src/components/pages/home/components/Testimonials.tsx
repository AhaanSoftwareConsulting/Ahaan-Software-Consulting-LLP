import { useEffect, useState } from "react";
import {CaretLeftIcon , CaretRightIcon } from "@phosphor-icons/react";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  color: string;
  image: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://ahaan-admin.ahaanmedia.com/wp-json/wp/v2/testimonial"
        );

        const data = await response.json();

        const formatted: Testimonial[] = await Promise.all(
          data.map(async (item: any) => {
            let image = "";

            if (item.acf?.client_image) {
              const mediaRes = await fetch(
                `https://ahaan-admin.ahaanmedia.com/wp-json/wp/v2/media/${item.acf.client_image}`
              );

              const media = await mediaRes.json();

              image = media.source_url;
            }

            return {
              name: item.acf?.client_name || "",
              review: item.acf?.client_review || "",
              rating: Number(item.acf?.rating) || 5,
              color: item.acf?.color || "#E6B33C",
              image,
            };
          })
        );

        setTestimonials(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTestimonials();
  }, []);
  useEffect(() => {
  const resize = () => {
    if (window.innerWidth >= 1024) {
      setVisibleCards(3);
    } else if (window.innerWidth >= 768) {
      setVisibleCards(2);
    } else {
      setVisibleCards(1);
    }
  };


  resize();

  window.addEventListener("resize", resize);

  return () => window.removeEventListener("resize", resize);
}, []);

const sliderData =
  testimonials.length > 0
    ? [...testimonials, ...testimonials]
    : [];

useEffect(() => {
  if (!testimonials.length) return;

  const timer = setInterval(() => {
    setIndex((prev) => prev + 1);
  }, 3000);

  return () => clearInterval(timer);
}, [testimonials]);

useEffect(() => {
  if (index >= testimonials.length && testimonials.length) {
    const timer = setTimeout(() => {
      setTransition(false);
      setIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }, 700);

    return () => clearTimeout(timer);
  }
}, [index, testimonials]);
const scroll = (direction: "left" | "right") => {
  const max = Math.max(0, testimonials.length - visibleCards);

  if (direction === "left") {
    setIndex((prev) => (prev <= 0 ? max : prev - 1));
  } else {
    setIndex((prev) => (prev >= max ? 0 : prev + 1));
  }
};
return (
  <section className="relative max-w-[1600px] mx-auto px-4 lg:px-6 2xl:px-10 py-12 lg:py-20">

    {/* Heading */}

    <div className="max-w-6xl mx-auto  text-center mb-16">

      {/* <h6 className="flex items-center justify-center gap-3 uppercase tracking-[3px] text-[#C5A85A] font-semibold text-sm">

        Testimonials

        <span className="w-16 h-[2px] bg-[#C5A85A]" />

      </h6> */}

      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c1d20] leading-tight">

        What Our Clients Say

      </h2>

      <p className="lg:text-base text-sm px-4 sm:px-8 mt-2">

        Driven to be future-ready, and push beyond the building blocks
        of technology, digital, and marketing.

      </p>

    </div>



    {/* Slider */}

    <div className="relative  overflow-hidden">

      {/* Left */}

      <button
        onClick={() => scroll("left")}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center hover:scale-110 duration-300"
      >
        <CaretLeftIcon/>
      </button>

      {/* Right */}

      <button
        onClick={() => scroll("right")}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center hover:scale-110 duration-300"
      >
        <CaretRightIcon/>
      </button>



      {/* Track */}

      <div
        className="flex gap-8 py-10"
        style={{
          transition: transition
            ? "transform .7s ease"
            : "none",

          transform: `translateX(-${
            index * (100 / visibleCards)
          }%)`,
        }}
      >
        {sliderData.map((item, i) => (

<div
key={i}
className="relative rounded-[28px] bg-neutral-100 overflow-visible p-8 pt-20 shrink-0"
style={{
flex:
visibleCards===1
?"0 0 100%"
:`0 0 calc(${100/visibleCards}% - 22px)`
}}
>
    <div
className="absolute -top-8 left-6 text-7xl font-bold"
style={{
color:item.color
}}
>

❝

</div>
<div
className="absolute -top-7 right-5 rounded-full px-3 py-2 flex items-center gap-3 shadow-xl"
style={{
background:item.color
}}
>

<img
src={item.image}
alt={item.name}
className="w-12 h-12 rounded-full object-cover bg-white p-1"
/>

<div>

<h4 className="text-white font-semibold">

{item.name}

</h4>

</div>

</div>
<p className="text-slate-600 leading-8 line-clamp-8">

{item.review}

</p>
<div className="w-28 h-[2px] bg-slate-300 my-8"/>
<div className="flex gap-1 text-2xl">

{Array.from({length:5}).map((_,j)=>(

<span
key={j}
style={{
color:j<item.rating
?item.color
:"#ddd"
}}
>

★

</span>

))}

</div>

<div
className="absolute -bottom-12 right-6 text-7xl font-bold"
style={{
color:item.color
}}
>

❞

</div>
</div>

))}

</div>

</div>

</section>
);
}