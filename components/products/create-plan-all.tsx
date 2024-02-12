import React, { ChangeEvent, useRef, useState } from "react";
import { FETCH_ALL_PRODUCTS } from "@/constants";
import Select, { SingleValue } from "react-select";
import { investmentService, productsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductType, TenureType } from "@/types/shared";
import { Button, TextInput, Toggle } from "../shared";
import {
  addMonthsToDate,
  computePayout,
  formatValidationErrors,
} from "@/utils/shared";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const saveFrequencyOptions = [
  { label: "Daily", value: "Daily", id: 1 },
  { label: "Weekly", value: "Weekly", id: 2 },
  { label: "Monthly", value: "Monthly", id: 3 },
];

const dayOptions = [
  { label: "Monday", value: "Monday", id: 1 },
  { label: "Tuesday", value: "Tuesday", id: 2 },
  { label: "Wednesday", value: "Wednesday", id: 3 },
  { label: "Thursday", value: "Thursday", id: 4 },
  { label: "Friday", value: "Friday", id: 5 },
  { label: "Saturday", value: "Saturday", id: 6 },
  { label: "Sunday", value: "Sunday", id: 7 },
];

const sourceOfFundsOptions = [
  { label: "Think Save Wallet", value: "Wallet", id: 1 },
  { label: "Card", value: "Card", id: 2 },
];

const schema = z.object({
  SelectedProductId: z.string(),
  Name: z.string().min(2, { message: "Name should be at least 2 characters" }),
  Amount: z.string().refine((amount) => Number(amount) > 0, {
    message: "Amount must be greater than zero",
    path: ["Amount"],
  }),
  Tenure: z.string().refine((amount) => Number(amount) > 0, {
    message: "Tenure must be greater than zero",
    path: ["Tenure"],
  }),
  Interest: z.string().refine((amount) => Number(amount) > 0, {
    message: "Interest must be greater than zero",
    path: ["Interest"],
  }),
  Description: z.optional(z.string()),
  Frequency: z.string({ required_error: "Frequency is required" }),
  DayOfTheWeek: z.optional(z.string()),
  DayOfTheMonth: z.optional(z.string()),
  FundingSource: z.string({ required_error: "Funding Source is required" }),
  PreferredTime: z.string(),
  StartDate: z.string(),
  LockStatus: z.boolean(),
  agreeToTAC: z.boolean(),
  ReoccuringAmount: z.string(),
});

type FormFields = z.infer<typeof schema>;

export const CreatePlanAll: React.FC = () => {
  const session = useSession();
  const [isContinued, setIsContinued] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    value: ProductType;
    label: string;
  } | null>(null);

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
  });

  const [Interest, Tenure, Amount, StartDate, agreeToTAC] = watch([
    "Interest",
    "Tenure",
    "Amount",
    "StartDate",
    "agreeToTAC",
  ]);

  const { data: products, isLoading } = useQuery({
    queryKey: [FETCH_ALL_PRODUCTS],
    queryFn: async () => {
      const products = await productsService.getAllProducts();
      return products;
    },
  });

  if (isLoading || session.status === "loading") {
    return <h2>Loading...</h2>;
  }

  const triggerInitialFieldsValidate = async (
    _event?: ChangeEvent<HTMLInputElement>
  ) => {
    await trigger([
      "Name",
      "Interest",
      "Tenure",
      "Amount",
      "StartDate",
      "SelectedProductId",
    ]);
  };

  const formattedProducts =
    products
      ?.filter((product) => product.productId !== "Savings")
      ?.map((product) => ({
        label: product.productName,
        value: product,
      })) ?? [];

  const formattedTenure =
    selectedProduct?.value?.tenures?.map((tenure) => ({
      value: tenure,
      label: tenure.interest,
    })) ?? [];

  const payout = computePayout(Interest, Amount, Tenure);
  const maturityDate = addMonthsToDate(StartDate, Number(Tenure));

  const handleContinue = async () => {
    const result = await trigger([
      "Name",
      "Interest",
      "Tenure",
      "Amount",
      "StartDate",
      "SelectedProductId",
    ]);

    if (!result) {
      return;
    }
    setIsContinued(true);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const payload = {
        ...data,
        LockStatus: data.LockStatus ? "on" : "off",
        MaturityDate: maturityDate,
        TotalPayout: payout.toString(),
        productId: data.SelectedProductId,
        customerId: session?.data?.user?.customerId ?? "",
      };

      const response = await investmentService.addInvestment(payload);

      if (!response?.status) {
        setError("root", { type: "deps", message: response?.message });
        toast.error(response?.message);
        return;
      }

      toast.success(response?.message);
      setIsContinued(false);
      setSelectedProduct(null);
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
    <section>
      <form
        className="mt-3  max-w-[600px] mx-auto bg-white px-2 py-3 rounded-md border-t-4 lg:border-t-8 border-t-main-blue"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-lg lg:text-lg font-semibold mb-2flex items-center justify-start gap-2">
          Create Plan
        </h2>
        <p className="my-1 text-sm lg:text-base text-center font-light">
          Fill out the form to create a plan
        </p>
        <div className="mt-3 flex flex-col gap-2 lg:gap-3">
          <div>
            <h4 className="text-sm font-medium mb-1">Select a Product:</h4>
            <Select
              options={formattedProducts}
              maxMenuHeight={200}
              key={`my_unique_select_key__product`}
              onChange={(
                val: SingleValue<{ label: string; value: ProductType }>
              ) => {
                setValue("SelectedProductId", val?.value?.productId ?? "");
                setSelectedProduct(val ?? null);
              }}
              value={selectedProduct}
            />
            <p className="h-1 mt-0.5 text-red-500 text-xs">
              {errors?.SelectedProductId?.message}
            </p>
          </div>
          {selectedProduct ? (
            <>
              <TextInput
                label={`Title`}
                {...register("Name")}
                error={errors?.Name?.message}
                onChange={async (e) => {
                  await triggerInitialFieldsValidate(e);
                }}
              />
              <TextInput
                label={
                  <span>
                    Reason <i className="font-normal">(Description)</i>
                  </span>
                }
                {...register("Description")}
                error={errors?.Description?.message}
                onChange={async (e) => {
                  await triggerInitialFieldsValidate(e);
                }}
              />
              <TextInput
                label={`Overall Target Amount`}
                {...register("Amount")}
                onChange={async (e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setValue("Amount", value);
                  await triggerInitialFieldsValidate(e);
                }}
                error={errors?.Amount?.message}
              />
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-medium">Total Payout: </h4>
                <div className="flex-1">
                  <TextInput disabled value={payout} />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Tenure: </h4>
                <Select
                  options={formattedTenure}
                  maxMenuHeight={200}
                  onChange={async (
                    val: SingleValue<{ label: string; value: TenureType }>
                  ) => {
                    const tenure = val?.value;
                    if (!tenure) {
                      return;
                    }
                    const { interestRate, tenureRate } = tenure;
                    await triggerInitialFieldsValidate();
                    setValue("Tenure", tenureRate);
                    setValue("Interest", interestRate);
                  }}
                />
                <p className="h-1 mt-0.5 text-red-500 text-xs">
                  {errors?.Tenure?.message}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
                <TextInput
                  type="date"
                  label="Start Date"
                  {...register("StartDate")}
                  error={errors?.StartDate?.message}
                  onChange={async (e) => {
                    await triggerInitialFieldsValidate(e);
                  }}
                />
                <TextInput
                  type="date"
                  label="End Date"
                  disabled
                  value={maturityDate}
                />
              </div>
              {isContinued ? (
                <>
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      How will you prefer to save:{" "}
                    </h4>
                    <Select
                      options={saveFrequencyOptions}
                      maxMenuHeight={200}
                      onChange={(
                        val: SingleValue<{ label: string; value: string }>
                      ) => {
                        setValue("Frequency", val?.value ?? "");
                      }}
                    />
                    <p className="h-1 mt-0.5 text-red-500 text-xs">
                      {errors?.Frequency?.message}
                    </p>
                  </div>
                  <TextInput
                    label="Preferred Amount to Save Frequently"
                    {...register("ReoccuringAmount")}
                    onChange={async (e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setValue("ReoccuringAmount", value);
                    }}
                    error={errors?.ReoccuringAmount?.message}
                  />
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      Day of the week
                    </h4>
                    <Select
                      options={dayOptions}
                      maxMenuHeight={200}
                      onChange={(
                        val: SingleValue<{ label: string; value: string }>
                      ) => {
                        setValue("DayOfTheWeek", val?.value);
                      }}
                    />
                  </div>
                  <TextInput
                    label="Time"
                    type="time"
                    {...register("PreferredTime")}
                    error={errors.PreferredTime?.message}
                  />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Source of Fund</h4>
                    <Select
                      options={sourceOfFundsOptions}
                      maxMenuHeight={100}
                      onChange={(
                        val: SingleValue<{ label: string; value: string }>
                      ) => {
                        setValue("FundingSource", val?.value ?? "");
                      }}
                    />
                    <p className="h-1 mt-0.5 text-red-500 text-xs">
                      {errors?.FundingSource?.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Toggle {...register("LockStatus")} />
                    <p className="text-xs">Lock funds until maturity date.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded text-main-blue bg-accent-blue border-0 outline-none cursor-pointer"
                      {...register("agreeToTAC")}
                    />
                    <h2 className="text-xs font-semibold text-black">
                      I agree to the Terms of Service and Privacy Policy.
                    </h2>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {errors?.root?.message?.split(",").map((error) => (
                      <p key={error} className="text-sm text-main-red">
                        {error}
                      </p>
                    ))}
                  </div>
                  <Button
                    color="main-blue"
                    type="submit"
                    disabled={isSubmitting || !agreeToTAC}
                  >
                    {isSubmitting ? <PulseLoader /> : "Invest"}
                  </Button>
                </>
              ) : (
                <Button
                  color="accent-blue"
                  type="button"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              )}
            </>
          ) : (
            <p className="italic text-xs lg:text-sm font-light">
              Select a product to continue
            </p>
          )}
        </div>
      </form>
    </section>
  );
};
