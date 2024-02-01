import { baseUrl } from "@/config";
import { ApiResponseType, CountryType } from "@/types/shared";
import axios from "axios";

class LocationService {
  async getCountries() {
    const response = await axios.get<ApiResponseType<CountryType[]>>(
      `${baseUrl}/Location/GetCountries`
    );

    if (!response.data.status) {
      throw new Error("Unable to get countries");
    }

    return response.data.data;
  }
}

export const locationService = new LocationService();