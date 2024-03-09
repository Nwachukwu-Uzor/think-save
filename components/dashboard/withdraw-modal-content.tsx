import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, TextInput } from "../shared";
import Select, { SingleValue } from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FETCH_BANKS } from "@/constants";
import { accountService } from "@/services";
import { ApiResponseType, BankType } from "@/types/shared";
import { MdClose } from "react-icons/md";
import { AccountValidationResultType } from "@/types/dashboard";
import { MoonLoader } from "react-spinners";
type Props = {
  handleClose: () => void;
  maxAmount: number;
};

const schema = z.object({
  amount: z.string({
    required_error: "Amount is required",
  }),
  accountNumber: z
    .string()
    .min(10, { message: "Account Number should be at least 10 characters" }),
  bankCode: z.string({ required_error: "Please select a bank to continue" }),
});

type FormFields = z.infer<typeof schema>;

export const WithdrawModalContent: React.FC<Props> = ({
  handleClose,
  maxAmount,
}) => {
  const [validatedAccountDetails, setValidatedAccountDetails] =
    useState<ApiResponseType<AccountValidationResultType> | null>(null);
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
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [accountNumber] = watch(["accountNumber"]);

  const handleNumericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "");
    const { name } = event.target;

    if (name === "accountNumber") {
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
    setValue("amount", inputValue);
    console.log({ inputValue, maxAmount });

    if (Number(inputValue) > maxAmount) {
      console.log("here");

      setError(
        "amount",
        {
          message: "Amount cannot be greater than wallet balance",
          type: "manual",
        },
        { shouldFocus: true }
      );
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
    } finally {
    }
  };

  const formattedBanks =
    banks?.map((bank) => ({ label: bank.bankName, value: bank })) ?? [];

  return (
    <>
      <div className="flex justify-end items-center mb-2">
        <MdClose onClick={handleClose} className="text-sm cursor-pointer" />
      </div>
      <div className="h-12 lg:h-20 aspect-square flex items-center justify-center bg-gray-100 rounded-full mx-auto">
        <Image
          height={16}
          width={16}
          src="/assets/images/bank-svg.svg"
          alt="Bank"
          className="w-8 lg:w-16 aspect-square"
        />
      </div>
      <h2 className="font-semibold text-main-blue mt-2 text-center">
        Withdraw
      </h2>
      <form
        className="mt-2 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Amount"
          {...register("amount")}
          name="amount"
          onChange={handleAmountChange}
          placeholder="Enter Amount"
        />
        <TextInput
          label="Account Number"
          {...register("accountNumber")}
          name="accountNumber"
          placeholder="Enter Account Number"
          onChange={handleNumericInputChange}
          error={errors?.accountNumber?.message}
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
        <Button color="main-blue">Withdraw</Button>
      </form>
    </>
  );
};
