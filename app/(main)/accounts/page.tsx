import React from "react";
import { Container } from "@/components/shared";
import { AccountsList } from "@/components/accounts";

const Accounts = () => {
  const accounts = [
    {
      id: 1,
      category: "Target Saving",
      name: "Rent Saving",
      balance: 10640,
    },
    {
      id: 2,
      category: "Project Saving",
      name: "Project 1",
      balance: 84570093,
    },
    {
      id: 3,
      category: "Entrepreneurial Saving",
      name: "Business",
      balance: 4890023,
    },
    {
      id: 4,
      category: "Kolo",
      name: "Wrist watch",
      balance: 12000,
    },
    {
      id: 5,
      category: "Thrift Esusu",
      name: "Rainy Day",
      balance: 4900012,
    },
    {
      id: 6,
      category: "Entrepreneurial Saving",
      name: "Business",
      balance: 4890023,
    },
    {
      id: 7,
      category: "Entrepreneurial Saving",
      name: "Business",
      balance: 4890023,
    },
    {
      id: 8,
      category: "Entrepreneurial Saving",
      name: "Business",
      balance: 4890023,
    },
  ];
  return (
    <>
      <Container>
        <section>
          <AccountsList accounts={accounts} />
        </section>
      </Container>
    </>
  );
};

export default Accounts;
