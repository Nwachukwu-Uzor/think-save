"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { formatNumberWithCommas } from "@/utils";
import { Button } from "../shared";

type Props = {
  balance: number;
};

export const Wallet: React.FC<Props> = ({ balance }) => {
  const [showBalance, setShowBalance] = useState(false);

  const handleToggleShowBalance = () => {
    setShowBalance((shown) => !shown);
  };
  return (
    <article className="flex flex-col justify-between gap-2 lg:gap-4 xl:gap-6">
      <div className="bg-accent-blue rounded-sm py-4 lg:py-6 flex flex-col items-center justify-center gap-0.5">
        <Image
          src="/assets/images/wallet.svg"
          width={20}
          height={20}
          alt="Think Save"
          className="w-6 lg:w-10 xl:w-12 h-auto"
        />
        <div className="flex gap-1 items-center text-main-blue font-bold text-lg lg:text-xl min-h-8">
          <span>
            {showBalance ? (
              <span>N {formatNumberWithCommas(balance.toString())}</span>
            ) : (
              <span className="flex items-center gap-1">
                {new Array(4).fill("").map((_item, index) => (
                  <span
                    key={index}
                    className="inline-block h-[4px] w-[4px] lg:h-[8px] lg:w-[8px] rounded-full bg-main-blue"
                  ></span>
                ))}
              </span>
            )}
          </span>
          <span onClick={handleToggleShowBalance} className="cursor-pointer">
            {showBalance ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p className="text-sm lg:text-base text-fade font-semibold">
          Wallet Balance
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4  items-center justify-between">
        <Button color="accent-blue">
          <Image
            src="/assets/images/withdraw-funds.svg"
            width={4}
            height={4}
            alt="Think Save"
            className="w-2 lg:w-4 h-auto"
          />
          Withdraw Funds
        </Button>
        <Button color="main-blue">
          <Image
            src="/assets/images/fund-wallet.svg"
            width={4}
            height={4}
            alt="Think Save"
            className="w-2 lg:w-4 h-auto"
          />
          Add Money
        </Button>
      </div>
    </article>
  );
};
