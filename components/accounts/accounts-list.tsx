import React from "react";
import { FaPlus } from "react-icons/fa";
import { Account } from ".";
("");
import { AccountLoader } from "../shared/skeleton-loaders";
import { useQuery } from "@tanstack/react-query";
import { FETCH_ACCOUNTS_BY_CUSTOMER_ID } from "@/constants";
import { accountService } from "@/services";
import { Button, Card, EmptyPage } from "../shared";
import { useSession } from "next-auth/react";

export const AccountsList: React.FC = () => {
  const session = useSession();

  const { data: accounts, isLoading } = useQuery({
    queryKey: [FETCH_ACCOUNTS_BY_CUSTOMER_ID, session?.data?.user?.customerId],
    queryFn: async ({ queryKey }) => {
      const [_first, second] = queryKey;
      if (!second) {
        return null;
      }
      const accounts = await accountService.getAccountsByCustomerId(second);
      return accounts;
    },
  });

  const placeholders = new Array(6).fill("").map((_val, index) => index);

  if (isLoading || session.status === "loading") {
    return placeholders.map((placeholder) => (
      <AccountLoader key={placeholder} />
    ));
  }

  return (
    <article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5 xl:gap-8">
      {accounts && accounts.length > 0 ? (
        accounts.map((account) => (
          <Account account={account} key={account.id} />
        ))
      ) : (
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
          <Card>
            <EmptyPage
              title="No Accounts Found"
              subtitle="You do not have any account"
            >
              <div className="max-w-[200px]">
                <Button color="main-blue">
                  <FaPlus /> Create an Account
                </Button>
              </div>
            </EmptyPage>
          </Card>
        </div>
      )}
    </article>
  );
};
