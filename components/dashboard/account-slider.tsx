import React, { ComponentProps } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../shared/";
import { formatNumberWithCommas } from "@/utils/shared";
import { AccountType } from "@/types/shared";

type Props = AccountType & Omit<ComponentProps<"div">, "id">;

export const AccountSlider: React.FC<Props> = ({
  productName,
  id,
  accountName,
  balance,
}) => {
  return (
    <div className="text-white bg-main-red rounded-lg overflow-hidden w-full px-2 lg:px-3 py-6">
      <p className="text-sm lg:text-base text-[#FFC8C8] font-semibold text-right">
        {productName}
      </p>
      <p className="text-sm lg:text-base mt-3 lg:mt-5 font-semibold">
        {accountName}
      </p>
      <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mt-1 mb-3 lg:mb-5">
        N {formatNumberWithCommas(balance.toString())}
      </h3>
      <div className="max-w-[150px]">
        <Button color="fade-red">
          <FaPlus /> Add Account
        </Button>
      </div>
    </div>
  );
};
