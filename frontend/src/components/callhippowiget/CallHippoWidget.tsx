import { useEffect } from "react";

// ---------------------------------------------
// Extend the global Window type so TypeScript
// knows about the CallHippo script's expected
// global credentials.
// ---------------------------------------------
declare global {
  interface Window {
    USERID?: string;
    NUMBERID?: string;
  }
}

const CallHippoWidget: React.FC = () => {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById("callhippo-script")) return;

    // Create widget container
    const container = document.createElement("div");
    container.id = "callhippo-widget-container";
    container.className =
      "!fixed !bottom-[120px] !left-5 !right-auto !z-[999999] max-[768px]:!bottom-[50px] max-[768px]:!left-[10px]";

    document.body.appendChild(container);

    // Set credentials
    window.USERID = "69d516558ff05364212453c9";
    window.NUMBERID = "69d521a28ff053642125b1cc";

    // Load script
    const script = document.createElement("script");
    script.id = "callhippo-script";
    script.src =
      "https://d1x9dsge91xf6g.cloudfront.net/callhippo/files/ch-webcall.min.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    // The CallHippo script injects its own iframe/div/button/img elements
    // *inside* #callhippo-widget-container at runtime — we don't author
    // those elements ourselves, so Tailwind classNames can't reach them.
    // This scoped <style> block replicates the original descendant + media
    // query overrides that pin every injected child to the same left
    // offset as the container, since only real CSS selectors (with
    // !important) can target elements we don't control the JSX for.
    <style>{`
      #callhippo-widget-container *,
      #callhippo-widget-container iframe,
      #callhippo-widget-container div,
      #callhippo-widget-container button,
      #callhippo-widget-container img {
        left: 22px !important;
        right: auto !important;
      }

      @media (max-width: 768px) {
        #callhippo-widget-container *,
        #callhippo-widget-container iframe,
        #callhippo-widget-container div,
        #callhippo-widget-container button,
        #callhippo-widget-container img {
          left: 10px !important;
          right: auto !important;
        }
      }
    `}</style>
  );
};

export default CallHippoWidget;
