export type InvestmentCreateType = {
  Name: string;
  customerId: string;
  productId: string;
  Amount: string;
  Tenure: string;
  StartDate: string;
  MaturityDate: string;
  Interest: string;
  WithholdingTax?: string;
  LockStatus: string;
  TotalPayout: string;
  InvestmentReturns?: string;
  Status?: string;
  Description?: string;
  Frequency: string;
  ReoccuringAmount: string;
  DayOfTheWeek?: string;
  DayOfTheMonth?: string;
  PreferredTime: string;
  TotalSlot?: string;
  FundingSource: string;
};
