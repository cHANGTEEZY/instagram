import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./global.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" />
  </StrictMode>
);
