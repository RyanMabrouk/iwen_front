import { ADDRESS, EMAIL, PHONE_NUMBER } from "@/constants/Links";
import { Email } from "@mui/icons-material";
import { LocateIcon, Phone } from "lucide-react";
import React from "react";

export default function ContactInfo() {
  return (
    <div className="flex bg-white p-2 sm:p-5 shadow-md rounded-md flex-col gap-3 text-color2" dir="rtl">
      <div className="flex items-center gap-2">
        <LocateIcon className="h-4 w-4" />
        {ADDRESS}
      </div>
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        {PHONE_NUMBER}
      </div>
      <div className="flex items-center gap-2">
        <Email className="h-4 w-4" />
        {EMAIL}
      </div>
    </div>
  );
}
