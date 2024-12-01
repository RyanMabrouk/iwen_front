import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { IEvent } from "@/types";

const eventQuery = (eventId : string) => ({
  queryKey: ["events",eventId],
  queryFn: async () => {
    const url =  getEndpoint({  resourse: "events", action: "getEvent" });
    return await sendRequest<IEvent>({ method: "GET", url: url(eventId) });
  },
  enabled : eventId!==null
});
export { eventQuery };
