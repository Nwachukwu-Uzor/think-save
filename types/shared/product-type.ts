import { TenureType } from ".";

export type ProductType = {
  productId: string;
  productName: string;
  productDescription: string;
  tenure: string;
  interestRate: string;
  minimumAmount: number;
  withdrawalLimit: number | null;
  maximumAmount: number | null;
  preLiquidationPenality: number | null;
  penalty: string;
  maximumNoWithdrawal: number | null;
  productDescriptionItems: string[];
  tenures: TenureType[];
  interestRates: null;
};
