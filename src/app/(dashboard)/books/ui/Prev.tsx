import React from "react";
import arrow_left from "../../../../../public/dashboard/book/arrow_left";
import { useRouter } from "next/navigation";

export default function Prev() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center max-sm:hidden"
    >
      <div className="p-3">{arrow_left("#292D32", "15", "15")}</div>
      <p className="">الصفحة السابقة</p>
    </button>
  );
}
