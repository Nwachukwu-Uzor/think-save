import React from "react";
import Image from "next/image";
import { Plan as PlanType } from "@/types/dashboard";

type Props = PlanType & {};
export const Plan: React.FC<Props> = ({ name, iconSrc }) => {
  return (
    <div className="bg-accent-blue px-3 lg:px-4 py-2 py-4 text-black rounded-md flex flex-col gap-4 lg:gap-8">
      <Image
        src={iconSrc}
        alt="Think Save"
        height={20}
        width={20}
        className="w-6 lg:w-10 h-auto"
      />
      <h3 className="text-sm lg:text-base font-bold">{name}</h3>
    </div>
  );
};
