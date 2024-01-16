"use client";
import React from "react";
import { AccountSlider } from "./";
import { Carousel, CarouselItem } from "../shared";

export const AccountsSlider = () => {
  const savingsArray = [
    { id: 1, type: "Target Saving", title: "Vacation Fund", amount: 1000 },
    {
      id: 2,
      type: "Project Saving",
      title: "Home Renovation",
      amount: 2000,
    },
    {
      id: 3,
      type: "Entrepreneurial Saving",
      title: "Business Startup",
      amount: 5000,
    },
    {
      id: 4,
      type: "Thrift Esusu",
      title: "Community Contributions",
      amount: 800,
    },
    { id: 5, type: "Target Saving", title: "Emergency Fund", amount: 1500 },
  ];

  return (
    <div className="relative">
      <Carousel speed={5000}>
        {savingsArray.map((item) => (
          <CarouselItem key={item.id}>
            <AccountSlider {...item} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
