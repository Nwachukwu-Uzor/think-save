import React from "react";

import { Account } from ".";
import { AccountType } from "@/types/shared";
import { AccountLoader } from "../shared/skeleton-loaders";
import { useQuery } from "@tanstack/react-query";
import { FETCH_ACCOUNTS_BY_CUSTOMER_ID } from "@/constants";
import { accountService } from "@/services";

type Props = {
  customerId: string;
};

export const AccountsList: React.FC<Props> = ({ customerId }) => {
  const { data: accounts, isLoading } = useQuery({
    queryKey: [FETCH_ACCOUNTS_BY_CUSTOMER_ID, customerId],
    queryFn: async ({ queryKey }) => {
      const accounts = await accountService.getAccountsByCustomerId(
        queryKey[1]
      );
      return accounts;
    },
  });
  const placeholders = new Array(6).fill("").map((_val, index) => index);
  return (
    <article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5 xl:gap-8">
      {isLoading ? (
        placeholders.map((placeholder) => <AccountLoader key={placeholder} />)
      ) : accounts ? (
        accounts.map((account) => (
          <Account account={account} key={account.id} />
        ))
      ) : (
        <div>No Account Found</div>
      )}
    </article>
  );
};
