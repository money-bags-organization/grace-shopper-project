import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from '../../features/singleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch, productId]);

  console.log('message', product.name);

  return (
    <div>
      {/* <img src={campus.imageUrl} className='campus-Images' /> */}
      <h1> {product.name} </h1>
      <h1> {product.price} </h1>
      <p>{product.quantity}</p>
    </div>
  );
};

export default SingleProduct;
