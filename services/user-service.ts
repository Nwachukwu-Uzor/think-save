import { baseUrl } from "@/config";
import { STATUS_CODES } from "@/constants";
import { ApiResponseType, UserType } from "@/types/shared";
import axios from "axios";

class UserService {
  async getUserByCustomerId(customerId: string) {
    const response = await axios.get<ApiResponseType<UserType>>(
      `${baseUrl}/Customer/GetCustomerByCustomerId?customerId=${customerId}`
    );
    if (response?.data?.code === STATUS_CODES.FAILED) {
      throw new Error(response?.data?.message)
    }
    return response?.data?.data;
  }
}

export const userService = new UserService();
