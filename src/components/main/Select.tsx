import React from "react";
import ArrowDown from "../icons/ArrowDown";
import { cn } from "@/lib/utils";

export default function Select({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex cursor-pointer gap-2.5", className)}>
      <span className="text-lg">{text}</span>
      <ArrowDown size={24} />
    </div>
  );
}
