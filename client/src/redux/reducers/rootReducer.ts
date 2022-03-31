import { combineReducers } from 'redux';
import { todoReducer } from './todoReducer';
import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import { walletReducer } from './walletReducer';

export const rootReducer = combineReducers({
  todo: todoReducer,
  ui: uiReducer,
  auth: authReducer,
  wallet: walletReducer
});
