"use client";
import { ICartBook } from "@/types";
import getFromLocalstorage from "@/helpers/localstorage/getFromLocalstorage";

const cartQuery = () => ({
  queryKey: ["cart"],
  queryFn: async () => {
    const cart = getFromLocalstorage<ICartBook[]>("cart");
    return cart;
  },
});
export { cartQuery };
