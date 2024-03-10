import { TenureType } from ".";

export type ProductType = {
  productId: string;
  productName: string;
  productDescription: string;
  tenure: string;
  interestRate: string;
  minimumAmount?: string;
  withdrawalLimit?: string;
  maximumAmount?: string;
  preLiquidationPenality?: string;
  penalty?: string;
  maximumNoWithdrawal?: string;
  productDescriptionItems: string[];
  tenures: TenureType[];
  interestRates: null;
};


export type CreateProductType = {
  productId: string;
  productName: string;
  productDescription: string;
  tenure: string;
  interestRate: string;
  minimumAmount?: number;
  withdrawalLimit?: string;
  maximumAmount?: number;
  preLiquidationPenality?: string;
  penalty?: string;
  maximumNoWithdrawal?: number;
  productDescriptionItems: string[];
  tenures: TenureType[];
  interestRates?: string;
}