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
  addtoCart,
} from '../../features/singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  //Malcolm added fetch all orders for cart
  const orderlength =
    useSelector(state => state.singleProduct.orders.length) + 1;
  console.log('startlength', orderlength);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
    dispatch(fetchAllOrders());
    dispatch(fetchOrderProducts());
  }, [dispatch, productId]);
  //end malcolm added fetch all orders for add to cart

  const handleSubmit = evt => {
    evt.preventDefault();
    const idd = product.products.id;
    dispatch(updateSingleProductAsync({ name, price, quantity, idd }));
    setName('');
    setPrice('');
    setQuantity('');
  };

  console.log('productid', typeof parseInt(productId));
  //MALCOLM AM EDITS CART
  const userId = useSelector(state => state.auth.me.id);
  console.log('userID:', userId);
  const handleCart = evt => {
    // evt.preventDefault();
    const fulfilled = false;
    dispatch(addOrderAsync({ userId, fulfilled }));
    dispatch(addOrderProductAsync({ orderId: orderlength, productId }));
    dispatch(fetchAllOrders());
    console.log('***********', orderlength);
    dispatch(fetchOrderProducts());

    // const orderlength = useSelector((state) => state.singleProduct.orders.length)
    // dispatch(addOrderProducts({ UserId, ProductId, fulfilled}));
  };
  //END MALCOLM EDITS CART

  let cart = { name: product.products.name, price: product.products.price };

  return (
    <div>
      <div className='product-single-element'>
        <div>
          <img src={product.products.imageUrl} className='single-image' />
          <h1> {product.products.name} </h1>
          <h1> {product.products.price} </h1>
          <p>{product.products.quantity}</p>
        </div>
      </div>
      <div className='form-div'>
        <button
          type='button'
          className='addToCartBttn'
          onClick={() => dispatch(handleCart)}
        >
          New add to cart{' '}
        </button>
        <button type='button' onClick={() => dispatch(addtoCart(cart))}>
          old add to cart{' '}
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
            <button type='submit' className='addToCartBttn'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
