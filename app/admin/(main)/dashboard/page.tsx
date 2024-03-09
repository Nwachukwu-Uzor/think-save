"use client";
import React, { useMemo } from "react";
import { PageHeader } from "@/components/admin/shared/page-header";
import { Card, Container } from "@/components/shared";
import { AccountsAndUsers } from "@/components/admin/dashboard";
import { dummyUsers } from "@/data/";
import { UserType } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/shared/";
import { useQuery } from "@tanstack/react-query";
import { FETCH_DASHBOARD_DATA } from "@/constants/query-keys";
import { dashboardService } from "@/services";
import { AccountInfoType } from "@/types/admin";
import Link from "next/link";
import { TransactionLoader } from "@/components/shared/skeleton-loaders";

const Dashboard = () => {
  const { isLoading, data } = useQuery({
    queryKey: [FETCH_DASHBOARD_DATA],
    queryFn: async () => {
      const response = await dashboardService.getDashboardData();
      return response;
    },
  });

  const placeholders = new Array(12).fill("").map((_val, index) => index);

  const columns = useMemo<ColumnDef<AccountInfoType, any>[]>(
    () => [
      { header: "Name", accessorKey: "Username" },
      { header: "Email", accessorKey: "Email" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Status", accessorKey: "Status" },
      { header: "Joined", accessorKey: "DateCreated" },
      {
        header: "",
        accessorKey: "Id",
        cell: ({ getValue }) => {
          const id = getValue();
          return <Link href={`/user/${id}`}>View Profile</Link>;
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader
        title="Administrator"
        subTitle="Hi William Stone, Welcome Back."
      />
      <Container>
        {isLoading ? (
          <div className="flex flex-col gap-2 my-4">
            {placeholders.map((placeholder) => (
              <TransactionLoader key={placeholder} />
            ))}
          </div>
        ) : (
          <>
            <div className="relative -translate-y-[40px]">
              <Card>
                <AccountsAndUsers
                  stats={{
                    active: Number(data?.totalActiveAccounts) ?? 0,
                    plans: Number(data?.totalPlans) ?? 0,
                    newAcc: Number(data?.totalNewSignUps) ?? 0,
                    total: Number(data?.totalUsers) ?? 0,
                  }}
                />
              </Card>
            </div>
            <div className="-mt-[20px] lg:-mt-[10px]">
              <Card>
                <div className="flex justify-between items-center">
                  <h2 className="text-black font-bold mb-2">New Sign ups</h2>
                  <button className="text-main-blue text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                    View All
                  </button>
                </div>
                <div className="">
                  {data?.report?.newSignUps &&
                  data?.report?.newSignUps?.length > 0 ? (
                    <Table data={data?.report?.newSignUps} columns={columns} />
                  ) : (
                    <p>No new sign ups</p>
                  )}
                </div>
              </Card>
            </div>{" "}
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
