"use server";
import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { IUserPayload } from "@/types";

export default async function getUser(): Promise<{
  data: {
    user: IUserPayload | null;
  };
  error: string | null;
}> {
  const url = getEndpoint({
    resource: "users",
    action: "getMe",
  });
  const { data: user, error } = await sendRequest<IUserPayload>({
    method: "GET",
    url: url(),
  });
  return {
    error,
    data: { user },
  };
}
