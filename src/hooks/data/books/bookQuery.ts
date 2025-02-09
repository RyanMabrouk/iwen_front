import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { IBookPopulated } from "@/types";

const bookQuery = (bookSlug: string) => ({
  queryKey: ["books", bookSlug],
  queryFn: async () => {
    const url = getEndpoint({ resource: "books", action: "getBookSlug" });
    return await sendRequest<IBookPopulated>({
      method: "GET",
      url: url(bookSlug),
    });
  },
  enabled: bookSlug !== null,
});
export { bookQuery };
