import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { IUserPayload } from "@/types";

const userQuery = (userId: string) => ({
  queryKey: ["users", userId],
  queryFn: async () => {
    const url = getEndpoint({ resource: "users", action: "getUser" });
    return await sendRequest<IUserPayload>({
      method: "GET",
      url: url(userId),
    });
  },
});
export { userQuery };
