import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { IBookPopulated } from "@/types";

const bookQuery = (bookId: string) => ({
  queryKey: ["books", bookId],
  queryFn: async () => {
    const url = getEndpoint({ resource: "books", action: "getBookId" });
    return await sendRequest<IBookPopulated>({
      method: "GET",
      url: url(bookId),
    });
  },
  enabled: bookId !== null,
});
export { bookQuery };
