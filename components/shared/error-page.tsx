import React from "react";
import { CgDanger } from "react-icons/cg";

type Props = {
  title?: string;
  message?: string;
  children?: React.ReactNode;
};
export const ErrorPage: React.FC<Props> = ({ title, message, children }) => {
  return (
    <article className="flex flex-col items-center justify-center gap-2 py-3">
      <h2 className="text-xl font-semibold">{title ?? "Error"}</h2>
      <CgDanger className="text-3xl lg:text-7xl text-red-400" />
      <p>{message ?? ""}</p>
      {children}
    </article>
  );
};
