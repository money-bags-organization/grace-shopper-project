import React from "react";
import defaultCart from "../../app/components/Order";

function Cart() {
  const cartProducts = defaultCart.cart;
  if (cartProducts && cartProducts.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartProducts &&
          cartProducts.map((product) => {
            <li key={product.id}>
              {product.name} - {product.quantity} x {product.price} ={" "}
              {product.quantity * product.price}
            </li>;
          })}
      </ul>
      <p>Total: {cartProducts && cartProducts.totalCart()}</p>
    </div>
  );
}

export default Cart;
