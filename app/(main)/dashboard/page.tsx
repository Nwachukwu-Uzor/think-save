"use client";
import React, { useEffect, useState } from "react";
import {
  AccountsSlider,
  Plans,
  RecentTransactions,
  Wallet,
} from "@/components/dashboard/";
import { Card } from "@/components/shared/";
import { Container } from "@/components/shared/";
import { UserType } from "@/types/shared";
import { SESSION_STORAGE_KEY } from "@/config";

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const userFromSessionStorage = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEY) as string
    ) as unknown as UserType;
    setUser(userFromSessionStorage);
  }, []);

  const transactions = [
    {
      id: 1,
      amount: 5000,
      description: "Groceries",
      date: "25 Jun, 4:45pm",
      type: "debit",
    },
    {
      id: 2,
      amount: 12000,
      description: "Salary",
      date: "26 Jun, 10:30am",
      type: "credit",
    },
    {
      id: 3,
      amount: 800,
      description: "Dinner out",
      date: "27 Jun, 8:15pm",
      type: "debit",
    },
  ];

  const plans = [
    { id: 1, name: "Target Saving", iconSrc: "/assets/images/target-icon.svg" },
    {
      id: 2,
      name: "Project Saving",
      iconSrc: "/assets/images/project-icon.svg",
    },
    {
      id: 3,
      name: "Entrepreneurial Saving",
      iconSrc: "/assets/images/work-icon.svg",
    },
    { id: 4, name: "Kolo", iconSrc: "/assets/images/kolo-icon.svg" },
    { id: 5, name: "Thrift Esusu", iconSrc: "/assets/images/thrift-icon.svg" },
  ];

  return (
    <>
      <Container>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black">
          Welcome to ThinkSave
        </h2>
        <p className="text-fade my-1 font-medium">
          Hi {user?.firstName} {user?.lastName}, Welcome Back.
        </p>
        <section className="my-3 lg:my-8 grid lg:grid-cols-5 gap-2 lg:gap-4 overflow-hidden">
          <article className=" lg:col-span-3 overflow-hidden">
            <Card>
              <div className="flex justify-between items-center">
                <h2 className="text-black font-bold mb-2">Accounts</h2>
                <button className="text-main-blue text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                  View All
                </button>
              </div>
              <div className="mt-2 lg:mt-3 w-full overflow-hidden rounded-md">
                <AccountsSlider />
              </div>
            </Card>
          </article>
          <article className="lg:col-span-2">
            <Card>
              <Wallet balance={830520} />
            </Card>
          </article>
        </section>
        <section className="my-3 lg:my-8 grid lg:grid-cols-5 gap-2 lg:gap-4 overflow-hidden">
          <article className="lg:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h2 className="text-black font-bold">Recent Transaction</h2>
                <button className="text-main-blue text-sm lg:text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                  View All
                </button>
              </div>
              <RecentTransactions transactions={transactions} />
            </Card>
          </article>
          <article className=" lg:col-span-3 overflow-hidden">
            <Card>
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h2 className="text-black font-bold">Plans</h2>
                <button className="text-main-blue text-sm lg:text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                  View All
                </button>
              </div>
              <Plans plans={plans} />
            </Card>
          </article>
        </section>
      </Container>
    </>
  );
};

export default Dashboard;
