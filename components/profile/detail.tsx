import React from "react";

type Props = {
  title: string;
  value: string;
};
export const Detail: React.FC<Props> = ({ title, value }) => {
  return (
    <div>
      <h4 className="text-xs text-fade font-semibold mb-1">{title}</h4>
      <h3 className="text-sm font-semibold text-black">{value}</h3>
    </div>
  );
};
