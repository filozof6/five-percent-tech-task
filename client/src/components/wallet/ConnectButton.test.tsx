import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IStore } from '../../types';
import _ from 'lodash';
import store from '../../redux/store/store';
import ConnectButton from './ConnectButton';
import Web3ReactCore from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';

const mockStore = configureStore<IStore>([]);

const mockUseWeb3ReactHook = (fnReturn: Web3ReactContextInterface) => {
  jest.spyOn(Web3ReactCore, 'useWeb3React').mockReturnValue(
    fnReturn
  );
}

describe('Wallet Connect button tests', () => {
  test('render connect button', async () => {
    const stateData = _.merge(store.getState(), {
      wallet: {
        transactions: [],
        transactionsLoaded: true,
      },
    });
    const mockedStore = mockStore(store.getState());
    render(
      <Web3ReactCore.Web3ReactProvider getLibrary={jest.fn()}>
        <Provider store={mockedStore}>
          <ConnectButton />
        </Provider>
      </Web3ReactCore.Web3ReactProvider>,
    );
  
    await waitFor(async () => {
      const element = screen.getByText('Connect to MetaMask');
      expect(element).toBeInTheDocument();
    });
  });
  
  test('render disconnect button with address', async () => {
    const testAddress = 'test_address';
    mockUseWeb3ReactHook({
      activate: jest.fn(),
      deactivate: jest.fn(),
      active: true,
      account: testAddress,
      setError: jest.fn(),
    });
    const stateData = _.merge(store.getState(), {
      wallet: {
        walletAddress: testAddress,
        walletConnected: true,
      },
    });
    const mockedStore = mockStore(stateData);
    render(
      <Web3ReactCore.Web3ReactProvider getLibrary={jest.fn()}>
        <Provider store={mockedStore}>
          <ConnectButton />
        </Provider>
      </Web3ReactCore.Web3ReactProvider>,
    );
  
    await waitFor(async () => {
      const button = screen.getByText('Disconnect MetaMask');
      expect(button).toBeInTheDocument();
      const addressName = screen.getByText(`${testAddress}`, {exact: false});
      expect(addressName).toBeInTheDocument();
    });
  });
});
