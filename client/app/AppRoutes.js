import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import SignUpAuthForm from "../features/auth/SignUpAuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import NotAdmin_AllProducts from "./components/NotAdmin_AllProducts";
import Cart from "../features/auth/cart";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  //*Malcolm was Here
  const isLoggedAdmin = useSelector((state) => state.auth.me.isAdmin);

  //End Malcolm edit

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products/:productId/*" element={<SingleProduct />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignUpAuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products/:productId/*" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      )}
      {isLoggedAdmin ? (
        <Routes>
          <Route path="/products/" element={<AllProducts />} />
          <Route path="/public/products/" element={<NotAdmin_AllProducts />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/public/products/" element={<NotAdmin_AllProducts />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
