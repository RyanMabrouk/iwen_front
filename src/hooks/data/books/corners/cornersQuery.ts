import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";
const cornersQuery = () => ({
  queryKey: ["corners"],
  queryFn: async () => {
    const url = getEndpoint({  resourse: "corners", action: "getcorners" });
    return await CRUDData<(Tables<"corners">)[]>({method: "GET", url: url()});
  },
});
export { cornersQuery };
