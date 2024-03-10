"use client";
import React, { useMemo, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { PageHeader } from "@/components/admin/shared/";
import { Button, Card, Container } from "@/components/shared";
import { Products as ProductsComponent } from "@/components/dashboard";
import { dummyPlans } from "@/data/";
import { PlanType } from "@/types/dashboard";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/shared/";
import { CreatePlanForm } from "@/components/admin/plans";
import Link from "next/link";

const Plans = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const columns = useMemo<ColumnDef<PlanType, any>[]>(
    () => [
      { header: "Name", accessorKey: "name" },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => (
          <span className="max-w-[90px] whitespace-normal">{getValue()}</span>
        ),
      },
      { header: "Tenures", accessorKey: "tenure" },
      { header: "Created", accessorKey: "dateCreated" },
      {
        header: "id",
        accessorKey: "id",
        cell: () => (
          <HiOutlineDotsVertical className="cursor-pointer active:scale-90 active:opacity-70 duration-200" />
        ),
      },
    ],
    []
  );

  const handleCreatePlanBtnClick = () => {
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
      <PageHeader title="Plans" />
      <Container>
        <div className="relative -translate-y-[40px]">
          <Card>
            <article className="min-h-[40vh]">
              <div className="my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-3 xl:gap-6">
                <ProductsComponent isAdmin={true} />
              </div>
            </article>
            <div className="max-w-[200px] my-3 ml-auto">
              <Link href="/admin/plans/create-plan">
                <Button color="main-blue">
                  <FaPlus />
                  Create New Plan
                </Button>
              </Link>
            </div>
            {/* <div className="">
              <Table data={dummyPlans} columns={columns} />
            </div> */}
          </Card>
        </div>
        <div className="-mt-[20px] lg:-mt-[10px]"></div>
      </Container>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-[90%] max-w-[400px] overflow-y-scroll no-scrollbar bg-white">
          <CreatePlanForm handleClose={handleCloseModal} />
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

export default Plans;
