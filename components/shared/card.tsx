import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="w-full bg-white rounded-md px-3 lg:px-4 py-2 lg:py-4 h-full overflow-x-hidden">
      {children}
    </article>
  );
};
