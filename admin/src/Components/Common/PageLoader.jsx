import React from "react";

const PageLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div className="spinner-border text-warning" role="status" />
    </div>
  );
};

export default PageLoader;