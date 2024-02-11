import { TransactionType } from "@/types/dashboard";
import { AccountInvestmentType } from "@/types/shared";
import React, { useMemo } from "react";
import { EmptyPage, Table } from "../shared";
import { ColumnDef } from "@tanstack/react-table";
import { formatNumberWithCommas } from "@/utils/shared";

interface Props {
  investments?: AccountInvestmentType[];
}

export const AccountTransactions: React.FC<Props> = ({ investments }) => {
  const columns = useMemo<ColumnDef<AccountInvestmentType, any>[]>(
    () => [
      { header: "Transaction Id", accessorKey: "transactionId" },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => (
          <span className="max-w-[90px] whitespace-normal">{getValue()}</span>
        ),
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return (
            <span
              className={``}
            >
              {formatNumberWithCommas(value.toString())}
            </span>
          );
        },
      },
      {
        header: "Transaction Type",
        accessorKey: "transactionType",
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return (
            <span
              className={`${
                value.toUpperCase() === "CREDIT"
                  ? "text-green-600"
                  : value.toUpperCase() === "DEBIT"
                  ? "text-red-600"
                  : "text-fade"
              } font-medium`}
            >
              {value}
            </span>
          );
        },
      },
    ],
    []
  );

  if (!investments || !investments.length) {
    return (
      <EmptyPage
        title="No transactions"
        subtitle="You have not perform any transactions for this account"
      />
    );
  }
  return (
    <div>
      <Table columns={columns} data={investments} />
    </div>
  );
};
