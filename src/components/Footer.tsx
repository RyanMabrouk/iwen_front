import Image from "next/image";
import React from "react";
import SearchBar from "./main/SearchBar";
import PrimaryButton from "./PrimaryButton";
import InstagramIcon from "./icons/InstagramIcon";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";
import Logo from "./main/Logo";
import Select from "./main/Select";

export default function Footer() {
  return (
    <div className="w-full overflow-hidden bg-primary-500 px-[105px]">
      <div className="flex justify-end">
        <div className="flex h-[369px] items-center gap-[141px]">
          <div className="flex h-fit w-[824px] flex-col gap-9">
            <SearchBar />
            <div className="grid w-full grid-cols-4 text-xl text-white">
              <div className="flex flex-col gap-[22px]">
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
              </div>
              <div className="flex flex-col gap-[22px]">
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
              </div>
              <div className="flex flex-col gap-[22px]">
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
              </div>
              <div className="flex flex-col gap-[22px]">
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
                <span>خثقعالعخثقالعقالع</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[105px] text-white">
            <div className="space-y-[52px]">
              <PrimaryButton>إنشاء حساب</PrimaryButton>
              <div className="space-y-5">
                <p className="text-lg font-light">
                  العنوان : تونس ـ شارع أبو قاسم الشابي 4084
                </p>
                <p className="text-lg font-light">
                  +رقم الهاتف :147 748 73 216
                </p>
              </div>
              <div className="flex justify-end gap-9">
                <InstagramIcon size={27} />
                <FacebookIcon size={27} />
                <TwitterIcon size={27} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-[112px]">
              <Logo />
              <Select text="العربية" />
            </div>
          </div>
        </div>
      </div>

      <Image
        src={"/Group2.svg"}
        width={1920}
        height={30}
        alt={""}
        className="min-w-[1920px]"
      />
    </div>
  );
}
