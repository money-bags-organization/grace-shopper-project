import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../features/studentsSlice';
import { NavLink } from 'react-router-dom';

import {
  fetchSingleProduct,
  selectSingleProduct,
} from '../features/SingleProductSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { campusId } = useParams();
  const campus = useSelector(selectSingleProduct);
  const students = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchSingleProduct(campusId));
    dispatch(fetchStudents());
  }, [dispatch, campusId]);

  const campusStudents = students.filter(s => s.campusId === +campusId);

  return (
    <div className='single-campus'>
      <img src={campus.imageUrl} className='campus-Images' />
      <h1> singleproduct  {campus.name} </h1>
      <h1> {campus.address} </h1>
      <p>{campus.description}</p>
    </div>
  );
};

export default SingleProduct;