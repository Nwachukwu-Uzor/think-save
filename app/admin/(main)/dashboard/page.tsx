"use client";
import React, { useMemo } from "react";
import { PageHeader } from "@/components/admin/shared";
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
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data } = useSession();
  const { isLoading, data: dashboardData } = useQuery({
    queryKey: [FETCH_DASHBOARD_DATA],
    queryFn: async () => {
      const response = await dashboardService.getDashboardData();
      return response;
    },
  });

  const placeholders = new Array(12).fill("").map((_val, index) => index);

  const columns = useMemo<
    ColumnDef<AccountInfoType & { CustomerId: string }, any>[]
  >(
    () => [
      { header: "Customer Id", accessorKey: "CustomerId" },
      { header: "Name", accessorKey: "Fullname" },
      { header: "Email", accessorKey: "Email" },
      { header: "Status", accessorKey: "Status" },
      { header: "Date Joined", accessorKey: "DateCreated" },
      {
        header: "",
        accessorKey: "CustomerId",
        cell: ({ getValue }) => {
          const id = getValue();
          return (
            <div className="flex items-center gap-1">
              <Link
                href={`/admin/users/${id}`}
                className="text-xs font-bold text-main-blue"
              >
                View Profile
              </Link>
              |
              <Link
                href={`/admin/accounts/${id}`}
                className="text-xs font-bold text-green-900"
              >
                View Accounts
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader
        title="Administrator"
        subTitle={`Hi ${data?.user?.name}, Welcome Back.`}
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
                    active: Number(dashboardData?.totalActiveAccounts) ?? 0,
                    plans: Number(dashboardData?.totalPlans) ?? 0,
                    newAcc: Number(dashboardData?.totalNewSignUps) ?? 0,
                    total: Number(dashboardData?.totalUsers) ?? 0,
                  }}
                />
              </Card>
            </div>
            <div className="-mt-[20px] lg:-mt-[10px]">
              <Card>
                <div className="flex justify-between items-center">
                  <h2 className="text-black font-bold mb-2">Users</h2>
                  {/* <button className="text-main-blue text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                    View All
                  </button> */}
                </div>
                <div className="">
                  {dashboardData?.report?.users &&
                  dashboardData?.report?.users?.length > 0 ? (
                    <Table
                      data={dashboardData?.report?.users}
                      columns={columns}
                    />
                  ) : (
                    <p>No users found</p>
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
