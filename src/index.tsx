import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "antd/dist/antd.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { FallbackLoading } from "./components/Loading";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <ErrorBoundary>
    <Suspense fallback={<FallbackLoading />}>
      <App />
    </Suspense>
  </ErrorBoundary>,
  document.getElementById("root")
);
