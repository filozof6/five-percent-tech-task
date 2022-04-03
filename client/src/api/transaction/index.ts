import Axios from "axios";
import { TransactionDTO } from "../../types";

export const saveTransaction = async (transaction: TransactionDTO) => {
  try {
    const res = await Axios({
      method: 'POST',
      url: '/api/transaction/create',
      data: transaction
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const getAllTransactions = async () => {
  try {
    const res = await Axios({
      method: 'GET',
      url: '/api/transaction/all',
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};