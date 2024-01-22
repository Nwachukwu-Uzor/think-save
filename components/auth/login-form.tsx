"use client";
import React, { useState } from "react";
import { z } from "zod";
import { TextInput } from "../shared/";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Link from "next/link";
import { Button } from "../shared/";
import { IoEyeOffOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

export const LoginForm = () => {
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
        <h2 className="hidden lg:block lg:text-lg xl:text-2xl font-bold mb-3 text-black">
          Log in to your account
        </h2>
        <div className="flex flex-col gap-4 lg:gap-6">
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
            leftIcon={<MdOutlineLock />}
            type={showPassword ? "text" : "password"}
            rightIcon={
              <span onClick={handleToggleShowPassword}>
                {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
              </span>
            }
            id="password"
            {...register("password")}
            error={errors.password?.message}
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
      <div className="mt-4 hidden lg:block w-full">
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
