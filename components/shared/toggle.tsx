import React, { ComponentProps, forwardRef } from "react";

type Props = {} & Omit<ComponentProps<"input">, "type" | "className">;

export const Toggle = forwardRef<HTMLInputElement, Props>(({ ...rest }, ref) => {
  return (
    <label className="flex items-center relative w-max cursor-pointer select-none">
      <input
        type="checkbox"
        className="t-input appearance-none transition-colors cursor-pointer w-8 h-4 rounded-full focus:outline-none focus:active:ring-0 bg-gray-500 active:focus:bg-gray-300 checked:bg-main-blue"
        {...rest}
        ref={ref}
      />
      <span className="w-4 h-4 right-4 absolute rounded-full transform transition-transform bg-gray-200" />
    </label>
  );
});

Toggle.displayName = "Toggle";
