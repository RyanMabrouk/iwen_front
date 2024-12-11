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
  if (data.content === "" || data.rating === 0) {
    throw new Error("لا يمكن إرسال المراجعة فارغة أو بتقييم صفر");
  }
  const result = await sendRequest({
    url: url(),
    method: "POST",
    payload: data,
  });
  console.log(result);
  return result;
}
