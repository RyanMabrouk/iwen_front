import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";
const coverTypesQuery = () => ({
  queryKey: ["cover_types"],
  queryFn: async () => {
    const url = getEndpoint({  resourse: "cover_types", action: "getcover_types" });
    return await CRUDData<(Tables<"cover_types">)[]>({method: "GET", url: url()});
  },
});
export { coverTypesQuery };
