import { useQuery } from "@tanstack/react-query";
import { ReviewsQuery } from "./ReviewsQuery";

export default function useReviews() {
  const query = useQuery(ReviewsQuery());
  return query;
}
