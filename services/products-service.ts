import { baseUrl } from "@/config";
import { STATUS_CODES } from "@/constants";
import { ApiResponseType, CreateProductType, ProductType } from "@/types/shared";
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

    if (
      !response?.data?.status ||
      response?.data?.code === STATUS_CODES.FAILED
    ) {
      throw new Error(response?.data?.message ?? "Unable to get product");
    }

    return response?.data?.data;
  }

  async addOrEditProduct(data: Partial<CreateProductType>) {
    const response = await axios.post<ApiResponseType<ProductType[]>>(
      `${baseUrl}/Product/AddOrEditProduct`,
      data
    );
    return response;
  }
}

export const productsService = new ProductsService();
