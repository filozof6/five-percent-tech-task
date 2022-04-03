import React from 'react';
import ConnectButton from '../components/wallet/ConnectButton';
import TransactionForm from '../components/wallet/TransactionForm';
import TransactionList from '../components/wallet/TransactionList';

const Wallet = () => {
  return (
    <div >
      <div style={{ height: '104px' }} />
      <ConnectButton />
      <div style={{ height: '24px' }} />
      <TransactionForm />
      <div style={{ height: '24px' }} />
      <TransactionList />
    </div>
  );
};

export default Wallet;
