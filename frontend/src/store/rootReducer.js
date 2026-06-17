import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import uiReducer from '@features/ui/uiSlice';
import dashboardReducer from '@features/dashboard/dashboardSlice';
import userReducer from '@features/users/store/userSlice';
import datasetReducer from '@features/datasets/store/datasetSlice';
import profileReducer from '@features/profile/store/profileSlice';
import settingsReducer from '@features/settings/store/settingsSlice';
import analyticsReducer from '@features/analytics/store/analyticsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  dashboard: dashboardReducer,
  users: userReducer,
  datasets: datasetReducer,
  profile: profileReducer,
  settings: settingsReducer,
  analytics: analyticsReducer,
});

export default rootReducer;
