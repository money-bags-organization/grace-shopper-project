import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProductsAsync,
  addAllProducts,
} from "../../features/allProductsSlice";
import { NavLink } from "react-router-dom";
import Order from "./Order";
import cart from "../../features/auth/cart";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalCart, setTotalCart] = useState(0); // initialize the state variable

  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalCart(total);
  }, [products]);

  const handleDelete = (id) => {
    dispatch(deleteProductsAsync(id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addAllProducts({ name, price, quantity }));
  };

  return (
    <div>
      <div>
        {products.map((product, id) => {
          const key = id;
          return (
            <div key={key}>
              <NavLink to={`/products/${product.id}`}>
                <div>
                  <div key={id}>
                    <div>
                      <h1> {product.name} </h1>
                      <h1> {product.price} </h1>
                      <p>{product.quantity}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
              <button type="button" onClick={() => handleDelete(product.id)}>
                X
              </button>
              <button onClick={() => cart.addToCart(product.id)}>
                Add to Cart
              </button>{" "}
            </div>
          );
        })}
      </div>
      <div>Total order: ${totalCart}</div>
      <Order cartItems={cart.items} />
      <div className="form-div">
        <h1>Add A New Product!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="product-name"
            placeholder="Enter Product Name"
          />
          <br />
          <input
            type="text"
            value={price}
            name="product-price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Product Price"
          />
          <br />
          <input
            type="text"
            value={quantity}
            name="product-quantity"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter Product Quantity"
          />
          <br />

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AllProducts;
