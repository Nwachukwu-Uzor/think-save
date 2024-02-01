import React from "react";
import { Card } from "..";

export const AccountLoader = () => {
  return (
    <Card>
      <div className="my-2 flex justify-end">
        <span className="h-1 lg:h-3 w-full bg-slate-200 animate-pulse duration-200"></span>
      </div>
      <h3 className="h-1 lg:h-3 w-full bg-slate-200 animate-pulse duration-200 my-1"></h3>
      <p className="h-1 lg:h-3 w-full bg-slate-200 animate-pulse duration-200"></p>
      <div className="p-2 lg:p-4 rounded-md bg-accent-blue mt-2 lg:mt-3 relative">
        <div className="h-4 w-full my-1 "></div>
        <div className="h-1 lg:h-3 w-full bg-slate-200 animate-pulse duration-200"></div>
        <div className="absolute top-[50%] -translate-y-[50%] right-0 bg-white p-1 lg:p-1.5 rounded-l-full">
          <span className="h-4 w-4 lg:h-6 lg:w-6 animate-pulse duration-200 bg-slate-200"></span>
        </div>
      </div>
    </Card>
  );
};
