import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { InfinityPaginationResultType } from "@/types";
import { Tables } from "@/types/database.types";

const eventsQuery = (): {
  queryKey: string[];
  queryFn: () => Promise<{
    data: Tables<"events">[] | null;
    error: any | null;
  }>;
} => ({
  queryKey: ["events"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "events", action: "getEvents" });
    const { error, data } = await sendRequest<Tables<"events">[]>({
      method: "GET",
      url: url(),
    });
    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});

export { eventsQuery };
