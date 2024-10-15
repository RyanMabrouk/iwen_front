import { CounterProvider } from "@/provider/auth/CounterProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <CounterProvider>{children}</CounterProvider>;
}
