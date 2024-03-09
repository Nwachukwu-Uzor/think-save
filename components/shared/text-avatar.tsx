import React from "react";

type Props = {
  size: "sm" | "md" | "lg";
  text: string;
  variant?: "dark" | "white"
};

export const TextAvatar: React.FC<Props> = ({ text, size, variant="dark" }) => {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  };

  const variants = {
    "white": "bg-white text-main-blue",
    "dark": "bg-main-blue text-white"
  }
  return (
    <div
      className={`${sizes[size]} aspect-square flex items-center justify-center rounded-full ${variants[variant]} font-semibold`}
    >
      {text}
    </div>
  );
};
