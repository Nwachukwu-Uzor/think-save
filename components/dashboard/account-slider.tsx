import React, { ComponentProps } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../shared/";
import { formatNumberWithCommas } from "@/utils/shared";

type Props = {
  id: number;
  type: string;
  title: string;
  amount: number;
} & Omit<ComponentProps<"div">, "id">;

export const AccountSlider: React.FC<Props> = ({
  type,
  id,
  title,
  amount,
  ...rest
}) => {
  return (
    <div
      className="text-white bg-main-red rounded-lg overflow-hidden w-full px-2 lg:px-3 py-6"
      {...rest}
    >
      <p className="text-sm lg:text-base text-fade font-semibold text-right">
        {type}
      </p>
      <p className="text-sm lg:text-base mt-3 lg:mt-5 font-semibold">{title}</p>
      <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mt-1 mb-3 lg:mb-5">
        N {formatNumberWithCommas(amount.toString())}
      </h3>
      <div className="max-w-[200px]">
        <Button color="white-red">
          <FaPlus /> Add Account
        </Button>
      </div>
    </div>
  );
};
