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

// export const addAllProducts = createAsyncThunk(
//   'addAllProducts',
//   async ({ name, address }) => {
//     try {
//       const { data } = await axios.post(`/api/AllProducts`, {
//         name,
//         address,
//       });
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// export const deleteCampus = createAsyncThunk('deleteCampus', async id => {
//   try {
//     await axios.delete(`/api/AllProducts/${id}`);
//     return id;
//   } catch (err) {
//     console.log(err);
//   }
// });

const allProductsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
    // builder.addCase(addAllProducts.fulfilled, (state, action) => {
    //   state.push(action.payload);
    //   return state;
    // });
    // builder.addCase(deleteCampus.fulfilled, (state, action) => {
    //   const id = action.payload;
    //   return state.filter(campus => campus.id !== id);
    // });
  },
});

export const selectAllProducts = state => {
  return state.products;
};
export default allProductsSlice.reducer;
