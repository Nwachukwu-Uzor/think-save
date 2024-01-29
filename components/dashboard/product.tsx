import React from "react";
import { HiOutlineChip } from "react-icons/hi";
import Image from "next/image";
import { categoriesLogo } from "@/constants";
import { ProductType } from "@/types/shared";
import Link from "next/link";

type Props = ProductType & {};
export const Product: React.FC<Props> = ({ productName, productId }) => {
  return (
    <Link
      href={`/products/${productId}`}
      className="bg-accent-blue px-3 lg:px-4 py-4 text-black rounded-md flex flex-col gap-4 lg:gap-8"
    >
      {categoriesLogo[productName.toLowerCase()] ? (
        <Image
          src={categoriesLogo[productName.toLowerCase()].iconSrc ?? " "}
          alt="Think Save"
          height={20}
          width={20}
          className="w-6 lg:w-10 h-auto"
        />
      ) : (
        <>
          <HiOutlineChip className="text-2xl lg:text-4xl text-main-blue" />
        </>
      )}
      <h3 className="text-sm lg:text-base font-medium">{productName}</h3>
    </Link>
  );
};
