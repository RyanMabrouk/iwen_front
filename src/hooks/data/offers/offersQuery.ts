import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

const offersQuery = (): {
  queryKey: string[];
  queryFn: () => Promise<{
    data: Tables<"offers">[] | null;
    error: any | null;
  }>;
} => ({
  queryKey: ["offers"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "offers", action: "getOffers" });
    const { error, data } = await sendRequest<Tables<"offers">[]>({
      method: "GET",
      url: url(),
    });
    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});

export { offersQuery };
