"use client"
import React, { useMemo } from "react";
import { PageHeader } from "@/components/admin/shared/page-header";
import { Card, Container } from "@/components/shared";
import { dummyUsers } from "@/data/";
import { UserType } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/shared/";
import { SlOptionsVertical } from "react-icons/sl";

const Users = () => {
  const columns = useMemo<ColumnDef<UserType, any>[]>(
    () => [
      { header: "Name", accessorKey: "firstName" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phoneNumber" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Joined", accessorKey: "dateCreated" },
      {
        header: "",
        accessorKey: "id",
        cell: ({row}) => {
          const values = row.original;
          
          return (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="">
               <SlOptionsVertical />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 rounded-sm shadow-md bg-base-100  w-fit text-sm"
              >
                <li>
                  <a className="whitespace-nowrap">View Profile</a>
                </li>
                <li className="whitespace-nowrap">
                  <a>Block</a>
                </li>
              </ul>
            </div>
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
            <div className="">
              <Table data={dummyUsers} columns={columns} />
            </div>
          </Card>
        </div>
        <div className="-mt-[20px] lg:-mt-[10px]"></div>
      </Container>
    </>
  );
};

export default Users;
