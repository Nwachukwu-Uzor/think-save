"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/admin/shared";
import {
  Button,
  Card,
  Container,
  TextAreaInput,
  TextInput,
} from "@/components/shared";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatNumberWithCommas, formatValidationErrors } from "@/utils/shared";
import { productsService } from "@/services";
import { STATUS_CODES } from "@/constants";
import { PulseLoader } from "react-spinners";

const INITIAL_TENURE_FIELDS = {
  interestRate: "",
  tenureRate: "",
  root: "",
};

const INITIAL_PRODUCT_DESCRIPTION_ITEM = {
  value: "",
  error: "",
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

const CreatePlan = () => {
  const [tenureInput, setTenureInput] = useState(INITIAL_TENURE_FIELDS);
  const [step, setStep] = useState(1);
  const [tenureErrors, setTenureErrors] = useState(INITIAL_TENURE_FIELDS);
  const [productDescriptionItems, setProductDescriptionItems] = useState<
    { item: string; id: string }[]
  >([]);
  const [productDescriptionItem, setProductDescriptionItem] = useState(
    INITIAL_PRODUCT_DESCRIPTION_ITEM
  );
  const [tenures, setTenures] = useState<
    { interestRate: string; tenureRate: string; id: string }[]
  >([]);

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

  const handleNumericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    const { name } = event.target;

    if (
      name === "minimumAmount" ||
      name === "maximumAmount" ||
      name === "withdrawalLimit"
    ) {
      setValue(name, formatNumberWithCommas(inputValue));
    }
  };

  const handleTenureInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    const { name } = event.target;

    if (name === "interestRate" || name === "tenureRate") {
      setTenureErrors((errors) => ({ ...errors, root: "" }));
      if (inputValue.length === 0) {
        setTenureErrors((errors) => ({
          ...errors,
          [name]: `${
            name === "interestRate" ? "Interest rate" : "Tenure rate"
          } is required`,
        }));
      } else {
        setTenureErrors((errors) => ({ ...errors, [name]: "" }));
      }
      setTenureInput((values) => ({ ...values, [name]: inputValue }));
    }
  };

  const handleAddTenure = () => {
    if (
      tenureInput.interestRate.length === 0 ||
      tenureInput.tenureRate.length === 0
    ) {
      toast.warn("Please provide a valid tenure");
      return;
    }

    const updatedTenures = [
      ...tenures,
      { ...tenureInput, id: Date.now().toString() },
    ];
    setTenures(updatedTenures);
    setTenureInput(INITIAL_TENURE_FIELDS);
  };

  const handleRemoveTenure = (id: string) => {
    setTenures((tenures) => tenures.filter((tenure) => tenure.id !== id));
  };

  const handleProductDescriptionItemChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setProductDescriptionItem({
      value: value,
      error:
        value.length < 3
          ? "Description item should be at least 3 characters long"
          : "",
    });
  };

  const handleDeleteProductDescriptionItem = (id: string) => {
    setProductDescriptionItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const handleAddProductDescriptionItem = () => {
    console.log("here");
    if (
      productDescriptionItem.value.length < 3 ||
      productDescriptionItem.error.length > 0
    ) {
      toast.warn("Please provide a valid product description item");
      return;
    }

    const updateProductDescriptionItems = [
      ...productDescriptionItems,
      { item: productDescriptionItem.value, id: Date.now().toString() },
    ];
    setProductDescriptionItems(updateProductDescriptionItems);
    setProductDescriptionItem(INITIAL_PRODUCT_DESCRIPTION_ITEM);
  };

  const handleBackClick = () => {
    setStep(1);
  };

  const handleNextClick = async () => {
    const result = await trigger(["productDescription", "productName"]);
    if (!result) {
      return;
    }
    if (productDescriptionItems.length === 0) {
      setProductDescriptionItem({
        ...INITIAL_PRODUCT_DESCRIPTION_ITEM,
        error: "Please provide at least one description item",
      });
    }

    if (tenures.length === 0) {
      setTenureErrors((errors) => ({
        ...errors,
        root: "Please provide at least one tenure",
      }));
      return;
    }
    setStep(2);
  };

  const clearInputs = () => {
    setStep(1);
    setTenures([]);
    setTenureErrors(INITIAL_TENURE_FIELDS);
    setProductDescriptionItems([]);
    setProductDescriptionItem(INITIAL_PRODUCT_DESCRIPTION_ITEM);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const formattedTenures = tenures.map((tenure) => ({
        tenureRate: tenure.tenureRate,
        interestRate: tenure.interestRate,
        tenure: `${tenure.tenureRate} Months`,
        interest: `${tenure.tenureRate} months - ${tenure.interestRate}% P.A`,
      }));

      const formattedProductDescriptionItems = productDescriptionItems.map(
        (item) => item.item
      );

      const payload = {
        ...data,
        withdrawalLimit: Number(data.withdrawalLimit?.replace(/[,\s]/g, "")),
        minimumAmount: Number(data.minimumAmount?.replace(/[,\s]/g, "")),
        maximumAmount: Number(data.maximumAmount?.replace(/[,\s]/g, "")),
        tenures: formattedTenures,
        interestRate: formattedTenures.reduce(
          (a, b) => `${a} ${b.interest}`,
          ""
        ),
        tenure: formattedTenures.reduce((a, b, i) => {
          const length = formattedTenures.length;
          return `${a} ${
            i === length - 1 && length > 1
              ? `and ${b.tenureRate} Months`
              : `${b.tenureRate}`
          }`;
        }, ""),
        productDescriptionItems: formattedProductDescriptionItems,
      };
      const response = await productsService.addOrEditProduct(payload);
      if (response?.data?.code === STATUS_CODES.SUCCESS) {
        clearInputs();
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
      }
    }
  };

  return (
    <>
      <PageHeader title="Create Plan" />
      <Container>
        <div className="mt-3" />
        <Card>
          <h2 className="text-center text-lg font-semibold mb-2">
            Create Plan
          </h2>
          <form
            className="max-w-[600px] mx-auto flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {step === 1 && (
              <>
                <TextInput
                  label="Product Name"
                  {...register("productName")}
                  error={errors?.productName?.message}
                  disabled={isSubmitting}
                />
                <TextAreaInput
                  label="Product Description"
                  {...register("productDescription")}
                  error={errors?.productDescription?.message}
                  disabled={isSubmitting}
                />
                <>
                  <label
                    htmlFor="productDescriptionItem"
                    className="text-sm font-semibold mb-0.5"
                  >
                    Product Description Item:{" "}
                  </label>
                  <div className="flex justify-between items-start gap-1">
                    <div className="flex-1">
                      <TextAreaInput
                        placeholder="Enter a description item"
                        value={productDescriptionItem.value}
                        error={productDescriptionItem.error}
                        onChange={handleProductDescriptionItemChange}
                        name="productDescriptionItem"
                        id="productDescriptionItem"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="max-w-[150px]">
                      <Button
                        color="success"
                        type="button"
                        onClick={handleAddProductDescriptionItem}
                        disabled={isSubmitting}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  {productDescriptionItems?.length > 0 && (
                    <div className="my-2 bg-gray-100 p-1.5 rounded-md text-sm flex flex-col gap-0.5">
                      {productDescriptionItems.map((item) => (
                        <p key={item.id} className="flex justify-between gap-1">
                          <span className="flex-1">{item.item}</span>
                          <span
                            className="font-semibold text-xs italic"
                            onClick={() =>
                              handleDeleteProductDescriptionItem(item.id)
                            }
                          >
                            Remove
                          </span>
                        </p>
                      ))}
                    </div>
                  )}
                </>
                <>
                  <div className="flex gap-1 justify-between">
                    <TextInput
                      label="Duration (months)"
                      placeholder="Enter duration in months"
                      name="tenureRate"
                      value={tenureInput.tenureRate}
                      onChange={handleTenureInputChange}
                      error={tenureErrors?.tenureRate}
                      disabled={isSubmitting}
                    />
                    <TextInput
                      label="Interest Rate (%)"
                      placeholder="Enter interest rate in %"
                      name="interestRate"
                      value={tenureInput.interestRate}
                      onChange={handleTenureInputChange}
                      error={tenureErrors?.interestRate}
                      disabled={isSubmitting}
                    />
                  </div>
                  <p className="h-1 text-xs text-red-500 mt-1">
                    {tenureErrors?.root}
                  </p>
                  <div className="mt-1 w-[90%] max-w-[150px]">
                    <Button
                      color="success"
                      type="button"
                      onClick={handleAddTenure}
                      disabled={isSubmitting}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-col gap-1">
                    {tenures?.map((tenure) => (
                      <p
                        key={tenure.id}
                        className="bg-gray-100 p-2 rounded-md flex justify-between items-center text-sm"
                      >
                        <span>
                          <strong>Interest Rate: </strong>
                          {tenure?.interestRate} % <br />{" "}
                          <strong>Tenure: </strong>
                          {tenure?.tenureRate} months
                        </span>
                        <span
                          className="text-xs italic font-semibold cursor-pointer"
                          onClick={() => handleRemoveTenure(tenure.id)}
                        >
                          Remove
                        </span>
                      </p>
                    ))}
                  </div>
                </>
                <div className="max-w-[250px] mt-2">
                  <Button
                    onClick={handleNextClick}
                    disabled={isSubmitting}
                    type="button"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <TextInput
                  label="Minimum Amount"
                  {...register("minimumAmount")}
                  onChange={handleNumericInputChange}
                  disabled={isSubmitting}
                />
                <TextInput
                  label="Maximum Amount"
                  {...register("maximumAmount")}
                  onChange={handleNumericInputChange}
                  disabled={isSubmitting}
                />
                <TextInput
                  label="Withdrawal Limit"
                  {...register("withdrawalLimit")}
                  onChange={handleNumericInputChange}
                  disabled={isSubmitting}
                />
                <div className="flex flex-col gap-0.5">
                  {errors?.root?.message?.split(",").map((error) => (
                    <p key={error} className="text-sm text-main-red">
                      {error}
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    color="red"
                    onClick={handleBackClick}
                    type="button"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button disabled={isSubmitting}>
                    {isSubmitting ? <PulseLoader color="#fff" /> : "Submit"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Card>
      </Container>
    </>
  );
};

export default CreatePlan;
