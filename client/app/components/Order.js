//Empty cart
let cart = [];
//Add product to cart
const addToCart = (productId) => {
  setCartProducts((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
};
//Remove product from cart
const removeFromCart = (productId) => {
  setCartProducts((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
};
//Checkout product from cart
function totalCart() {
  let total = 0;
  for (const item of cart) {
    total += item.price * item.quantity;
  }
  return total;
}
//Persist in cart if you are a logged in user
function storeCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(" Cart has been saved");
}
//Load cart from storage
function loadCart() {
  const storeCart = localStorage.getItem("cart");
  if (storeCart) {
    cart = JSON.parse(storeCart);
    console.log("Cart has been loaded");
  } else {
    console.log("Nothing in cart");
  }
}
export default {
  addToCart,
  removeFromCart,
  totalCart,
  storeCart,
  loadCart,
};
