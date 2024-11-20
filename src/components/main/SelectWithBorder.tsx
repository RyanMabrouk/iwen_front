import React from "react";
import Select from "./Select";
import ArrowDown from "../icons/ArrowDown";
import { cn } from "@/lib/utils";

export default function SelectWithBorder({
  text,
  icon,
  className,
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-[240px] cursor-pointer items-center justify-between rounded-xl border border-black bg-white p-3 text-xl",
        className,
      )}
    >
      <div className="ml-2">{icon}</div>
      <div className={"flex gap-2.5"}>
        <span className="text-lg">{text}</span>
        <ArrowDown size={24} />
      </div>
    </div>
  );
}
