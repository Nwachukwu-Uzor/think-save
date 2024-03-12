"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";

import { formatNumberWithCommas } from "@/utils/shared";
import { Button, EmptyPage } from "../shared";
import { AccountType, UserType } from "@/types/shared";
import { SESSION_STORAGE_KEY } from "@/config";
import { WalletLoader } from "../shared/skeleton-loaders";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  FETCH_ACCOUNTS_BY_CUSTOMER_ID,
  FETCH_USER_BY_CUSTOMER_ID,
} from "@/constants";
import { accountService, userService } from "@/services";
import { MdClose } from "react-icons/md";
import { AddMoneyModalContent, WithdrawModalContent } from ".";
import { MoonLoader } from "react-spinners";
import Link from "next/link";

export const Wallet: React.FC = () => {
  const session = useSession();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: accounts, isLoading } = useQuery({
    queryKey: [FETCH_ACCOUNTS_BY_CUSTOMER_ID, session.data?.user?.customerId],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) {
        return null;
      }

      return await accountService.getAccountsByCustomerId(queryKey[1]);
    },
  });

  const { data: user, isLoading: isLoadingProfile } = useQuery({
    queryKey: [FETCH_USER_BY_CUSTOMER_ID, session?.data?.user?.customerId],
    queryFn: async ({ queryKey }) => {
      const [_first, second] = queryKey;
      if (!second) {
        return null;
      }

      return await userService.getUserByCustomerId(second);
    },
  });

  const walletAccount = useMemo(() => {
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

    return savingsWallet;
  }, [accounts]);

  console.log(walletAccount)
  const [isCopied, setIsCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [modalType, setModalType] = useState<"WITHDRAW" | "ADD" | "">("");

  const handleToggleShowBalance = () => {
    setShowBalance((shown) => !shown);
  };

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
    } catch (error) {}
  };

  if (isLoading || session.status === "loading") {
    return <WalletLoader />;
  }

  const handleShowModal = () => {
    const element = document.getElementById("my_modal_1") as HTMLElement & {
      showModal: () => void;
    };

    if (element) {
      element.showModal();
    }
  };

  const handleAddMoneyBtnClick = () => {
    handleShowModal();
    setModalType("ADD");
  };

  const handleCloseModal = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const handleWithdrawBtnClick = () => {
    handleShowModal();
    setModalType("WITHDRAW");
  };

  return (
    <>
      {walletAccount ? (
        <article className="flex flex-col justify-between gap-2 lg:gap-4 xl:gap-6">
          <div className="bg-accent-blue rounded-sm py-4 lg:py-6 flex flex-col items-center justify-center gap-0.5">
            <div className="w-full text-right px-3">
              <p
                className="text-xs lg:text-sm font-medium flex justify-end items-center gap-1 active:scale-y-75 active:opacity-85 duration-100 cursor-pointer"
                onClick={() => handleCopy(walletAccount?.virtualAcountNumber ?? "")}
              >
                {walletAccount?.virtualAcountNumber}{" "}
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
            <Button color="accent-blue" onClick={handleWithdrawBtnClick}>
              <Image
                src="/assets/images/withdraw-funds.svg"
                width={4}
                height={4}
                alt="Think Save"
                className="w-2 lg:w-4 h-auto"
              />
              Withdraw Funds
            </Button>
            <Button color="main-blue" onClick={handleAddMoneyBtnClick}>
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
        <EmptyPage title="No wallet found" />
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-[90%] max-w-[400px] overflow-y-scroll no-scrollbar bg-white">
          {modalType === "ADD" && (
            <AddMoneyModalContent
              handleClose={handleCloseModal}
              accountNumber={walletAccount?.virtualAcountNumber ?? ""}
            />
          )}
          {modalType === "WITHDRAW" && (
            <>
              {isLoading ? (
                <MoonLoader color="#0E12A2" size={30} />
              ) : !(user && user.ups === "1") ? (
                <WithdrawModalContent
                  handleClose={handleCloseModal}
                  maxAmount={walletAccount?.balance ?? 0}
                  sourceAccountNumber={walletAccount?.virtualAcountNumber ?? ""}
                  customerId={user?.customerId ?? ""}
                />
              ) : (
                <>
                  <div className="flex justify-end items-center mb-2">
                    <MdClose
                      onClick={handleCloseModal}
                      className="text-sm cursor-pointer"
                    />
                  </div>
                  <h2 className="font-semibold mb-2 text-center">
                    No Transation Pin
                  </h2>
                  <p className="text-center">
                    You cannot complete this withdrawal as you have not set a
                    transaction pin yet. Click the link below to proceed to set
                    a pin now
                  </p>
                  <div className="flex items-center justify-center mt-2">
                    <Link
                      href={`/profile/${user?.userId}/create-pin`}
                      className="text-main-blue text-xs text-center font-semibold hover:opacity-75 underline py-0.5"
                    >
                      Set Pin now
                    </Link>
                  </div>
                </>
              )}
              {user?.ups}
            </>
          )}
          <div className="modal-action">
            <form method="dialog" className="hidden">
              <button ref={buttonRef}>close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
