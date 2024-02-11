"use client";
import { FETCH_INVESTMENTS_BY_CUSTOMER_ID } from "@/constants";
import { investmentService } from "@/services";
import { InvestmentType } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import { EmptyPage, Table } from "../shared";

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
      { header: "Amount", accessorKey: "amount" },
      { header: "Total Payout", accessorKey: "totalPayout" },
      { header: "Interest", accessorKey: "interest" },
      { header: "Tenure", accessorKey: "tenure" },
      { header: "Lock Status", accessorKey: "lockStatus" },
      { header: "Investment Status", accessorKey: "status" },
      { header: "Start Date", accessorKey: "startDate" },
      { header: "End Date", accessorKey: "endDate" },
      { header: "Maturity Date", accessorKey: "maturityDate" },
    ],
    []
  );

  if (isLoading || session.status === "loading") {
    return <h1>Loading</h1>;
  }

  return (
    <section>
      <h3 className="lg:text-lg font-semibold mb-3">Investments</h3>
      <div className="mt-2 lg:mt-3">
        {transactions && transactions.length ? (
          <Table columns={columns} data={transactions} />
        ) : (
          <EmptyPage />
        )}
      </div>
    </section>
  );
};
