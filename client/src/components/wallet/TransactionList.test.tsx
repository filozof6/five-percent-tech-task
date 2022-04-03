import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import * as transactionApi from '../../api/transaction/index';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import TransactionList from './TransactionList';
import { IStore } from '../../types';
import _ from 'lodash';
import store from '../../redux/store/store';
import { TransactionDTO } from '../../../../server/src/transaction/transaction.dto';

const mockStore = configureStore<IStore>([]);

const mockGetTransactions = (fnReturn: TransactionDTO[] = []) => {
  jest.spyOn(transactionApi, 'getAllTransactions').mockReturnValue(
    new Promise<any>((r) => r({data: [fnReturn]}))
  );
};

describe('Transaction list tests', () => {
  test('render empty transactions table', async () => {
    const stateData = _.merge(store.getState(), {
      wallet: {
        transactions: [],
        transactionsLoaded: true,
      },
    });
    const mockedStore = mockStore(stateData);
    mockGetTransactions();
    render(
      <Provider store={mockedStore}>
        <TransactionList />
      </Provider>,
    );
  
    await waitFor(async () => {
      const element = screen.getByText('No transactions');
      expect(element).toBeInTheDocument();
    });
  });

  test('render table skeleton on loading', async () => {
    const stateData = _.merge(store.getState(), {
      wallet: {
        transactionsLoading: true,
        transactionsLoaded: false,
      },
    });
    const mockedStore = mockStore(store.getState());
    mockGetTransactions();
    render(
      <Provider store={mockedStore}>
        <TransactionList />
      </Provider>,
    );
  
    await waitFor(async () => {
      const elements = screen.getAllByTestId('skeleton');
      expect(elements.length).not.toBe(0);
    });
  });
  
  test('render transaction in table', async () => {
    const testTransaction: TransactionDTO = {
      id: 'test_id',
      amount: '0.00',
      note: 'test_note',
      recipientAddress: 'test_recipient_address',
      senderAddress: 'test_sender_address'
    }
    const stateData = _.merge(store.getState(), {
      wallet: {
        transactions: [testTransaction],
        transactionsLoaded: true,
      },
    });
  mockGetTransactions([testTransaction]);
    const mockedStore = mockStore(stateData);
    await act(async () => {
      render(
        <Provider store={mockedStore}>
          <TransactionList />
        </Provider>,
      );
    });
    const testTransactionPartial: Partial<TransactionDTO> = {...testTransaction};
    delete testTransactionPartial.note
    const testStrings = Object.values(testTransactionPartial);
    for (let textValue of testStrings) {
      const element = await screen.findByText(textValue, {exact: false});
      expect(element).toBeInTheDocument();
    }
  });
});
