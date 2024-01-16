"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegBell, FaBars } from "react-icons/fa6";

export const MainHeader = () => {
  const navLinks = [
    { id: 1, content: <>Dashboard</>, href: "" },
    { id: 2, content: <>Accounts</>, href: "" },
    { id: 3, content: <>Plans</>, href: "" },
    { id: 4, content: <>Transactions</>, href: "" },
  ];

  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen((opened) => !opened);
  };
  return (
    <nav className="h-16 flex items-center justify-center relative">
      <div className="w-full flex justify-between items-center">
        <Image
          src="/logo.png"
          alt="logo"
          height={40}
          width={100}
          className="h-4 lg:h-6 w-auto"
        />
        <ul
          className={`fixed top-16 left-0 bottom-0 bg-main-blue lg:bg-transparent ${
            navOpen ? "w-full" : "w-0"
          } overflow-x-hidden lg:w-full lg:static flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-3 xl:gap-6 font-semibold text-black text-2xl xl:text-lg duration-50`}
        >
          {navLinks.map(({ id, href, content }) => (
            <li key={id} className="w-full lg:w-auto pl-6 lg:pl-0">
              <Link
                href={href}
                className="text-white lg:text-black hover:opacity-75 lg:hover:opacity-90 lg:hover:text-main-blue"
              >
                {content}
              </Link>
            </li>
          ))}
          <li className="text-white lg:hidden hover:opacity-75 w-full pl-6">
            <button>Profile</button>
          </li>
          <li className="text-white lg:hidden hover:opacity-75 w-full pl-6">
            <button>Logout</button>
          </li>
        </ul>
        <ul className="flex items-center gap-2">
          <li className="p-1.5 rounded-md bg-input-bg">
            <FaRegBell className="text-xl text-main-blue" />
          </li>
          <li
            className="p-1.5 rounded-md bg-input-bg lg:hidden"
            onClick={toggleNav}
          >
            <FaBars className="text-xl text-main-blue" />
          </li>
          <li className="dropdown dropdown-end hidden lg:list-item">
            <div tabIndex={0} role="button">
              <Image
                src="/dummy-avatar.png"
                alt="User"
                height={20}
                width={20}
                className="h-auto w-12 object-center"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow px-0 border-[0.5px] bg-base-100 rounded-box min-w-56 w-fit"
            >
              <li className=" px-2 py-1.5 border-b border-b-gray-300 rounded-0">
                <div className="flex items-center gap-2 w-full p-0">
                  <Image
                    src="/dummy-avatar.png"
                    alt="User"
                    height={20}
                    width={20}
                    className="h-8 w-auto inline-block"
                  />
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold">Jeff Wilson</h4>
                    <p>jeffwilson@example.com</p>
                  </div>
                </div>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
