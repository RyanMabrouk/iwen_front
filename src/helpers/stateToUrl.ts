"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import createCompletePathName from "./createCompletePathName";
import { URLState } from "@/app/(dashboard)/books/provider/BooksProvider";
import { ValueOf } from "next/dist/shared/lib/constants";

export function useStateToUrl<T extends keyof URLState>(
  name: T,
  defaultValue: URLState[T],
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const state = searchParams.get(name) ?? defaultValue;
  const changeState = (value: string) => {
    router.replace(
      createCompletePathName({
        currentPathname: pathname,
        currentSearchParams: searchParams,
        values: [{ name, value }],
      }) as string,
    );
    /* const params = new URLSearchParams(searchParams);
    if (value !== defaultValue) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.replace(`${pathname}?${params}`); */
  };

  return [state, changeState] as [string, (value: string) => void];
}
