import React from "react";
import { AccountsSlider } from "@/components/dashboard/";
import { Card } from "@/components/shared/";
import { Container } from "@/components/shared/";

const Dashboard = () => {
  return (
    <>
      <Container>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black">
          Welcome to ThinkSave
        </h2>
        <p className="text-fade my-1 font-medium">
          Hi William Stone, Welcome Back.
        </p>
        <section className="my-3 lg:my-8 grid lg:grid-cols-5 gap-2 lg:gap-12 overflow-hidden">
          <article className=" lg:col-span-3 overflow-hidden">
            <Card>
              <div className="flex justify-between items-center">
                <h2 className="text-black text-base lg:text-xl font-bold">
                  Accounts
                </h2>
                <button className="text-main-blue text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                  View All
                </button>
              </div>
              <div className="mt-2 lg:mt-3 w-full overflow-hidden">
                <AccountsSlider />
              </div>
            </Card>
          </article>
          <article className="lg:col-span-2">
            <Card>
              <h2 className="text-black text-base lg:text-lg font-semibold">
                Accounts
              </h2>
              <button>View All</button>
            </Card>
          </article>
        </section>
      </Container>
    </>
  );
};

export default Dashboard;
