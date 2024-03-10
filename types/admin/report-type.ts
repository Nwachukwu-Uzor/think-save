import { AccountInfoType } from ".";

type ActiveAccountType = {
  Id: string;
  InvestmentId: string;
  Name: string;
  CustomerId: string;
  ProductId: string;
  AccountId: string;
  Amount: number;
  Tenure: string;
  StartDate: string;
  MaturityDate: string;
  Interest: string;
  WithholdingTax: number;
  LockStatus: string;
  InvestmentReturns?: number;
  Description?: string;
  DayOfTheWeek?: string;
  TotalSlot?: string;
  DateCreated: string;
  DateUpdated?: string;
  Status: string;
  AmountSaved: number;
  VirtualAcountNumber?: string;
};

export type ReportType = {
  activeAccounts: ActiveAccountType[];
  plans: AccountInfoType[];
  users: (AccountInfoType & { CustomerId: string })[];
  newSignUps: AccountInfoType[];
};
