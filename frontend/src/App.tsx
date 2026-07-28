import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './App.css'
import { AllRoutes } from './routes/AllRoutes'
import WhatsAppChat from "./components/whatsapp/Whatsappchat";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {

  return (
   <>
    <ScrollToTop />
   <AllRoutes/>
   <WhatsAppChat/>
   </>
  )
}

export default App
