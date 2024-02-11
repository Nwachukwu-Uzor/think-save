"use client";
import { AccountDetails } from "@/components/accounts";
import { Container } from "@/components/shared";
import { FETCH_ACCOUNT_BY_ACCOUNT_ID } from "@/constants";
import { accountService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const AccountDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();

  return (
    <Container>
      <AccountDetails accountId={accountId} />
    </Container>
  );
};

export default AccountDetailsPage;
