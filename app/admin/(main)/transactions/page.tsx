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
import { accountService, productsService } from "@/services";
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

const INITIAL_FILTER = {
  customerId: "",
  startDate: "",
  endDate: "",
  transactionId: "",
  accountNumber: "",
};

const TRANSACTION_TYPES_OPTIONS = [
  { label: "All", value: "" },
  { label: "Debit", value: "Debit" },
  { label: "Credit", value: "Credit" },
];

const TRANSACTION_STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "Success", value: "Success" },
  { label: "Failed", value: "Failed" },
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
    transactionType: ""

  })
  const [searchQuery, setSearchQuery] = useState(
    JSON.stringify(INITIAL_FILTER)
  );
  const [customerId, setCustomerId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleCustomerIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerId(event.target.value);
  };

  const handleTransactionIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionId(event.target.value);
  };

  const placeholders = new Array(6).fill("").map((_val, index) => index);

  const ShowLoader = () => (
    <article className="grid grid-cols-1 gap-2">
      {placeholders.map((placeholder) => (
        <TransactionLoader key={placeholder} />
      ))}
    </article>
  );

  const columns = useMemo<ColumnDef<AdminAccountType, any>[]>(
    () => [
      {
        accessorKey: "CustomerId",
        header: "Customer Id",
      },
      {
        accessorKey: "ProductId",
        header: "Product Name",
      },
      {
        accessorKey: "ProductId",
        header: "Product Name",
      },
      {
        accessorKey: "Name",
        header: "Name",
      },
      {
        accessorKey: "Amount",
        header: () => (
          <span className="text-center w-full inline-block">Amount</span>
        ),
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return (
            <span className="text-right w-full inline-block">
              {value ? formatNumberWithCommas(value) : ""}
            </span>
          );
        },
      },
      {
        accessorKey: "DateCreated",
        header: "Date Created",
        cell: ({ getValue }) => {
          const value = getValue();
          return formatDate(value, "yyyy-MM-dd");
        },
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

  const handleFilter = () => {
    const searchData = {
      customerId,
      productId: selectedProduct?.value?.productId ?? "",
      startDate: startDate ? formatDate(startDate, "yyyy-MM-dd") : "",
      endDate: startDate ? formatDate(startDate, "yyyy-MM-dd") : "",
      accountNumber,
    };
    setSearchQuery(JSON.stringify(searchData));
  };

  const {
    data: accounts,
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
      const data = await accountService.spoolAccounts(searchTerm);
      return data;
    },
  });

  return (
    <>
      <PageHeader title="Transactions" />
      <Container>
        <div className="mt-2" />
        <Card>
          <article className="min-h-[40vh]">
            <header className="flex flex-col lg:flex-row items-stretch justify-between lg:items-end">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-end justify-between my-2 lg:my-0">
                <div>
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
                          <span>Pick a date</span>
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
                          <span>Pick a date</span>
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
                  label="AccountNumber"
                  noError={true}
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                />
              </div>
              <div>
                <TextInput
                  noError={true}
                  label="Customer Number"
                  placeholder="Enter customer number..."
                  value={customerId}
                  onChange={handleCustomerIdChange}
                />
              </div>
            </header>
            <header className="flex flex-col lg:flex-row items-stretch justify-between lg:items-end mt-2">
              <TextInput
                placeholder="TransactionId"
                label="Transaction ID"
                value={transactionId}
                onChange={handleTransactionIdChange}
                noError={true}
              />
            </header>
            <div className="mt-2 max-w-[200px]">
              <Button
                className="text-white bg-black active:ring-black w-full hover:bg-black"
                onClick={handleFilter}
              >
                Search
              </Button>
            </div>
            <div className="mt-4" />
            {isLoadingAccounts ? (
              <ShowLoader />
            ) : accounts && accounts?.length > 0 ? (
              <Table data={accounts} columns={columns} />
            ) : (
              <EmptyPage title="No Transaction" />
            )}
            {isError && (
              <ErrorPage
                message={error?.message ?? "Unable to get transaction"}
              />
            )}
          </article>
        </Card>
      </Container>
    </>
  );
};

export default Transactions;
