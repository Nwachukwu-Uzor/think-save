import React from "react";

export const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <article className="flex items-center justify-center w-full">
      <div className="w-[90%] lg:w-[92%]  max-w-[1300px]">{children}</div>
    </article>
  );
};
