import React from "react";
import { TextInput } from "../shared/";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "../shared/";

export const RegisterForm = () => {
  return (
    <>
      <form className="w-full">
        <h2 className="hidden lg:block text-xl xl:text-3xl font-bold mb-3 text-black">
          Get started on ThinkSave today
        </h2>
        <div className="flex flex-col gap-4 lg:gap-4">
          <TextInput
            label="First Name"
            placeholder="First Name"
            leftIcon={<FaRegUser />}
            id="firstName"
            name="firstName"
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            leftIcon={<FaRegUser />}
            id="lastName"
            name="lastName"
          />
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded text-main-blue bg-input-bg"
            />
            <h2 className="text-xs font-semibold text-black">
              I agree to the Terms of Service and Privacy Policy.
            </h2>
          </div>
        </div>
      </form>
      <h3 className="mt-3 lg:hidden text-black font-semibold text-center">
        Already have an account?{" "}
        <span className="text-main-red">
          <Link href="/login">Login</Link>
        </span>
      </h3>
      <div className="mt-4 hidden lg:block w-full">
        <div className="flex justify-between gap-5">
          <span className="flex-1 inline-block border-b-2 h-2 w-full border-black translate-y-[50%]"></span>
          <span className="text-black text-sm font-semibold">
            Already have an account?
          </span>
          <span className="flex-1 inline-block border-b-2 h-2 w-full border-black translate-y-[50%]"></span>
        </div>
        <div className="mt-4 hidden lg:block w-full">
          <Button color="light-red">
            <Link href="/login">Login</Link>
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
