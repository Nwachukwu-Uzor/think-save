import React from "react";

type Props = {
  title: string;
  value: string;
};
export const Detail: React.FC<Props> = ({ title, value }) => {
  return (
    <div>
      <h4 className="text-xs lg:text-sm text-fade font-semibold mb-1">{title}</h4>
      <h3 className="text-sm lg:text-lg font-semibold text-black">{value}</h3>
    </div>
  );
};
