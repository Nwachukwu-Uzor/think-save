import React from "react";
import { Transaction } from ".";
import {  TransactionType } from "@/types/dashboard";

type Props = {
  transactions: TransactionType[];
};
export const RecentTransactions: React.FC<Props> = ({ transactions }) => {
  return (
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
  );
};
