import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="flex items-center justify-center">
      <div className="w-[90%] max-w-[1100px] xl:max-w-[1300px]">{children}</div>
    </article>
  );
};
