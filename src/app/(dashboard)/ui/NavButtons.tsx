import React from "react";
import Language from "./Language";
import Buttons from "./Buttons";

export default function NavButtons() {
  return (
    <div className="flex gap-10">
      <Language />
      <Buttons />
    </div>
  );
}
