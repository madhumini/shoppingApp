import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartRedux';
import userReducer from './userRedux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      // customEntityAdapter.removeAll(state);
      // Add your extraReducers logic here
      // For example, if you want to reset the state to initial values:
      state.user = userReducer(undefined, {});
      state.cart = cartReducer(undefined, {});
    });
  },
});

export let persistor = persistStore(store);
