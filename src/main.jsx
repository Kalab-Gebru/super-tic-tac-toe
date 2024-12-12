import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./context/DataProvider.jsx";
import WebAppProvider from "./context/appContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WebAppProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </WebAppProvider>
  </React.StrictMode>
);
