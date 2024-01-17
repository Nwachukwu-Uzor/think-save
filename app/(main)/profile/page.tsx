import React from "react";
import { FaPlus } from "react-icons/fa";
import { InvestmentAccounts, UserDetails } from "@/components/profile";
import { Button, Card, Container } from "@/components/shared";

const Profile = () => {
  const dummyUser = {
    id: 1,
    firstName: "John",
    email: "jeffwilson@example.com",
    middleName: "Doe",
    lastName: "Smith",
    bvn: "123456789",
    phone: "555-1234",
    gender: "Male",
    dob: "Jun., 03, 2023",
    city: "New York",
    "mother's-maiden-name": "Johnson",
    address: "123 Main Street",
    avatarUrl: "/assets/images/dummy-avatar.png",
    nationality: "Nigerian",
    state: "Lagos",
  };

  const dummyInvestments = [
    {
      id: 1,
      description: "Emergency Fund",
      category: "target saving",
      tenure: 12,
      currentAmount: 5000,
      target: 10000,
    },
    {
      id: 2,
      description: "Monthly Thrift",
      category: "thrift esusu",
      tenure: 6,
      currentAmount: 2000,
      target: 12000,
    },
    {
      id: 3,
      description: "Vacation Fund",
      category: "kolo",
      tenure: 24,
      currentAmount: 3000,
      target: 8000,
    },
    {
      id: 4,
      description: "Business Startup",
      category: "entrepreneurial saving",
      tenure: 18,
      currentAmount: 10000,
      target: 50000,
    },
    {
      id: 5,
      description: "Home Renovation",
      category: "project saving",
      tenure: 36,
      currentAmount: 15000,
      target: 60000,
    },
    {
      id: 6,
      description: "Education Fund",
      category: "target saving",
      tenure: 24,
      currentAmount: 8000,
      target: 20000,
    },
    {
      id: 7,
      description: "Car Purchase",
      category: "kolo",
      tenure: 30,
      currentAmount: 12000,
      target: 30000,
    },
    {
      id: 8,
      description: "Retirement Plan",
      category: "thrift esusu",
      tenure: 48,
      currentAmount: 25000,
      target: 100000,
    },
  ];

  return (
    <>
      <Container>
        <section className="grid lg:grid-cols-7 xl:grid-cols-8 gap-2 lg:gap-3 items-start justify-between">
          <div className="lg:col-span-3">
            <Card>
              <UserDetails user={dummyUser} />
            </Card>
          </div>
          <div className="lg:col-span-4 xl:col-span-5">
            <Card>
              <div className="flex justify-between items-center">
                <h2 className="text-black font-bold mb-2">
                  Invesments Accounts
                </h2>
                <button className="text-main-blue text-base font-bold hover:opacity-80 active:scale-75 duration-100">
                  View All
                </button>
              </div>
              <div className="mt-3">
                <InvestmentAccounts investments={dummyInvestments} />
              </div>
              <div className="flex justify-end mt-3 w-full max-w-[150px] ml-auto">
                <Button color="main-blue">
                  <FaPlus /> Add New
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Profile;
