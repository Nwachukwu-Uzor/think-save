import React from "react";
import { TransactionType } from "@/types/dashboard";
import { IoReceiptOutline } from "react-icons/io5";
import Image from "next/image";
import { formatNumberWithCommas } from "@/utils/shared";

type Props = {} & TransactionType;

export const Transaction: React.FC<Props> = ({
  type,
  description,
  date,
  amount,
}) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex gap-1 items-center">
        <span
          className={`h-8 w-8 lg:w-11 lg:h-11 font-bold inline-flex items-center justify-center rounded-full lg:text-xl  ${
            type === "credit"
              ? "bg-[#D0FFC5] text-[#0FC90C]"
              : "bg-[#FFD0D1] text-[#FE3032]"
          }`}
        >
          <IoReceiptOutline />
        </span>
        <div>
          <h3 className="text-sm lg:text-base font-bold text-black">
            {description}
          </h3>
          <p className="text-xs lg:text-sm text-fade font-semibold mt-1">
            {date}
          </p>
        </div>
      </div>
      <h2 className="text-sm lg:text-base font-semibold">
        N {formatNumberWithCommas(amount.toString())}
      </h2>
    </div>
  );
};
