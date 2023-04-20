import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllProducts,
  //   addCampuses,
  //   deleteCampus,
} from '../../features/allProductsSlice';
import { NavLink } from 'react-router-dom';

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  //   const handleDelete = id => {
  //     dispatch(deleteCampus(id));
  //   };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className='group-campuses'>
      <div>
        {products.map((product, id) => {
          const key = id;
          return (
            <div key={key}>
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
              {/* <button type='button' onClick={() => handleDelete(campus.id)}>
                X
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
