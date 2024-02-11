import { baseUrl } from "@/config";
import { AccountType, ApiResponseType } from "@/types/shared";
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

    // const response = await axios.post<ApiResponseType<>>()
  }
}

export const accountService = new AccountService();
