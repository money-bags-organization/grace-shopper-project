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
            <div key={key} className='product-child-element'>
              <NavLink to={`/products/${product.id}`}>
                <div>
                  <div key={id}>
                    {/* <img
                      src={campus?.imageUrl}
                      alt={campus?.name}
                      className='campus-Images'
                    /> */}
                    <div>
                      <h1> {product.name} </h1>
                      <h1> {product.price} </h1>
                      <p>{product.quantity}</p>
                    </div>
                  </div>
                </div>
              </NavLink>
              {/* <button type='button' onClick={() => handleDelete(product.id)}>
                X
              </button> */}
            </div>
          );
        })}
      </div>

      <div className='form-div'></div>
    </div>
  );
};

export default AllProducts;
