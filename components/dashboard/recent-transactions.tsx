import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from ".";
import { TransactionType } from "@/types/dashboard";
import { FETCH_TRANSACTION_BY_CUSTOMER_ID } from "@/constants";
import { transactionService } from "@/services";
import { FaMoneyCheck } from "react-icons/fa6";
import { TransactionLoader } from "../shared/skeleton-loaders";
import { EmptyPage } from "../shared";

type Props = {
  customerId: string;
};
export const RecentTransactions: React.FC<Props> = ({ customerId }) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: [FETCH_TRANSACTION_BY_CUSTOMER_ID, customerId],
    queryFn: async ({ queryKey }) => {
      const transactions = await transactionService.getTransactionByCustomerId(
        queryKey[1]
      );
      return transactions;
    },
  });

  const placeholders = new Array(3).fill("").map((_val, index) => index);

  return isLoading ? (
    <div className="flex flex-col gap-2">
      {placeholders.map((placeholder) => (
        <TransactionLoader key={placeholder} />
      ))}
    </div>
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
    <div className="mt-2 lg:mt-3">
      <EmptyPage
        title="No Transactions Found"
        subtitle="You have not performed any transactions yet"
      />
    </div>
  );
};
