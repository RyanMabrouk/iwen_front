import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { InfinityPaginationResultType } from "@/types";

const eventsQuery = (): {
  queryKey: string[];
  queryFn: () => Promise<{
    data: InfinityPaginationResultType<any> | null;
    error: any | null;
  }>;
} => ({
  queryKey: ["events"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "events", action: "getEvents" });
    const { error, data } = await sendRequest<
      InfinityPaginationResultType<any>
    >({
      method: "GET",
      url: url(),
    });
    console.log("🚀 ~ queryFn: ~ data:", data);

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});

export { eventsQuery };
