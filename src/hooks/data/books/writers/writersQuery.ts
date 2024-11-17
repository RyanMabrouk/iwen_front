import sendRequest from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const writersQuery = () => ({
  queryKey: ["writers"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "writers", action: "getWriters" });
    return await sendRequest<Tables<"writers">[]>({
      method: "GET",
      url: url(),
    });
  },
});

export { writersQuery };
