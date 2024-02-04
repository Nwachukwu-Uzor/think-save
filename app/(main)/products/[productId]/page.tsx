"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button, Container } from "@/components/shared";
import { useQuery } from "@tanstack/react-query";
import { FETCH_PRODUCT_BY_PRODUCT_ID } from "@/constants";
import { productsService } from "@/services";
import { ProductDetailsLoader } from "@/components/shared/skeleton-loaders";
import { CreatePlan } from "@/components/products";

const ProductDetail = () => {
  const [mode, setMode] = useState<"DETAILS" | "CREATE">("DETAILS");

  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useQuery({
    queryKey: [FETCH_PRODUCT_BY_PRODUCT_ID, productId],
    queryFn: async ({ queryKey }) => {
      const product = await productsService.getProductByProductId(queryKey[1]);
      return product;
    },
  });

  const handleToggleMode = () => {
    setMode((mode) => (mode === "CREATE" ? "DETAILS" : "CREATE"));
  };
  return (
    <>
      <Container>
        <section className="px-2 lg:px-3 py-3 lg:py-4 bg-white min-h-[50vh]">
          {isLoading ? (
            <ProductDetailsLoader />
          ) : product ? (
            mode === "DETAILS" ? (
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
                    <li
                      key={tenure.tenureId}
                      className="flex flex-col gap-2 bg-accent-blue px-2 py-3 lg:py-4 rounded-md"
                    >
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
                <div className="mt-4">
                  <div className="w-3/4 max-w-[200px]">
                    <Button color="main-blue" onClick={handleToggleMode}>
                      Start Plan
                    </Button>
                  </div>
                </div>
              </article>
            ) : (
              <CreatePlan product={product} handleClose={handleToggleMode} />
            )
          ) : null}
        </section>
      </Container>
    </>
  );
};

export default ProductDetail;
