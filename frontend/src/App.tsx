import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

import { AllRoutes } from "./routes/AllRoutes";
import { PageLoader } from "./components/loader/PageLoader";

// 1. Heavy Non-Critical Widgets Lazy Load
const CallHippoWidget = lazy(() => import("./components/callhippowiget/CallHippoWidget"));
const WhatsAppChat = lazy(() => import("./components/whatsapp/Whatsappchat"));
const AhaanChat = lazy(() => import("./components/AhaanAI/AhaanChat"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Route change minimal spinner
const RouteSpinner = () => (
  <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-xs pointer-events-none">
    <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
  </div>
);

// Initial Loader Wrapper
const InitialPageLoader = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("has_loaded_session");

    if (hasLoadedBefore) {
      setIsInitialLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem("has_loaded_session", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return <PageLoader isLoading={isInitialLoading} />;
};

function App() {
  const [showWidgets, setShowWidgets] = useState(false);

  // 2. Non-blocking Visitor Tracking
  useEffect(() => {
    const alreadyTracked = localStorage.getItem("visit_tracked");

    if (!alreadyTracked) {
      const trackVisitor = () => {
        fetch("https://ahaan-software-consulting-llp.onrender.com/api/visitor/track", {
          method: "POST",
        })
          .then(() => localStorage.setItem("visit_tracked", "true"))
          .catch((err) => console.error(err));
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(trackVisitor);
      } else {
        setTimeout(trackVisitor, 4000);
      }
    }
  }, []);

  // 3. Delay Loading Third-Party Widgets to free Main Thread
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidgets(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      
      {/* First Visit / Hard Refresh Loader */}
      <InitialPageLoader />

      {/* Routes with Suspense */}
      <Suspense fallback={<RouteSpinner />}>
        <AllRoutes />
      </Suspense>

      {/* Delayed Render for Third-Party Widgets */}
      {showWidgets && (
        <Suspense fallback={null}>
          <CallHippoWidget />
          <WhatsAppChat />
          <AhaanChat />
        </Suspense>
      )}
    </>
  );
}

export default App;