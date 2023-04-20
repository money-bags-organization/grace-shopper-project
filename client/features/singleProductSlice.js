import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const selectSingleProduct = state => {
  return state.singleProduct;
};

export default SingleProductSlice.reducer;
