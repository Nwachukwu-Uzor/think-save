import React from "react";
import Image from "next/image";
import { InvestmentType } from "@/types/shared";

type Props = {
  investments: InvestmentType[];
};

export const InvestmentAccounts: React.FC<Props> = ({ investments }) => {
  const categoriesLogo: Record<string, { iconSrc: string }> = {
    "target saving": { iconSrc: "/assets/images/target-icon.svg" },
    "project saving": {
      iconSrc: "/assets/images/project-icon.svg",
    },
    "entrepreneurial saving": {
      iconSrc: "/assets/images/work-icon.svg",
    },
    kolo: { iconSrc: "/assets/images/kolo-icon.svg" },
    "thrift esusu": { iconSrc: "/assets/images/thrift-icon.svg" },
  };
  return (
    <div>
      <div className="overflow-auto">
        <table className="table w-full whitespace-nowrap">
          <thead className="text-fade font-semibold border-0">
            <tr>
              <th className="text-center"></th>
              <th className="text-center">Tenure</th>
              <th className="text-center">Current Amount</th>
              <th className="text-right">Target Amount</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr
                key={investment.id}
                className="border-0 border-b border-b-gray-200 last:border-b-0"
              >
                <td className="flex gap-1 items-start">
                  <div className="h-6 w-6 lg:h-12 lg:w-12 flex items-center justify-center bg-accent-blue rounded-full">
                    <Image
                      src={categoriesLogo[investment.category]?.iconSrc ?? ""}
                      alt="Think Save"
                      height={10}
                      width={10}
                      className="w-4 h-4 lg:w-6 lg:h-6"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black">
                      {investment.description}
                    </h3>
                    <p className="text-xs text-fade font-semibold mt-1 capitalize">
                      {investment.category}
                    </p>
                  </div>
                </td>
                <td className="text-center">{investment.tenure}</td>
                <td className="text-center">{investment.currentAmount}</td>
                <td className="text-right">{investment.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
