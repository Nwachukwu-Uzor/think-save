"use client";
import React from "react";
import {
  AccountsSlider,
  Products,
  RecentTransactions,
  Wallet,
} from "@/components/dashboard/";
import { Card } from "@/components/shared/";
import { Container } from "@/components/shared/";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
  const { data } = useSession();

  return (
    <>
      <Container>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black">
          Welcome to ThinkSave
        </h2>
        <p className="text-[#B7B7B7] my-1 font-medium">
          Hi {data?.user.name}, Welcome Back.
        </p>
        <section className="my-3 lg:my-8 grid lg:grid-cols-5 gap-2 lg:gap-4 overflow-hidden">
          <article className="lg:col-span-3 overflow-hidden">
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
              <Wallet />
            </Card>
          </article>
        </section>
        <section className="my-3 lg:my-8 grid lg:grid-cols-5 gap-2 lg:gap-4 overflow-hidden items-start">
          <article className="order-2 lg:col-span-2">
            <Card>
              <div className="min-h-[250px]">
                <div className="flex justify-between items-center mb-3 lg:mb-4">
                  <h2 className="text-black font-bold">Recent Transaction</h2>
                  <button className="text-main-blue text-sm lg:text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                    <Link href="/transactions">View All</Link>
                  </button>
                </div>
                <RecentTransactions />
              </div>
            </Card>
          </article>
          <article className=" lg:col-span-3 order-1 lg:order-3 overflow-hidden">
            <Card>
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h2 className="text-black font-bold">Products</h2>
                <button className="text-main-blue text-sm lg:text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                  <Link href="/products">View All</Link>
                </button>
              </div>
              <article className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                <Products />
              </article>
            </Card>
          </article>
        </section>
      </Container>
    </>
  );
};

export default Dashboard;
