"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cartQuery } from "./cartQuery";
import getFromLocalstorage from "@/helpers/localstorage/getFromLocalstorage";
import { saveToLocalstorage } from "@/helpers/localstorage/saveToLocalstorage";
import { ICartBook } from "@/types";
import { Tables } from "@/types/database.types";

export default function useCart() {
  const query = useQuery(cartQuery());
  const total_after_discount = query.data?.reduce((acc, book) => {
    return acc + book.price_after_discount;
  }, 0);
  const total_before_discount = query.data?.reduce((acc, book) => {
    return acc + book.price;
  }, 0);
  const queryClient = useQueryClient();
  return {
    ...query,
    cart: query.data,
    total: total_after_discount,
    total_before_discount,
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
    clearCart: () => {
      clearCart();
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
  const updatedCart = cart.reduce<ICartBook[]>((acc, item) => {
    if (item.id === book_id) {
      if (item.quantity > 1) {
        acc.push({ ...item, quantity: item.quantity - 1 });
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
  saveToLocalstorage("cart", updatedCart);
}
function clearCart() {
  saveToLocalstorage("cart", []);
}
