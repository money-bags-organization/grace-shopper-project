import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cart: [],
  products:[]
};

export const fetchSingleProductAsync = createAsyncThunk(
  'singleproduct',
  async id => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


const SingleProductSlice = createSlice({
  name: 'singleproduct',
  initialState,
  reducers: {
    addtoCart: (state,action) => {
      state.cart.push(
        action)
    }
  //   addtoCart: (state, action) => {
  // const { product, cost } = action.payload;
  // state.cart.push({
  //   name: product,
  //   price: cost
  // });



  },
  extraReducers: builder => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { addtoCart } = SingleProductSlice.actions;

export const selectSingleProduct = state => {
  return state.singleProduct;
};

export default SingleProductSlice.reducer;
