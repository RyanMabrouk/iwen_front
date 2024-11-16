import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const publishHouseQuery = () => ({
  queryKey: ["publish_houses"],
  queryFn: async () => {
    const url = getEndpoint({ resourse: "publish_houses", action: "getPublishHouses" });
    return await CRUDData<(Tables<"share_houses">)[]>({ method: "GET", url: url() });
  },
});

export { publishHouseQuery };
