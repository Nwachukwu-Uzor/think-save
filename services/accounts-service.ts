import { baseUrl } from "@/config";
import { AccountValidationResultType } from "@/types/dashboard";
import { AccountType, ApiResponseType, BankType } from "@/types/shared";
import axios from "axios";

class AccountService {
  async getAccountsByCustomerId(customerId: string) {
    const response = await axios.get<ApiResponseType<AccountType[]>>(
      `${baseUrl}/Account/GetAccountsByCustomerId?CustomerId=${customerId}`
    );

    if (!response.data.status) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  }

  async getAccountByAccountId(accountId: string) {
    const response = await axios.get<ApiResponseType<AccountType>>(
      `${baseUrl}/Account/GetAccountByAccountId?AccountId=${accountId}`
    );
    return response?.data?.data;
  }

  async getBanks() {
    const response = await axios.get<ApiResponseType<BankType[]>>(
      `${baseUrl}/Transfer/Banks`
    );
    console.log(response?.data?.data);
    return response?.data?.data;
  }

  async validateAccountNumber(beneficiaryBank: string, accountNumber: string) {
    const payload = {
      beneficiaryBank,
      accountNumber,
    };
    const response = await axios.post<
      ApiResponseType<AccountValidationResultType>
    >(`${baseUrl}/Transfer/AccountEnquiry`, payload);
    return response?.data;
  }
}

export const accountService = new AccountService();
