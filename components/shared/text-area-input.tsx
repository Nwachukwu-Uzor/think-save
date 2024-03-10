import React, { ComponentProps, forwardRef } from "react";

type Props = {
  label?: string;
  id?: string;
  error?: string;
} & Omit<ComponentProps<"textarea">, "ref">;

export const TextAreaInput: React.FC<Props> = forwardRef<
  HTMLTextAreaElement,
  Props
>(({ label, id, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="font-semibold text-sm">
          {label}
        </label>
      ) : null}

      <textarea
        {...props}
        ref={ref}
        className={`relative w-full bg-accent-blue py-1.5 px-2 focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50`}
      ></textarea>
      <p className="h-1 mt-0.5 text-red-500 text-xs">{error}</p>
    </div>
  );
});

TextAreaInput.displayName = "Textarea";
// ({ label, id, ...props }) =>
