import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import uiReducer from '@features/ui/uiSlice';
import dashboardReducer from '@features/dashboard/dashboardSlice';
import userReducer from '@features/users/store/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  dashboard: dashboardReducer,
  users: userReducer,
});

export default rootReducer;
