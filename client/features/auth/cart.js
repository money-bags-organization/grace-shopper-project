
import React, { useState, useEffect } from 'react';
import {
  fetchAllOrders,
  fetchOrderProducts,
  deleteOrderAsync,
  deleteOrderProductAsync,
} from '../../features/singleProductSlice';

import {
  fetchAllProducts,
} from '../../features/allProductsSlice';

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../singleProductSlice";

function Cart() {

//Malcolm overnight cart edits//
  useEffect(() => {

    dispatch(fetchAllOrders())
    dispatch(fetchOrderProducts())
    dispatch(fetchAllProducts());
  }, [dispatch]);

  
  // const cart = useSelector((state) => state.singleProduct.items);

  const orderproducts = useSelector((state) => state.singleProduct.orderproducts)
  const orders = useSelector((state) => state.singleProduct.orders)
  const products = useSelector((state) => state.products)


  console.log("orders",orders)
  console.log("orderproducts",orderproducts)
  console.log("products",products)

  const dispatch = useDispatch();


  const handleDelete = id => {
    dispatch(deleteOrderAsync(id));
    dispatch(deleteOrderAsync(id));
    dispatch(fetchAllOrders())
    dispatch(fetchOrderProducts())
    dispatch(fetchAllProducts());
  };

  const productinjector = (tt) => {
    console.log(tt)   
    console.log((products[tt-1]["name"]))
    return (products[tt-1]["name"])
  }
 
const userId= useSelector((state) => state.auth.me.id);
 console.log("user id**********", userId)
 console.log(orders)


 ////
const listfilter = orders.filter(orders => orders.userId == userId)
// console.log("filter", listfilter)
const idArray = listfilter.map(obj => obj.id);
// console.log("idArray", idArray)
// console.log("orderproducts", orderproducts)

function filterOrdersById(orders, idArray) {
   return orders.filter(order => idArray.includes(order.orderId));
 }
const filteredproducts = filterOrdersById(orderproducts,idArray)
console.log("filteredproducts***", filteredproducts)
//////////////////////////////
  return (
    <div>
      <h2>Your Cart</h2>

      {/* orderproducts.map((product) => { */}

      {filteredproducts.map((product) => {
        // let tt = product.productId
        return (
          <div key={product.id}>
            <h3>Order id:{product.productId}__productName__{productinjector(product.productId)}</h3>
            <button type='button' onClick={() => handleDelete(product.productId)}>
                X
              </button>

          </div>
        );
      })}
      {/* <p>Total: {totalCart()}</p> */}
    </div>
  );
}
export default Cart;