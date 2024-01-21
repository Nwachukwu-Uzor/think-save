"use client";
import React, { useState } from "react";
import { Button, TextAreaInput, TextInput } from "@/components/shared";
import { MdClose } from "react-icons/md";

type Props = {
  handleClose: () => void;
};
export const CreatePlanForm: React.FC<Props> = ({ handleClose }) => {
  const [tenure, setTenure] = useState<number | null>(null);

  const handleTenureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (typeof value === "number") {
      setTenure(value);
    }
  };
  return (
    <article className="relative">
      <h3 className="text-sm lg:text-base text-black font-bold mt-3">
        Create Plan
      </h3>
      <MdClose
        onClick={handleClose}
        className="text-xl cursor-pointer absolute top-0 right-3"
      />
      <div className="flex flex-col gap-2 lg:gap-4 mt-3 lg:mt-6">
        <TextInput label="Name" />
        <TextAreaInput label="Description" />
        <h3 className="text-sm font-semibold">Tenures</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={3}
              onChange={handleTenureChange}
              checked={tenure === 3}
              name="tenure"
              className="rounded text-main-blue bg-accent-blue border-0 outline-none cursor-pointer"
            />
            <h3 className="text-xs font-semibold">3 Months</h3>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={6}
              onChange={handleTenureChange}
              checked={tenure === 6}
              name="tenure"
              className="rounded text-main-blue bg-accent-blue border-0 outline-none cursor-pointer"
            />
            <h3 className="text-xs font-semibold">6 Months</h3>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={12}
              onChange={handleTenureChange}
              checked={tenure === 12}
              name="tenure"
              className="rounded text-main-blue bg-accent-blue border-0 outline-none cursor-pointer"
            />
            <h3 className="text-xs font-semibold">1 Year</h3>
          </div>
        </div>
        <div className="max-w-[150px] ml-auto mt-4">
          <Button color="main-blue">Update</Button>
        </div>
      </div>
    </article>
  );
};
