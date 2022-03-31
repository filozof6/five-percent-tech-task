import * as types from './types';

export const setWalletAddress = (data: string) => {
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
