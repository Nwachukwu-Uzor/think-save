import React from "react";
import { Products as ProductsComponent } from "@/components/dashboard";
import { Container } from "@/components/shared";

const Products = () => {
  return (
    <>
      <Container>
        <section className="bg-white px-2 py-4 rounded-sm">
          <h3 className="lg:text-lg font-semibold mb-3">Products</h3>
          <article className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-3 xl:gap-6">
            <ProductsComponent />
          </article>
        </section>
      </Container>
    </>
  );
};

export default Products;
