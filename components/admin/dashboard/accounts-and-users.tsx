import React from "react";
import { AccountInfo } from ".";

type Props = {
  stats: {
    total: number;
    newAcc: number;
    active: number;
    plans: number;
  };
};

export const AccountsAndUsers: React.FC<Props> = ({ stats }) => {
  const { total, newAcc, active, plans } = stats;
  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      <AccountInfo
        iconsUrl="/assets/images/target-icon.svg"
        count={total}
        description={<>Total Users</>}
      />
      <AccountInfo
        iconsUrl="/assets/images/project-icon.svg"
        count={newAcc}
        description={<>New Sign Ups</>}
      />
      <AccountInfo
        iconsUrl="/assets/images/work-icon.svg"
        count={active}
        description={<>Active Accounts</>}
      />
      <AccountInfo
        iconsUrl="/assets/images/work-icon.svg"
        count={plans}
        description={<>Total Plans</>}
      />
    </article>
  );
};
