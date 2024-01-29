import { AccountType } from ".";

export type UserType = {
  id: number;
  firstName: string;
  email: string;
  middleName: string;
  lastName: string;
  bvn: string;
  phone: string;
  gender: string;
  dob: string;
  city: string;
  mothersMaidenName: string;
  address: string;
  avatarUrl: string;
  nationality: string;
  state: string;
  joined?: string;
  userId?: string;
  country?: string;
  creditRationg?: number;
  imagePath?: string;
  dateOfBirth?: string;
  dateCreated?: string;
  customerId: string;
  accountId?: string;
  accounts?: AccountType[];
};
