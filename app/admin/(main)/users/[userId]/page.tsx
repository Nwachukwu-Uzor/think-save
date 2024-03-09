"use client";
import { PageHeader } from "@/components/admin/shared/";
import { UserDetails } from "@/components/profile";
import { Card, Container } from "@/components/shared";
import { FETCH_USER_BY_CUSTOMER_ID } from "@/constants";
import { userService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data: user, refetch } = useQuery({
    queryKey: [FETCH_USER_BY_CUSTOMER_ID, userId],
    queryFn: async ({ queryKey }) => {
      const [_first, second] = queryKey;
      if (!second) {
        return null;
      }

      return await userService.getUserByCustomerId(second);
    },
  });
  return (
    <>
      <PageHeader title="User Detail" />
      <Container>
        <Card>
          {user ? (
            <UserDetails user={user} />
          ) : (
            <div className="bg-slate-100 animate-pulse w-full min-h-[250px]"></div>
          )}
        </Card>
      </Container>
    </>
  );
};

export default UserDetailsPage;
