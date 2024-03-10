import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType, TenureType } from "@/types/shared";
import { IoChevronBackOutline } from "react-icons/io5";
import Select, { SingleValue } from "react-select";
import { Button, TextInput, Toggle } from "../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  addMonthsToDate,
  computePayout,
  formatValidationErrors,
} from "@/utils/shared";
import { PulseLoader } from "react-spinners";
import { investmentService } from "@/services";
import { toast } from "react-toastify";

type Props = {
  product: ProductType;
  handleClose: () => void;
  customerId: string;
};

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
  Name: z.string().min(2, { message: "Name should be at least 2 characters" }),
  Amount: z.string().refine((amount) => Number(amount) > 0, {
    message: "Amount must be greater than zero",
  }),
  Tenure: z.string().refine((amount) => Number(amount) > 0, {
    message: "Tenure must be greater than zero",
  }),
  Interest: z.string().refine((amount) => Number(amount) > 0, {
    message: "Interest must be greater than zero",
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

export const CreatePlanSingle: React.FC<Props> = ({
  product,
  handleClose,
  customerId,
}) => {
  const [step, setStep] = useState(1);
  const { productName, productId, tenures } = product;

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

  const formattedTenure = tenures.map((tenure) => ({
    value: tenure,
    label: tenure.interest,
  }));

  const [Interest, Tenure, Amount, StartDate, agreeToTAC] = watch([
    "Interest",
    "Tenure",
    "Amount",
    "StartDate",
    "agreeToTAC",
  ]);

  const handleContinue = async () => {
    const result = await trigger([
      "Name",
      "Interest",
      "Tenure",
      "Amount",
      "StartDate",
    ]);

    if (!result) {
      return;
    }
    setStep(2);
  };

  const triggerInitialFieldsValidate = async (
    _event?: ChangeEvent<HTMLInputElement>
  ) => {
    await trigger(["Name", "Interest", "Tenure", "Amount", "StartDate"]);
  };

  const payout = computePayout(Interest, Amount, Tenure);
  const maturityDate = addMonthsToDate(StartDate, Number(Tenure));

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const payload = {
        ...data,
        LockStatus: data.LockStatus ? "on" : "off",
        MaturityDate: maturityDate,
        TotalPayout: payout.toString(),
        productId,
        customerId,
      };

      const response = await investmentService.addInvestment(payload);

      if (!response?.status) {
        setError("root", { type: "deps", message: response?.message });
        toast.error(response?.message);
        return;
      }

      toast.success(response?.message);
      reset();
      handleClose();
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
    <div>
      <h2 className="font-medium mb-2 flex items-center justify-start gap-2">
        <button
          className="bg-white rounded-md p-1.5 active:scale-95 active:opacity-80 duration-100 cursor-pointer"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          <IoChevronBackOutline className="text-xl text-main-blue" />
        </button>
        <span className="text-lg lg:text-xl">Create Plan</span>
      </h2>

      <form
        className="mt-3  max-w-[600px] mx-auto bg-white px-2 py-3 rounded-md border-t-4 lg:border-t-8 border-t-main-blue"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-medium lg:text-lg text-center">{productName}</h2>
        <p className="my-1 text-sm lg:text-base text-center font-light">
          Fill out the form to create a plan
        </p>

        <div className="flex items-center justify-center gap-0.5 my-2">
          {[1, 2].map((n) => (
            <span
              key={n}
              className={`inline-block w-[50px] lg:w-[75px] h-1 rounded-lg ${
                step >= n ? "bg-main-blue" : "bg-accent-blue"
              } ${step === n ? "opacity-100" : "opacity-75"}`}
            ></span>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2 lg:gap-3">
          {step === 1 ? (
            <>
              <>
                <TextInput
                  label={`Title`}
                  {...register("Name")}
                  error={errors?.Name?.message}
                  onChange={async (e) => {
                    await triggerInitialFieldsValidate(e);
                  }}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                    isDisabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                  <TextInput
                    type="date"
                    label="End Date"
                    disabled
                    value={maturityDate}
                  />
                </div>
                <Button
                  color="accent-blue"
                  type="button"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </>
            </>
          ) : (
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
                  isDisabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              <div>
                <h4 className="text-sm font-medium mb-1">Day of the week</h4>
                <Select
                  options={dayOptions}
                  maxMenuHeight={200}
                  onChange={(
                    val: SingleValue<{ label: string; value: string }>
                  ) => {
                    setValue("DayOfTheWeek", val?.value);
                  }}
                  isDisabled={isSubmitting}
                />
              </div>
              <TextInput
                label="Time"
                type="time"
                {...register("PreferredTime")}
                error={errors.PreferredTime?.message}
                disabled={isSubmitting}
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
                  isDisabled={isSubmitting}
                />
                <p className="h-1 mt-0.5 text-red-500 text-xs">
                  {errors?.FundingSource?.message}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Toggle {...register("LockStatus")} disabled={isSubmitting} />
                <p className="text-xs">Lock funds until maturity date.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-main-blue bg-accent-blue border-0 outline-none cursor-pointer"
                  {...register("agreeToTAC")}
                  disabled={isSubmitting}
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
          )}
        </div>
      </form>
    </div>
  );
};
