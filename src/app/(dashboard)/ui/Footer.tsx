"use client"
import PrimaryButton from "@/components/main/buttons/PrimaryButton"
import Logo from "@/components/main/Logo"
import Select from "@/components/main/Select"
import Image from "next/image"
import Links from "./Links"
import useCurrentUser from "@/hooks/data/user/useCurrentUser"
import { ADDRESS, FACEBOOK_URl, INSTAGRAM_URl, PHONE_NUMBER, TWITTER_URl } from "@/constants/Links"

export default function Footer() {
  const { data: user } = useCurrentUser()

  return (
    <div className="bg-color1">
      {/* Main Footer Section */}
      <div
        dir="rtl"
        className="flex flex-col items-start justify-center gap-10 bg-color1 p-5 text-white sm:pl-[8rem] sm:pr-10 sm:pt-10 md:flex-row md:justify-between"
      >
        <div className="flex flex-col items-start gap-5 max-sm:m-auto sm:gap-20">
          <Logo />
          <Select className="m-auto text-sm" text="العربية" />
        </div>

        <div className="flex flex-col items-start gap-5 sm:gap-10">
          {user?.data ? (
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="h-fit rounded-md p-1 text-lg font-semibold text-white">
                {user.data.first_name + " " + user.data.last_name}
              </div>
              <Image
                src={!!user.data.avatar ? user.data.avatar : "/default_avatar.png"}
                alt={user.data.last_name ?? ""}
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
          ) : (
            <PrimaryButton className="w-fit text-base font-normal">إنشاء حساب</PrimaryButton>
          )}

          <div className="flex flex-col gap-2 text-lg leading-relaxed">
            <div className="flex flex-row gap-1">
              <span>العنوان :</span>
              <span>{ADDRESS}</span>
            </div>
            <div className="flex flex-row gap-1">
              <span>رقم الهاتف :</span>
              <span>{PHONE_NUMBER}</span>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <a href={TWITTER_URl} target="_blank" rel="noreferrer">
              <Image alt="twitter" src="/twitter.png" width={30} height={30} />
            </a>
            <a href={FACEBOOK_URl} target="_blank" rel="noreferrer">
              <Image alt="facebook" src="/facebook.png" width={30} height={30} />
            </a>
            <a href={INSTAGRAM_URl} target="_blank" rel="noreferrer">
              <Image alt="instagram" src="/instagram.png" width={30} height={30} />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5">
          <Links />
        </div>
      </div>
      {/* Attribution Section */}
      <div dir="rtl" className="bg-color1 px-8 pt-6">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/30 to-transparent"></div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="group flex items-center gap-2 text-sm text-white/80 transition-all duration-300 hover:text-white">
            <span>صُنِعَ بحُب</span>
            <div className="relative">
              <div className="h-4 w-4 animate-pulse text-red-500 transition-all duration-300 group-hover:scale-110">
                ❤️
              </div>
            </div>
            <span>من طرف</span>
            <a
              href="https://evowave.tech"
              target="_blank"
              rel="noreferrer"
              className="relative font-semibold text-white transition-all duration-300 hover:text-blue-300"
            >
              <span className="relative z-10">Evowave</span>
              <div className="absolute -bottom-1 right-0 h-0.5 w-0 bg-gradient-to-l from-blue-400 to-blue-300 transition-all duration-300 group-hover:w-full"></div>
            </a>
          </div>

          <div className="w-full ">
            <img src="/group2.svg"  alt="Decorative divider" className="w-full h-8 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  )
}
