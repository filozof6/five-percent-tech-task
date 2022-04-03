import { Action, IWalletState } from "../../types";
import * as types from "../actions/wallet/types";

export const initialWalletState: IWalletState = {
  walletAddress: undefined,
  walletConnecting: false,
  walletConnected: false,
  transactions: [],
  transactionsLoading: false,
  transactionsLoaded: false
};

export const walletReducer = (
  state = initialWalletState,
  action: Action
): IWalletState => {
  switch (action.type) {
    case types.SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload
      };
    case types.SET_WALLET_CONNECTING:
      return {
        ...state,
        walletConnecting: action.payload
      };
    case types.SET_WALLET_CONNECTED:
      return {
        ...state,
        walletConnected: action.payload
      };
    case types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    case types.SET_TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: action.payload
      };
    case types.SET_TRANSACTIONS_LOADED:
      return {
        ...state,
        transactionsLoaded: action.payload
      };
    default:
      return state;
  }
};
