"use client";
import { IBookPopulated } from "@/types";
import getFromLocalstorage from "@/helpers/localstorage/getFromLocalstorage";
import { getBooks } from "../data/books/booksQuery";

const cartQuery = () => ({
  queryKey: ["cart"],
  queryFn: async (): Promise<
    (IBookPopulated & {
      quantity: number;
    })[]
  > => {
    const cart = getFromLocalstorage<
      {
        id: string;
        quantity: number;
      }[]
    >("cart");
    if (!cart) return [];
    const { data: books } = await getBooks({
      limit: cart.length,
      filters: {
        "books.id": [
          {
            operator: "in",
            value: cart.map((item) => item.id),
          },
        ],
      },
    });
    return (
      books?.data.map((books) => ({
        ...books,
        quantity: cart.find((item) => item.id === books.id)?.quantity ?? 0,
      })) ?? []
    );
  },
});
export { cartQuery };
