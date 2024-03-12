"use client";
import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, TextInput } from "../shared";
import Select, { SingleValue } from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FETCH_BANKS, STATUS_CODES } from "@/constants";
import { accountService, transactionService } from "@/services";
import { ApiResponseType, BankType } from "@/types/shared";
import { MdClose } from "react-icons/md";
import { AccountValidationResultType } from "@/types/dashboard";
import { MoonLoader, PulseLoader } from "react-spinners";
import { formatNumberWithCommas, formatValidationErrors } from "@/utils/shared";
import { toast } from "react-toastify";

type Props = {
  handleClose: () => void;
  maxAmount: number;
  sourceAccountNumber: string;
  customerId: string;
};

const schema = z.object({
  transactionAmount: z
    .string({
      required_error: "Amount is required",
    })
    .min(1, { message: "Amount is required" }),
  beneficiaryAccountNumber: z
    .string()
    .min(10, { message: "Account Number should be at least 10 characters" }),
  bankCode: z.string({ required_error: "Please select a bank to continue" }),
  narration: z.optional(z.string()),
});

type FormFields = z.infer<typeof schema>;

export const WithdrawModalContent: React.FC<Props> = ({
  handleClose,
  maxAmount,
  sourceAccountNumber,
  customerId,
}) => {
  const [validatedAccountDetails, setValidatedAccountDetails] =
    useState<ApiResponseType<AccountValidationResultType> | null>(null);
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [activeOtpBox, setActiveOtpBox] = useState(0);
  const otpInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState<{
    label: string;
    value: BankType;
  } | null>(null);

  const { data: banks, isLoading: isLoadingBanks } = useQuery({
    queryKey: [FETCH_BANKS],
    queryFn: async () => {
      const banks = await accountService.getBanks();
      return banks;
    },
  });

  const { mutate, isPending: isValidatingAccount } = useMutation({
    mutationFn: async (data: {
      beneficiaryBank: string;
      accountNumber: string;
    }) => {
      const response = await accountService.validateAccountNumber(
        data.beneficiaryBank,
        data.accountNumber
      );
      if (response) {
        setValidatedAccountDetails(response);
      }
    },
  });

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    watch,
    trigger,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [accountNumber] = watch(["beneficiaryAccountNumber"]);

  const handleNumericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "");
    const { name } = event.target;

    if (name === "beneficiaryAccountNumber") {
      setValue(name, value);
      setValidatedAccountDetails(null);
      if (selectedBank?.value && value.length === 10) {
        mutate({
          beneficiaryBank: selectedBank.value.bankCode,
          accountNumber: value,
        });
      }
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    // Check if the input is a valid decimal or whole number
    setValue("transactionAmount", formatNumberWithCommas(inputValue));

    if (Number(inputValue) > maxAmount) {
      setError(
        "transactionAmount",
        {
          message: "Amount cannot be greater than wallet balance",
          type: "manual",
        },
        { shouldFocus: true }
      );
    } else {
      clearErrors();
    }
  };

  const handleTransactionDetailsValidate = async () => {
    const result = await trigger([
      "transactionAmount",
      "bankCode",
      "beneficiaryAccountNumber",
    ]);

    if (!result) {
      return;
    }

    setStep(2);
  };

  const isOtpValid = useMemo(() => {
    return otp.every((it) => it !== "");
  }, [otp]);

  useEffect(() => {
    otpInputRef?.current?.focus();
  }, [activeOtpBox]);

  const handleOtpChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const result = event.target.value.replace(/\D/g, "");
    if (!result.length) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = result[result.length - 1] ?? "";
    setOtp(newOtp);
    if (!result.length) {
      if (activeOtpBox > 0) {
        setActiveOtpBox((current) => current - 1);
      }
    }
    if (activeOtpBox < otp.length) {
      if (activeOtpBox < otp.length - 1) {
        setActiveOtpBox((current) => current + 1);
      }
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "e"].includes(
        event.key
      )
    ) {
      event.preventDefault();
    }

    if (event.key === "Backspace") {
      const value = (event.target as HTMLInputElement)?.value;
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (value === "" && activeOtpBox > 0) {
        setActiveOtpBox((current) => current - 1);
      }
    }
  };

  const handleFocus = (_event: FocusEvent<HTMLInputElement>, index: number) => {
    if (activeOtpBox !== index) {
      otpInputRef?.current?.focus();
    }
  };
  const resetData = () => {
    setOtp(new Array(6).fill(""));
    setValidatedAccountDetails(null);
    reset();
    setActiveOtpBox(0);
    setStep(1);
    setSelectedBank(null);
  };

  const handleCloseModal = () => {
    handleClose();
    resetData();
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const payload = {
        ...data,
        transactionAmount: data.transactionAmount?.replace(/[,\s]/g, ""),
        transactionPin: btoa(otp.join("")),
        sourceAccountNumber,
        beneficiaryBank: selectedBank?.value.bankCode,
        currencyCode: "NGN",
        beneficiaryName: validatedAccountDetails?.data?.accountName,
        customerId,
        sourceAccountName: "",
      };
      const response = await transactionService.makeTransfer(payload);
      console.log(response);

      if (response?.data?.code === STATUS_CODES.SUCCESS) {
        resetData();
        toast.success(response?.data?.message);
        return;
      }
      setError("root", { message: response?.data?.message });
    } catch (error: any) {
      const errorData = error?.response?.data?.errors;
      if (errorData) {
        const formattedValidationErrors = formatValidationErrors(
          errorData as Record<string, string[]>
        );
        setError("root", { type: "deps", message: formattedValidationErrors });
      } else {
        setError("root", { message: error?.message ?? "Something went wrong" });
      }
    }
  };

  const formattedBanks =
    banks?.map((bank) => ({ label: bank.bankName, value: bank })) ?? [];

  return (
    <>
      <div className="flex justify-end items-center mb-2">
        <MdClose
          onClick={handleCloseModal}
          className="text-sm cursor-pointer"
        />
      </div>
      <div className="h-10 lg:h-16 aspect-square flex items-center justify-center bg-gray-100 rounded-full mx-auto">
        <Image
          height={16}
          width={16}
          src="/assets/images/bank-svg.svg"
          alt="Bank"
          className="w-8 lg:w-10 aspect-square"
        />
      </div>
      <h2 className="font-semibold text-main-blue mt-2 text-center">
        Withdraw
      </h2>
      <form
        className="mt-2 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 1 ? (
          <>
            {" "}
            <TextInput
              label="Amount"
              {...register("transactionAmount")}
              name="amount"
              onChange={handleAmountChange}
              placeholder="Enter Amount"
              error={errors?.transactionAmount?.message}
            />
            <TextInput
              label="Narration"
              {...register("narration")}
              placeholder="Narration"
            />
            <TextInput
              label="Account Number"
              {...register("beneficiaryAccountNumber")}
              name="beneficiaryAccountNumber"
              placeholder="Enter Account Number"
              onChange={handleNumericInputChange}
              error={errors?.beneficiaryAccountNumber?.message}
              disabled={isValidatingAccount}
            />
            <div>
              <h4 className="text-sm font-medium mb-2">Select a Product:</h4>
              <Select
                options={formattedBanks}
                maxMenuHeight={200}
                placeholder="Type in your bank name..."
                key={`my_unique_select_key__product`}
                onChange={(
                  val: SingleValue<{ label: string; value: BankType }>
                ) => {
                  setValidatedAccountDetails(null);
                  setValue("bankCode", val?.value?.bankCode ?? "");
                  setSelectedBank(val ?? null);
                  if (val?.value && accountNumber.length === 10) {
                    mutate({
                      beneficiaryBank: val.value.bankCode,
                      accountNumber,
                    });
                  }
                }}
                value={selectedBank}
                isDisabled={isSubmitting || isLoadingBanks}
              />
              <p className="h-2 mt-0.5 mb-2 text-red-500 text-xs">
                {errors?.bankCode?.message}
              </p>
              {isValidatingAccount && <MoonLoader color="#0E12A2" size={10} />}
              {validatedAccountDetails && (
                <div
                  className={`my-2 p-2 rounded-md ${
                    validatedAccountDetails?.code === "00"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {validatedAccountDetails?.data ? (
                    <>
                      <p>{validatedAccountDetails?.data?.accountName}</p>
                    </>
                  ) : (
                    <p>{validatedAccountDetails?.message}</p>
                  )}
                </div>
              )}
            </div>
            <Button
              color="main-blue"
              type="button"
              disabled={!validatedAccountDetails?.data}
              onClick={handleTransactionDetailsValidate}
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            <p className="text-center mb-2">Enter your transaction pin</p>
            <div className="flex items-center justify-between gap-1 lg:gap-2 w-full mb-2">
              {otp?.map((_, index) => (
                <div
                  key={`input-${index}]`}
                  className="w-fit flex items-center justify-between"
                >
                  <input
                    className={`border-none py-2 appearance-none text-center outline-none ring-1 duration-200 ring-gray-200 rounded-md focus:ring-main-blue max-w-[2.25rem] font-bold text-lg placeholder:opacity-40 cursor-pointer`}
                    placeholder="-"
                    value={otp[index] ?? ""}
                    onChange={(e) => handleOtpChange(e, index)}
                    ref={index === activeOtpBox ? otpInputRef : null}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => handleFocus(e, index)}
                    type="password"
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              {errors?.root?.message?.split(",").map((error) => (
                <p key={error} className="text-sm text-main-red">
                  {error}
                </p>
              ))}
            </div>
            <Button type="submit" disabled={!isOtpValid}>
              {isSubmitting ? <PulseLoader color="#fff" /> : "Withdraw"}
            </Button>
          </>
        )}
      </form>
    </>
  );
};
