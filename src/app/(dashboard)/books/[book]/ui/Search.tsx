import React from "react";
import arrows_right from "../../../../../../public/dashboard/book/arrows_right";
import filter from "../../../../../../public/dashboard/book/filter";
import serach from "../../../../../../public/dashboard/book/search";

export default function Search() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center overflow-hidden rounded-md">
        <div className="flex" style={{ background: "#E4EFEF" }}>
          <button className="p-3">{serach("#A8A8A8", "20", "20")}</button>
          <input
            dir="rtl"
            className="w-[20rem] bg-inherit p-3 outline-none"
            type="text"
            placeholder="إبحث في متجرنا ..."
          />
        </div>
        <button className="p-3.5" style={{ background: "#A2CBC9" }}>
          {filter("#FFFFFF", "20", "20")}
        </button>
      </div>
      <button className="p-3">{arrows_right("#31827D", "20", "20")}</button>
    </div>
  );
}
