import createNewPathname from "@/helpers/createNewPathname";
import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import {
  IBookPopulated,
  InfinityPaginationQueryType,
  InfinityPaginationResultType,
} from "@/types";
import { Tables } from "@/types/database.types";

export interface QueryBooksArgs
  extends InfinityPaginationQueryType<`books.${keyof Tables<"books">}`> {
  extra_filters?: {
    most_sold?: "asc" | "desc";
    subcategories_ids?: string[];
    categories_ids?: string[];
  };
}

const booksQuery = (args: QueryBooksArgs) => ({
  queryKey: ["books", args],
  queryFn: async () => {
    const { data, error } = await getBooks(args);
    console.log("🚀 ~ queryFn: ~ args:", args);
    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});
export { booksQuery, getBooks };

async function getBooks(args: QueryBooksArgs) {
  const url = getEndpoint({ resource: "books", action: "getBooks" });
  const searchParams = Object.keys(args).map((key) => ({
    name: key,
    value: JSON.stringify(args[key as keyof typeof args]),
  }));
  const newUrl = createNewPathname({
    currentPathname: url(),
    values: searchParams,
  });
  return await sendRequest<InfinityPaginationResultType<IBookPopulated>>({
    method: "GET",
    url: newUrl,
  });
}
