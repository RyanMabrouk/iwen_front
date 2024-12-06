"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import createCompletePathName from "./createCompletePathName";

export function useStateToUrl(name: string, defaultValue: string) {
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
