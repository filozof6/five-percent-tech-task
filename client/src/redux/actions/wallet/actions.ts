import { TransactionDTO } from '../../../types';
import * as types from './types';

export const setWalletAddress = (data: string | undefined) => {
  return {
    type: types.SET_WALLET_ADDRESS,
    payload: data
  };
};

export const setWalletConnecting = (data: boolean) => {
  return {
    type: types.SET_WALLET_CONNECTING,
    payload: data
  };
};

export const setWalletConnected = (data: boolean) => {
  return {
    type: types.SET_WALLET_CONNECTED,
    payload: data
  };
};

export const setTransactions = (data: TransactionDTO[]) => {
  return {
    type: types.SET_TRANSACTIONS,
    payload: data
  };
};

export const setTransactionsLoading = (data: boolean) => {
  return {
    type: types.SET_TRANSACTIONS_LOADING,
    payload: data
  };
};

export const setTransactionsLoaded = (data: boolean) => {
  return {
    type: types.SET_TRANSACTIONS_LOADED,
    payload: data
  };
};