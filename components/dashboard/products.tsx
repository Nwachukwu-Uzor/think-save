"use client";
import React from "react";
import { HiOutlineChip } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { Product } from ".";
import { useQuery } from "@tanstack/react-query";
import { FETCH_ALL_PRODUCTS } from "@/constants";
import { productsService } from "@/services";
import { ProductLoader } from "../shared/skeleton-loaders";

export const Products: React.FC = () => {
  const placeholders = new Array(6).fill("").map((_val, index) => index);
  const { data: products, isLoading } = useQuery({
    queryKey: [FETCH_ALL_PRODUCTS],
    queryFn: async () => {
      const products = await productsService.getAllProducts();
      return products;
    },
  });

  return (
    <>
      {isLoading ? (
        <>
          {placeholders.map((placeholder) => (
            <ProductLoader key={placeholder} />
          ))}
        </>
      ) : (
        <>
          {products && products.length > 0 ? (
            products.map((plan) => <Product {...plan} key={plan.productId} />)
          ) : (
            <div className="col-span-2 lg:col-span-3">No Product Found</div>
          )}
          <div className="bg-main-blue px-3 lg:px-4 py-4  text-white rounded-md flex flex-col items-center gap-4 lg:gap-8">
            <button className="w-10 h-8 lg:w-16 lg:h-14 flex items-center justify-center bg-accent-blue rounded-md text-main-blue active:scale-90 duration-150 active:opacity-55">
              <FaPlus />
            </button>
            <h3 className="text-sm lg:text-base font-semibold">
              Create Custom Plan
            </h3>
          </div>
        </>
      )}
    </>
  );
};
