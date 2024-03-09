import { baseUrl } from "@/config";
import { DashboardDataType } from "@/types/admin";
import { ApiResponseType, ProductType } from "@/types/shared";
import axios from "axios";

class DashboardService {
    async getDashboardData() {
        const response = await axios.get<ApiResponseType<DashboardDataType>>(`${baseUrl}/Admin/Dashboard`)
        return response?.data?.data
    }
} 


export const dashboardService = new DashboardService();