import Image from "next/image";
import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const EmptyPage: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <article className="w-full flex flex-col items-center justify-center">
      <h2 className="text-sm lg:text-lg font-light mb-3">{title}</h2>
      <Image
        src="/assets/images/empty-box.jpg"
        alt="Think Save"
        height={40}
        width={40}
        className="h-[300px] w-auto"
      />
      <p className="font-light my-2">{subtitle}</p>
      {children}
    </article>
  );
};
