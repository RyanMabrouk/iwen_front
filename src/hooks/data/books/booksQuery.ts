import createNewPathname from "@/helpers/createNewPathname";
import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import {
  IBookPopulated,
  InfinityPaginationQueryType,
  InfinityPaginationResultType,
} from "@/types";

interface QueryBooksArgs extends InfinityPaginationQueryType<"books"> {
  most_sold?: "asc" | "desc";
  subcategories_ids?: string[];
  categories_ids?: string[];
}

const booksQuery = (args: QueryBooksArgs) => ({
  queryKey: ["books", args],
  queryFn: async () => {
    const url = getEndpoint({ resource: "books", action: "getBooks" });
    const searchParams = Object.entries(args).map(([key, value]) => {
      let stringValue: string;
      if (typeof value === "number") {
        stringValue = value.toString();
      } else if (typeof value === "string") {
        stringValue = value;
      } else if (value === null) {
        stringValue = "null";
      } else {
        stringValue = JSON.stringify(value);
      }
      return { name: key, value: stringValue };
    });

    const newUrl = createNewPathname({
      currentPathname: url(),
      values: searchParams,
    });

    const { error, data } = await sendRequest<
      InfinityPaginationResultType<IBookPopulated>
    >({
      method: "GET",
      url: newUrl,
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});
export { booksQuery };
