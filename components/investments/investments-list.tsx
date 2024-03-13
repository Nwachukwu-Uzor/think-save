"use client";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import { FETCH_INVESTMENTS_BY_CUSTOMER_ID } from "@/constants";
import { investmentService } from "@/services";
import { InvestmentType } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { Card, EmptyPage, Table } from "../shared";
import { formatNumberWithCommas } from "@/utils/shared";
import { TransactionLoader } from "../shared/skeleton-loaders";

type Props = {
  customerId?: string;
  role?: "admin" | "customer";
};

export const InvestmentsList: React.FC<Props> = ({ customerId }) => {
  const { data: transactions, isLoading } = useQuery({
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

  const columns = useMemo<ColumnDef<InvestmentType, any>[]>(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Account Id", accessorKey: "accountId" },
      {
        header: () => <div className="text-center">Amount</div>,
        accessorKey: "amount",
        cell: ({ getValue, row }) => {
          const value = (getValue() as number).toString();
          const { currency } = row.original;
          return (
            <div className="text-right">
              {currency ?? "NGN"} {formatNumberWithCommas(value)}
            </div>
          );
        },
      },
      {
        header: () => <div className="text-center"> Total Payout</div>,
        accessorKey: "totalPayout",
        cell: ({ getValue, row }) => {
          let value: number | string = getValue() as number;
          if (!value) {
            return null;
          }
          value = value.toString();
          const { currency } = row.original;
          return (
            <div className="text-right">
              {currency ?? "NGN"} {formatNumberWithCommas(value)}
            </div>
          );
        },
      },
      {
        header: "Interest",
        accessorKey: "interest",
        cell: ({ getValue, row }) => {
          const value = (getValue() as number).toString();
          const { currency } = row.original;
          return (
            <div className="text-right">
              {currency ?? "NGN"} {formatNumberWithCommas(value)}
            </div>
          );
        },
      },
      { header: "Tenure", accessorKey: "tenure" },
      { header: "Lock Status", accessorKey: "lockStatus" },
      { header: "Investment Status", accessorKey: "status" },
      {
        header: "Start Date",
        accessorKey: "startDate",
        cell: ({ getValue }) => {
          const value = (getValue() as number).toString();
          return <span>{dayjs(value).format("DD-MM-YYYY")}</span>;
        },
      },
      {
        header: "End Date",
        accessorKey: "endDate",
        cell: ({ getValue }) => {
          let value: number | string = getValue() as number;
          if (!value) {
            return null;
          }
          value = value.toString();
          return <span>{dayjs(value).format("DD-MM-YYYY")}</span>;
        },
      },
      {
        header: "Maturity Date",
        accessorKey: "maturityDate",
        cell: ({ getValue }) => {
          let value: number | string = getValue() as number;
          if (!value) {
            return null;
          }
          value = value.toString();
          return <span>{dayjs(value).format("DD-MM-YYYY")}</span>;
        },
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <Card>
        <TransactionLoader />
      </Card>
    );
  }

  return (
    <section>
      <h3 className="lg:text-lg font-semibold mb-3">Investments</h3>
      <div className="mt-2 lg:mt-3">
        {transactions && transactions.length ? (
          <Table columns={columns} data={transactions} />
        ) : (
          <EmptyPage
            title="No investments found"
            subtitle="You have not made any investments yet."
          />
        )}
      </div>
    </section>
  );
};
