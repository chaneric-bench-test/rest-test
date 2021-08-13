export interface Transaction {
  Date: string;
  Ledger: string;
  Amount: string;
  Company: string;
}

export interface TransactionResponse {
  totalCount: number;
  page: number;
  transactions: Array<Transaction>;
}