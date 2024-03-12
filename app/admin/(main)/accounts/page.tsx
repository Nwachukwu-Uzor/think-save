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
  productId: "",
};
const Accounts = () => {
  const [selectedProduct, setSelectedProduct] = useState<{
    label: string;
    value: ProductType;
  } | null>(null);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [searchQuery, setSearchQuery] = useState(
    JSON.stringify(INITIAL_FILTER)
  );
  const [customerId, setCustomerId] = useState("");

  const handleCustomerIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerId(event.target.value);
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
        accessorKey: "AccountId",
        header: "Account Number",
      },
      {
        accessorKey: "ProductId",
        header: "Product Type",
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

  const { data: products, isLoading } = useQuery({
    queryKey: [FETCH_ALL_PRODUCTS],
    queryFn: async () => {
      const products = await productsService.getAllProducts();
      return products;
    },
  });

  const formattedProducts =
    products?.map((product) => ({
      label: product.productName,
      value: product,
    })) ?? [];

  const handleFilter = () => {
    const searchData = {
      customerId,
      productId: selectedProduct?.value?.productId ?? "",
      startDate: startDate ? formatDate(startDate, "yyyy-MM-dd") : "",
      endDate: startDate ? formatDate(startDate, "yyyy-MM-dd") : "",
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
      <PageHeader title="Accounts" />
      <Container>
        <div className="-mt-3" />
        <Card>
          <article className="min-h-[40vh] lg:py-4">
            <header className="flex flex-col lg:flex-row items-stretch justify-between lg:items-end">
              <div className="lg:w-[250px]">
                <h4 className="text-sm font-medium mb-1">
                  Filter by Product Type:
                </h4>
                <Select
                  options={formattedProducts}
                  maxMenuHeight={200}
                  key={`my_unique_select_key__product`}
                  onChange={(
                    val: SingleValue<{ label: string; value: ProductType }>
                  ) => {
                    setSelectedProduct(val ?? null);
                  }}
                  value={selectedProduct}
                  isDisabled={isLoading}
                  placeholder={`${
                    isLoading ? "Loading..." : "Select a Product..."
                  }`}
                />
              </div>
              <div>
                <TextInput
                  noError={true}
                  label="Filter by Customer Id:"
                  placeholder="Enter customer id..."
                  value={customerId}
                  onChange={handleCustomerIdChange}
                />
              </div>
              <div className="flex flex-col gap-2 lg:flex-row justify-between my-2 lg:my-0">
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
              </div>
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

export default Accounts;
