"use client";
import React from "react";
import { AccountSlider } from "./";
import { Button, Carousel, CarouselItem } from "../shared";
import { AccountType } from "@/types/shared";
import { FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { FETCH_ACCOUNTS_BY_CUSTOMER_ID } from "@/constants";
import { accountService } from "@/services";
import { AccountLoader } from "../shared/skeleton-loaders";

export const AccountsSlider: React.FC = () => {
  const session = useSession();
  const { data: accounts, isLoading } = useQuery({
    queryKey: [FETCH_ACCOUNTS_BY_CUSTOMER_ID, session?.data?.user?.customerId],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) {
        return null;
      }

      return await accountService.getAccountsByCustomerId(queryKey[1]);
    },
  });

  if (isLoading || session.status === "loading") {
    return <AccountLoader />;
  }

  return (
    <div className="relative">
      {accounts && accounts.length > 0 ? (
        <Carousel speed={5000}>
          {accounts.map((item) => (
            <CarouselItem key={item.accountId}>
              <AccountSlider {...item} />
            </CarouselItem>
          ))}
        </Carousel>
      ) : (
        <div className="text-white bg-main-red rounded-lg overflow-hidden w-full px-2 lg:px-3 py-6">
          <p className="text-sm lg:text-base text-[#FFC8C8] font-semibold text-right">
            No Accounts Found
          </p>
          <p className="text-sm lg:text-base mt-3 lg:mt-5 font-semibold">
            You have not created an account yet
          </p>
          <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mt-1 mb-3 lg:mb-5">
            Want to create your first account?
          </h3>
          <div className="max-w-[150px]">
            <Button color="fade-red">
              <FaPlus /> Create Account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
