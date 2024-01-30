import React from "react";

import { Account } from ".";
import { AccountType } from "@/types/shared";

type Props = {
  accounts: Partial<AccountType>[];
};
export const AccountsList: React.FC<Props> = ({ accounts }) => {
  return (
    <article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5 xl:gap-8">
      {accounts.map((account) => (
        <Account account={account} key={account.id} />
      ))}
    </article>
  );
};
