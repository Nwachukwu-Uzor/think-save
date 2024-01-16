"use client";
import React from "react";
import { AccountSlider } from "./";
import { Carousel, CarouselItem } from "../shared";
import Slider from "react-slick";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {savingsArray.map((item) => (
          <AccountSlider {...item} key={item.id} />
        ))}
      </Slider>
    </div>
  );
};
