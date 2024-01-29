"use client";
import React from "react";
import { AccountSlider } from "./";
import { Carousel, CarouselItem } from "../shared";
import { AccountType } from "@/types/shared";

type Props = {
  accounts: AccountType[];
};

export const AccountsSlider: React.FC<Props> = ({ accounts }) => {
  return (
    <div className="relative">
      <Carousel speed={5000}>
        {accounts.map((item) => (
          <CarouselItem key={item.id}>
            <AccountSlider {...item} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
