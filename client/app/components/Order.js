//Empty cart
let cart = [];
//Add product to cart
function addToCart(product) {
  cart.push(product);
  console.log(`${product} has been added to the cart`);
}
//Remove product from cart
function removeFromCart(product) {
  const index = cart.findIndex((order) => order.id === product.id);
  if (index !== -1) {
    cart.splice(index, 1);
    console.log(`${product} has been removed from the cart`);
  } else {
    console.log(`${product} is not in the cart`);
  }
}
//Edit product from cart
function editProduct(product, quantity) {
  const index = cart.findIndex((order) => order.id === product.id);
  if (index !== -1) {
    cart[index].quantity = quantity;
    console.log(`${product} has been updated to ${quantity}`);
  } else {
    console.log(`${product} is not in the cart`);
  }
}
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
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(' Cart has been saved');
}
//Load cart from storage
function loadCart() {
    const storeCart = localStorage.getItem('cart');
    if (storeCart) {
        cart = JSON.parse(storeCart);
        console.log('Cart has been loaded');
    } else {
        console.log('Nothing in cart')
    }
};
export default {
    addToCart,
    removeFromCart,
    editProduct,
    totalCart,
    storeCart,
    loadCart
  };