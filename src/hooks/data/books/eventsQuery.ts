import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { InfinityPaginationResultType } from "@/types";

const eventsQuery = () => ({
  queryKey: ["events"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "events", action: "getEvents" });
    const { error, data } = await sendRequest<
      InfinityPaginationResultType<any>
    >({
      method: "GET",
      url: url(),
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});

export { eventsQuery };
