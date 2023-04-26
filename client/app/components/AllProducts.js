import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  deleteProductsAsync,
  addAllProducts,
} from "../../features/allProductsSlice";
import { NavLink } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteProductsAsync(id));
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addAllProducts({ name, price, quantity }));
  };

  const images = useSelector((state) => state.singleProduct);

  const productinjector = (tt) => {
    console.log(tt)    // console.log(products[tt-1].name)
    console.log((products[tt-1]["name"]))
    console.log(images.products)
    // console.log(value)
    // return (products[tt-1]["name"])
    // return(images[1].products.imageUrl)
    // return products[tt-1].id
  }
  // images.products.imageUrl

  return (
    <div>
      <div className="product-parent-container">
        {products.map((product, id) => {
          const key = id;
          console.log("tessssssssssssssssssssst", product.imageUrl)
          console.log(images)

          return (
            <div key={key} className="product-child-element ">
              <NavLink to={`/products/${product.id}`}>
                <div>
                  

                  <div>
                  <img src={productinjector(product.id)} alt="product-image" />
                    <h1> {product.name} </h1>
                    <h1> {product.price} </h1>
                    <p>{product.quantity}</p>
                  </div>
                </div>
              </NavLink>
              <button
                type="button"
                className="remove-bttn"
                onClick={() => handleDelete(product.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>

      <div className="form-div " >
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

          <button className="addToCartBttn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AllProducts;
