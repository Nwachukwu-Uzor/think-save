"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { TextInput } from "../shared/";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import { Button } from "../shared/";
import { IoEyeOffOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SESSION_STORAGE_KEY } from "@/config";
import { formatValidationErrors } from "@/utils/shared";
import { toast } from "react-toastify";
import { authService } from "@/services";

const schema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .email({ message: "Please provide a valid username address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleToggleShowPassword = () => {
    setShowPassword((shown) => !shown);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await authService.login(data);
      if (!response?.status) {
        setError("root", { type: "deps", message: response?.message });
        toast.error("Login Failed", { theme: "colored" });
        return;
      }
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify(response?.data)
      );
      toast.success("Login Success", { theme: "colored" });
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      const errorData = error?.response?.data?.errors;
      if (errorData) {
        const formattedValidationErrors = formatValidationErrors(
          errorData as Record<string, string[]>
        );
        setError("root", { type: "deps", message: formattedValidationErrors });
      }
    }
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="hidden lg:block lg:text-lg xl:text-2xl font-bold mb-3 text-black">
          Log in to your account
        </h2>
        <div className="flex flex-col gap-3 lg:gap-4">
          <TextInput
            label="Username"
            placeholder="Username"
            leftIcon={<MdOutlineEmail />}
            id="username"
            {...register("username")}
            error={errors.username?.message}
            disabled={isSubmitting}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            leftIcon={<MdOutlineLock />}
            type={showPassword ? "text" : "password"}
            rightIcon={
              <span
                onClick={handleToggleShowPassword}
                className="cursor-pointer"
              >
                {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
              </span>
            }
            id="password"
            {...register("password")}
            error={errors.password?.message}
            disabled={isSubmitting}
          />
          <div className="flex flex-col gap-0.5">
            {errors?.root?.message?.split(",").map((error) => (
              <p key={error} className="text-sm text-main-red">
                {error}
              </p>
            ))}
          </div>
          <Button color="red" disabled={isSubmitting}>
            {isSubmitting ? <PulseLoader color="#fff" /> : "Login"}
          </Button>
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
