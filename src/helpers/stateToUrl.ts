import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useStateToUrl<T>(
  name: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialValue = (searchParams.get(name) ?? defaultValue) as T;

  const [state, setState] = useState<T>(initialValue);

  const changeState = (value: T) => {
    setState(value);
    const params = new URLSearchParams(searchParams);
    if (value !== defaultValue) {
      params.set(name, value as string);
    } else {
      params.delete(name);
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  return [state, changeState] as [T, (value: T) => void];
}
