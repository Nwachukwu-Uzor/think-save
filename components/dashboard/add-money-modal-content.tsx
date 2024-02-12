import React, { useState } from "react";
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {
  accountNumber?: string;
  handleClose: () => void;
};

export const AddMoneyModalContent: React.FC<Props> = ({
  accountNumber,
  handleClose,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text?: string) => {
    if (!text) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Account copied successfully", {
        position: "bottom-right",
      });
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-end items-center mb-2">
        <MdClose onClick={handleClose} className="text-sm cursor-pointer" />
      </div>
      <h3 className="font-medium text-lg lg:text-xl text-center mb-2">
        Add Funds
      </h3>
      <p className="my-1 font-light text-sm">
        To fund your account, please transfer to the following account
      </p>
      <h4 className="mb-1 mt-2 flex justify-between items-center gap-2">
        Bank:<span className="font-light"> Providus Bank</span>
      </h4>
      <h4 className="mb-1 flex justify-between items-center gap-2">
        Account Number:
        <span
          className="font-light inline-flex items-center gap-0.5 cursor-pointer"
          onClick={() => handleCopy(accountNumber)}
        >
          {accountNumber}{" "}
          {isCopied ? (
            <HiOutlineClipboardDocumentCheck className="text-green-700" />
          ) : (
            <HiOutlineClipboardDocument />
          )}
        </span>
      </h4>
    </>
  );
};
