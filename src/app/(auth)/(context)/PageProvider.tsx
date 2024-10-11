"use client";

import { usePathname } from "next/navigation";
import React, { createContext } from "react";

type PageContextType = {
  page: "login" | "signup" | null;
  setPage: React.Dispatch<React.SetStateAction<"login" | "signup" | null>>;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [page, setPage] = React.useState<"login" | "signup" | null>(
    path.includes("login")
      ? "login"
      : path.includes("signup")
        ? "signup"
        : null,
  );

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = React.useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return {
    page: context.page!!,
    setPage: context.setPage!!,
  };
}
