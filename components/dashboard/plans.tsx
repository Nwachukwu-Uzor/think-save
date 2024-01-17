import React from "react";
import { PlanType } from "@/types/dashboard/";
import { FaPlus } from "react-icons/fa6";
import { Plan } from ".";

type Props = {
  plans: PlanType[];
};
export const Plans: React.FC<Props> = ({ plans }) => {
  return (
    <article className="grid lg:grid-cols-3 gap-2 lg:gap-3">
      {plans.map((plan) => (
        <Plan {...plan} key={plan.id} />
      ))}
      <div className="bg-main-blue px-3 lg:px-4 py-4  text-white rounded-md flex flex-col items-center gap-4 lg:gap-8">
        <button className="w-10 h-8 lg:w-16 lg:h-14 flex items-center justify-center bg-accent-blue rounded-md text-main-blue active:scale-90 duration-150 active:opacity-55">
          <FaPlus />
        </button>
        <h3 className="text-sm lg:text-base font-semibold">
          Create Custom Plan
        </h3>
      </div>
    </article>
  );
};
