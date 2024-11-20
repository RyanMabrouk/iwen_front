import Image from "next/image";
import React from "react";
import SearchBar from "./main/SearchBar";
import PrimaryButton from "./main/buttons/PrimaryButton";
import InstagramIcon from "./icons/InstagramIcon";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";
import Logo from "./main/Logo";
import Select from "./main/Select";

export default function Footer() {
  return (
    <div className="w-full overflow-hidden bg-primary-500 px-4 sm:px-10 lg:px-[105px]">
      <div className="flex flex-col justify-end py-10 lg:flex-row lg:gap-0">
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          <div className="flex h-fit w-full flex-col gap-9">
            <SearchBar />
            <div className="grid w-full grid-cols-2 gap-5 text-lg text-white max-sm:text-sm xl:text-xl 2xl:grid-cols-4">
              <div className="flex flex-col gap-[22px]">
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
              </div>
              <div className="flex flex-col gap-[22px]">
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
              </div>
              <div className="flex flex-col gap-[22px]">
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
              </div>
              <div className="flex flex-col gap-[22px]">
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
                <span className="text-right max-xl:text-center">
                  خثقعالعخثقالعقالع
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-16 text-white lg:flex-row lg:gap-[105px]">
            <div className="flex w-full flex-col items-end space-y-5 max-xl:items-center lg:space-y-[52px]">
              <PrimaryButton className="w-fit">إنشاء حساب</PrimaryButton>

              <div className="w-full space-y-5">
                <p className="w-full text-base font-light max-xl:items-center max-xl:text-center lg:whitespace-normal lg:text-lg xl:whitespace-nowrap">
                  العنوان : تونس ـ شارع أبو قاسم الشابي 4084
                </p>
                <p className="text-base font-light max-xl:text-center lg:text-lg">
                  +رقم الهاتف :147 748 73 216
                </p>
              </div>
              <div className="flex justify-end gap-5 max-xl:justify-center lg:gap-9">
                <InstagramIcon size={27} />
                <FacebookIcon size={27} />
                <TwitterIcon size={27} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 lg:gap-[112px]">
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
