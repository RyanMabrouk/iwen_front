import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

export interface ReviewsType extends Tables<"reviews"> {
  user: Tables<"users">;
}

const ReviewsQuery = () => ({
  queryKey: ["reviews"],
  queryFn: async () => {
    const url = getEndpoint({ resource: "reviews", action: "getAllReviews" });
    return await sendRequest<ReviewsType[]>({
      method: "GET",
      url: url(),
    });
  },
});
export { ReviewsQuery };
