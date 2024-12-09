"use server";

import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";

export default async function sendReview(data: {
  content: string;
  rating: number;
  book_id: string;
  user_id: string;
}) {
  "use server";
  const url = getEndpoint({ resource: "reviews", action: "createReview" });
  return await sendRequest({ url: url(), method: "POST", payload: data });
}
