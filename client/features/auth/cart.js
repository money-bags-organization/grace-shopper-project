import React from "react";
import Order from "./components/Order";

function Cart() {
  const cartProducts = Order.cart;
  if (cartProducts.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartProducts.map((item) => {
          <li key={item.id}>
            {item.name} - {item.quantity} x {item.price} ={" "}
            {item.quantity * item.price}
          </li>;
        })}
      </ul>
      <p>Total: {cartProducts.totalCart()}</p>
    </div>
  );
}

export default Cart;
