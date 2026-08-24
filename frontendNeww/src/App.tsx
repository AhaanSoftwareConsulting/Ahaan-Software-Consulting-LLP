import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

import { AllRoutes } from "./routes/AllRoutes";
import WhatsAppChat from "./components/whatsapp/Whatsappchat";
import CallHippoWidget from "./components/callhippowiget/CallHippoWidget";
import AhaanChat from "./components/AhaanAI/AhaanChat";
import { PageLoader } from "./components/loader/PageLoader";
// import { DisableInspect } from "./utils/DisableInspect";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RouteChangeLoader = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

  
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <PageLoader isLoading={loading} />;
};

function App() {
  return (
    <>
      {/* <DisableInspect /> */}
      <ScrollToTop />
      <RouteChangeLoader />
      <AllRoutes />
      <CallHippoWidget />
      <WhatsAppChat />
      <AhaanChat />
    </>
  );
}

export default App;