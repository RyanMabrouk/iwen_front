import sendRequest from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const categoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: async () => {
    const url = getEndpoint({
      resource: "categories",
      action: "getCategories",
    });
    return await sendRequest<Tables<"categories">[]>({
      method: "GET",
      url: url(),
    });
  },
});

export { categoriesQuery };
