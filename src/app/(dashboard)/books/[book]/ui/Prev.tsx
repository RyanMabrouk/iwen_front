import React from "react";
import arrow_left from "../../../../../../public/dashboard/book/arrow_left";

export default function Prev() {
  return (
    <button className="flex items-center">
      <div className="p-3">{arrow_left("#292D32", "15", "15")}</div>
      <p className="">الصفحة السابقة</p>
    </button>
  );
}
