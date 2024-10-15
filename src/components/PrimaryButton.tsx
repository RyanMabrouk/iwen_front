import { cn } from "@/lib/utils";
import React from "react";

type PrimaryButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

export default function PrimaryButton({
  className = "",
  size = "md",
  children,
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "h-[2.5rem] text-base",
    md: "h-[3.313rem] text-lg",
    lg: "h-[4rem] text-xl",
  };

  return (
    <button
      className={cn(
        "rounded-lg bg-primary-400 px-[20px] text-white transition-all hover:brightness-110", // Lighten on hover
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
