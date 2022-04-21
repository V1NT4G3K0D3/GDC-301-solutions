import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import reportWebVitals from "./reportWebVitals";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: "https://09aada6f623045e3909ba65c3e820d01@o1212743.ingest.sentry.io/6350962",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <button
      onClick={() => {
        throw Error();
      }}
    >
      Break the world
    </button> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
