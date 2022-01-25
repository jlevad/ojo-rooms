import { configureStore, combineReducers } from '@reduxjs/toolkit';

import top5Reducer from './hotels/Top5Redux';
import hotelsReducer from './hotels/HotelsRedux';
import userReducer from './userRedux';

const rootReducer = combineReducers({
  user: userReducer,
  top5: top5Reducer,
  hotels: hotelsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
