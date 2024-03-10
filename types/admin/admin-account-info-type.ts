import { UserType } from "../shared";

export type AdminAccountInfoType = {
  id: number;
  userId: string;
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  roleId?: string;
  transactionPin?: string;
  transactionPinStatus?: string;
  sessionId?: string;
  status: string;
  dateCreated: string;
  dateUpdated: string;
  deviceId?: string;
  deviceName?: string;
  deviceToken?: string;
  os?: string;
  osVersion: string;
  ipAddress?: string;
  noOfFailedLoginAttempts?: number;
  noOfFailedPinAttempts?: string;
  customer?: UserType;
};
