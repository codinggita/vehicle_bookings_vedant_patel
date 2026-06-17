import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import uiReducer from '@features/ui/uiSlice';
import dashboardReducer from '@features/dashboard/dashboardSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
