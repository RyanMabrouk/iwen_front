import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";
const coverTypesQuery = () => ({
  queryKey: ["cover_types"],
  queryFn: async () => {
    const url = getEndpoint({
      resource: "cover_types",
      action: "getCoverTypes",
    });
    return await sendRequest<Tables<"cover_types">[]>({
      method: "GET",
      url: url(),
    });
  },
});
export { coverTypesQuery };
