import React from "react";
import Navigators from "./Navigators";
import NavButtons from "./NavButtons";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav
      className="flex w-full flex-col items-center justify-between shadow-xl shadow-emerald-200"
      style={{ background: "#1C7775" }}
    >
      <Image
        src="/dashboard/topping.svg"
        alt="topping"
        width={10}
        height={10}
        className="w-full"
      />
      <div className="flex w-full items-center justify-between px-10 py-3">
        <NavButtons />
        <Navigators />
      </div>
    </nav>
  );
}
