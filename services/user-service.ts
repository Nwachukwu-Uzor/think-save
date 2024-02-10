import { baseUrl } from "@/config";
import { ApiResponseType, UserType } from "@/types/shared";
import axios from "axios";

class UserService {
  async getUserByCustomerId(customerId: string) {
    const response = await axios.get<ApiResponseType<UserType>>(
      `${baseUrl}/Customer/GetCustomerByCustomerId?customerId=${customerId}`
    );
    return response?.data?.data;
  }
}

export const userService = new UserService();
