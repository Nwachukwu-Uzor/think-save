import { AccountType } from "@/types/shared";
import React from "react";
import { Card } from "../shared";
import { formatNumberWithCommas } from "@/utils/shared";
import Image from "next/image";

interface Props {
  account: AccountType;
}
export const AccountSummary: React.FC<Props> = ({ account }) => {
  return (
    <Card>
      <h3 className="text-sm lg:text-lg text-main-blue font-bold my-1">
        {account.accountName}
      </h3>
      <p className="text-xs lg:text-sm text-fade font-semibold">
        {account.productName}
      </p>
      <div className="p-2 lg:p-4 rounded-md bg-accent-blue mt-2 lg:mt-3 relative">
        <h2 className="text-sm lg:text-lg text-main-blue font-bold my-1">
          {account.balance !== null && account.balance !== undefined
            ? formatNumberWithCommas(account.balance.toString())
            : null}
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
      <div className="flex items-center justify-between text-xs lg:text-sm mt-2 lg:mt-3">
        <h1 className="font-semibold">Date Created:</h1>
        <p className="font-bold text-fade">{account.dateCreated}</p>
      </div>
    </Card>
  );
};
