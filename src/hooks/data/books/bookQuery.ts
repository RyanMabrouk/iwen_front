import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { IBookPopulated } from "@/types";

const bookQuery = (bookId : string) => ({
  queryKey: ["books",bookId],
  queryFn: async () => {
    const url = await getEndpoint({  resourse: "books", action: "getBookId" });
    return await CRUDData<IBookPopulated>({ method: "GET", url: url(bookId) });
    
  },
  enabled : bookId!==null
});
export { bookQuery };
