import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import allProductsSlice from '../features/allProductsSlice';
import authReducer from '../features/auth/authSlice';
import singleProductSlice from '../features/singleProductSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    products: allProductsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
