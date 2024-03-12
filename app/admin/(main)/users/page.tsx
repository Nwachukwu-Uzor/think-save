"use client";
import React, { useMemo } from "react";
import { PageHeader } from "@/components/admin/shared/";
import { Card, Container, EmptyPage, ErrorPage } from "@/components/shared";
import { dummyUsers } from "@/data/";
import { UserType } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/shared/";
import { SlOptionsVertical } from "react-icons/sl";
import { FETCH_ALL_USERS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/services";
import { AdminAccountInfoType } from "@/types/admin";
import Link from "next/link";
import { TransactionLoader } from "@/components/shared/skeleton-loaders";

const Users = () => {
  const placeholders = new Array(12).fill("").map((_val, index) => index);
  const {
    isLoading,
    data: users,
    isError,
    error,
  } = useQuery({
    queryKey: [FETCH_ALL_USERS],
    queryFn: async () => {
      const response = await accountService.getAllUser();
      return response;
    },
  });

  const columns = useMemo<ColumnDef<AdminAccountInfoType, any>[]>(
    () => [
      { header: "User Id", accessorKey: "userId" },
      { header: "Name", accessorKey: "Username" },
      { header: "Email", accessorKey: "email" },
      { header: "Status", accessorKey: "status" },
      { header: "Joined", accessorKey: "dateCreated" },
      {
        header: "",
        accessorKey: "customer",
        cell: ({ getValue }) => {
          const customer = getValue();

          return (
            <Link
              href={`/admin/users/${customer?.customerId}`}
              className="text-xs font-bold text-main-blue"
            >
              View Profile
            </Link>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader title="Users" />
      <Container>
        <div className="relative -translate-y-[40px]">
          <Card>
            {isLoading ? (
              <div className="flex flex-col gap-2 my-4">
                {placeholders.map((placeholder) => (
                  <TransactionLoader key={placeholder} />
                ))}
              </div>
            ) : users && users?.length > 0 ? (
              <div className="">
                <Table data={users} columns={columns} />
              </div>
            ) : (
              <EmptyPage />
            )}
            {isError && (
              <ErrorPage
                message={error?.message ?? "Unable to retrieve usersss"}
              />
            )}
          </Card>
        </div>
        <div className="-mt-[20px] lg:-mt-[10px]"></div>
      </Container>
    </>
  );
};

export default Users;
