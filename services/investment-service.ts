import { baseUrl } from "@/config";
import {
  AccountType,
  ApiResponseType,
  InvestmentCreateType,
  InvestmentType,
} from "@/types/shared";
import axios from "axios";

class InvestmentService {
  async addInvestment(data: InvestmentCreateType) {
    const response = await axios.post<ApiResponseType<AccountType[]>>(
      `${baseUrl}/Investment/AddOrEditInvestment`,
      data
    );

    return response?.data;
  }

  async getInvestmentByCustomerId(customerId: string) {
    const response = await axios.get<ApiResponseType<InvestmentType[]>>(
      `${baseUrl}/Investment/GetInvestmentByCustomerId?CustomerId=${customerId}`
    );

    if (!response?.data?.status) {
      throw new Error(response?.data?.message);
    }

    return response?.data?.data;
  }
}

export const investmentService = new InvestmentService();
