export type TransactionType = {
  id: number;
  amount: number;
  description: string;
  date: string;
  transactionType: string;
  transactionId: string;
  accountId?: string;
  customerId?: string;
  currency?: string;
};
