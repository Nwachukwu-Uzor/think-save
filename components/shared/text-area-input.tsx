import React, { ComponentProps } from "react";

type Props = {
  label?: string;
  id?: string;
} & ComponentProps<"textarea">;

export const TextAreaInput: React.FC<Props> = ({ label, id, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label ? (
      <label htmlFor={id} className="font-semibold text-sm">
        {label}
      </label>
    ) : null}

    <textarea
      {...props}
      className={`relative w-full bg-accent-blue py-1.5 px-2 focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50`}
    ></textarea>
  </div>
);
