import React, { useMemo } from "react";
import { PageHeader } from "@/components/admin/shared/page-header";
import { Card, Container } from "@/components/shared";
import { AccountsAndUsers } from "@/components/admin/dashboard";
import { dummyUsers } from "@/data/";
import { UserType } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/shared/";

const Dashboard = () => {
  const dummyAccountsAndUsers = {
    total: 52000,
    newAcc: 1632,
    active: 230578,
    plans: 6,
  };

  const columns = useMemo<ColumnDef<UserType, any>[]>(
    () => [
      { header: "Name", accessorKey: "firstName" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phoneNumber" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Joined", accessorKey: "dateCreated" },
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
        <div className="relative -translate-y-[40px]">
          <Card>
            <AccountsAndUsers stats={dummyAccountsAndUsers} />
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
              <Table data={dummyUsers} columns={columns} />
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
