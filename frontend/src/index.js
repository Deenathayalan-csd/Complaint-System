import React from "react";
import ReactDOM from "react-dom/client";

// ✅ Bootstrap FIRST
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Your styles AFTER (to override bootstrap)
import "./index.css";
import "./App.css";   // 🔥 ADD THIS LINE

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);