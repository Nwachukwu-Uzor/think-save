"use client";
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { PageHeader } from "@/components/admin/shared";
import { Card, Container, TextInput } from "@/components/shared";
import { FETCH_ALL_PRODUCTS } from "@/constants";
import { productsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "@/types/shared";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Accounts = () => {
  const [selectedProduct, setSelectedProduct] = useState<{
    label: string;
    value: ProductType;
  } | null>(null);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

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

  return (
    <>
      <PageHeader title="Accounts" />
      <Container>
        <div className="mt-2" />
        <Card>
          <article className="min-h-[40vh]">
            <header className="flex flex-col lg:flex-row items-stretch justify-between lg:items-end border-2">
              <div>
                <h4 className="text-sm font-medium mb-1">Select a Product:</h4>
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
              <div className="flex flex-col gap-2 lg:flex-row justify-between my-2 lg:my-0">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"} //
                        className={cn(
                          "w-full lg:w-[280px] justify-start text-left font-normal",
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
                          "w-full lg:w-[280px] justify-start text-left font-normal",
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
              </div>
              <div>
                <TextInput noError={true}/>
              </div>
            </header>
          </article>
        </Card>
      </Container>
    </>
  );
};

export default Accounts;
