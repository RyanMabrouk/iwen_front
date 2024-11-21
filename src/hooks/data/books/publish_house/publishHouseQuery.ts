import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const publishHouseQuery = () => ({
  queryKey: ["publish_houses"],
  queryFn: async () => {
    const url = getEndpoint({
      resource: "publish_houses",
      action: "getPublishHouses",
    });
    return await sendRequest<Tables<"share_houses">[]>({
      method: "GET",
      url: url(),
    });
  },
});

export { publishHouseQuery };
