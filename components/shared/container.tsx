import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="flex items-center justify-center">
      <div className="w-[90%] lg:w-[95%]">{children}</div>
    </article>
  );
};
