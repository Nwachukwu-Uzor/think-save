import { baseUrl } from "@/config";
import {
  AccountType,
  ApiResponseType,
  InvestmentCreateType,
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
}

export const investmentService = new InvestmentService();
