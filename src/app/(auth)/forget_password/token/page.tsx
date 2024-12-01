import React, { Suspense } from "react";
import Token from "./ui/Token";

export default function page() {
  return (
    <Suspense>
      <Token />
    </Suspense>
  );
}
