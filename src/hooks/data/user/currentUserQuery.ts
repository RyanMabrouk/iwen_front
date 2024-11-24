import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";
import { IUserPayload } from "@/types";
const currentUserQuery = () => ({
  queryKey: ["users", "me"],
  queryFn: async () => {
    const url =  getEndpoint({
      resource: "users",
      action: "getCurrentUser",
    });
    return await sendRequest<IUserPayload>({ method: "GET", url: url() });
  },
});

export { currentUserQuery };
