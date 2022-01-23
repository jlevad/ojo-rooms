import { configureStore, combineReducers } from '@reduxjs/toolkit';

import hotelReducer from './hotelRedux';
import userReducer from './userRedux';

const rootReducer = combineReducers({
  user: userReducer,
  hotel: hotelReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
