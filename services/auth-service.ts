import { baseUrl } from "@/config";
import { ApiResponseType, UserType } from "@/types/shared";
import { getLocalOS } from "@/utils/shared";
import axios from "axios";

class AuthService {
  async login(data: { email: string; password: string }) {
    const payload = {
      ...data,
      OS: getLocalOS(),
      Channel: "Web",
      DeviceId: "192.168.1.1",
      IpAddress: Date.now().toString(),
    };

    const response = await axios.post<ApiResponseType<UserType>>(
      `${baseUrl}/Auth/UserLogin`,
      payload
    );

    return response.data;
  }

  async register(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    const payload = {
      ...data,
      OS: getLocalOS(),
      Channel: "Web",
      DeviceId: "192.168.1.1",
      IpAddress: Date.now().toString(),
      OSVersion: "10.0",
      DeviceName: "Web",
      DeviceToken: "12345678s"
    };

    const response = await axios.post<ApiResponseType<UserType>>(`${baseUrl}/User/UserSignUp`, payload);
    console.log(response);
    return response.data;
  }
}

export const authService = new AuthService();
