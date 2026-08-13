import { useEffect } from "react";

declare global {
    interface Window {
        USERID?: string;
        NUMBERID?: string;
    }
}

const CallHippoWidget: React.FC = () => {
    useEffect(() => {
        if (document.getElementById("callhippo-script")) return;

        const container = document.createElement("div");
        container.id = "callhippo-widget-container";
        container.className =
            "!fixed !bottom-[120px] !left-5 !right-auto !z-[999999] max-[1023px]:!bottom-[88px] max-[1023px]:!left-[5px]";

        document.body.appendChild(container);

        window.USERID = "69d516558ff05364212453c9";
        window.NUMBERID = "69d521a28ff053642125b1cc";

        const script = document.createElement("script");
        script.id = "callhippo-script";
        script.src =
            "https://d1x9dsge91xf6g.cloudfront.net/callhippo/files/ch-webcall.min.js";
        script.async = true;

        document.body.appendChild(script);
    }, []);

    return (
        <style>{`
             /* Position the container itself */
             #callhippo-widget-container {
               position: fixed !important;
               z-index: 999999 !important;
             }

             /* Only reposition the LAUNCHER (first injected child) — 
                do NOT touch position/size of later children, since the
                popup panel is appended as a sibling when clicked, and
                forcing left/width/height on it would break/hide it. */
             #callhippo-widget-container > *:first-child {
               left: 28px !important;
               right: auto !important;
               width: 50px !important;
               height: 50px !important;
             }

            /* Mobile / Tablet — launcher only */
        @media (max-width: 1023px) {
           #callhippo-widget-container > *:first-child {
            left: 5px !important;
            right: auto !important;
            width: 40px !important;
            height: 40px !important;
            bottom: 88px !important;
        }
            .open-button svg {
              width: 24px !important;
        }
    }

          /* Desktop — launcher only */
        @media (min-width: 1024px) {
          #callhippo-widget-container > *:first-child {
            left: 25px !important;
            right: auto !important;
            bottom: 100px !important;
        }
    }
`}</style>
    );
};

export default CallHippoWidget;