"use client";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import Image from "next/image";
import React from "react";
import ProfilePictureUpload from "./profilepic";
import useMyOrders from "@/hooks/data/payments/orders/useMyOrders";

export default function Header() {
  const { data: user } = useCurrentUser();
  const { data: orders } = useMyOrders({});
  return (
    <div
      dir="rtl"
      className="mx-auto flex h-auto w-[65svw] flex-col items-center justify-evenly gap-4 p-4 md:h-[8.5rem] md:flex-row md:gap-[2rem] md:p-0"
    >
      <ProfilePictureUpload defaultProfilePic={user?.data?.avatar} />
      <div className="flex w-full flex-col items-center gap-4 break-words rounded-lg bg-white md:h-full md:flex-row md:items-stretch md:gap-0 md:p-0">
        <div className="flex w-full flex-col items-center justify-center gap-2 pl-2 pr-2 text-center sm:pl-[4rem] sm:pr-[2rem] md:gap-3 md:text-right">
          <div className="text-lg font-semibold md:text-xl">
            {user?.data?.first_name + " " + user?.data?.last_name}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 md:justify-start">
            <Image
              src="/profile/fi-rr-envelope.png"
              alt=""
              width={500}
              height={500}
              className="h-4 w-4"
            />
            <div>{user?.data?.email}</div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-2 md:gap-3 md:border-l-2 md:border-r-2 md:border-t-0 md:px-[4svw] md:py-0">
          <Image
            src={"/profile/fi-rr-book.png"}
            alt="Purchases Icon"
            width={500}
            height={500}
            className="h-5 w-5"
          />
          <div className="text-sm md:text-base">
            المشتريات ({orders?.data?.meta.total_count})
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4 py-2 md:gap-3 md:px-[4svw] md:py-0">
          <Image
            src={"/profile/coin-svgrepo-com 1.png"}
            alt="Total Spending Icon"
            width={500}
            height={500}
            className="h-6 w-6 md:h-7 md:w-7"
          />
          <div className="text-sm md:text-base">
            <div className="text-sm md:text-base">
              إجمالي الإنفاق ( {user?.data?.total_spent} د.م)
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
