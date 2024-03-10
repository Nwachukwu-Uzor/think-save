"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/admin/shared";
import { Button, Card, Container, TextInput } from "@/components/shared";
import { toast } from "react-toastify";

const INITIAL_TENURE_FIELDS = {
  interestRate: "",
  tenureRate: "",
};
const CreatePlan = () => {
  const [tenureInput, setTenureInput] = useState(INITIAL_TENURE_FIELDS);
  const [tenureErrors, setTenureErrors] = useState(INITIAL_TENURE_FIELDS);
  const [tenures, setTenures] = useState<
    { interestRate: string; tenureRate: string; id: string }[]
  >([]);

  const handleTenureInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    const { name } = event.target;

    if (name === "interestRate" || name === "tenureRate") {
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
    if (!Object.values(tenureInput).every((item) => item.length > 0)) {
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

  return (
    <>
      <PageHeader title="Create Plan" />
      <Container>
        <Card>
          <h2 className="text-center text-lg font-semibold mb-2">
            Create Plan
          </h2>
          <form className="max-w-[400px] mx-auto flex flex-col gap-3">
            <TextInput label="Product Name" />
            <>
              <h3 className="font-semibold mb-2">Product Description Items: </h3>
              <TextInput label="Product Description" />
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
                />
                <TextInput
                  label="Interest Rate (%)"
                  placeholder="Enter interest rate in %"
                  name="interestRate"
                  value={tenureInput.interestRate}
                  onChange={handleTenureInputChange}
                  error={tenureErrors?.interestRate}
                />
              </div>
              <div className="mt-1 w-[90%] max-w-[150px]">
                <Button color="success" type="button" onClick={handleAddTenure}>
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
                      {tenure?.interestRate} % <br /> <strong>Tenure: </strong>
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
          </form>
        </Card>
      </Container>
    </>
  );
};

export default CreatePlan;
