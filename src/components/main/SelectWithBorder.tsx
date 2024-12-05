"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowDown from "../icons/ArrowDown";
import { cn } from "@/lib/utils";

type Item = {
  id: string | null;
  name: string;
};

export default function SelectWithBorder({
  text,
  icon,
  className,
  content,
  defaultStatus,
  onChange,
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  content?: Item[];
  defaultStatus?: boolean;
  onChange?: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(defaultStatus || false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState(text);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (item: Item) => {
    setLabel(item.name);
    setOpen(false);
    if (onChange) {
      onChange(item.id);
    }
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-50 flex min-w-[240px] cursor-pointer items-center justify-between rounded-xl border border-black bg-white p-3 text-xl",
        className,
      )}
      onClick={toggleDropdown}
    >
      <div className="ml-2">{icon}</div>
      <div className={"flex items-center gap-2.5"}>
        <span className="text-lg">{label}</span>
        <ArrowDown size={24} />
      </div>
      {open && (
        <div
          className="absolute left-0 top-16 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-lg border border-black bg-white py-2 shadow-xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {content &&
            content?.map((item) => (
              <div
                key={item.id}
                className="p-2.5 text-lg hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item);
                }}
              >
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
