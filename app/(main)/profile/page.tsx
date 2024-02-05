"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  EditProfileModalContent,
  InvestmentAccounts,
  UserDetails,
} from "@/components/profile";
import { Button, Card, Container } from "@/components/shared";
import { UserType } from "@/types/shared";
import { SESSION_STORAGE_KEY } from "@/config";
import { useUser } from "@/hooks";

const Profile = () => {
  const { user } = useUser();

  const dummyInvestments = [
    {
      id: 1,
      description: "Emergency Fund",
      productName: "target saving",
      tenure: 12,
      currentAmount: 5000,
      target: 10000,
    },
    {
      id: 2,
      description: "Monthly Thrift",
      productName: "thrift esusu",
      tenure: 6,
      currentAmount: 2000,
      target: 12000,
    },
    {
      id: 3,
      description: "Vacation Fund",
      productName: "kolo",
      tenure: 24,
      currentAmount: 3000,
      target: 8000,
    },
    {
      id: 4,
      description: "Business Startup",
      productName: "entrepreneurial saving",
      tenure: 18,
      currentAmount: 10000,
      target: 50000,
    },
    {
      id: 5,
      description: "Home Renovation",
      productName: "project saving",
      tenure: 36,
      currentAmount: 15000,
      target: 60000,
    },
    {
      id: 6,
      description: "Education Fund",
      productName: "target saving",
      tenure: 24,
      currentAmount: 8000,
      target: 20000,
    },
    {
      id: 7,
      description: "Car Purchase",
      productName: "kolo",
      tenure: 30,
      currentAmount: 12000,
      target: 30000,
    },
    {
      id: 8,
      description: "Retirement Plan",
      productName: "thrift esusu",
      tenure: 48,
      currentAmount: 25000,
      target: 100000,
    },
  ];

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEditBtnClick = () => {
    const element = document.getElementById("my_modal_1") as HTMLElement & {
      showModal: () => void;
    };

    if (element) {
      element.showModal();
    }
  };

  const handleCloseModal = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  return (
    <>
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-7 xl:grid-cols-8 gap-2 lg:gap-3 items-start justify-between ">
          <div className="col-span-1 lg:col-span-3">
            <Card>
              {user ? (
                <UserDetails
                  user={user}
                  handleEditBtnClick={handleEditBtnClick}
                />
              ) : (
                <div className="bg-slate-100 animate-pulse w-full min-h-[250px]"></div>
              )}
            </Card>
          </div>
          <div className="col-span-1 lg:col-span-4 xl:col-span-5">
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-[90%] max-w-[800px] overflow-y-scroll no-scrollbar bg-white">
          {user ? (
            <EditProfileModalContent
              userDetails={user}
              handleClose={handleCloseModal}
            />
          ) : null}
          <div className="modal-action">
            <form method="dialog" className="hidden">
              <button ref={buttonRef}>close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Profile;
