import sendRequest from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const userQuery = (userId: string) => ({
  queryKey: ["users", userId],
  queryFn: async () => {
    const url = getEndpoint({ resource: "users", action: "getUser" });
    return await sendRequest<Tables<"users">>({
      method: "GET",
      url: url(userId),
    });
  },
});
export { userQuery };
