import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSingleProductAsync,
  fetchAllOrders,
  fetchOrderProducts,
  selectSingleProduct,
  updateSingleProductAsync,
  addOrderAsync,
  addOrderProductAsync,
  addToCart,
} from '../../features/singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // fetch all orders for cart
  const orderlength =
    useSelector(state => state.singleProduct.orders.length) + 1;

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
    dispatch(fetchAllOrders());
    dispatch(fetchOrderProducts());
  }, [dispatch, productId]);

  // add to cart
  const userId = useSelector(state => state.auth.me.id);

  const handleCart = () => {
    const fulfilled = false;
    dispatch(addOrderAsync({ userId, fulfilled }));

    setTimeout(2000);

    dispatch(addOrderProductAsync({ orderId: orderlength, productId }));
    dispatch(fetchAllOrders());
    dispatch(fetchOrderProducts());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const idd = product.products.id;
    dispatch(updateSingleProductAsync({ name, price, quantity, idd }));
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <div className='product-single-container'>
      <div className='product-single-element'>
        <img
          src={product.products.imageUrl}
          className='single-image'
          alt='product'
        />
        <h1 className='zero-margin'>{product.products.name}</h1>
        <h1 className='zero-margin'>{product.products.price}</h1>
        <p className='zero-margin'>{product.products.quantity}</p>
        <button type='button' className='addToCartBttn' onClick={handleCart}>
          Add to Cart
        </button>
      </div>

      <div>
        <form onSubmit={handleSubmit} className='form-div'>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            name='product-name'
            placeholder='Edit Product Name'
          />
          <input
            type='text'
            value={price}
            name='product-price'
            onChange={e => setPrice(e.target.value)}
            placeholder='Edit Product Price'
          />
          <input
            type='text'
            value={quantity}
            name='product-quantity'
            onChange={e => setQuantity(e.target.value)}
            placeholder='Edit Product Quantity'
          />
          <button type='submit' className='addToCartBttn'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
