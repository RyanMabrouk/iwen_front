import React from "react";
import CreateAccountButton from "./CreateAccountButton";
import CartButton from "./CartButton";

export default function Buttons() {
  return (
    <div className="flex gap-4">
      <CartButton />
      <CreateAccountButton />
    </div>
  );
}
