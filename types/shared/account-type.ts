import { AccountInvestmentType } from ".";

export type AccountType = {
  id: string;
  accountId: string;
  accountName: string;
  virtualAcountNumber: null;
  customerId: string;
  productId: string;
  productName: string;
  balance: number;
  interestRate: string;
  dateCreated: string;
  dateUpdated: null;
  status: string;
  investment: null;
  accountInvestments?: AccountInvestmentType[];
  accountPeers: null;
};
