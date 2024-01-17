import React, { ComponentProps } from "react";

type Props = {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & ComponentProps<"input">;

export const TextInput: React.FC<Props> = ({
  label,
  id,
  rightIcon,
  leftIcon,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="font-semibold text-sm">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="absolute left-1 text-lg z-20 top-[50%] -translate-y-[50%] text-[#1C1B1F]">
            {leftIcon}
          </span>
        ) : null}
        <input
          {...props}
          className={`relative w-full bg-accent-blue py-1.5 px-2 focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50 ${
            rightIcon ? "pr-6" : ""
          } ${leftIcon ? "pl-6" : ""}`}
        />
        {rightIcon ? (
          <span className="absolute right-1 text-lg z-20 top-[50%] -translate-y-[50%] text-[#1C1B1F]">
            {rightIcon}
          </span>
        ) : null}
      </div>
    </div>
  );
};


