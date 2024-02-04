import React from "react";

export const WalletLoader = () => {
  return (
    <article className="flex flex-col gap-3">
      <div className="h-[150px] bg-slate-100 animate-pulse w-full flex flex-col items-center justify-center gap-2">
        <div className="h-8 w-10 lg:w-14 rounded-md bg-slate-200 animate-pulse"></div>
        <div className="h-6 w-[60%] lg:w-[40%] bg-slate-200 animate-pulse"></div>
        <div className="h-4 w-[60%] lg:w-[40%] bg-slate-200 animate-pulse"></div>
      </div>
      <div className="h-[50px] bg-slate-100 animate-pulse w-full flex items-center justify-center p-3 gap-2">
        <div className="h-[30px] w-1/2 lg:w-1/3 bg-slate-200 animate-pulse"></div>
        <div className="h-[30px] w-1/2 lg:w-1/3 bg-slate-200 animate-pulse"></div>
      </div>
    </article>
  );
};
