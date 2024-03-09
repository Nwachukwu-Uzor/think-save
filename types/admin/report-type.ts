import { AccountInfoType } from ".";

export type ReportType = {
  activeAccounts: AccountInfoType[];
  plans: AccountInfoType[];
  users: AccountInfoType[];
  newSignUps: AccountInfoType[];
};
