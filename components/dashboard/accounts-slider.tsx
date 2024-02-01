"use client";
import React from "react";
import { AccountSlider } from "./";
import { Button, Carousel, CarouselItem } from "../shared";
import { AccountType } from "@/types/shared";
import { FaPlus } from "react-icons/fa6";

type Props = {
  accounts: AccountType[];
};

export const AccountsSlider: React.FC<Props> = ({ accounts }) => {
  return (
    <div className="relative">
      {accounts.length > 0 ? (
        <Carousel speed={5000}>
          {accounts.map((item) => (
            <CarouselItem key={item.id}>
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
