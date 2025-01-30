import {
  FACEBOOK_URl,
  INSTAGRAM_URl,
  PHONE_NUMBER,
  TWITTER_URl,
} from "@/constants/Links";
import { Facebook, Instagram, WhatsApp, X } from "@mui/icons-material";
import React from "react";

export default function Socials() {
  return (
    <div className="absolute left-0 top-[48svh] z-[9999] flex -translate-y-1/2 transform flex-col space-y-3 rounded-r-lg max-sm:hidden">
<a
  href={`tel:${PHONE_NUMBER}`} // Use tel: for phone numbers
  className="flex h-10 w-10 items-center justify-center rounded-full rounded-l-md bg-color2 p-6 text-white transition-all duration-300 ease-in-out hover:scale-110 hover:pl-10"
>
  <WhatsApp className="h-8 w-8" />
</a>

      <a
        href={FACEBOOK_URl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full rounded-l-md bg-color2 p-6 text-white transition-all duration-300 ease-in-out hover:scale-110 hover:pl-10"
      >
        <Facebook className="h-8 w-8" />
      </a>
      <a
        href={INSTAGRAM_URl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full rounded-l-md bg-color2 p-6 text-white transition-all duration-300 ease-in-out hover:scale-110 hover:pl-10"
      >
        <Instagram className="h-8 w-8" />
      </a>
      <a
        href={TWITTER_URl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full rounded-l-md bg-color2 p-6 text-white transition-all duration-300 ease-in-out hover:scale-110 hover:pl-10"
      >
        <X className="h-7 w-7" />
      </a>
    </div>
  );
}
