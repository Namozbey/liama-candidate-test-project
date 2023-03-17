import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { FallbackLoading } from "./components/Loading";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "antd/dist/reset.css";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <ErrorBoundary>
    <Suspense fallback={<FallbackLoading />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </ErrorBoundary>,
  document.getElementById("root")
);
