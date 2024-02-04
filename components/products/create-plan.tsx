import { ProductType } from "@/types/shared";
import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Select from "react-select";
import { Button, TextInput } from "../shared";

type Props = {
  product: ProductType;
  handleClose: () => void;
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

export const CreatePlan: React.FC<Props> = ({ product, handleClose }) => {
  const [isContinued, setIsContinued] = useState(false);
  const { productName, productId, tenures } = product;

  const formattedTenure = tenures.map((tenure) => ({
    value: tenure,
    label: tenure.interest,
  }));

  const handleContinue = () => {
    setIsContinued(true);
  };

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
          <TextInput label={`Title`} />
          <TextInput
            label={
              <span>
                Reason <i className="font-normal">(Description)</i>
              </span>
            }
          />
          <TextInput label={`Overall Target Amount`} />
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-medium">Total Payout: </h4>
            <div className="flex-1">
              <TextInput />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Tenure: </h4>
            <Select options={formattedTenure} maxMenuHeight={100} />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
            <TextInput type="date" label="Start Date" />
            <TextInput type="date" label="End Date" />
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
              <div className="form-control">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  // checked
                />
              </div>
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
