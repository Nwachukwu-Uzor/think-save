import React from "react";
import Image from "next/image";
import { CgExpand } from "react-icons/cg";
import { AccountType } from "@/types/shared";
import { Card } from "../shared";
import { formatNumberWithCommas } from "@/utils/shared";

type Props = {
  account: AccountType;
};

export const Account: React.FC<Props> = ({ account }) => {
  return (
    <Card>
      <div className="my-2 flex justify-end text-xl text-main-blue">
        <CgExpand />
      </div>
      <h3 className="text-sm lg:text-lg text-main-blue font-bold my-1">
        {(account, accountName)}
      </h3>
      <p className="text-xs lg:text-sm text-fade font-semibold">
        {account.productName}
      </p>
      <div className="p-2 lg:p-4 rounded-md bg-accent-blue mt-2 lg:mt-3 relative">
        <h2 className="text-sm lg:text-lg text-main-blue font-bold my-1">
          {formatNumberWithCommas(account.balance.toString())}
        </h2>
        <p className="text-xs lg:text-sm text-fade font-semibold">
          Current Balance
        </p>
        <div className="absolute top-[50%] -translate-y-[50%] right-0 bg-white p-1 lg:p-1.5 rounded-l-full">
          <Image
            src="/assets/images/wallet.svg"
            alt="Think Save"
            className="w-4 lg:w-6"
            height={20}
            width={20}
          />
        </div>
      </div>
    </Card>
  );
};
