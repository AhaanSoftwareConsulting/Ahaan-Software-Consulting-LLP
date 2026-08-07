import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { Provider } from "react-redux";
import { store } from "./Components/app/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Optional (only if you're still using Bootstrap components)


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />

      <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
  toastStyle={{
    background: "#181818",
    color: "#fff",
    border: "1px solid #000",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
    fontSize: "15px",
    fontWeight: 600,
    padding: "14px 18px",
    textTransform: "capitalize",
    fontFamily: "Outfit",
  }}
/>
    </Provider>
  </React.StrictMode>
);