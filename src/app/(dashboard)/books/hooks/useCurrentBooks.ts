import useBooks from "@/hooks/data/books/useBooks";
import { useBooksProvider } from "../provider/BooksProvider";

export default function useCurrentBooks() {
  const {
    view,
    numberOfBooks,
    page,
    priceRange,
    shareHouse,
    categories,
    subcategories,
    writer,
    sortings,
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
  return useBooks({
    limit: parseInt(numberOfBooks) * 3,
    page: parseInt(page),
    ...(Object.keys(extra_filters).length > 0 && { extra_filters }),
    filters: {
      ...(view === "newest"
        ? { "books.created_at": [{ operator: ">=", value: formattedDate }] }
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
        priceRange !== "" && {
          "books.price": [
            { operator: ">", value: priceRange.split("%")[0] },
            { operator: "<", value: priceRange.split("%")[1] },
          ],
        }),
    },
    ...(sortings !== undefined &&
      sortings !== "" && {
        sort:
          sortings === "alphabetical"
            ? { order: "asc", orderBy: "books.title" }
            : sortings === "discount"
              ? { order: "desc", orderBy: "books.discount" }
              : sortings === "price-asc"
                ? { order: "asc", orderBy: "books.price" }
                : sortings === "price-desc"
                  ? { order: "desc", orderBy: "books.price" }
                  : sortings === "date"
                    ? { order: "desc", orderBy: "books.created_at" }
                    : undefined,
      }),
  });
}
