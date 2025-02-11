import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="bottom-right" richColors />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
