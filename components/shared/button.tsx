import React, { ComponentProps } from "react";

const buttonColors = {
  red: "bg-main-red text-white active:ring active:ring-main-red",
  "light-red":
    "bg-main-red-accent text-main-red active:ring active:ring-main-red-accent",
};

type Props = {
  color: keyof typeof buttonColors;
} & ComponentProps<"button">;

export const Button: React.FC<Props> = ({ children, color }) => {
  return (
    <button
      className={`py-1 xl:py-2 w-full rounded-md font-semibold hover:opacity-75 duration-100 ${buttonColors[color]}`}
    >
      {children}
    </button>
  );
};
