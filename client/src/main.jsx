import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AutContextProvider from "./context/AutContext.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <AutContextProvider>
        <App />
      </AutContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>,
);
