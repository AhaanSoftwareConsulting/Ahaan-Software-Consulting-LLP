import React, { useEffect, useState } from "react";

export default function AdminTotalVisitors() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("https://ahaan-software-1.onrender.com/api/visitor/total")
      .then(res => res.json())
      .then(data => {
        setCount(data.totalVisitors);
      })
      .catch(err => {
        console.log(err);
        setCount("Error");
      });
  }, []);

  return (
    <div >
      {count !== null ? count : "Loading..."}
    </div>
  );
}
