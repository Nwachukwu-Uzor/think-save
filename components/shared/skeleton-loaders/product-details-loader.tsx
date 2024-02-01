import React from "react";

export const ProductDetailsLoader = () => {
  const placeholders = new Array(4).fill("").map((_val, index) => index);
  return (
    <>
      <div className="h-4 w-[90%] max-w-[300px] bg-slate-200 animate-pulse duration-200"></div>
      <div className="h-2 lg:w-[60%] w-full bg-slate-200 animate-pulse duration-200  my-1"></div>
      <div className="h-2 lg:w-[60%] w-full bg-slate-200 animate-pulse duration-200  my-1"></div>
      <div className="h-2 lg:w-[60%] w-full bg-slate-200 animate-pulse duration-200  my-1"></div>
      <div className="h-4 w-[90%] max-w-[300px] bg-slate-200 animate-pulse duration-200 mt-3"></div>
      <div className="h-2 lg:w-[60%] w-full bg-slate-200 animate-pulse duration-200  my-1"></div>
      <div className="h-2 lg:w-[60%] w-full bg-slate-200 animate-pulse duration-200  my-1"></div>
      <div className="h-2 lg:w-[60%] w-full bg-slate-200 animate-pulse duration-200  my-1"></div>
      <div className="h-4 w-[90%] max-w-[300px] bg-slate-200 animate-pulse duration-200 mt-3"></div>
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 mt-3">
        {placeholders.map((placeholder) => (
          <li
            key={placeholder}
            className="flex flex-col gap-2 bg-accent-blue px-2 py-3 lg:py-4 rounded-md animate-pulse duration-200 min-h-[100px]"
          >
            <div>
              <span className="inline-block h-3 bg-slate-200 w-[30%] max-w-[100px] animate-pulse duration-200"></span>{" "}
              <span className="inline-block h-3 bg-slate-200 w-[60%] max-w-[200px] animate-pulse duration-200"></span>
            </div>
            <div>
              <span className="inline-block h-3 bg-slate-200 w-[30%] max-w-[100px] animate-pulse duration-200"></span>{" "}
              <span className="inline-block h-3 bg-slate-200 w-[60%] max-w-[200px] animate-pulse duration-200"></span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
