"use client";
import { URLState } from "@/app/(dashboard)/books/provider/BooksProvider";
import { ValueOf } from "next/dist/shared/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useURL() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const newSearchParams = new URLSearchParams(searchParams);
  const router = useRouter();
  const update = (values: { name: keyof URLState; value: string }[]) => {
    values.forEach((value) => {
      value.value
        ? newSearchParams.set(value.name, value.value)
        : newSearchParams.delete(value.name);
    });
    const newUrl = `${pathname}?${newSearchParams.toString()}`;

    router.push(newUrl);
  };
  const getValue = (name: string) => {
    return newSearchParams.get(name) ?? undefined;
  };
  return { update, getValue };
}

export default useURL;
