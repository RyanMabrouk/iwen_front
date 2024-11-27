import React from "react";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen flex-col overflow-y-hidden overflow-x-hidden">
      {children}
    </div>
  );
}
