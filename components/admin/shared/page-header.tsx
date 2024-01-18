"use client";
import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared";
import { IoMenu } from "react-icons/io5";
import { useSidebarContext } from "@/context/admin/sidebar";

type Props = {
  title: string;
  subTitle?: string;
};

export const PageHeader: React.FC<Props> = ({ title, subTitle }) => {
  const { handleToggleOpen } = useSidebarContext();
  return (
    <header className="bg-main-blue text-white w-full min-h-[18vh] flex items-center pb-10">
      <Container>
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold">{title}</h3>
            {subTitle ? (
              <p className="text-xs lg:text-sm font-semibold mt-0.5 text-[#C5D8FF]">
                {subTitle}
              </p>
            ) : null}
          </div>
          <div className="flex gap-2 lg:gap-3">
            <div className=" h-8 w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-white rounded-md">
              <Image
                src="/assets/images/notifications-dark.svg"
                alt="Think Save"
                height={20}
                width={20}
                className="h-6 w-6"
              />
            </div>
            <Image
              src="/assets/images/dummy-avatar.png"
              alt="Think Save"
              height={20}
              width={20}
              className="h-8 w-8 lg:h-10 lg:w-10"
            />
            <IoMenu
              className="relative z-30 text-white text-3xl font-semibold active:scale-75 active:opacity-75 duration-150 lg:hidden"
              onClick={handleToggleOpen}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};
