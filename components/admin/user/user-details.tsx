import { Detail } from "@/components/profile";
import { Button, TextAvatar } from "@/components/shared";
import { FETCH_USER_BY_CUSTOMER_ID, STATUS_CODES } from "@/constants";
import { accountService } from "@/services";
import { UserType } from "@/types/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

type Props = {
  user: Partial<UserType>;
};

const ADMIN_ACTIONS = [
  {
    label: "-- Select --",
    value: "",
    id: 1,
  },
  {
    label: "Disable",
    value: "Disable",
    id: 2,
  },
  {
    label: "Activate",
    value: "Activate",
    id: 3,
  },
  {
    label: "Unlock",
    value: "Unlock",
    id: 4,
  },
];

export const UserDetails: React.FC<Props> = ({ user }) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    bvn,
    phoneNumber,
    gender,
    country,
    state,
    city,
    imagePath,
    address,
    dateOfBirth,
  } = user;

  const { data } = useSession();
  const queryClient = useQueryClient();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [action, setAction] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        actionType: action,
        adminEmail: data?.user.email ?? "",
        userEmail: email,
      };
      const response = await accountService.adminUpdateUserAccount(payload);
      if (response?.data?.code === STATUS_CODES.FAILED) {
        toast.error(response?.data?.message ?? "Something went wrong");
        handleCloseModal();
        return;
      }

      queryClient.invalidateQueries({
        queryKey: [FETCH_USER_BY_CUSTOMER_ID],
      });
      toast.success(response?.data?.message ?? "Success");
      handleCloseModal();
      return response?.data;
    },
  });

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(event.target.value);
  };

  const handleActionBtnClick = () => {
    if (!action) {
      return;
    }

    const element = document.getElementById("my_modal_1") as HTMLElement & {
      showModal: () => void;
    };

    if (element) {
      element.showModal();
    }
  };

  const handleCloseModal = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const handleConfirmAction = () => {
    mutate();
  };

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
      <div className="mt-6 flex items-center gap-2">
        <select
          className="border border-gray-100 px-2 py-1 inline-block w-[150px] rounded-md"
          value={action}
          onChange={handleActionChange}
        >
          {ADMIN_ACTIONS.map((action) => (
            <option key={action.id} value={action.value}>
              {action.label}
            </option>
          ))}
        </select>
        <div className="mx-w-[150px]">
          <Button disabled={!action.length} onClick={handleActionBtnClick}>
            Proceed
          </Button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-[90%] max-w-[300px] overflow-y-scroll no-scrollbar bg-white py-2">
          <div>
            <h2 className="text-center text-lg font-medium mb-2">
              Confirm Action
            </h2>
            <p className="text-center">
              Are you sure your want to <strong>{action}</strong> this user?
            </p>
            <div className="flex items-center gap-2 mt-6">
              <Button onClick={handleConfirmAction}>
                {isPending ? <PulseLoader color="#fff" /> : "Yes"}
              </Button>
              <Button color="red" onClick={handleCloseModal}>
                No
              </Button>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" className="hidden">
              <button ref={buttonRef}>close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
