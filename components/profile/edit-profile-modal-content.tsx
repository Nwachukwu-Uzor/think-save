"use client";
import React from "react";
import Image from "next/image";
import { MdClose, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserType } from "@/types/shared";
import { TextAreaInput, TextInput, Button } from "../shared";

type Props = {
  userDetails: UserType;
  handleClose: () => void;
};
export const EditProfileModalContent: React.FC<Props> = ({
  userDetails,
  handleClose,
}) => {
  const genderOptions = [
    { id: 1, label: "Male", value: "Male" },
    { id: 2, label: "Female", value: "Female" },
    { id: 3, label: "Other", value: "Other" },
  ];

  const {
    avatarUrl,
    lastName,
    firstName,
    middleName,
    bvn,
    phone,
    nationality,
    city,
    address,
    state,
  } = userDetails;

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-sm lg:text-base text-black font-bold">
          Edit Profile
        </h3>
        <MdClose onClick={handleClose} className="text-xl cursor-pointer" />
      </div>
      <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 mt-6">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src={avatarUrl}
              alt="Think Save"
              height={20}
              width={20}
              className="h-6 w-6 lg:w-32 lg:h-32 object-center"
            />
            <MdOutlineEdit className="text-main-blue text-xl cursor-pointer" />
            <RiDeleteBin6Line className="text-main-red text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextInput label="Surname" value={lastName} />
          <TextInput label="First Name" value={firstName} />
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <TextInput label="Other Name" value={middleName} />
            <TextInput label="Phone" value={phone} />
            <TextInput label="Nationality" value={nationality} />
            <TextInput label="City" value={city} />
            <TextAreaInput label="Address" value={address} />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <TextInput label="BVN" value={bvn} />
            <TextInput label="First Name" value={firstName} />
            <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gender" className="font-semibold text-sm">
                  Gender
                </label>
                <select className="relative w-full bg-accent-blue py-1.5 px-2 focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50">
                  {genderOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gender" className="font-semibold text-sm">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="relative w-full bg-accent-blue py-1.5 px-2 focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50"
                />
              </div>
            </div>
            <TextInput label="State" value={state} />
            <TextInput
              label="Mother's Maiden Name"
              value={userDetails.mothersMaidenName}
            />
            <div className="max-w-[150px] ml-auto mt-4">
              <Button color="main-blue">Update</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
