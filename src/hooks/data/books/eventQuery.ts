import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";

const eventQuery = (eventId: string) => ({
  queryKey: ["event", eventId],
  queryFn: async () => {
    const url = getEndpoint({ resource: "events", action: "getEventById" });
    const { error, data } = await sendRequest<{
      data: any;
      error: string | null;
    }>({
      method: "GET",
      url: url(eventId),
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});

export { eventQuery };
