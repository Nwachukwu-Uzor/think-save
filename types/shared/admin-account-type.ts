export type AdminAccountType = {
  Id: number;
  InvestmentId: string;
  Name: string;
  CustomerId: string;
  ProductId: string;
  AccountId: string;
  Amount: string;
  Tenure: string;
  StartDate: string;
  MaturityDate: string;
  Interest: string;
  WithholdingTax?: number;
  LockStatus?: "N";
  InvestmentReturns?: string;
  Description?: string;
  DayOfTheWeek?: string;
  TotalSlot?: number;
  DateCreated?: string;
  DateUpdated?: string;
  Status?: string;
  AmountSaved?: number;
  VirtualAcountNumber?: string;
};