import React, { useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { injected } from './connectors';
import { useDispatch, useSelector } from 'react-redux';
import * as walletActions from '../../redux/actions/wallet/actions';
import { IStore } from '../../types';
import { useWeb3React } from '@web3-react/core';

function ConnectButton() {
  const dispatch = useDispatch();
  const walletState = useSelector((state: IStore) => state.wallet);

  const { activate, account, active, deactivate } = useWeb3React();

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(() => {
      console.log('App is connected with MetaMask ', active);
      dispatch(walletActions.setWalletConnected(active));
  }, [active]);

  useEffect(() => {
      handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet
  const connect = async () => {
    console.log('Connecting to MetaMask...');
    dispatch(walletActions.setWalletConnecting(true));
    try {
        await activate(injected).then(() => {
            dispatch(walletActions.setWalletConnected(true));
        })
    } catch(error) {
        console.log('Error on connecting: ', error);
    }

    dispatch(walletActions.setWalletConnecting(false));
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
      console.log('Disconnecting wallet from App...');
      try {
          await deactivate();
      } catch(error) {
          console.log('Error on disconnnect: ', error)
      }

      dispatch(walletActions.setWalletConnected(false));
      console.log('Disconnected');
  };

  return (
    <>
      {!walletState.walletConnected && 
        <>
          <Button variant="contained" onClick={connect} disabled={false}>
            Connect to MetaMask
          </Button>
        </>
      }
      {walletState.walletConnected && 
        <>
          <Button variant="contained" onClick={disconnect}>
            Disconnect MetaMask
          </Button>
          <div className="mt-2 mb-2">
            Connected Account: { account }
          </div> 
        </>
      }
    </>
  );
}

export default ConnectButton;