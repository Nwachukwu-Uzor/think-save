"use client";
import { InvestmentsList } from "@/components/investments";
import { Card, Container } from "@/components/shared";
import { useSession } from "next-auth/react";
import React from "react";

const Investment = () => {
  const session = useSession();

  return (
    <Container>
      <Card>
        <InvestmentsList customerId={session?.data?.user?.customerId} />
      </Card>
    </Container>
  );
};

export default Investment;
