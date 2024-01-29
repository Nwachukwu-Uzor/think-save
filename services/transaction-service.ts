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
        throw new Error(response?.data?.message ?? "Unable to get transactions")
    } 
    return response?.data?.data;
  }
}

export const transactionService = new TransactionService();
