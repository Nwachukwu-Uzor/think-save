import { baseUrl } from "@/config";
import { AccountValidationResultType } from "@/types/dashboard";
import {
  AccountType,
  AdminAccountType,
  ApiResponseType,
  BankType,
  UserType,
} from "@/types/shared";
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

  async spoolAccounts<T extends unknown>(filter: T) {
    const response = await axios.post<ApiResponseType<AdminAccountType[]>>(
      `${baseUrl}/Admin/AccountsSpool`,
      filter
    );

    return response?.data?.data;
  }

  async adminUpdateUserAccount(data: {
    actionType?: string;
    userEmail?: string;
    adminEmail?: string;
  }) {
    const url = `${baseUrl}/Admin/${data.actionType}User?username=${data.userEmail}&appUser=${data.adminEmail}`;
    const response = await axios.post<ApiResponseType<null>>(url);
    return response
  }

  async getAllUser() {
    const response = await axios.get<ApiResponseType<AdminAccountType[]>>(
      `${baseUrl}/Admin/GetAllUser`
    );

    return response?.data?.data;
  }
}

export const accountService = new AccountService();
