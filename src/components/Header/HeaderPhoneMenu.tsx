"use client";
import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Route } from "./Header";
import Link from "next/link";

export function HeaderPhoneMenu({ routes }: { routes: Route[] }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="flex w-full sm:hidden">
        <div className="flex-1"></div>
        <div
          className="cursor-pointer px-8 py-4 text-primary-500 transition-all duration-200 hover:bg-primary-300"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu />
        </div>
      </div>
      <div
        className="overflow-hidden transition-[max-height] duration-500 sm:hidden"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight || 0}px` : "0",
        }}
      >
        <div ref={contentRef}>
          <div className="mx-auto flex w-fit items-center max-sm:w-full max-sm:flex-col max-sm:items-end">
            {routes.map((route, idx) => {
              return (
                <Link
                  href={route.href}
                  key={idx}
                  className="flex cursor-pointer justify-center px-8 py-5 transition-all duration-200 hover:bg-primary-300 max-sm:w-full"
                >
                  <span className="text-lg">{route.text}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
