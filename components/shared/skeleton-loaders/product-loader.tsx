import React from "react";

export const ProductLoader = () => {
  return (
    <div className="bg-accent-blue px-3 lg:px-4 py-4 text-black rounded-md flex flex-col gap-4 lg:gap-8">
      <div className="h-8 w-8 lg:w-12 lg:h-12 bg-slate-200 animate-pulse duration-200 rounded-full"></div>
      <div className="h-2 lg:h-3 bg-slate-200 animate-pulse duration-200"></div>
    </div>
  );
};
