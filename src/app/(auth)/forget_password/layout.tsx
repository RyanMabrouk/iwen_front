import { CounterProvider } from "@/app/(auth)/provider/CounterProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <CounterProvider>{children}</CounterProvider>;
}
