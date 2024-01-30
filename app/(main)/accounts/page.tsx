import React from "react";
import { Container } from "@/components/shared";
import { AccountsList } from "@/components/accounts";

const Accounts = () => {
  const accounts = [
    {
      id: "1",
      productName: "Target Saving",
      name: "Rent Saving",
      balance: 10640,
    },
    {
      id: "2",
      productName: "Project Saving",
      name: "Project 1",
      balance: 84570093,
    },
    {
      id: "3",
      productName: "Entrepreneurial Saving",
      name: "Business",
      balance: 4890023,
    },
    {
      id: "4",
      productName: "Kolo",
      name: "Wrist watch",
      balance: 12000,
    },
    {
      id: "5",
      productName: "Thrift Esusu",
      name: "Rainy Day",
      balance: 4900012,
    },
    {
      id: "6",
      productName: "Entrepreneurial Saving",
      name: "Business",
      balance: 4890023,
    },
    {
      id: "7",
      productName: "Entrepreneurial Saving",
      name: "Business",
      balance: 4890023,
    },
    {
      id: "8",
      productName: "Entrepreneurial Saving",
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
