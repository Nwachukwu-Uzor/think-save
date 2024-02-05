import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType, TenureType } from "@/types/shared";
import { IoChevronBackOutline } from "react-icons/io5";
import Select, { SingleValue } from "react-select";
import { Button, TextInput, Toggle } from "../shared";
import { useForm } from "react-hook-form";
import { addMonthsToDate, computePayout } from "@/utils/shared";

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
});

type FormFields = z.infer<typeof schema>;
const now = new Date();
const defaultDate = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

export const CreatePlan: React.FC<Props> = ({
  product,
  handleClose,
  customerId,
}) => {
  const [isContinued, setIsContinued] = useState(false);
  const { productName, productId, tenures } = product;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      StartDate: defaultDate,
    },
  });

  const formattedTenure = tenures.map((tenure) => ({
    value: tenure,
    label: tenure.interest,
  }));

  const [Interest, Tenure, Amount, StartDate] = watch([
    "Interest",
    "Tenure",
    "Amount",
    "StartDate",
  ]);
  const handleContinue = () => {
    setIsContinued(true);
  };

  const payout = computePayout(Interest, Amount, Tenure);
  const maturityDate = addMonthsToDate(StartDate, Number(Tenure));
  return (
    <div>
      <h2 className="font-medium mb-2 flex items-center justify-start gap-2">
        <span
          className="bg-accent-blue rounded-md p-1.5 active:scale-95 active:opacity-80 duration-100 cursor-pointer"
          onClick={handleClose}
        >
          <IoChevronBackOutline className="text-xl text-main-blue" />
        </span>
        <span className="text-lg lg:text-xl">Create Plan</span>
      </h2>

      <form className="mt-3  max-w-[500px] mx-auto">
        <h2 className="font-medium lg:text-lg text-center">{productName}</h2>
        <p className="my-1 text-sm lg:text-base text-center font-light">
          Fill out the form to create a plan
        </p>
        <div className="mt-3 flex flex-col gap-2 lg:gap-3">
          <TextInput
            label={`Title`}
            {...register("Name")}
            error={errors?.Name?.message}
          />
          <TextInput
            label={
              <span>
                Reason <i className="font-normal">(Description)</i>
              </span>
            }
            {...register("Description")}
            error={errors?.Description?.message}
          />
          <TextInput
            label={`Overall Target Amount`}
            {...register("Amount")}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setValue("Amount", value);
            }}
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
              maxMenuHeight={100}
              onChange={(
                val: SingleValue<{ label: string; value: TenureType }>
              ) => {
                const tenure = val?.value;
                if (!tenure) {
                  return;
                }
                const { interestRate, tenureRate } = tenure;
                setValue("Tenure", tenureRate);
                setValue("Interest", interestRate);
              }}
            />
            <p className="h-1 mt-0.5 text-red-500 text-xs">
              {errors?.Tenure?.message}{" "}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
            <TextInput
              type="date"
              label="Start Date"
              {...register("StartDate")}
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
                <Select options={saveFrequencyOptions} maxMenuHeight={100} />
              </div>
              <TextInput label="Preferred Amount to Save Frequently" />
              <div>
                <h4 className="text-sm font-medium mb-1">Day of the week</h4>
                <Select options={dayOptions} maxMenuHeight={200} />
              </div>
              <TextInput label="Time" type="time" />
              <div>
                <h4 className="text-sm font-medium mb-1">Source of Fund</h4>
                <Select options={sourceOfFundsOptions} maxMenuHeight={100} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Toggle />
                <p className="text-xs">Lock funds until maturity date.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-main-blue bg-accent-blue border-0 outline-none cursor-pointer"
                />
                <h2 className="text-xs font-semibold text-black">
                  I agree to the Terms of Service and Privacy Policy.
                </h2>
              </div>
              <Button color="main-blue" type="submit">
                Invest
              </Button>
            </>
          ) : (
            <Button color="accent-blue" type="button" onClick={handleContinue}>
              Continue
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
