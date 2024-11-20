import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const subCategoriesQuery = () => ({
  queryKey: ["subcategories"],
  queryFn: async () => {
    const url = getEndpoint({
      resource: "subcategories",
      action: "getSubCategories",
    });
    return await sendRequest<Tables<"subcategories">[]>({
      method: "GET",
      url: url(),
    });
  },
});

export { subCategoriesQuery };
