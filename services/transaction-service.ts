import { baseUrl } from "@/config";
import { TransactionType } from "@/types/dashboard";
import { ApiResponseType } from "@/types/shared";
import axios from "axios";
class TransactionService {
  async getTransactionByCustomerId(customerId: string) {
    const response = await axios.get<ApiResponseType<TransactionType[]>>(
      `${baseUrl}/Transaction/GetTransactionsByCustomerId?CustomerId=${customerId}`
    );

    if (!response?.data?.status) {
      throw new Error(response?.data?.message ?? "Unable to get transactions");
    }
    return response?.data?.data;
  }

  async makeTransfer<T extends unknown>(data: T) {
    const response = await axios.post<ApiResponseType<null>>(
      `${baseUrl}/Wallet/FundTransfer`,
      data
    );

    return response;
  }

  async adminFetchAllTransaction() {
    const response = await axios.get<ApiResponseType<TransactionType[]>>(
      `${baseUrl}/Transaction/GetAllTransactions?count=10000`
    );
    return response?.data?.data;
  }

  async adminFilterTransaction<T>(filter: T) {}
}

export const transactionService = new TransactionService();
