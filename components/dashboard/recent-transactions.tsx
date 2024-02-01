import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from ".";
import { TransactionType } from "@/types/dashboard";
import { FETCH_TRANSACTION_BY_CUSTOMER_ID } from "@/constants";
import { transactionService } from "@/services";
import { FaMoneyCheck } from "react-icons/fa6";

type Props = {
  transactions: TransactionType[];
  customerId: string;
};
export const RecentTransactions: React.FC<Props> = ({ customerId }) => {
  const { isLoading, data: transactions } = useQuery({
    queryKey: [FETCH_TRANSACTION_BY_CUSTOMER_ID, customerId],
    queryFn: async ({ queryKey }) => {
      const transactions = await transactionService.getTransactionByCustomerId(
        queryKey[1]
      );
      return transactions;
    },
  });

  return isLoading ? (
    <div className="w-full min-h-[200px] animate-pulse bg-slate-200"></div>
  ) : transactions && transactions.length > 0 ? (
    <ul className="flex flex-col gap-2">
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="py-2 border-b-2 border-b-gray-200 last:border-b-0"
        >
          <Transaction {...transaction} />
        </li>
      ))}
    </ul>
  ) : (
    <div>
      <div className="h-16 w-16 lg:h-20 lg:w-20 mx-auto flex items-center justify-center text-white bg-main-blue rounded-full mt-3">
        <FaMoneyCheck className="text-2xl lg:text-4xl xl:text-5xl" />
      </div>
      <h3 className="lg:text-lg mt-2 text-center">No Transactions Found</h3>
    </div>
  );
};
