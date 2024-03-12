import React from "react";
import { ProductType } from "@/types/shared";
import { z } from "zod";
import { Button, Card, TextAreaInput, TextInput } from "@/components/shared";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatNumberWithCommas, formatValidationErrors } from "@/utils/shared";
import { productsService } from "@/services";
import { PulseLoader } from "react-spinners";

type Props = {
  plan: ProductType;
  handleClose: () => void;
};

const schema = z.object({
  productDescription: z
    .string({ required_error: "Product Description is required" })
    .min(3, "Product Description must be at least 3 characters"),
  productName: z
    .string({ required_error: "Product is required" })
    .min(3, "Product description must be at least 3 characters"),
  minimumAmount: z
    .string()
    .refine((amount) => Number(amount.replace(/[,\s]/g, "")) > 0, {
      message: "Amount must be greater than zero",
    }),
  maximumAmount: z.optional(z.string()),
  withdrawalLimit: z.optional(z.string()),
});

type FormFields = z.infer<typeof schema>;

export const EditPlan: React.FC<Props> = ({ plan }) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      productDescription: plan?.productDescription ?? "",
      productName: plan?.productName ?? "",
      withdrawalLimit: plan?.withdrawalLimit ?? "",
      maximumAmount: plan?.maximumAmount ?? "",
      minimumAmount: plan?.minimumAmount ? plan?.minimumAmount : "",
    },
  });

  const handleNumbericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    const { name } = event.target;
    if (
      name === "withdrawalLimit" ||
      name === "maximumAmount" ||
      name === "minimumAmount"
    ) {
      setValue(name, formatNumberWithCommas(inputValue));
    }
  };
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const payload = {
        ...plan,
        ...data,
      };
      const response = await productsService.addOrEditProduct(payload);
    } catch (error: any) {
      const errorData = error?.response?.data?.errors;
      if (errorData) {
        const formattedValidationErrors = formatValidationErrors(
          errorData as Record<string, string[]>
        );
        setError("root", { type: "deps", message: formattedValidationErrors });
      }
    } finally {
    }
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-2 text-center">Edit Plan</h2>
      <form
        className="my-2 max-w-[400px] mx-auto flex flex-col gap-2.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Product Name"
          {...register("productName")}
          error={errors?.productName?.message}
          name="productName"
          id="productName"
        />
        <TextAreaInput
          label="Product Description"
          {...register("productDescription")}
          error={errors?.productDescription?.message}
          name="productDescription"
          id="productDescription"
        />
        <TextInput
          label="Minimum Amount"
          {...register("minimumAmount")}
          error={errors?.minimumAmount?.message}
          name="minimumAmount"
          id="minimumAmount"
          onChange={handleNumbericInputChange}
        />
        <TextInput
          label="Maximum Amount"
          error={errors?.maximumAmount?.message}
          {...register("maximumAmount")}
          name="maximumAmount"
          id="maximumAmount"
          onChange={handleNumbericInputChange}
        />
        <TextInput
          label="Withdrawal Limit"
          error={errors?.withdrawalLimit?.message}
          {...register("withdrawalLimit")}
          name="withdrawalLimit"
          id="withdrawalLimit"
          onChange={handleNumbericInputChange}
        />
        <div className="mt-1" />
        <div className="flex flex-col gap-0.5">
          {errors?.root?.message?.split(",").map((error) => (
            <p key={error} className="text-sm text-main-red">
              {error}
            </p>
          ))}
        </div>
        <Button>
          {isSubmitting ? <PulseLoader color="#fff" /> : "Submit"}
        </Button>
      </form>
    </Card>
  );
};
