import React from "react";
import Select from "./Select";
import ArrowDown from "../icons/ArrowDown";

export default function SelectWithBorder({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-[240px] cursor-pointer items-center justify-between rounded-xl border border-black bg-white p-3 text-xl">
      <div className="ml-2">{icon}</div>
      <div className={"flex gap-2.5"}>
        <span className="text-lg">{text}</span>
        <ArrowDown size={24} />
      </div>
    </div>
  );
}
