import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchSingleProductAsync = createAsyncThunk("singleproduct", async (id) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});



// export const deleteStudentsAsync = createAsyncThunk(
//   "todos/deleteTodo",
//   async (id) => {
//     const { data } = await axios.delete(
//       `http://localhost:3000/api/students/${id}`
//     );
//     return data;
//   }
// );

const SingleProductSlice = createSlice({
  name: "singleproduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProduct;
};

export default SingleProductSlice.reducer;
