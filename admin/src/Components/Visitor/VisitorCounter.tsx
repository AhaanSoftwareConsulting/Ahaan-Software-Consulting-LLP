import { useEffect, useState } from "react";

export default function AdminTotalVisitors() {
  const [count, setCount] = useState<number | string | null>(null);

  useEffect(() => {
    fetch("https://ahaan-software-1.onrender.com/api/visitor/total")
      .then((res) => res.json())
      .then((data: { totalVisitors: number }) => {
        setCount(data.totalVisitors);
      })
      .catch((err) => {
        console.error(err);
        setCount("Error");
      });
  }, []);

  return (
    <div
      className="
        flex
        items-center
        justify-center
        rounded-xl
        bg-transparent
        p-0
        transition-transform cursor-pointer
        duration-300
        hover:scale-110
      "
    >
      <h2
        className="
          text-center
          text-3xl
          font-bold
          text-amber-400
        "
      >
        {count !== null ? count : "Loading..."}
      </h2>
    </div>
  );
}