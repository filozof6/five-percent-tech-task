import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IStore } from '../../types';
import _ from 'lodash';
import store from '../../redux/store/store';
import TransactionForm from './TransactionForm';

const mockStore = configureStore<IStore>([]);

describe('Transaction form tests', () => {
  test('render transaction form', async () => {
    const testAddress = 'test_address';
    const stateData = _.merge(store.getState(), {
      wallet: {
        walletAddress: testAddress,
        walletConnected: true,
      },
    });
    const mockedStore = mockStore(stateData);
    render(
      <Provider store={mockedStore}>
        <TransactionForm />
      </Provider>
    );
  
    await waitFor(async () => {
      const formLabels = [
        'Recipient address',
        'Amount',
        'Note'
      ];
      for (let formLabel of formLabels) {
        const element = screen.getByText(formLabel);
        expect(element).toBeInTheDocument(); 
      }
      const submitButton = screen.getByTestId('transactionFormSubmit');
      expect((submitButton as HTMLButtonElement).disabled).toBeTruthy();
    });
  });

  test('submit transaction form', async () => {
    const testAddress = 'test_address';
    const stateData = _.merge(store.getState(), {
      wallet: {
        walletAddress: testAddress,
        walletConnected: true,
      },
    });
    const mockedStore = mockStore(stateData);
    render(
      <Provider store={mockedStore}>
        <TransactionForm />
      </Provider>
    );
  
    await waitFor(async () => {
      const formLabels = [
        'Recipient address',
        'Amount',
        'Note'
      ];
      for (let formLabel of formLabels) {
        const element = screen.getByText(formLabel);
        expect(element).toBeInTheDocument(); 
      }
      const submitButton = screen.getByTestId('transactionFormSubmit');
      expect((submitButton as HTMLButtonElement).disabled).toBeTruthy();
    });
  });
});
