import React, { useEffect, useState } from "react";
import botImg from "../../assets/AhaanAI.png";

const CHAT_URL =
  "https://chatgpt.com/g/g-698a6e0582548191a0c256858ffd92b9-ahaan-ai-your-web-app-advisor";

const AhaanChat: React.FC = () => {
  const fullText = "Hi! I\u2019m Ahaan AI \uD83D\uDC4B How can I help?";

  const [displayText, setDisplayText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [hidePreview, setHidePreview] = useState<boolean>(false);

  // LOOPING TYPING EFFECT
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (index < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 35);
    } else {
      timeout = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <>
      {/*
        Kept as scoped real CSS (rather than Tailwind utility classes) for:
        - the chat bubble's speech-tail ::after pseudo-element (Tailwind
          can't target pseudo-elements without a plugin)
        - the float/fade keyframes
        - the exact pixel-for-pixel responsive behavior across the original
          480px / 768px / 1024px breakpoints (Tailwind's default breakpoints
          don't line up with these, and chaining several custom min/max
          arbitrary variants across five elements gets far less readable and
          more error-prone than the original media queries).
        Everything else (colors, spacing, shadows, transitions, hover)
        uses Tailwind utility classes directly in the JSX below.
      */}
      <style>{`
        @keyframes ahaan-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes ahaan-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .ahaan-bot-group {
          animation: ahaan-float 3s ease-in-out infinite;
        }

        .ahaan-chat-bubble::after {
          content: "";
          position: absolute;
          bottom: -6px;
          right: 15px;
          width: 14px;
          height: 14px;
          background: #FEF9C3;
          transform: rotate(45deg);
          border-radius: 3px;
        }

        .ahaan-chat-bubble p {
          animation: ahaan-fade-in 0.3s ease;
        }

        /* ================= MOBILE (Small phones) ================= */
        @media (max-width: 480px) {
          .ahaan-container {
            right: 10px;
            bottom: 80px;
          }
          .ahaan-chat-bubble {
            bottom: 70px;
            right: 50px;
            width: 180px;
            min-width: 160px;
            font-size: 12px;
            padding: 10px 14px;
          }
          .ahaan-chat-bubble::after {
            right: 10px;
          }
          .ahaan-bot-img {
            width: 65px;
          }
          .ahaan-chat-btn {
            padding: 6px 12px;
            font-size: 11px;
          }
        }

        /* ================= TABLET ================= */
        @media (min-width: 481px) and (max-width: 768px) {
          .ahaan-container {
            right: 12px;
            bottom: 90px;
          }
          .ahaan-chat-bubble {
            bottom: 85px;
            right: 65px;
            width: 210px;
            font-size: 13px;
            padding: 12px 16px;
          }
          .ahaan-bot-img {
            width: 80px;
          }
          .ahaan-chat-btn {
            padding: 8px 14px;
            font-size: 12px;
          }
        }

        /* ================= SMALL LAPTOP ================= */
        @media (min-width: 769px) and (max-width: 1024px) {
          .ahaan-chat-bubble {
            bottom: 100px;
            right: 80px;
            width: 240px;
          }
          .ahaan-bot-img {
            width: 100px;
          }
        }
      `}</style>

      <div className="ahaan-container fixed bottom-[90px] right-5 z-[9999] flex flex-col items-end">
        <div className="relative">
          {/* CLOSE BUTTON */}
          {!hidePreview && (
            <button
              className="absolute -top-10 right-[5px] z-[9999] flex h-5 w-5 items-center justify-center rounded-full border-none bg-[#ff1e1e] text-sm font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:scale-110"
              onClick={() => setHidePreview(true)}
            >
              ×
            </button>
          )}

          {/* CHAT BUBBLE */}
          {!hidePreview && (
            <div className="ahaan-chat-bubble absolute bottom-[120px] right-[40px] w-[100px] min-w-[120px] max-w-[180px] rounded-[14px] bg-[#FEF9C3] px-2 py-2 text-[12px] leading-[1.2] shadow-[0_6px_16px_rgba(0,0,0,0.5)]">
              <p className="m-0 whitespace-pre-line">{displayText}</p>
            </div>
          )}

          {/* BOT + BUTTON */}
          <div className="ahaan-bot-group flex flex-col items-end">
            {!hidePreview && (
              <img
                src={botImg}
                alt="Ahaan Bot"
                className="ahaan-bot-img mb-[-8px] w-[80px] cursor-pointer transition-transform duration-300 ease-in-out"
                onClick={() => window.open(CHAT_URL, "_blank")}
              />
            )}

            <button
              className="ahaan-chat-btn mt-0 rounded-[30px] border-none bg-gradient-to-br from-[#f4b24d] to-[#e5a53f] px-3 py-1.5 text-[11px] font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
              onClick={() => window.open(CHAT_URL, "_blank")}
            >
              Ask Ahaan AI
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AhaanChat;
