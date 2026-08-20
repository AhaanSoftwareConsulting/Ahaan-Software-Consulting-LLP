import React, { useEffect, useRef } from "react";

const PayglocalButton: React.FC = () => {
  const payBtnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (payBtnRef.current) {
      payBtnRef.current.innerHTML = "";
    }

    // PayGlocal company script — unchanged
    const script = document.createElement("script");

    script.src = "https://oneclick.payglocal.in/simple.js";
    script.setAttribute("data-pb-id", "pb_wA4mcFvFYo8I");
    script.async = true;

    payBtnRef.current?.appendChild(script);
  }, []);

  return (
    <div className="mt-6 w-full flex justify-start">
      <div
        ref={payBtnRef}
        className="
          w-[250px]
          overflow-visible
        

          [&_iframe]:!w-[250px]
          [&_iframe]:!max-w-[250px]
          [&_iframe]:!border-0
          [&_iframe]:!outline-none
          [&_iframe]:!shadow-none
        "
      />
    </div>
  );
};

export default PayglocalButton;