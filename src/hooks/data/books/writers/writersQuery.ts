import CRUDData from "@/services/CRUDData";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const writersQuery = () => ({
  queryKey: ["writers"],
  queryFn: async () => {
    const url = getEndpoint({  resourse: "writers", action: "getwriters" });
    return await CRUDData<(Tables<"writers">)[]>({ method: "GET", url: url() });
  },
});

export { writersQuery };
