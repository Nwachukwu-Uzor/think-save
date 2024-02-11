"use client";
import { FETCH_ACCOUNT_BY_ACCOUNT_ID } from "@/constants";
import { accountService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AccountSummary, AccountTransactions } from ".";
import { Card } from "../shared";

type Props = {
  accountId: string;
};

export const AccountDetails: React.FC<Props> = ({ accountId }) => {
  const { data: accountDetails, isLoading } = useQuery({
    queryKey: [FETCH_ACCOUNT_BY_ACCOUNT_ID, accountId],
    queryFn: async ({ queryKey }) => {
      const [_first, second] = queryKey;
      if (!second) {
        return null;
      }
      const data = await accountService.getAccountByAccountId(second);
      return data;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return accountDetails ? (
    <section>
      <article className="grid gap-2 items-start lg:gap-4 xl:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div className="col col-span-1 xl:col-span-2">
          <AccountSummary account={accountDetails} />
        </div>
        <div className="col col-span-1 lg:col-span-3 xl:col-span-4">
          <Card>
            <AccountTransactions investments={accountDetails.accountInvestments}/>
          </Card>
        </div>
      </article>
    </section>
  ) : (
    <div>Unable to retrieve details at the moment</div>
  );
};
