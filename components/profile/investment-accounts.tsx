import React from "react";
import Image from "next/image";
import { InvestmentType } from "@/types/shared";
import { FETCH_INVESTMENTS_BY_CUSTOMER_ID, categoriesLogo } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services";

type Props = {
  customerId?: string;
};

export const InvestmentAccounts: React.FC<Props> = ({ customerId }) => {
  const { data: investments, isLoading } = useQuery({
    queryKey: [FETCH_INVESTMENTS_BY_CUSTOMER_ID, customerId],
    queryFn: async ({ queryKey }) => {
      const [_first, second] = queryKey;
      if (!second) {
        return null;
      }

      const data = await investmentService.getInvestmentByCustomerId(second);
      return data;
    },
  });

  const formatInvestments = () => {
    if (!investments) {
      return investments;
    }

    if (investments.length < 5) {
      return investments;
    }

    return investments.slice(0, 5);
  };

  const formattedInvestments = formatInvestments();

  return (
    <div>
      <div className="overflow-auto">
        <table className="table w-full whitespace-nowrap">
          <thead className="text-fade font-semibold border-0">
            <tr>
              <th className="text-center"></th>
              <th className="text-center">Tenure</th>
              <th className="text-center">Total Payout</th>
              <th className="text-right">Target Amount</th>
            </tr>
          </thead>
          <tbody>
            {formattedInvestments?.map((investment) => (
              <tr
                key={investment.id}
                className="border-0 border-b border-b-gray-200 last:border-b-0"
              >
                <td className="flex gap-1 items-start">
                  <div className="h-6 w-6 lg:h-12 lg:w-12 flex items-center justify-center bg-accent-blue rounded-full">
                    <Image
                      src={
                        investment?.productId
                          ? categoriesLogo[investment?.productId.toLowerCase()]
                              ?.iconSrc ?? ""
                          : ""
                      }
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
                      {investment.productName}
                    </p>
                  </div>
                </td>
                <td className="text-center">{investment.tenure}</td>
                <td className="text-center">{investment.totalPayout}</td>
                <td className="text-right">{investment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
