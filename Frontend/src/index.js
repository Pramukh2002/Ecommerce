import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Products} from "./components/Products";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { ProductDisplay } from "./components/ProductDisplay";
import { Cart } from "./components/Cart";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { MyOrders } from "./components/MyOrders";

ReactDOM.render(
  <Router>
    <Header />
    <Routes>
      <Route index element={<Products />}></Route>
      <Route path="*" element={<Products />}></Route>
      <Route path="/">
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="MyOrders" element={<MyOrders />} />
        <Route path="OrderConfirmation" element={<OrderConfirmation />} />
        <Route path="Product/*" element={<ProductDisplay />} />
        <Route path="*" element={<Products />} />
      </Route>
    </Routes>
    <Footer />
  </Router>
  , document.getElementById("root")
);
