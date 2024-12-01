import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { IBookPopulated } from "@/types";
import { Tables } from "@/types/database.types";

const shareHousesQuery = () => ({
  queryKey: ["shareHouses"],
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
export { shareHousesQuery };
