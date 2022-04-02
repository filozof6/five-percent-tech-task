import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConnectButton from '../components/wallet/ConnectButton';
import TransactionForm from '../components/wallet/TransactionForm';
import TransactionList from '../components/wallet/TransactionList';

const Wallet = () => {
  return (
    <div >
    <div style={{ height: '64px' }} />
      <br />
      <ConnectButton />
      <br />
      <br />
      <TransactionForm />
      <br />
      <br />
      <TransactionList />
    </div>
  );
};

export default Wallet;
