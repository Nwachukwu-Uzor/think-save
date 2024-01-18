import React from "react";
import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import { UserType } from "@/types/shared";
import { Button } from "../shared";
import { Detail } from ".";

type Props = { user: UserType; handleEditBtnClick: () => void };

export const UserDetails: React.FC<Props> = ({ user, handleEditBtnClick }) => {
  const {
    avatarUrl,
    firstName,
    middleName,
    lastName,
    email,
    bvn,
    phone,
    gender,
    dob,
    nationality,
    state,
    city,
    address,
  } = user;
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-0.5">
        <Image
          src={avatarUrl}
          alt="Think Save"
          height={20}
          width={20}
          className="h-8 w-8 lg:h-12 lg:w-12"
        />
        <h3 className="text-sm lg:text-base font-semibold text-black">{`${firstName}${
          middleName ? " " + middleName : ""
        } ${lastName}`}</h3>
        <p className="text-xs lg:text-sm text-fade font-semibold">{email}</p>
        <div className="w-full max-w-[200px] mt-2">
          <Button color="main-blue" onClick={handleEditBtnClick}>
            <MdOutlineEdit /> Edit Profile
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-1 lg:gap-2 mt-8">
        <Detail title="BVN" value={bvn} />
        <Detail title="Phone" value={phone} />
        <Detail title="Gender" value={gender} />
        <Detail title="Date of Birth" value={dob} />
        <Detail title="Nationality" value={nationality} />
        <Detail title="State" value={state} />
        <Detail title="City" value={city} />
        <Detail
          title="Mother's Maiden Name"
          value={user["mother's-maiden-name"]}
        />
        <div className="lg:col-span-2">
          <Detail title="Address" value={address} />
        </div>
      </div>
    </>
  );
};
