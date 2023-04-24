import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cart: [],
  products: [],
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

export const updateSingleProductAsync = createAsyncThunk(
  'updatesingleproduct',
  async ({ idd, name, price, quantity }) => {
    const { data } = await axios.put(`/api/products/${idd}`, {
      name,
      price,
      quantity,
    });
    return data;
  }
);

const SingleProductSlice = createSlice({
  name: 'singleproduct',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.cart.push(action);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(updateSingleProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { addtoCart } = SingleProductSlice.actions;

export const selectSingleProduct = state => {
  return state.singleProduct;
};

export default SingleProductSlice.reducer;
