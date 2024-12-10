"use server";

import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";

export default async function deleteReview(id: string) {
  const url = getEndpoint({ resource: "reviews", action: "deleteReview" });
  console.log("id to be sent :", url(id));
  const result = await sendRequest({ url: url(id), method: "GET" });
  console.log("result :", result);
  return result;
}
