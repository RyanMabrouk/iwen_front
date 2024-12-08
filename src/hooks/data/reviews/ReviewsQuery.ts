import sendRequest from "@/services/sendRequest";
import getEndpoint from "@/services/getEndpoint";
import { Tables } from "@/types/database.types";

interface ReviewsType {
  id: string;
  rating: number;
  content: string;
  book_id: string;
  user_id: string;
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
