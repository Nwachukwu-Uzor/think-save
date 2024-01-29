import React, { ComponentProps } from "react";

const buttonColors = {
  red: "bg-main-red text-white active:ring active:ring-main-red",
  "light-red":
    "bg-main-red-accent text-main-red active:ring active:ring-main-red-accent",
  "white-red": "bg-white text-main-red active:ring active:ring-white",
  "accent-blue":
    "bg-accent-blue text-main-blue active:ring active:ring-accent-blue",
  "main-blue": "bg-main-blue text-white active:ring active:ring-main-blue",
  "fade-red": "bg-[#FFD0D1] text-main-red active:ring-[#FFD0D1] active:ring"
};

type Props = {
  color: keyof typeof buttonColors;
} & ComponentProps<"button">;

export const Button: React.FC<Props> = ({ children, color, ...rest }) => {
  return (
    <button
      className={`flex items-center justify-center gap-1 py-2 px-2 lg:px-4 w-full rounded-md font-semibold hover:opacity-75 duration-200 text-sm ${buttonColors[color]} disabled:opacity-40`}
      {...rest}
    >
      {children}
    </button>
  );
};
