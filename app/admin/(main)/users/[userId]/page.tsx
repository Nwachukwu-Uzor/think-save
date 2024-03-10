"use client";
import { PageHeader } from "@/components/admin/shared/";
import { UserDetails } from "@/components/admin/user";
import { Button, Card, Container, ErrorPage } from "@/components/shared";
import { FETCH_USER_BY_CUSTOMER_ID } from "@/constants";
import { userService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const UserDetailsPage = () => {
  const router = useRouter();
  const { userId } = useParams<{ userId: string }>();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [FETCH_USER_BY_CUSTOMER_ID, userId],
    queryFn: async ({ queryKey }) => {
      const [_first, second] = queryKey;
      if (!second) {
        return null;
      }

      return await userService.getUserByCustomerId(second);
    },
  });

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <PageHeader title="User Detail" />
      <Container>
        <div className="mt-3" />
        <Card>
          {user && <UserDetails user={user} />}
          {isLoading && (
            <div className="bg-slate-100 animate-pulse w-full min-h-[250px]"></div>
          )}
          {isError && (
            <ErrorPage message={error?.message}>
              <div>
                <Button color="black" onClick={handleBackClick}>
                  Go Back
                </Button>
              </div>
            </ErrorPage>
          )}
        </Card>
      </Container>
    </>
  );
};

export default UserDetailsPage;
