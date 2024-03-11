"use client";
import { PageHeader } from "@/components/admin/shared";
import {
  Card,
  Container,
  EmptyPage,
  ErrorPage,
  Table,
} from "@/components/shared";
import { TransactionLoader } from "@/components/shared/skeleton-loaders";
import { FETCH_ALL_TRANSACTIONS } from "@/constants";
import { transactionService } from "@/services";
import { TransactionType } from "@/types/dashboard";
import { formatNumberWithCommas } from "@/utils/shared";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { IoReceiptOutline } from "react-icons/io5";

const Transactions = () => {
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
      {
        accessorKey: "accountId",
        header: "Account Id",
      },
      {
        accessorKey: "customerId",
        header: "Customer Id",
      },
      { header: "Description", accessorKey: "description" },

      {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ getValue }) => {
          const value = (getValue() as number)?.toString();
          return <span>{formatNumberWithCommas(value)}</span>;
        },
      },
      {
        header: "Date Created",
        accessorKey: "date",
        cell: ({ getValue }) => {
          const value = (getValue() as number)?.toString();
          return <span>{value ? dayjs(value).format("DD-MM-YYYY") : ""}</span>;
        },
      },
      {
        header: "Start Date",
        accessorKey: "startDate",
        cell: ({ getValue }) => {
          const value = (getValue() as number)?.toString();
          return <span>{value ? dayjs(value).format("DD-MM-YYYY") : ""}</span>;
        },
      },
      {
        header: "End Date",
        accessorKey: "endDate",
        cell: ({ getValue }) => {
          const value = (getValue() as number)?.toString();
          return <span>{value ? dayjs(value).format("DD-MM-YYYY") : ""}</span>;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
      },
    ],
    []
  );

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [FETCH_ALL_TRANSACTIONS],
    queryFn: async () => {
      const transactions = await transactionService.adminFetchAllTransaction();
      return transactions;
    },
  });

  const placeholders = new Array(3).fill("").map((_val, index) => index);

  const ShowLoading = () => (
    <Card>
      <div className="flex flex-col gap-2">
        {placeholders.map((placeholder) => (
          <TransactionLoader key={placeholder} />
        ))}
      </div>
    </Card>
  );
  return (
    <>
      <PageHeader title="Transactions" />
      <div className="mt-3" />
      <Container>
        <Card>
          {isLoading ? (
            <ShowLoading />
          ) : transactions && transactions.length > 0 ? (
            <Table columns={columns} data={transactions} />
          ) : (
            <EmptyPage
              title="No Transactions"
              subtitle="You do not have any transactions."
            />
          )}
          {isError && <ErrorPage message={error?.message} />}
        </Card>
      </Container>
    </>
  );
};

export default Transactions;
