import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AppProvider } from "./context";

import "../i18n";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Suspense fallback="...loading">
        <App />
      </Suspense>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
