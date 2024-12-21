"use server";

import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";

export default async function deleteReview(id: string) {
  const url = getEndpoint({ resource: "reviews", action: "deleteReview" });
  const result = await sendRequest({ url: url(id), method: "DELETE" });
  return result;
}
