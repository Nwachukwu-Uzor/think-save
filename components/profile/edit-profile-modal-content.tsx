"use client";
import React, { useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import Image from "next/image";
import { MdClose, MdOutlineEdit } from "react-icons/md";
import { z } from "zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CountryType, UserType } from "@/types/shared";
import { TextAreaInput, TextInput, Button, TextAvatar } from "../shared";
import { useQuery } from "@tanstack/react-query";
import { FETCH_COUNTRIES } from "@/constants";
import { authService, locationService } from "@/services";
import { formatValidationErrors } from "@/utils/shared";
import { toast } from "react-toastify";
import { SESSION_STORAGE_KEY } from "@/config";
import { PulseLoader } from "react-spinners";

type Props = {
  userDetails: Partial<UserType>;
  handleClose: () => void;
};

const schema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(2, { message: "First name should be at least 2 characters" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(2, { message: "Last name should be at least 2 characters" }),
  middleName: z.optional(z.string()),
  phoneNumber: z.optional(z.string()),
  bvn: z
    .optional(z.string())
    .refine((value) => !value || /^\d{10}$/.test(value), {
      message: "BVN must be a 10-digit string",
    }),
  city: z.optional(z.string()),
  mothersMaidenName: z.optional(z.string()),
  dateOfBirth: z.optional(z.string()),
  state: z.nullable(z.string()),
  country: z.optional(z.string()),
  address: z.optional(z.string()),
  gender: z.optional(z.string()),
});

type FormFields = z.infer<typeof schema> & {};
export const EditProfileModalContent: React.FC<Props> = ({
  userDetails,
  handleClose,
}) => {
  const {
    lastName,
    firstName,
    middleName,
    bvn,
    phoneNumber,
    country,
    city,
    address,
    state,
    imagePath,
    mothersMaidenName,
    customerId,
    userId,
    email,
    gender
  } = userDetails;

  const {
    register,
    setError,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName ?? "",
      phoneNumber: phoneNumber ?? "",
      country: country ?? "",
      city: city ?? "",
      state: state ?? "",
      address: address ?? "",
      bvn: bvn ?? "",
      mothersMaidenName: mothersMaidenName ?? "",
      gender: gender ?? "",
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const genderOptions = [
    { id: 1, label: "Male", value: "Male" },
    { id: 2, label: "Female", value: "Female" },
    { id: 3, label: "Other", value: "Other" },
  ];

  const { data: countries, isLoading: isFetchingCountries } = useQuery({
    queryKey: [FETCH_COUNTRIES],
    queryFn: async () => {
      const countries = await locationService.getCountries();
      if (!countries) {
        return [];
      }

      const formattedCountries = countries.map((country) => ({
        label: country.name,
        value: country,
      }));

      return formattedCountries;
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      for (const key in data) {
        const typedKey = key as keyof typeof data;
        formData.append(typedKey, data[typedKey] as string | Blob);
      }

      formData.append("customerId", customerId ?? "");
      formData.append("userId", userId ?? "");
      formData.append("email", email ?? "");

      if (image) {
        formData.append("photo", image, "avatar");
      }

      const response = await authService.updateProfile(formData);
      if (!response?.status) {
        setError("root", { type: "deps", message: response?.message });
        toast.error("Profile update failed", { theme: "colored" });
        return;
      }
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify(response?.data)
      );
      toast.success("Profile update success", { theme: "colored" });
      handleClose();
    } catch (error: any) {
      console.log(error);
      const errorData = error?.response?.data?.errors;
      if (errorData) {
        const formattedValidationErrors = formatValidationErrors(
          errorData as Record<string, string[]>
        );
        setError("root", { type: "deps", message: formattedValidationErrors });
      } else {
        setError("root", { type: "deps", message: error.message });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    setImage(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm lg:text-base text-black font-bold">
          Edit Profile
        </h3>
        <MdClose onClick={handleClose} className="text-xl cursor-pointer" />
      </div>
      <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 mt-6">
        <div>
          <div className="flex items-center gap-2">
            {preview ? (
              <Image
                src={preview}
                alt="Think Save"
                height={20}
                width={20}
                className="h-8 w-8 lg:h-12 lg:w-12 rounded-full object-cover"
              />
            ) : imagePath ? (
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
            <div>
              <label htmlFor="avatar">
                <MdOutlineEdit className="text-main-blue text-xl cursor-pointer" />
              </label>
              <input
                type="file"
                id="avatar"
                hidden
                accept="image/*"
                onChange={handleImageChange}
                ref={imageRef}
              />
            </div>
            {preview ? (
              <RiDeleteBin6Line
                className="text-main-red text-xl cursor-pointer"
                onClick={handleDelete}
              />
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextInput
            label="Last Name"
            {...register("lastName")}
            error={errors?.lastName?.message}
          />
          <TextInput
            label="First Name"
            value={firstName}
            {...register("firstName")}
            error={errors?.firstName?.message}
          />
        </div>
        <div>
          <div className="flex flex-col gap-2 justify-start">
            <TextInput label="Other Name" {...register("middleName")} />
            <TextInput label="Phone" {...register("phoneNumber")} />
            <div className="flex flex-col gap-2 lg:-mt-3">
              <label htmlFor="country" className="font-semibold text-sm">
                Nationality
              </label>

              <Select
                options={countries}
                isDisabled={isFetchingCountries}
                maxMenuHeight={150}
                placeholder={isFetchingCountries ? "Loading..." : "Select..."}
                onChange={(
                  val: SingleValue<{ label: string; value: CountryType }>
                ) => {
                  const country = val?.value?.name;
                  setValue("country", country);
                }}
              />
            </div>
            <TextInput label="City" {...register("city")} />
            <TextAreaInput label="Address" {...register("address")} />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 justify-start">
            <TextInput
              label="BVN"
              {...register("bvn")}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setValue("bvn", value);
              }}
            />
            <div className="grid lg:grid-cols-2 gap-2 lg:gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gender" className="font-semibold text-sm">
                  Gender
                </label>
                <select
                  className="relative w-full bg-accent-blue py-1.5 px-2 focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50"
                  {...register("gender")}
                >
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
                  {...register("dateOfBirth")}
                  className="relative w-full bg-accent-blue py-1.5 px-2 focus:border-none focus:outline-none focus:ring-[0.5px] focus:ring-main-blue rounded-md duration-50"
                />
              </div>
            </div>
            <TextInput label="State" {...register("state")} />
            <TextInput
              label="Mother's Maiden Name"
              {...register("mothersMaidenName")}
            />
            <div className="flex flex-col gap-0.5">
              {errors?.root?.message?.split(",").map((error) => (
                <p key={error} className="text-sm text-main-red">
                  {error}
                </p>
              ))}
            </div>
            <div className="max-w-[150px] ml-auto mt-4">
              <Button color="main-blue" type="submit">
                {isSubmitting ? <PulseLoader color="#fff" /> : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
