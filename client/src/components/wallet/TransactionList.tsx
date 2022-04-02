import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../types';
import { Paper } from '@material-ui/core';
import { setSnackBar } from '../../redux/actions/ui/actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import copy from "clipboard-copy";
import { getAllTransactions } from '../../api/transaction/index';
import { setTransactions, setTransactionsLoaded, setTransactionsLoading } from '../../redux/actions/wallet/actions';
import { Skeleton } from '@material-ui/lab';
import Button from '@material-ui/core/Button';


function TransactionList() {
  const dispatch = useDispatch();

  const walletState = useSelector((state: IStore) => state.wallet);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        dispatch(setTransactionsLoading(true));
        const transactions = await getAllTransactions();
        dispatch(setTransactions(transactions.data));
        dispatch(setTransactionsLoading(false));
        dispatch(setTransactionsLoaded(true));
      } catch(err) {

        dispatch(setSnackBar({
          type: 'error',
          msg: err.message
        }));
      }
    };

    fetchTransactions();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Tx ID</TableCell>
            <TableCell>Sender</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {walletState.transactionsLoading && Array.from(Array(4)).map((v, i) => 
            <TableRow
              key={i}
            >
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          )}
          {walletState.transactionsLoaded && walletState.transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
            >
              <TableCell>
                  {transaction.id.substring(0, 7)}...&nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      copy(transaction.id);
                      dispatch(setSnackBar({
                        type: 'info',
                        msg: 'Transaction id copied to clipboard',
                      }));
                    }}
                  >
                    Copy
                  </Button>
              </TableCell>
              <TableCell>
                <a href={`https://etherscan.io/address/${transaction.senderAddress}`} target="_blank" >
                  {transaction.senderAddress}
                </a>
              </TableCell>
              <TableCell>
                <a href={`https://etherscan.io/address/${transaction.recipientAddress}`} target="_blank" >
                  {transaction.recipientAddress}
                </a>
              </TableCell>
              <TableCell align="right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
          {walletState.transactionsLoaded && walletState.transactions.length === 0 &&
           <TableRow>
              <TableCell component="td" scope="row" colSpan={3}>
                No transactions
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionList;