import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk('allProducts', async () => {
  try {
    const { data } = await axios.get(`/api/products`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addAllProducts = createAsyncThunk(
  'addProducts',
  async ({ name, price, quantity }) => {
    try {
      const { data } = await axios.post(`/api/products`, {
        name,
        price,
        quantity,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProductsAsync = createAsyncThunk(
  'deleteProducts',
  async id => {
    await axios.delete(`/api/products/${id}`);
    return id;
  }
);

const allProductsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });

    builder.addCase(deleteProductsAsync.fulfilled, (state, action) => {
      const id = action.payload;
      return state.filter(product => product.id !== id);
    });
    builder.addCase(addAllProducts.fulfilled, (state, action) => {
      state.push(action.payload);
      return state;
    });
  },
});

export const selectAllProducts = state => {
  return state.products;
};
export default allProductsSlice.reducer;
