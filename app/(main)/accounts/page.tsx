"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@/components/shared";
import { AccountsList } from "@/components/accounts";

const Accounts = () => {

  return (
    <>
      <Container>
        <section>
          <AccountsList />
        </section>
      </Container>
    </>
  );
};

export default Accounts;
