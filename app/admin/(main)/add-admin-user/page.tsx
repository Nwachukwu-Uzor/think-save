"use client";
import React from "react";
import { PageHeader } from "../../../../components/admin/shared";
import { Card, Container, TextInput, Button } from "@/components/shared";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatValidationErrors } from "@/utils/shared";
import { PulseLoader } from "react-spinners";
import { userService } from "@/services";
import { STATUS_CODES } from "@/constants";
import { toast } from "react-toastify";

const schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username should be at least 3 characters"),
  appUser: z
    .string({ required_error: "AppUser is required" })
    .min(3, "AppUser should be at least 3 characters"),
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3, "First Name should be at least 3 characters"),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3, "Last Name should be at least 3 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email"),
});

type FormFields = z.infer<typeof schema>;

const AddAdminUser = () => {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await userService.addAdminUser(data);

      if (response?.data?.code === STATUS_CODES.FAILED) {
        setError("root", { message: response?.data?.message });
        return;
      }
      toast.success(response?.data?.message);
      reset();
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
    <>
      <PageHeader title="Add Admin User" />
      <div className="mt-3" />
      <Container>
        <Card>
          <article>
            <h2 className="text-lg font-medium mb-2 text-center">
              Provide Admin User Detail
            </h2>
            <form
              className="max-w-[300px] mx-auto mt-3 flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                label="Username"
                {...register("username")}
                error={errors?.username?.message}
                disabled={isSubmitting}
              />
              <TextInput
                label="FirstName"
                {...register("firstName")}
                error={errors?.firstName?.message}
                disabled={isSubmitting}
              />
              <TextInput
                label="LastName"
                {...register("lastName")}
                error={errors?.lastName?.message}
                disabled={isSubmitting}
              />
              <TextInput
                label="Email"
                {...register("email")}
                error={errors?.email?.message}
                disabled={isSubmitting}
              />
              <TextInput
                label="AppUser"
                {...register("appUser")}
                error={errors?.appUser?.message}
                disabled={isSubmitting}
              />
              <div className="flex flex-col gap-0.5">
                {errors?.root?.message?.split(",").map((error) => (
                  <p key={error} className="text-sm text-main-red">
                    {error}
                  </p>
                ))}
              </div>
              <div className="mt-3">
                <Button disabled={isSubmitting}>
                  {isSubmitting ? <PulseLoader color="#fff" /> : "Create"}
                </Button>
              </div>
            </form>
          </article>
        </Card>
      </Container>
    </>
  );
};

export default AddAdminUser;
