import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import { CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
