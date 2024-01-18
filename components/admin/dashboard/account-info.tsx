import React from "react";
import Image from "next/image";
import { formatNumberWithCommas } from "@/utils";

type Props = {
  iconsUrl: string;
  count: number;
  description: React.ReactNode;
};
export const AccountInfo: React.FC<Props> = ({
  iconsUrl,
  count,
  description,
}) => {
  return (
    <div className="bg-accent-blue p-2 lg:p-3 rounded-md w-full">
      <Image
        src={iconsUrl}
        alt="Think Save"
        height={20}
        width={20}
        className="h-8 w-8 lg:h-10 lg:w-10"
      />
      <div className="mt-4 lg:mt-6">
        <h1 className="text-sm lg:text-2xl xl:text-3xl font-bold text-main-blue">
          {formatNumberWithCommas(count.toString())}
        </h1>
        <h3 className="text-xs mt-0.5 lg:text-sm font-bold text-black">
          {description}
        </h3>
      </div>
    </div>
  );
};
