import React from "react";
import {TextInput} from "../shared/";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Link from "next/link";
import { Button } from "../shared/";

export const LoginForm = () => {
  return (
    <>
      <form className="w-full">
        <h2 className="hidden lg:block text-xl xl:text-3xl font-bold mb-3 text-black">
          Log in to your account
        </h2>
        <div className="flex flex-col gap-4 lg:gap-6">
          <TextInput
            label="Email"
            placeholder="Email"
            leftIcon={<MdOutlineEmail />}
            id="email"
            name="email"
          />
          <TextInput
            label="Password"
            placeholder="Password"
            leftIcon={<MdOutlineLock />}
            rightIcon={<MdOutlineRemoveRedEye />}
            id="password"
            name="password"
          />
          <Button color="red">Login</Button>
        </div>
      </form>
      <h3 className="mt-3 lg:hidden text-black text-semibold text-center">
        New to ThinkSave?{" "}
        <span className="text-main-red">
          <Link href="/register">Register</Link>
        </span>
      </h3>
      <div className="mt-4 hidden lg:block">
        <div className="flex justify-between gap-5 font-semibold">
          <span className="flex-1 inline-block border-b-2 h-2 w-full border-black translate-y-[50%]"></span>
          <span className="text-black">New to ThinkSave?</span>
          <span className="flex-1 inline-block border-b-2 h-2 w-full border-black translate-y-[50%]"></span>
        </div>
        <div className="mt-4 hidden lg:block">
          <Button color="light-red">
            <Link href="/register">Register</Link>
          </Button>
          <h3 className="mt-3 text-black font-medium text-xs">
            Copyright © 2023{" "}
            <span className="text-main-blue">Think Finance MFB Ltd</span>. All
            rights reserved.
          </h3>
        </div>
      </div>
    </>
  );
};
