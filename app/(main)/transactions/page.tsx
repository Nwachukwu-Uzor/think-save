"use client";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Card, Container, EmptyPage, Table } from "@/components/shared";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { FETCH_TRANSACTION_BY_CUSTOMER_ID } from "@/constants";
import { transactionService } from "@/services";
import { TransactionLoader } from "@/components/shared/skeleton-loaders";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionType } from "@/types/dashboard";
import { IoReceiptOutline } from "react-icons/io5";
import { formatNumberWithCommas } from "@/utils/shared";

const Transactions = () => {
  const session = useSession();

  const columns = useMemo<ColumnDef<TransactionType, any>[]>(
    () => [
      {
        header: "Transaction Type",
        accessorKey: "transactionType",
        cell: ({ getValue }) => {
          const type = getValue() as string;

          return (
            <span
              className={`h-8 w-8 lg:w-11 lg:h-11 font-bold inline-flex items-center justify-center rounded-full lg:text-xl  ${
                type.toLowerCase() === "credit"
                  ? "bg-[#D0FFC5] text-[#0FC90C]"
                  : "bg-[#FFD0D1] text-[#FE3032]"
              }`}
            >
              <IoReceiptOutline />
            </span>
          );
        },
      },
      { header: "Description", accessorKey: "description" },

      {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ getValue }) => {
          const value = (getValue() as number).toString();
          return <span>{formatNumberWithCommas(value)}</span>;
        },
      },
      {
        header: "Date Created",
        accessorKey: "date",
        cell: ({ getValue }) => {
          const value = (getValue() as number).toString();
          return <span>{dayjs(value).format("DD-MM-YYYY")}</span>;
        },
      },
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
          const value = (getValue() as number).toString();
          return <span>{dayjs(value).format("DD-MM-YYYY")}</span>;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
      },
    ],
    []
  );

  const { data: transactions, isLoading } = useQuery({
    queryKey: [
      FETCH_TRANSACTION_BY_CUSTOMER_ID,
      session.data?.user?.customerId,
    ],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) {
        return null;
      }
      const transactions = await transactionService.getTransactionByCustomerId(
        queryKey[1]
      );
      return transactions;
    },
  });

  const placeholders = new Array(3).fill("").map((_val, index) => index);

  if (isLoading || session.status === "loading") {
    return (
      <Container>
        <Card>
          <div className="flex flex-col gap-2">
            {placeholders.map((placeholder) => (
              <TransactionLoader key={placeholder} />
            ))}
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Card>
          <h3 className="lg:text-lg font-semibold mb-3">Transactions</h3>
          <div className="mt-2 lg:mt-3">
            {transactions && transactions.length > 0 ? (
              <Table columns={columns} data={transactions} />
            ) : (
              <EmptyPage
                title="No Transactions"
                subtitle="You do not have any transactions."
              />
            )}
          </div>
        </Card>
      </Container>
    </>
  );
};

export default Transactions;
