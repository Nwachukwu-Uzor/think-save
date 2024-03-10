import React from "react";
import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import { UserType } from "@/types/shared";
import { Button, TextAvatar } from "../shared";
import { Detail } from ".";
import Link from "next/link";

type Props = {
  user: Partial<UserType>;
  handleEditBtnClick: () => void;
};

export const UserDetails: React.FC<Props> = ({ user, handleEditBtnClick }) => {
  const {
    avatarUrl,
    firstName,
    middleName,
    lastName,
    email,
    bvn,
    phoneNumber,
    gender,
    dob,
    country,
    state,
    city,
    imagePath,
    address,
    dateOfBirth,
    ups,
  } = user;
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-0.5">
        {imagePath ? (
          <Image
            src={imagePath}
            alt="Think Save"
            height={20}
            width={20}
            className="h-8 w-8 lg:h-12 lg:w-12 rounded-full object-cover"
          />
        ) : (
          <TextAvatar text={firstName?.charAt(0) ?? "T"} size="sm" />
        )}
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
        <Detail title="BVN" value={bvn ?? ""} />
        <Detail title="Phone" value={phoneNumber ?? ""} />
        <Detail title="Gender" value={gender ?? ""} />
        <Detail title="Date of Birth" value={dateOfBirth ?? ""} />
        <Detail title="Nationality" value={country ?? ""} />
        <Detail title="State" value={state ?? ""} />
        <Detail title="City" value={city ?? ""} />
        <Detail
          title="Mother's Maiden Name"
          value={user.mothersMaidenName ?? ""}
        />
        <div className="lg:col-span-2">
          <Detail title="Address" value={address ?? ""} />
        </div>
      </div>
      {ups !== "1" && (
        <>
          <p className="mt-8 text-sm font-light">
            You do not have a transaction pin set. Click the link below to set a
            pin.
          </p>
          <div className="flex items-center justify-center mt-2">
            <Link
              href="/profile/set-pin"
              className="text-main-blue text-center font-semibold hover:opacity-75 underline py-0.5"
            >
              Set Pin now
            </Link>
          </div>
        </>
      )}
    </>
  );
};
