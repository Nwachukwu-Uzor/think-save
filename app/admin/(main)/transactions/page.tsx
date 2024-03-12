"use client";
import React, { useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import { PageHeader } from "@/components/admin/shared";
import {
  Card,
  Container,
  EmptyPage,
  ErrorPage,
  Table,
  TextInput,
} from "@/components/shared";
import { FETCH_ACCOUNTS_WITH_FILTER, FETCH_ALL_PRODUCTS } from "@/constants";
import {
  accountService,
  productsService,
  transactionService,
} from "@/services";
import { useQuery } from "@tanstack/react-query";
import { AccountType, AdminAccountType, ProductType } from "@/types/shared";
import { format, formatDate } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionLoader } from "@/components/shared/skeleton-loaders";
import { formatNumberWithCommas } from "@/utils/shared";
import { IoReceiptOutline } from "react-icons/io5";
import { TransactionType } from "@/types/dashboard";
import dayjs from "dayjs";

const INITIAL_FILTER = {
  customerId: "",
  startDate: "",
  endDate: "",
  transactionId: "",
  accountNumber: "",
  transactionType: "",
  transactionStatus: "",
};

const TRANSACTION_TYPES_OPTIONS = [
  { label: "All", value: "", id: 1 },
  { label: "Debit", value: "Debit", id: 2 },
  { label: "Credit", value: "Credit", id: 3 },
];

const TRANSACTION_STATUS_OPTIONS = [
  { label: "All", value: "", id: 1 },
  { label: "Success", value: "Success", id: 2 },
  { label: "Failed", value: "Failed", id: 3 },
];
const Transactions = () => {
  const [selectedProduct, setSelectedProduct] = useState<{
    label: string;
    value: ProductType;
  } | null>(null);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [dropDrowValue, setDropDrowValue] = useState<Record<string, string>>({
    transactionStatus: "",
    transactionType: "",
  });
  const [searchQuery, setSearchQuery] = useState(
    JSON.stringify(INITIAL_FILTER)
  );
  const [accountNumber, setAccountNumber] = useState("");

  const placeholders = new Array(6).fill("").map((_val, index) => index);

  const ShowLoader = () => (
    <article className="grid grid-cols-1 gap-2">
      {placeholders.map((placeholder) => (
        <TransactionLoader key={placeholder} />
      ))}
    </article>
  );

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

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    setAccountNumber(inputValue);
  };

  const handleDropdropChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "transactionStatus" || name === "transactionType") {
      setDropDrowValue((values) => ({ ...values, [name]: value }));
    }
  };

  const handleFilter = () => {
    const searchData = {
      ...INITIAL_FILTER,
      productId: selectedProduct?.value?.productId ?? "",
      startDate: startDate ? formatDate(startDate, "yyyy-MM-dd") : "",
      endDate: startDate ? formatDate(startDate, "yyyy-MM-dd") : "",
      accountNumber,
      ...dropDrowValue,
    };
    setSearchQuery(JSON.stringify(searchData));
  };

  const {
    data: transactions,
    isLoading: isLoadingAccounts,
    isError,
    error,
  } = useQuery({
    queryKey: [FETCH_ACCOUNTS_WITH_FILTER, searchQuery],
    queryFn: async ({ queryKey }) => {
      let searchTerm = JSON.parse(queryKey[1]);
      if (!searchTerm) {
        searchTerm = INITIAL_FILTER;
      }
      const data = await transactionService.adminFilterTransaction(searchTerm);
      return data;
    },
  });

  return (
    <>
      <PageHeader title="Transactions" />
      <Container>
        <div className="-mt-3" />
        <Card>
          <article className="min-h-[40vh]">
            <header className="flex flex-col lg:flex-row items-stretch justify-between lg:items-end">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-end justify-between my-2 lg:my-0">
                <div>
                  <h4 className="text-sm font-medium mb-1">Start Date:</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"} //
                        className={cn(
                          "w-full lg:w-[200px] justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Start Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">End Date:</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"} //
                        className={cn(
                          "w-full lg:w-[200px] justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>End Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <TextInput
                  label="Filter by Account Number"
                  placeholder="Enter Account Number"
                  noError={true}
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                />
              </div>
              <div className="flex flex-col lg:flex-row items-stretch justify-between lg:items-end mt-2 gap-2">
                <div className="w-full lg:w-[180px]">
                  <h4 className="text-sm font-medium mb-1">
                    Filter by Transaction Type:
                  </h4>
                  <select
                    value={dropDrowValue.transactionType}
                    name="transactionType"
                    onChange={handleDropdropChange}
                    className="border-2 border-gray-200 px-2 py-1 inline-block w-full rounded-md"
                  >
                    {TRANSACTION_TYPES_OPTIONS.map((option) => (
                      <option value={option.value} key={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full lg:w-[180px]">
                  <h4 className="text-sm font-medium mb-1">
                    Filter by Transaction Status:
                  </h4>
                  <select
                    value={dropDrowValue.transactionStatus}
                    name="transactionStatus"
                    onChange={handleDropdropChange}
                    className="border-2 border-gray-200 px-2 py-1 inline-block w-full rounded-md"
                  >
                    {TRANSACTION_STATUS_OPTIONS.map((option) => (
                      <option value={option.value} key={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </header>
            <div className="mt-4 max-w-[200px]">
              <Button
                className="text-white bg-black active:ring-black w-full hover:bg-black"
                onClick={handleFilter}
              >
                Search
              </Button>
            </div>
            <div className="mt-4" />
            <Card>
              {isLoadingAccounts ? (
                <ShowLoader />
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
          </article>
        </Card>
      </Container>
    </>
  );
};

export default Transactions;
