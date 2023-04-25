import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  cart: [],
  newcart: [],
  products: [],
  items: [{number: 1}],
  orders: [],
  orderproducts:[]
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
  "updatesingleproduct",
  async ({ name, price, quantity,idd}) => {
    // const idd = 1
    const { data } = await axios.put(`/api/products/${idd}`, {
      name,
      price,
      quantity,
    });
    return data;
  });

  ///MALCOLM MORNING CART EDITS"

  export const fetchAllOrders = createAsyncThunk('allOrders', async () => {
    try {
      const { data } = await axios.get(`/api/orders`);
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  export const fetchOrderProducts = createAsyncThunk('orderproducts', async () => {
    try {
      const { data } = await axios.get(`/api/orderproducts`);
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  
  export const addOrderAsync = createAsyncThunk(
    'addOrder',
    async ({ userId, fulfilled}) => {
      try {
        const { data } = await axios.post(`/api/orders`, {
          userId,
          fulfilled
        }
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const addOrderProductAsync = createAsyncThunk(
    'addorderproducts',
    async ({ orderId, productId }) => {
      try {
        const { data } = await axios.post(`/api/orderproducts`, {
          orderId,
          productId
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const deleteOrderAsync = createAsyncThunk(
    'deleteProducts',
    async id => {
      await axios.delete(`/api/orders/${id}`);
    }
  );

  export const deleteOrderProductAsync = createAsyncThunk(
    'deleteProducts',
    async id => {
      await axios.delete(`/api/orderproducts/${id}`);
    }
  );


//END MALCOLM MORNING CART EDITS

  export const removeFromCart = (productId) => {
    return {
      type: "cart/removeFromCart",
      payload: productId,
    };
  };



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
      // state.push(action.payload);
      state.products.push(action.payload);
    });
    builder.addCase(addOrderAsync.fulfilled, (state, action) => {
      // state.orders.push(action.payload);
    });
    builder.addCase(addOrderProductAsync.fulfilled, (state, action) => {
      // state.orders.push(action.payload);
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(fetchOrderProducts.fulfilled, (state, action) => {
      state.orderproducts = action.payload;
    });
  },
});

export const { addtoCart } = SingleProductSlice.actions;

export const selectSingleProduct = state => {
  return state.singleProduct;
};

export default SingleProductSlice.reducer;
