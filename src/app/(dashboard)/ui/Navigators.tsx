import React from "react";
import Logo from "./Logo";
import Links from "./Links";

export default function Navigators() {
  return (
    <div className="flex gap-4">
      <Links />
      <Logo />
    </div>
  );
}
