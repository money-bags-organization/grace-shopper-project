import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSingleProductAsync,
  selectSingleProduct,
  addtoCart
} from '../../features/singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]);

  //  //added by malcolm david
  //  const handleAddtoCart = id => {
  //    dispatch(addToCart(id));
  // };

  console.log('message', product.name);

  let cart = {name:product.products.name,
            price:product.products.price}

  return (
    <div>
      {/* <img src={campus.imageUrl} className='campus-Images' /> */}
      <h1> {product.products.name} </h1>
      <h1> {product.products.price} </h1>
      <p>{product.products.quantity}</p>
      <button type='button' onClick={() => dispatch(addtoCart(cart))}>
                add to cart </button>
    </div>
  );
};

export default SingleProduct;
