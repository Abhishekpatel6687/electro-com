import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

import { AppProvider } from "./context/ProductContext";
import { FilterContextProvider } from "./context/Filter_Context";
import { CartProvider } from "./context/Cart_Context";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <AuthProvider>
      <AppProvider>
        <FilterContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </AuthProvider>
  </ThemeProvider>
);

reportWebVitals();
