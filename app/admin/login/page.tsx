"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { signIn } from "next-auth/react";
import { Button, TextInput } from "@/components/shared";
import { IoEyeOffOutline } from "react-icons/io5";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { formatValidationErrors } from "@/utils/shared";
import { AuthSidebar } from "@/components/auth";

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

const Login = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

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
      const response = await signIn("admin-login", {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        if (typeof response?.error !== "string") {
          throw response.error;
        }
        setError("root", { type: "deps", message: response?.error });
        toast.error("Login Failed", { theme: "colored" });
        return;
      }
      toast.success("Login Success", { theme: "colored" });
      const callbackUrl = searchParam.get("callbackUrl");
      if (callbackUrl) {
        router.push(callbackUrl);
        return;
      }
      router.push("/admin/dashboard");
    } catch (error: any) {
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
    <section className="grid lg:grid-cols-8 items-stretch">
      <aside className="hidden lg:block lg:col-span-2 h-full">
        <AuthSidebar />
      </aside>
      <main className="lg:col-span-6 min-h-screen">
        <article className="h-screen flex items-center justify-center bg-gray-100">
          <form
            className="w-[95%] max-w-[400px] bg-white shadow-sm rounded-md py-3 px-2 relative z-50"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Image
              height={10}
              width={10}
              alt="Logo"
              src="/assets/images/logo-favicon.svg"
              className="w-10 lg:w-20 h-auto mx-auto block"
            />
            <h2 className="text-lg font-semibold -mt-2 text-center">
              Login as an Administrator
            </h2>
            <div className="flex flex-col mt-3 gap-2">
              <TextInput
                label="Username"
                placeholder="Enter your Username"
                leftIcon={<MdOutlineEmail />}
                id="username"
                {...register("username")}
                error={errors.username?.message}
                disabled={isSubmitting}
              />
              <TextInput
                label="Password"
                placeholder="Enter your Password"
                leftIcon={<MdOutlineLock />}
                type={showPassword ? "text" : "password"}
                rightIcon={
                  <span
                    onClick={handleToggleShowPassword}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline />
                    ) : (
                      <MdOutlineRemoveRedEye />
                    )}
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
              <Button color="main-blue" disabled={isSubmitting}>
                {isSubmitting ? <PulseLoader color="#fff" /> : "Login"}
              </Button>
            </div>
          </form>
        </article>
        <div className="lg:hidden fixed bottom-0 left-0 right-0 px-1.5">
          <Image
            src="/assets/images/think-save-blue.png"
            alt="Think Save"
            width={200}
            height={200}
            className="absolute left-0 right-0 bottom-0"
          />
        </div>
      </main>
    </section>
  );
};

export default Login;
