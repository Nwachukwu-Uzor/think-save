"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegBell, FaBars, FaRegUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { SESSION_STORAGE_KEY } from "@/config";
import { UserType } from "@/types/shared";
import { TextAvatar } from "../shared";

export const MainHeader = () => {
  const currentRoute = usePathname();
  const navLinks = [
    { id: 1, content: <>Dashboard</>, href: "/dashboard" },
    { id: 2, content: <>Accounts</>, href: "/accounts" },
    { id: 3, content: <>Plans</>, href: "/plans" },
    { id: 4, content: <>Transactions</>, href: "/transactions" },
  ];

  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const userFromSessionStorage = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEY) as string
    ) as unknown as UserType;
    setUser(userFromSessionStorage);
  }, []);

  const handleToggleNav = () => {
    setNavOpen((opened) => !opened);
  };

  const handleLogout = () => {};
  return (
    <nav className="h-16 lg:h-20 flex items-center justify-center relative">
      <div className="w-full flex justify-between items-center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          height={40}
          width={100}
          className="h-4 lg:h-6 w-auto"
        />
        <ul
          className={`fixed top-16 z-50 left-0 bottom-0 bg-main-blue lg:bg-transparent ${
            navOpen ? "w-full" : "w-0"
          } overflow-x-hidden lg:w-full lg:static flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-3 xl:gap-6 font-semibold text-black text-2xl xl:text-sm duration-50`}
        >
          {navLinks.map(({ id, href, content }) => (
            <li
              key={id}
              className={`w-full py-2 lg:py-0 lg:w-auto pl-6 lg:pl-0 ${
                href === currentRoute
                  ? "bg-white text-main-blue"
                  : "text-white lg:text-black"
              }`}
              onClick={handleToggleNav}
            >
              <Link
                href={href}
                className="hover:opacity-75 lg:hover:opacity-90 lg:hover:text-main-blue"
              >
                {content}
              </Link>
            </li>
          ))}
          <li
            className={`py-2 lg:hidden hover:opacity-75 w-full pl-6 ${
              currentRoute === "/profile"
                ? "bg-white text-main-blue"
                : "text-white lg:text-black"
            }`}
          >
            <Link href="/profile">Profile</Link>
          </li>
          <li className="text-white lg:hidden hover:opacity-75 w-full pl-6">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        <ul className="flex items-center gap-2">
          <li className="p-1.5 rounded-md bg-accent-blue">
            <FaRegBell className="text-xl text-main-blue" />
          </li>
          <li
            className="p-1.5 rounded-md bg-accent-blue lg:hidden"
            onClick={handleToggleNav}
          >
            <FaBars className="text-xl text-main-blue" />
          </li>
          <li className="dropdown dropdown-end hidden lg:list-item">
            <div tabIndex={0} role="button">
              {user?.imagePath ? (
                <Image
                  src={user?.imagePath}
                  alt="User"
                  height={20}
                  width={20}
                  className="h-8 w-auto inline-block rounded-full object-cover"
                />
              ) : (
                <TextAvatar
                  text={user?.firstName?.charAt(0) ?? "T"}
                  size="sm"
                />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow px-0 border-[0.5px] bg-base-100 rounded-md min-w-56 w-fit"
            >
              <li className=" px-2 py-1.5 border-b border-b-gray-300 rounded-0">
                <div className="flex items-center gap-2 w-full p-0">
                  {user?.imagePath ? (
                    <Image
                      src={user?.imagePath}
                      alt="User"
                      height={20}
                      width={20}
                      className="h-8 w-auto inline-block rounded-full"
                    />
                  ) : (
                    <TextAvatar
                      text={user?.firstName?.charAt(0) ?? "T"}
                      size="sm"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold">
                      {user?.firstName} {user?.lastName}
                    </h4>
                    <p>{user?.email}</p>
                  </div>
                </div>
              </li>
              <li
                className={`font-semibold py-1 border-b border-b-gray-300 ${
                  currentRoute === "/profile"
                    ? "bg-white text-main-blue"
                    : "text-white lg:text-black"
                }`}
              >
                <Link href="/profile">
                  <FaRegUser /> Profile
                </Link>
              </li>
              <li className="font-semibold py-1">
                <button onClick={handleLogout}>
                  <IoLogOutOutline className="text-xl" /> Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
