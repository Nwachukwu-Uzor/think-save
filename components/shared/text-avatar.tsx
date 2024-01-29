import React from "react";

type Props = {
  size: "sm" | "md" | "lg";
  text: string;
};

export const TextAvatar: React.FC<Props> = ({ text, size }) => {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  };
  return (
    <div
      className={`${sizes[size]} aspect-square bg-main-blue flex items-center justify-center rounded-full text-white font-semibold`}
    >
      {text}
    </div>
  );
};
