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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId/*" element={<SingleProduct />} />
        {isLoggedIn ? (
          <>
            <Route path="/*" element={<Home />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<SignUpAuthForm name="signup" displayName="Sign Up" />}
            />
            <Route
              path="/public/products/:productId/*"
              element={<SingleProduct />}
            />
          </>
        )}
        {isLoggedAdmin ? (
          <Route path="/products/*" element={<AllProducts />} />
        ) : (
          <Route path="/public/products/*" element={<NotAdmin_AllProducts />} />
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
