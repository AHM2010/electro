import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </CartProvider>
  </StrictMode>,
);
