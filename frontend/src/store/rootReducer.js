import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import uiReducer from '@features/ui/uiSlice';

const appReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
