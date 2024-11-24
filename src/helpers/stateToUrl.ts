import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function stateToUrl<T extends number | string | boolean>(
  name: string,
  defaultState: T
): [state: T, setState: React.Dispatch<React.SetStateAction<T>>] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [state, setState] = useState<T>(() => {
    const value = searchParams.get(name);
    if (value === null) return defaultState;
    if (typeof defaultState === "number") return parseInt(value) as T;
    if (typeof defaultState === "boolean") return (value === "1") as T;
    return value as T;
  });

  const updateURL = useCallback((newState: T) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (typeof newState === "string") newParams.set(name, newState);
    if (typeof newState === "number") newParams.set(name, newState.toString());
    if (typeof newState === "boolean") newParams.set(name, newState ? "1" : "0");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [name, pathname, router, searchParams]);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    if (!isInitialRender) {
      updateURL(state);
    }
  }, [state, isInitialRender, updateURL]);

  const setStateAndUpdateURL: React.Dispatch<React.SetStateAction<T>> = useCallback((newState) => {
    setState((prevState) => {
      const updatedState = typeof newState === 'function' ? (newState as Function)(prevState) : newState;
      if (!isInitialRender) {
        updateURL(updatedState);
      }
      return updatedState;
    });
  }, [isInitialRender, updateURL]);

  return [state, setStateAndUpdateURL];
}

