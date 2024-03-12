"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@/components/shared";
import { AccountsList } from "@/components/accounts";
import { useSession } from "next-auth/react";

const Accounts = () => {
  const session = useSession();

  return (
    <>
      <Container>
        <section>
          <AccountsList userId={session?.data?.user?.customerId} />
        </section>
      </Container>
    </>
  );
};

export default Accounts;
