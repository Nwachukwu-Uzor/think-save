"use client";
import { AdminAccountsList } from "@/components/admin/accounts";
import { PageHeader } from "@/components/admin/shared";
import { InvestmentsList } from "@/components/investments";
import { Card, Container } from "@/components/shared";
import { useParams } from "next/navigation";
import React from "react";

const UserTransactions = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <>
      <PageHeader title="User Accounts" />
      <div className="-mt-3" />
      <Container>
        <Card>
          <AdminAccountsList userId={userId} />
          <div className="my-4"/>
          <hr className="w-full h-1.5 block"/>
          <div className="my-4"/>
          <InvestmentsList customerId={userId}/>
        </Card>
      </Container>
    </>
  );
};

export default UserTransactions;
