import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const categoriesQuery = () => ({
  queryKey: ["categories"],
  queryFn: async () => {
    const url = getEndpoint({ resourse: "categories", action: "getCategories" });
    return await CRUDData<(Tables<"categories">)[]>({ method: "GET", url: url() });
  },
});

export { categoriesQuery };
