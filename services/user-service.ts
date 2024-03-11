import { baseUrl } from "@/config";
import { STATUS_CODES } from "@/constants";
import { AdminInfoType, AdminUserCreateType } from "@/types/admin";
import { ApiResponseType, UserType } from "@/types/shared";
import axios from "axios";

class UserService {
  async getUserByCustomerId(customerId: string) {
    const response = await axios.get<ApiResponseType<UserType>>(
      `${baseUrl}/Customer/GetCustomerByCustomerId?customerId=${customerId}`
    );
    if (response?.data?.code === STATUS_CODES.FAILED) {
      throw new Error(response?.data?.message);
    }
    return response?.data?.data;
  }

  async createTransactionPin(pin: string, userId?: string) {
    const response = await axios.post<ApiResponseType<null>>(
      `${baseUrl}/Transfer/CreateTransactionPin?userId=${userId}&transactionPin=${pin}`
    );

    return response;
  }

  async getAdminUserByUsername(username: string) {
    const response = await axios.post<ApiResponseType<AdminInfoType>>(
      `${baseUrl}/Admin/GetAdmin?username=${username}`
    );
    return response?.data?.data;
  }

  async addAdminUser(data: AdminUserCreateType) {
    const response = await axios.post<ApiResponseType<null>>(
      `${baseUrl}/Admin/AddOrEditAdmin`,
      data
    );
    return response;
  }
}

export const userService = new UserService();
