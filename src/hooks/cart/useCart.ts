"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cartQuery } from "./cartQuery";
import getFromLocalstorage from "@/helpers/localstorage/getFromLocalstorage";
import { saveToLocalstorage } from "@/helpers/localstorage/saveToLocalstorage";
import { ICartBook } from "@/types";
import { Tables } from "@/types/database.types";

export default function useCart() {
  const query = useQuery(cartQuery());
  const total = query.data?.reduce((acc, book) => {
    return acc + book.price_after_discount;
  }, 0);
  const queryClient = useQueryClient();
  return {
    ...query,
    cart: query.data,
    total,

    addToCart: (book: Tables<"books">) => {
      addToCart(book);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    removeFromCart: (book_id: string) => {
      removeFromCart(book_id);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  };
}
function addToCart(book: Tables<"books">) {
  const cart = getFromLocalstorage<ICartBook[]>("cart") ?? [];
  const bookInCart = cart.find((item) => item.id === book.id);
  if (bookInCart) {
    bookInCart.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }
  saveToLocalstorage("cart", cart);
}
function removeFromCart(book_id: string) {
  const cart = getFromLocalstorage<ICartBook[]>("cart") ?? [];
  const bookInCart = cart.find((item) => item.id === book_id);
  if (bookInCart) {
    if (bookInCart.quantity > 1) {
      bookInCart.quantity -= 1;
    } else {
      const newCart = cart.filter((item) => item.id !== book_id);
      saveToLocalstorage("cart", newCart);
    }
  }
}
