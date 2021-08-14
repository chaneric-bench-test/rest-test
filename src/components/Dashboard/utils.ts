import { callApi } from '../../api';
import { API_ENDPOINT, TRANSACTION } from '../../endpoints';
import { TransactionResponse } from '../../types/Transaction';

export const fetchPage = async (pageNo = 1) => {
  try {
    return await callApi<TransactionResponse>(`${API_ENDPOINT}${TRANSACTION}/${pageNo}.json`)
  } catch (e) {
    throw new Error(e);
  }
};
