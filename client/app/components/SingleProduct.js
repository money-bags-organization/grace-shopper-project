import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSingleProductAsync,
  selectSingleProduct,
  updateSingleProductAsync,
  addtoCart,
} from '../../features/singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const idd = 1;
    dispatch(updateSingleProductAsync({ idd, name, price, quantity }));
    setName('');
    setPrice('');
    setQuantity('');
  };

  let cart = { name: product.products.name, price: product.products.price };

  return (
    <div>
      {/* <img src={campus.imageUrl} className='campus-Images' /> */}
      <h1> {product.products.name} </h1>
      <h1> {product.products.price} </h1>
      <p>{product.products.quantity}</p>
      <button type='button' onClick={() => dispatch(addtoCart(cart))}>
        add to cart{' '}
      </button>
      <div>
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
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
