"use server";

import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";

export default async function editReview(
  id: string,
  data: {
    content: string;
    rating: number;
  },
) {
  "use server";
  const url = getEndpoint({ resource: "reviews", action: "editReview" });

  const result = await sendRequest<{ book_id: string }>({
    url: url(id),
    method: "PATCH",
    payload: data,
  });
  return result;
}
