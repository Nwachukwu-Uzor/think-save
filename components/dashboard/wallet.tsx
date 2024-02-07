"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";

import { formatNumberWithCommas } from "@/utils/shared";
import { Button } from "../shared";
import { AccountType, UserType } from "@/types/shared";
import { SESSION_STORAGE_KEY } from "@/config";
import { WalletLoader } from "../shared/skeleton-loaders";
import { toast } from "react-toastify";

export const Wallet: React.FC = () => {
  const [walletAccount, setWalletAccount] = useState<AccountType | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const handleToggleShowBalance = () => {
    setShowBalance((shown) => !shown);
  };

  useEffect(() => {
    const userString = sessionStorage.getItem(SESSION_STORAGE_KEY) as string;
    if (!userString) {
      return;
    }
    const userFromSessionStorage = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEY) as string
    ) as unknown as UserType;

    const { accounts } = userFromSessionStorage;
    if (!accounts || !accounts.length) {
      return;
    }

    const savingsWallets = accounts.filter(
      (account) =>
        account.accountName === "Savings Wallet" &&
        account.productId === "Savings"
    );
    const [savingsWallet] = savingsWallets;
    if (!savingsWallet) {
      return;
    }

    setWalletAccount(savingsWallet);
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Account copied successfully", {
        position: "bottom-right",
      });
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {walletAccount ? (
        <article className="flex flex-col justify-between gap-2 lg:gap-4 xl:gap-6">
          <div className="bg-accent-blue rounded-sm py-4 lg:py-6 flex flex-col items-center justify-center gap-0.5">
            <div className="w-full text-right px-3">
              <p
                className="text-xs lg:text-sm font-medium flex justify-end items-center gap-1 active:scale-y-75 active:opacity-85 duration-100 cursor-pointer"
                onClick={() => handleCopy(walletAccount.accountId)}
              >
                {walletAccount.accountId}{" "}
                {isCopied ? (
                  <HiOutlineClipboardDocumentCheck className="text-green-700" />
                ) : (
                  <HiOutlineClipboardDocument />
                )}
              </p>
            </div>
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
                  <span>
                    N {formatNumberWithCommas(walletAccount.balance.toString())}
                  </span>
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
              <span
                onClick={handleToggleShowBalance}
                className="cursor-pointer"
              >
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
      ) : (
        <WalletLoader />
      )}
    </>
  );
};
