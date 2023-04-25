let cart = [];

const addToCart = (product) => {
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart();
};

const removeFromCart = (productId) => {
  cart = cart.filter((p) => p.id !== productId);
  saveCart();
};

const totalCarts = ({ cartProducts }) => {
  const totalCart = () => {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };
};

const loadCart = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCart = () => {
  return cart;
};

export default {
  loadCart,
  addToCart,
  totalCarts,
  removeFromCart,
  getCart,
};
