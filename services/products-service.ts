import { baseUrl } from "@/config";
import { ApiResponseType, ProductType } from "@/types/shared";
import axios from "axios";
class ProductsService {
  async getAllProducts() {
    const response = await axios.get<ApiResponseType<ProductType[]>>(
      `${baseUrl}/Product/GetProducts`
    );

    if (!response?.data?.status) {
      throw new Error(response?.data?.message ?? "Unable to get products");
    }

    return response?.data?.data;
  }

  async getProductByProductId(productId: string) {
    const response = await axios.get<ApiResponseType<ProductType>>(
      `${baseUrl}/Product/GetProductById?ProductId=${productId}`
    );

    if (!response?.data?.status) {
      throw new Error(response?.data?.message ?? "Unable to get product");
    }

    return response?.data?.data;
  }
}

export const productsService = new ProductsService();
