"use client";

import React, { createContext, useEffect, useState } from "react";

type CounterContextType = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [cooldown, setCooldown] = useState(60);
  useEffect(() => {
    const storedCooldownEnd = localStorage.getItem("otpCooldownEnd");
    const currentTime = Date.now();

    if (storedCooldownEnd) {
      const remainingTime = Math.max(
        0,
        Math.floor((parseInt(storedCooldownEnd) - currentTime) / 1000),
      );
      setCooldown(remainingTime);
    } else {
      const initialCooldown = 60;
      setCooldown(initialCooldown);
      localStorage.setItem(
        "otpCooldownEnd",
        (currentTime + initialCooldown * 1000).toString(),
      );
    }
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prevCooldown) => {
        if (prevCooldown > 0) {
          const newCooldown = prevCooldown - 1;
          localStorage.setItem(
            "otpCooldownEnd",
            (Date.now() + newCooldown * 1000).toString(),
          );
          return newCooldown;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <CounterContext.Provider
      value={{ counter: cooldown, setCounter: setCooldown }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = React.useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a PageProvider");
  }
  return {
    counter: context.counter!!,
    setCounter: context.setCounter!!,
  };
}
