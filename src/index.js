import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/ProductContext";
import { FilterContextProvider } from "./context/Filter_Context";
import { CartProvider } from "./context/Cart_Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
);

reportWebVitals();
