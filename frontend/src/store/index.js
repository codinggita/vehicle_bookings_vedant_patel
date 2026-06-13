import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production',
  // To add custom middleware in the future, use the middleware option:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
