import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

interface IBook extends Tables<"books"> {
  categories: Tables<"categories">[];
  writer: Tables<"writers">;
  is_in_wishlist: boolean;
}

export interface IEventPopulated extends Tables<"events"> {
  books: IBook[];
}
const eventQuery = (eventId: string) => ({
  queryKey: ["event", eventId],
  queryFn: async () => {
    const url = getEndpoint({ resource: "events", action: "getEventById" });
    const { error, data } = await sendRequest<IEventPopulated>({
      method: "GET",
      url: url(eventId),
    });

    if (error) return { data: null, error: error };
    else return { data, error: null };
  },
});

export { eventQuery };
