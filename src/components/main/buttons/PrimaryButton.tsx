"use client";
import { cn } from "@/lib/utils";
import React from "react";

type PrimaryButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export default function PrimaryButton({
  className = "",
  size = "md",
  children,
  onClick,
  variant = "primary",
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "h-[2.25rem] text-base",
    md: "h-[3rem] text-lg",
    lg: "h-[3.5rem] text-xl",
  };

  return (
    <button
      className={cn(
        "rounded-lg px-[16px] text-center font-medium transition-all hover:brightness-110", // Lighten on hover
        "whitespace-nowrap",
        variant === "primary"
          ? "bg-primary-400 text-white"
          : "border border-primary-400 bg-white text-primary-400",
        sizeClasses[size],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
