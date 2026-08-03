import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import { store } from "./Components/app/store.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
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
        border: "1px solid #000000",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        fontSize: "15px",
        fontWeight: "600",
        padding: "14px 18px",
        textTransform: "capitalize",
        fontFamily: "Outfit",
      }}
      progressStyle={{
        background: "#ffbe31",
      }}
    />
  </Provider>,
);
