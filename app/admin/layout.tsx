"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { useSidebarContext } from "@/context/admin/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebarContext();

  const navItems = [
    {
      id: 1,
      label: "Dashboard",
      content: (
        <>
          <RxDashboard /> Dashboard
        </>
      ),
      href: "/admin/dashboard",
    },
    {
      id: 2,
      label: "Users",
      content: (
        <>
          <RxDashboard /> Users
        </>
      ),
      href: "/admin/users",
    },
    {
      id: 3,
      label: "Accounts",
      content: (
        <>
          <RxDashboard /> Accounts
        </>
      ),
      href: "/admin/accounts",
    },
    {
      id: 4,
      label: "Plans",
      content: (
        <>
          <RxDashboard /> Plans
        </>
      ),
      href: "/admin/plans",
    },
    {
      id: 4,
      label: "Transactions",
      content: (
        <>
          <RxDashboard /> Transactions
        </>
      ),
      href: "/admin/transactions",
    },
  ];
  return (
    <main className="relative bg-accent-blue min-h-screen lg:grid lg:grid-cols-10">
      <nav
        className={`fixed z-40 lg:col-span-2 lg:static top-0 left-0 h-screen ${
          open ? "w-[70%]" : "w-0"
        } overflow-hidden lg:w-full bg-white flex flex-col gap-10 duration-150`}
      >
        <Image
          src="/assets/images/logo-favicon.svg"
          width={20}
          height={20}
          alt="Think Save"
          className="h-24 w-24 inline-block mx-auto"
        />
        <ul className="flex-1 overflow-auto flex flex-col lg:px-8 gap-4 lg:gap-8">
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <Link
                href={navItem.href}
                className="flex items-center gap-2 px-4 text-black font-semibold"
              >
                {navItem.content}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`fixed left-0 right-0 w-full h-screen backdrop-blur-sm z-10 ${
          open ? "block" : "hidden"
        } lg:hidden`}
      ></div>
      <section className="lg:col-span-8 h-screen overflow-auto">
        <div className="">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
