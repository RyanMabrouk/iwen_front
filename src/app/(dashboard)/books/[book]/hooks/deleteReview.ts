"use server";

import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";

export default async function deleteReview(id: string) {
  const url = getEndpoint({ resource: "reviews", action: "deleteReview" });
  console.log(url(id));
  return await sendRequest({ url: url(id), method: "GET" });
}
