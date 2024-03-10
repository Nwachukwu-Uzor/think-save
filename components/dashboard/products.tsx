"use client";
import React from "react";
import { Product } from ".";
import { useQuery } from "@tanstack/react-query";
import { FETCH_ALL_PRODUCTS } from "@/constants";
import { productsService } from "@/services";
import { ProductLoader } from "../shared/skeleton-loaders";

type Props = {
  isAdmin?: boolean;
}

export const Products: React.FC<Props> = ({isAdmin=false}) => {
  const placeholders = new Array(6).fill("").map((_val, index) => index);
  const { data: products, isLoading } = useQuery({
    queryKey: [FETCH_ALL_PRODUCTS],
    queryFn: async () => {
      const products = await productsService.getAllProducts();
      return products;
    },
  });

  if (isLoading) {
    return placeholders.map((placeholder) => (
      <ProductLoader key={placeholder} />
    ));
  }

  const filteredProducts =
    products?.filter((product) => product.productId !== "Savings") ?? [];

  return (
    <>
      {
        <>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((plan) => (
              <Product {...plan} key={plan.productId} isAdmin={isAdmin} />
            ))
          ) : (
            <div className="col-span-2 lg:col-span-3">No Product Found</div>
          )}
        </>
      }
    </>
  );
};
