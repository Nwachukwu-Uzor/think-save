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

export const InvestmentsList = () => {
  const session = useSession();
  const { data: transactions, isLoading } = useQuery({
    queryKey: [FETCH_INVESTMENTS_BY_CUSTOMER_ID, session.data?.user.customerId],
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
        header: "Amount",
        accessorKey: "amount",
        cell: ({ getValue }) => {
          const value = (getValue() as number).toString();
          return <span>{formatNumberWithCommas(value)}</span>;
        },
      },
      {
        header: "Total Payout",
        accessorKey: "totalPayout",
        cell: ({ getValue }) => {
          let value: number | string = getValue() as number;
          if (!value) {
            return null;
          }
          value = value.toString();
          return <span>{formatNumberWithCommas(value)}</span>;
        },
      },
      { header: "Interest", accessorKey: "interest" },
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

  if (isLoading || session.status === "loading") {
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
          <EmptyPage title="No investments found" subtitle="You have not made any investments yet."/>
        )}
      </div>
    </section>
  );
};
