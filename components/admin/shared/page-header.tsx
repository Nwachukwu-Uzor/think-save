"use client";
import React from "react";
import Image from "next/image";
import { Container, TextAvatar } from "@/components/shared";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import { useSidebarContext } from "@/context/admin/sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ADMIN_ROLES, FETCH_ADMIN_USER_BY_USERNAME } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

type Props = {
  title: string;
  subTitle?: string;
};

export const PageHeader: React.FC<Props> = ({ title, subTitle }) => {
  const router = useRouter();
  const { handleToggleOpen } = useSidebarContext();
  const { data } = useSession();

  const { data: adminUser, isLoading } = useQuery({
    queryKey: [FETCH_ADMIN_USER_BY_USERNAME, data?.user?.email],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) {
        return null;
      }
      return await userService.getAdminUserByUsername(queryKey[1]);
    },
  });

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: "/admin/login",
    });
  };

  return (
    <header className="bg-main-blue text-white w-full min-h-[18vh] flex items-center pb-10">
      <Container>
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold">{title}</h3>
            {subTitle ? (
              <p className="text-xs lg:text-sm font-semibold mt-0.5 text-[#C5D8FF]">
                {subTitle}
              </p>
            ) : null}
          </div>
          <div className="flex gap-2 items-center lg:gap-3">
            <div className=" h-8 w-8 lg:w-10 lg:h-10 flex items-center justify-center bg-white rounded-md">
              <Image
                src="/assets/images/notifications-dark.svg"
                alt="Think Save"
                height={20}
                width={20}
                className="h-6 w-6"
              />
            </div>
            <div className="dropdown dropdown-end hidden list-none lg:list-item">
              <div tabIndex={0} role="button">
                <TextAvatar
                  text={data?.user?.name?.charAt(0) ?? "T"}
                  size="sm"
                  variant="white"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu shadow px-0 border-[0.5px] bg-base-100 rounded-md min-w-56 w-fit text-black"
              >
                <li className=" px-2 py-1.5 border-b border-b-gray-300 rounded-0">
                  <div className="flex items-center gap-2 w-full p-0">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-semibold">{data?.user?.name}</h4>
                      <p>{data?.user?.email}</p>
                    </div>
                  </div>
                </li>
                {isLoading ? (
                  <MoonLoader size={14} />
                ) : adminUser?.adminRoles.some(
                    (role) => role?.role === ADMIN_ROLES.INPUTER
                  ) ? (
                  <li className="py-1 font-semibold">
                    <Link href="/admin/add-admin-user">
                      <FaPlus className="text-main-blue" /> Add Admin User
                    </Link>
                  </li>
                ) : null}

                <li className="font-semibold py-1">
                  <button onClick={handleLogout}>
                    <IoLogOutOutline className="text-xl" /> Logout
                  </button>
                </li>
              </ul>
            </div>
            <IoMenu
              className="relative z-30 text-white text-3xl font-semibold active:scale-75 active:opacity-75 duration-150 lg:hidden"
              onClick={handleToggleOpen}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};
