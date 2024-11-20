import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";
const currentUserQuery = () => ({
  queryKey: ["users", "me"],
  queryFn: async () => {
    const url = await getEndpoint({
      resource: "users",
      action: "getCurrentUser",
    });
    return await sendRequest<Tables<"users">>({ method: "GET", url: url() });
  },
});

export { currentUserQuery };
