"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@/components/shared";
import { AccountsList } from "@/components/accounts";
import { UserType } from "@/types/shared";
import { SESSION_STORAGE_KEY } from "@/config";

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
