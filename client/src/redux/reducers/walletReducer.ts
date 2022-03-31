import { Action, IWalletState } from "../../types";
import * as types from "../actions/wallet/types";

const initialState: IWalletState = {
  walletAddress: undefined,
  walletConnecting: false,
  walletConnected: false
};

export const walletReducer = (
  state = initialState,
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
    default:
      return state;
  }
};
