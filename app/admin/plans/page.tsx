"use client";
import React, { useMemo } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PageHeader } from "@/components/admin/shared/page-header";
import { Card, Container } from "@/components/shared";
import { dummyPlans } from "@/data/";
import { PlanType } from "@/types/dashboard";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/shared/";

const Plans = () => {
  const columns = useMemo<ColumnDef<PlanType, any>[]>(
    () => [
      { header: "Name", accessorKey: "name" },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => (
          <span className="max-w-[90px] whitespace-normal">{getValue()}</span>
        ),
      },
      { header: "Tenures", accessorKey: "tenure" },
      { header: "Created", accessorKey: "dateCreated" },
      {
        header: "id",
        accessorKey: "id",
        cell: () => <HiOutlineDotsVertical className="cursor-pointer active:scale-90 active:opacity-70 duration-200"/>,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader title="Plans" />
      <Container>
        <div className="relative z-30 -translate-y-[40px]">
          <Card>
            <div className="">
              <Table data={dummyPlans} columns={columns} />
            </div>
          </Card>
        </div>
        <div className="-mt-[20px] lg:-mt-[10px]"></div>
      </Container>
    </>
  );
};

export default Plans;
