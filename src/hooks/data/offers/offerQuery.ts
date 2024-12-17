import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

export interface IOfferPopulated extends Tables<"offers"> {
  books: Tables<"books">[];
}

const offerQuery = (id: string) => ({
  queryKey: ["offers", id],
  queryFn: async () => {
    const url = getEndpoint({ resource: "offers", action: "getOffer" });
    return await sendRequest<IOfferPopulated>({
      method: "GET",
      url: url(id),
    });
  },
  enabled: id !== null,
});
export { offerQuery };
