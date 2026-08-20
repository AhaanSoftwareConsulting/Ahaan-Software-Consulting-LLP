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

             /* Force LEFT-side positioning on every injected element
                (launcher AND popup), so the popup opens on the left
                instead of CallHippo's right-side default. */
             #callhippo-widget-container > * {
               left: 28px !important;
               right: auto !important;
             }

             /* Only resize the LAUNCHER (first child) — leave the
                popup's own width/height untouched so it isn't squashed. */
             #callhippo-widget-container > *:first-child {
               width: 50px !important;
               height: 50px !important;
             }

            /* Mobile / Tablet */
        @media (max-width: 1023px) {
           #callhippo-widget-container > * {
            left: 5px !important;
            right: auto !important;
        }
           #callhippo-widget-container > *:first-child {
            width: 40px !important;
            height: 40px !important;
            bottom: 88px !important;
        }
            .open-button svg {
              width: 24px !important;
        }
    }

          /* Desktop */
        @media (min-width: 1024px) {
          #callhippo-widget-container > * {
            left: 25px !important;
            right: auto !important;
        }
          #callhippo-widget-container > *:first-child {
            bottom: 100px !important;
        }
    }
`}
        </style>

    );
};

export default CallHippoWidget;