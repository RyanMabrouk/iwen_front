import sendRequest from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";
const cornersQuery = () => ({
  queryKey: ["corners"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "corners", action: "getCorners" });
    return await sendRequest<Tables<"corners">[]>({
      method: "GET",
      url: url(),
    });
  },
});
export { cornersQuery };
