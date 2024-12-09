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
  return await sendRequest({ url: url(id), method: "POST", payload: data });
}
