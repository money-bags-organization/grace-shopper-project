import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../singleProductSlice";

function Cart() {
  const cart = useSelector((state) => state.singleProduct.items);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  const totalCart = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((product) => {
        return (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Quantity: {product.quantity}</p>
            <p>Price per unit: {product.price}</p>
            <button onClick={() => handleRemoveFromCart(product.id)}>
              Remove from Cart
            </button>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        );
      })}
      <p>Total: {totalCart()}</p>
    </div>
  );
}

export default Cart;
