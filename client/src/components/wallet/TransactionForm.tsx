import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../types';
import { makeStyles, TextField, Theme } from '@material-ui/core';
import { ethers } from "ethers";
import { setSnackBar } from '../../redux/actions/ui/actions';
import { saveTransaction } from '../../api/transaction';
import { setTransactions } from '../../redux/actions/wallet/actions';

const useStyles = makeStyles(() => ({
  inputField: {
    width: '70%',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: '36px',
    width: '50%',
  }
}));

function TransactionForm() {
  const [addr, setAddr] = useState<string>('');
  const [amount, setAmount] = useState<string>('0.00');
  const [note, setNote] = useState<string>('');
  const dispatch = useDispatch();
  const walletState = useSelector((state: IStore) => state.wallet);
  const classes = useStyles();

  const startPayment = async () => {
    try {
      if (!window.ethereum || !walletState.walletAddress)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(amount)
      });
      dispatch(setSnackBar({
        type: 'success',
        msg: `Transaction sent to ${amount}`
      }));

      if (!tx.hash)
        throw new Error("There was a problem creating the transaction");

      const transactionData = {
        id: tx.hash,
        senderAddress: walletState.walletAddress,
        recipientAddress: addr,
        amount,
        note,
      };
      await saveTransaction(transactionData);
      dispatch(setTransactions([transactionData, ...walletState.transactions]));
    } catch (err) {
      dispatch(setSnackBar({
        type: 'error',
        msg: err.message
      }));
    }
  };

  if (walletState.walletConnected) {
    return (
      <div className={classes.formWrapper}>
        <TextField
          label="Recipient address"
          variant="filled"
          size="small"
          className={classes.inputField}
          value={addr}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddr(event.target.value);
          }}
        />
        <TextField
          label="Amount"
          variant="filled"
          size="small"
          inputProps={{ inputMode: 'numeric', type: 'number' }}
          className={classes.inputField}
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(event.target.value);
          }}
        />
        <TextField
          label="Note"
          variant="filled"
          multiline
          className={classes.inputField}
          value={note}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNote(event.target.value);
          }}
        />
        <Button 
          disabled={!addr.length || !amount.length} 
          variant="contained" 
          onClick={startPayment}
          data-testid={'transactionFormSubmit'}
          className={classes.submitButton}
        >
          Send money
        </Button>
      </div>
    );
  }

  return <></>;
}

export default TransactionForm;