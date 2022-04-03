import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { IStore, TransactionDTO } from '../../types';
import { makeStyles, TextField, Theme } from '@material-ui/core';
import { ethers } from "ethers";
import { setSnackBar } from '../../redux/actions/ui/actions';
import { saveTransaction } from '../../api/transaction';
import { setTransactions } from '../../redux/actions/wallet/actions';

const startPayment = async (
  senderAddress: string,
  recipientAddress: string,
  amount: string, 
  note: string,
  onSuccess: (transaction: TransactionDTO) => Promise<void>, 
  onError: (e: Error) => void
) => {
  try {
    if (!window.ethereum || !senderAddress)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(recipientAddress);
    const tx = await signer.sendTransaction({
      to: recipientAddress,
      value: ethers.utils.parseEther(amount)
    });

    if (!tx.hash)
      throw new Error("There was a problem creating the transaction");

    const transactionData: TransactionDTO = {
      id: tx.hash,
      senderAddress: senderAddress,
      recipientAddress: recipientAddress,
      amount,
      note,
    };

    await onSuccess(transactionData);
  } catch (err) {
    await onError(err);
  }
};

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

  if (walletState.walletConnected) {
    return (
      <div className={classes.formWrapper}>
        <TextField
          label="Recipient address"
          variant="filled"
          size="small"
          inputProps={{ "data-testid": 'recipientAddressInput' }}
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
          inputProps={{ inputMode: 'numeric', type: 'number', "data-testid": 'amountInput' }}
          className={classes.inputField}
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(event.target.value);
          }}
        />
        <TextField
          label="Note"
          variant="filled"
          inputProps={{ "data-testid": 'noteInput' }}
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
          onClick={() => {
            startPayment(
              walletState.walletAddress as string,
              addr, 
              amount,
              note,
              async (transaction: TransactionDTO) => {
                dispatch(setSnackBar({
                  type: 'success',
                  msg: `Transaction sent to ${transaction.recipientAddress}`
                }));
                await saveTransaction(transaction);
                dispatch(setTransactions([transaction, ...walletState.transactions]));
              },
              (err) => {
                dispatch(setSnackBar({
                  type: 'error',
                  msg: err.message
                }));
              }
            )
          }}
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