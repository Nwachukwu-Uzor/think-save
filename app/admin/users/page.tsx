import React, { useMemo } from "react";
import { PageHeader } from "@/components/admin/shared/page-header";
import { Card, Container } from "@/components/shared";
import { dummyUsers } from "@/data/";
import { UserType } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/shared/";

const Users = () => {
  const columns = useMemo<ColumnDef<UserType, any>[]>(
    () => [
      { header: "Name", accessorKey: "firstName" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phone" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Joined", accessorKey: "dateCreated" },
    ],
    []
  );

  return (
    <>
      <PageHeader title="Users" />
      <Container>
        <div className="relative z-30 -translate-y-[40px]">
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
