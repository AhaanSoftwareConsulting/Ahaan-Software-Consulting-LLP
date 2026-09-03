import { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

import { AllRoutes } from "./routes/AllRoutes";
import WhatsAppChat from "./components/whatsapp/Whatsappchat";
import CallHippoWidget from "./components/callhippowiget/CallHippoWidget";
import AhaanChat from "./components/AhaanAI/AhaanChat";
import { PageLoader } from "./components/loader/PageLoader";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Route Change-এর জন্য হালকা লোডার কম্পোনেন্ট
const SimpleRouteSpinner = () => (
  <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-10 h-10 border-3 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
  </div>
);

// Initial / Hard Refresh Loader Wrapper
const InitialPageLoader = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // sessionStorage চেক করা হচ্ছে পেজ Refresh বা First Visit বোঝার জন্য
    const hasLoadedBefore = sessionStorage.getItem("has_loaded_session");

    if (hasLoadedBefore) {
      // যদি একই সেশনে অন্য পেজে নেভিগেট করা হয়, Heavy 3D Loader দেখানো হবে না
      setIsInitialLoading(false);
    } else {
      // ফার্স্ট টাইম ভিজিট বা Hard Refresh-এর ক্ষেত্রে Heavy Loader চলবে
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem("has_loaded_session", "true");
      }, 3500); // Animation Complete হওয়ার সময়

      return () => clearTimeout(timer);
    }
  }, []);

  return <PageLoader isLoading={isInitialLoading} />;
};

function App() {
  useEffect(() => {
    const alreadyTracked = localStorage.getItem("visit_tracked");

    if (!alreadyTracked) {
      fetch("https://ahaan-software-consulting-llp.onrender.com/api/visitor/track", {
        method: "POST",
      })
        .then(() => localStorage.setItem("visit_tracked", "true"))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      
      {/* 1. First Visit / Hard Refresh heavy loader */}
      <InitialPageLoader />

      {/* 2. Route Changes loader (Suspense Dynamic Data / Lazy Component Load-এর ওপর নির্ভর করবে) */}
      <Suspense fallback={<SimpleRouteSpinner />}>
        <AllRoutes />
      </Suspense>

      <CallHippoWidget />
      <WhatsAppChat />
      <AhaanChat />
    </>
  );
}

export default App;