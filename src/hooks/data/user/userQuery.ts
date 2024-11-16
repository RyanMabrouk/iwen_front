import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const userQuery = (userId : string) => ({
  queryKey: ["users",userId],
  queryFn: async () => {
    const url = await getEndpoint({  resourse: "users", action: "getUser" });
    return await CRUDData<Tables<"users">>({ method: "GET", url: url(userId) });
  },
});
export { userQuery };
