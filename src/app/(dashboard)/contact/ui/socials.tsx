import { FACEBOOK_URl, INSTAGRAM_URl, PHONE_NUMBER, TWITTER_URl } from "@/constants/Links";
import { Facebook, Instagram, WhatsApp, X } from "@mui/icons-material";
import React from "react";

export default function Socials() {
  return (
    <div className="fixed top-1/3 max-sm:hidden  z-[9999] left-0 transform -translate-y-1/2 flex flex-col space-y-3 rounded-r-lg">
      <a
        href={PHONE_NUMBER}
        className="w-10 h-10 p-6 hover:pl-10 rounded-l-md flex items-center justify-center bg-color2 text-white rounded-full hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <WhatsApp className="h-8 w-8" />
      </a>
      <a
        href={FACEBOOK_URl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 p-6 hover:pl-10 rounded-l-md flex items-center justify-center bg-color2 text-white rounded-full hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <Facebook className="h-8 w-8" />
      </a>
      <a
        href={INSTAGRAM_URl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 p-6 hover:pl-10 rounded-l-md flex items-center justify-center bg-color2 text-white rounded-full hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <Instagram className="h-8 w-8" />
      </a>
      <a
        href={TWITTER_URl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 p-6 hover:pl-10 rounded-l-md flex items-center justify-center bg-color2 text-white rounded-full hover:scale-110 transition-all duration-300 ease-in-out"
      >
        <X className="h-7 w-7" />
      </a>
    </div>
  );
}
