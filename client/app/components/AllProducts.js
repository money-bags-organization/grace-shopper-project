import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllProducts,
  deleteProductsAsync,
  addAllProducts,
} from '../../features/allProductsSlice';
import { NavLink } from 'react-router-dom';

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  //added by malcolm david
  const handleDelete = id => {
    dispatch(deleteProductsAsync(id));
  };

  //end edit

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch, deleteProductsAsync]);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addAllProducts({ name, price, quantity }));
  };

  return (
    <div>
      <div className='product-parent-container'>
        {products.map((product, id) => {
          const key = id;
          
          return (
            
            <div key={key}>
              
              <NavLink to={`/products/${product.id}`} >
            <div key={key} className='product-child-element'>
              <NavLink to={`/products/${product.id}`}>

                <div>
                  <div key={id}>
                    <div>
                      {/* <img
                      src={product.imageUrl}
                      className='site-Images'
                    /> */}
                      <div> <img></img></div>
                      <h1> {product.name} </h1>
                      <h1> {product.price} </h1>
                      <p>{product.quantity}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
              <button
                type='button'
                className='remove-bttn'
                onClick={() => handleDelete(product.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>

      <div className='form-div'>
        <h1>Add A New Product!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            name='product-name'
            placeholder='Enter Product Name'
          />
          <br />
          <input
            type='text'
            value={price}
            name='product-price'
            onChange={e => setPrice(e.target.value)}
            placeholder='Enter Product Price'
          />
          <br />
          <input
            type='text'
            value={quantity}
            name='product-quantity'
            onChange={e => setQuantity(e.target.value)}
            placeholder='Enter Product Quantity'
          />
          <br />

          <button className='addToCartBttn'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AllProducts;
