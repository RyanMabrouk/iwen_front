import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const subCategoriesQuery = () => ({
  queryKey: ["subcategories"],
  queryFn: async () => {
    const url = getEndpoint({  resourse: "subcategories", action: "getsubCategories" });
    return await CRUDData<(Tables<"subcategories">)[]>({ method: "GET", url: url() });
  },
});

export { subCategoriesQuery };
