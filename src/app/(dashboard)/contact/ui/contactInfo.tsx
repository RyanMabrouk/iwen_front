import { ADDRESS, EMAIL, PHONE_NUMBER } from "@/constants/Links";
import { Email } from "@mui/icons-material";
import { LocateIcon, Phone } from "lucide-react";
import React from "react";

export default function ContactInfo() {
  return (
    <div
      className="flex flex-col gap-3 p-3 rounded-md bg-bgcolor1 text-lg font-medium text-color2 shadow-md sm:p-5"
      dir="rtl"
    >
      <div className="flex flex-row items-center gap-2">
        <LocateIcon className="h-6 w-6 text-color2" />
        <span className="-mb-1"> {ADDRESS}</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Phone className="h-6 w-6 text-color2" />
        <span className="-mb-1"> {PHONE_NUMBER}</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Email className="h-6 w-6 text-color2" />
        <span className="-mb-1">{EMAIL} </span>
      </div>
    </div>
  );
}
