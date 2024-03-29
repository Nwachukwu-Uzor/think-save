"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  EditProfileModalContent,
  InvestmentAccounts,
  UserDetails,
} from "@/components/profile";
import { Button, Card, Container } from "@/components/shared";
import { useUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { FETCH_USER_BY_CUSTOMER_ID } from "@/constants";
import { useSession } from "next-auth/react";
import { userService } from "@/services";
import Link from "next/link";

const Profile = () => {
  const session = useSession();

  const { data: user, refetch } = useQuery({
    queryKey: [FETCH_USER_BY_CUSTOMER_ID, session?.data?.user?.customerId],
    queryFn: async ({ queryKey }) => {
      const [_first, second] = queryKey;
      if (!second) {
        return null;
      }

      return await userService.getUserByCustomerId(second);
    },
  });

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

  const handleRefetch = async () => {
    await refetch();
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
                  <Link href="/investments">View All</Link>
                </button>
              </div>
              <div className="mt-3">
                <InvestmentAccounts
                  customerId={session.data?.user.customerId}
                />
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
              onSuccess={handleRefetch}
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
