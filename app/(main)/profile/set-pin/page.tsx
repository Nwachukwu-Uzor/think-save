"use client";
import { Button, Card, Container, TextInput } from "@/components/shared";
import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatValidationErrors } from "@/utils/shared";
import { userService } from "@/services";
import { useSession } from "next-auth/react";
import { FETCH_USER_BY_CUSTOMER_ID, STATUS_CODES } from "@/constants";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const schema = z.object({
  pin: z
    .string({ required_error: "Pin is required" })
    .length(4, { message: "Pin should be 4 characters long" }),
  confirmPin: z
    .string({ required_error: "Pin is required" })
    .length(4, { message: "Pin should be 4 characters long" }),
});

type FormFields = z.infer<typeof schema>;

const SetPin = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    setError,
    handleSubmit,
    trigger,
    clearErrors,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      if (data.confirmPin !== data.pin) {
        setError("root", { message: "Pin and confirm pin do not match" });
        return;
      }
      const response = await userService.createTransactionPin(
        data.pin,
        sessionData?.user.customerId
      );

      if (response.data.code === STATUS_CODES.FAILED) {
        setError("root", { message: response.data.message });
        return;
      }
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: [FETCH_USER_BY_CUSTOMER_ID],
      });
      router.back();
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const { name } = event.target;
    clearErrors();

    if (name === "pin" || name === "confirmPin") {
      setValue(name, inputValue);
    }
  };
  return (
    <>
      <Container>
        <Card>
          <h3 className="font-medium text-center text-lg mb-2">
            Please fill in the form below to set a transaction pin
          </h3>
          <form
            className="max-w-[300px] mx-auto flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              label="Pin"
              className=""
              {...register("pin")}
              type="password"
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors?.pin?.message}
            />
            <TextInput
              label="Confirm Pin"
              {...register("confirmPin")}
              type="password"
              onChange={handleChange}
              error={errors?.confirmPin?.message}
              disabled={isSubmitting}
            />
            <div className="flex flex-col gap-0.5 my-1">
              {errors?.root?.message?.split(",").map((error) => (
                <p key={error} className="text-sm text-main-red">
                  {error}
                </p>
              ))}
            </div>
            <div className="mt-4">
              <Button disabled={isSubmitting}>
                {isSubmitting ? <PulseLoader color="#fff" /> : "Create Pin"}
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default SetPin;
