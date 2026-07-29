import React from "react";

const WhatsAppChat: React.FC = () => {
  const phoneNumber = "+16465759575";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      className="fixed bottom-5 left-5 z-[1000]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp Chat"
        className="h-[60px] w-[60px] transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </a>
  );
};

export default WhatsAppChat;
