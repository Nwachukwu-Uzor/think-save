import React from "react";

export const TransactionLoader = () => {
  return (
    <div className="flex justify-between items-start gap-3">
      <div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full bg-slate-200 animate-pulse duration-200"></div>
      <div className="flex-1">
        <div className="h-4 w-full bg-slate-200 animate-pulse duration-200"></div>
        <div className="h-2  w-full bg-slate-200 animate-pulse duration-200  my-1"></div>
      </div>
    </div>
  );
};
