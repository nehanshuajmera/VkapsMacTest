import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./contexts/products.context.jsx";
import App from "./App.jsx";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ProductProvider>
        <App />
      </ProductProvider>
    </Router>
  </StrictMode>
);