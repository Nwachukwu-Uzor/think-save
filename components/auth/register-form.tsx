"use client";
import React, { useState } from "react";
import { z } from "zod";
import { TextInput } from "../shared/";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "../shared/";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
    })
    .min(2, { message: "First Name should be at least 2 characters" }),
  lastName: z
    .string({
      required_error: "Last Name is required",
    })
    .min(2, { message: "Last Name should be at least 2 characters" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
  agreeToTaC: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleToggleShowPassword = () => {
    setShowPassword((shown) => !shown);
  };
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="hidden lg:block  lg:text-lg xl:text-2xl font-bold mb-3 text-black">
          Get started on ThinkSave today
        </h2>
        <div className="flex flex-col gap-4 lg:gap-4">
          <TextInput
            label="First Name"
            placeholder="First Name"
            leftIcon={<FaRegUser />}
            id="firstName"
            {...register("firstName")}
            error={errors.firstName?.message}
          />

          <TextInput
            label="Last Name"
            placeholder="Last Name"
            leftIcon={<FaRegUser />}
            id="lastName"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <TextInput
            label="Email"
            placeholder="Email"
            leftIcon={<MdOutlineEmail />}
            id="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            leftIcon={<MdOutlineLock />}
            rightIcon={
              <span onClick={handleToggleShowPassword}>
                {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
              </span>
            }
            id="password"
            {...register("password")}
          />
          <div className="relative z-20">
            <Button color="red" type="submit">
              Register
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded text-main-blue bg-accent-blue border-0 outline-none cursor-pointer"
              {...register("agreeToTaC")}
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
        <p className="h-1 text-xs text-red-500 mt-1">
          {errors.agreeToTaC?.message}
        </p>
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
