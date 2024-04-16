// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import postReducer from './postSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    post: postReducer
  },
});
