"use client";
import { URLState } from "@/app/(dashboard)/books/provider/BooksProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useURL() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const newSearchParams = new URLSearchParams(searchParams);
  const router = useRouter();
  const update = (values: { name: URLState; value: string }[]) => {
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
