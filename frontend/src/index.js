import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./Components/Cart.js";
import { UserProvider } from "./Components/UserContext";

ReactDOM.render(
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>,
  document.getElementById("root")
);
