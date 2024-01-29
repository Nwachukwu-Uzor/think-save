"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/shared";
import { useQuery } from "@tanstack/react-query";
import { FETCH_PRODUCT_BY_PRODUCT_ID } from "@/constants";
import { productsService } from "@/services";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { isLoading, data: product } = useQuery({
    queryKey: [FETCH_PRODUCT_BY_PRODUCT_ID, productId],
    queryFn: async ({ queryKey }) => {
      const product = await productsService.getProductByProductId(queryKey[1]);
      return product;
    },
  });

  return (
    <>
      <Container>
        <section className="px-2 lg:px-3 py-3 lg:py-4 bg-white">
          {isLoading ? (
            <p>Loading...</p>
          ) : product ? (
            <article>
              <h2 className="lg:text-lg font-semibold mb-2">
                {product.productName}
              </h2>
              <h2 className="lg:text-lg font-medium mb-2">Description</h2>
              <p className="font-light">{product.productDescription}</p>
              <ul className="flex flex-col gap-2 mt-3 list-disc px-2 lg:px-3">
                {product.productDescriptionItems.map((item) => (
                  <li key={item} className="font-light">
                    {item}
                  </li>
                ))}
              </ul>
              <h2 className="lg:text-lg font-medium mb-2 mt-4 lg:mt-6">
                Tenures
              </h2>
              <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4">
                {product.tenures.map((tenure) => (
                  <li key={tenure.tenureId} className="flex flex-col gap-2 bg-accent-blue px-2 py-3 lg:py-4 rounded-md">
                    <h3 className="font-light">
                      <span className="font-medium">Duration:</span>{" "}
                      {tenure.tenure}
                    </h3>
                    <h3 className="font-light">
                      <span className="font-medium">Interest Rate:</span>{" "}
                      {tenure.interest} Per Annum
                    </h3>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>
      </Container>
    </>
  );
};

export default ProductDetail;
