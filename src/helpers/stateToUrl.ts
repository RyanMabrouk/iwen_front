import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useStateToUrl<T>(
  name: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialValue = (searchParams.get(name) as T) ?? defaultValue;
  console.log(
    "initial value ",
    initialValue,
    "typze of initial value ",
    typeof initialValue,
  );

  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (state !== defaultValue) {
      params.set(name, state as string);
    } else {
      params.delete(name);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [state, name, defaultValue, pathname, router, searchParams]);

  return [state, setState];
}
