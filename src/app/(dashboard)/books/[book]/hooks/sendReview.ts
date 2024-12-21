"use server";

import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { IValidationErrors } from "@/types";

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
  const result = await sendRequest<{ book_id: string }>({
    url: url(),
    method: "POST",
    payload: data,
  });
  console.log(result);
  if (result.error) {
    if (result.error.includes("403")) {
      throw new Error("لا يمكنك إرسال مراجعة لكتاب مرتين");
    }
    throw new Error("حدث خطأ أثناء إرسال المراجعة");
  }

  return result;
}
