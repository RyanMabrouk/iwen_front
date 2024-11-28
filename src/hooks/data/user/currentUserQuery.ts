import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { IUserPayload } from "@/types";
const currentUserQuery = () => ({
  queryKey: ["users", "me"],
  queryFn: async () => {
    const url = getEndpoint({
      resource: "users",
      action: "getMe",
    });
    return await sendRequest<IUserPayload>({ method: "GET", url: url() });
  },
});

export { currentUserQuery };
