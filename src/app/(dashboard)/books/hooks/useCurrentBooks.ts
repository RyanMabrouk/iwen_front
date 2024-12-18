import { useQueryClient } from "@tanstack/react-query";
import useBooks from "@/hooks/data/books/useBooks";
import { useBooksProvider } from "../provider/BooksProvider";
import { useEffect } from "react";
import { booksQuery, QueryBooksArgs } from "@/hooks/data/books/booksQuery";

export default function useCurrentBooks() {
  const maxValue = 2100;
  const {
    view,
    numberOfBooks,
    page: pageNumber,
    priceRange,
    shareHouse,
    categories,
    subcategories,
    writer,
    sortings,
    search,
    asc,
  } = useBooksProvider();
  const extra_filters = {
    ...(Array.isArray(categories.split("%")) &&
      categories.split("%").length > 0 && {
        categories_ids: categories.split("%"),
      }),
    ...(Array.isArray(subcategories.split("%")) &&
      subcategories.split("%").length > 0 && {
        subcategories_ids: subcategories.split("%"),
      }),
    ...(view === "mostSold" && { most_sold: "desc" as const }),
  };
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 7);
  const formattedDate = currentDate.toISOString().split("T")[0];
  const minPrice =
    priceRange !== undefined && priceRange !== ""
      ? priceRange?.split("%")[0]
      : null;
  const maxPrice =
    priceRange !== undefined && priceRange !== ""
      ? priceRange?.split("%")[1]
      : null;
  const limit = numberOfBooks !== "1" ? parseInt(numberOfBooks) * 3 : 12;
  const page = parseInt(pageNumber);

  const args: QueryBooksArgs = {
    limit,
    page,
    ...(Object.keys(extra_filters).length > 0 && { extra_filters }),
    filters: {
      ...(search !== undefined &&
        search !== "" && {
          "books.title": [
            {
              operator: "like",
              value: "%" + search + "%",
            },
          ],
        }),
      ...(view === "newest"
        ? {
            "books.created_at": [{ operator: ">=", value: formattedDate }],
          }
        : view === "discount"
          ? { "books.discount": [{ operator: ">", value: "0" }] }
          : {}),
      ...(writer !== undefined &&
        writer !== "" && {
          "books.writer_id": [{ operator: "=", value: writer.split("%")[0] }],
        }),
      ...(shareHouse !== undefined &&
        shareHouse !== "" && {
          "books.share_house_id": [{ operator: "=", value: shareHouse }],
        }),
      ...(priceRange !== undefined &&
      priceRange !== "" &&
      maxPrice !== null &&
      parseInt(maxPrice) < maxValue &&
      minPrice !== null &&
      parseInt(minPrice) > 0
        ? {
            "books.price": [
              { operator: ">=", value: minPrice },
              { operator: "<=", value: maxPrice },
            ],
          }
        : maxPrice !== null && parseInt(maxPrice) < maxValue
          ? {
              "books.price": [{ operator: "<=", value: maxPrice }],
            }
          : minPrice !== null && parseInt(minPrice) > 0
            ? {
                "books.price": [{ operator: ">=", value: minPrice }],
              }
            : {}),
    },
    ...(sortings !== undefined &&
      sortings !== "" &&
      sortings !== "none" && {
        sort:
          sortings === "alphabetical"
            ? { order: asc === "1" ? "asc" : "desc", orderBy: "books.title" }
            : sortings === "discount"
              ? {
                  order: asc === "1" ? "asc" : "desc",
                  orderBy: "books.discount",
                }
              : sortings === "price"
                ? {
                    order: asc === "1" ? "asc" : "desc",
                    orderBy: "books.price",
                  }
                : {
                    order: asc === "1" ? "asc" : "desc",
                    orderBy: "books.created_at",
                  },
      }),
  };
  const queryClient = useQueryClient();
  const books = useBooks(args);
  useEffect(() => {
    if (books.data?.data?.meta.has_next_page) {
      const nextArgs = { ...args, page: Number(pageNumber) + 1 };
      queryClient.prefetchQuery(booksQuery(nextArgs));
    }
    if (books.data?.data?.meta.has_previous_page) {
      const prevArgs = { ...args, page: Number(pageNumber) - 1 };
      queryClient.prefetchQuery(booksQuery(prevArgs));
    }
  }, [
    books.data?.data?.meta.page,
    books.data?.data?.meta.total_pages,
    books.data?.data?.meta.has_next_page,
  ]);
  return books;
}
