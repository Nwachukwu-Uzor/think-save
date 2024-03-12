"use client";
import { AccountsList } from "@/components/accounts";
import { PageHeader } from "@/components/admin/shared";
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
          <AccountsList userId={userId} />
        </Card>
      </Container>
    </>
  );
};

export default UserTransactions;
