"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { IError } from "@/types";
export type CRUDMethod = "GET" | "POST" | "PATCH" | "DELETE";
export default async function sendRequest<
  T,
  IPayload extends object = Record<string, string>,
>({
  url,
  method,
  payload,
}: {
  url: string;
  method: CRUDMethod;
  payload?: Record<string, any>;
}): Promise<{
  data: T | null;
  error: string | null;
  validationErrors: IError<IPayload>["errors"] | null;
}> {
  const options = {
    method: method,
    url: url,
    data: payload || {},
  };
  try {
    const token = cookies()
      .get("sb-mqisujmkeqaqwppsnnww-auth-token")
      ?.value.replace("base64-", "")
      .replace(" ", "");
    let headers: Record<string, string> = {
      accept: "application/json",
      "content-type": "application/json",
    };
    if (token) {
      const decodedToken = JSON.parse(atob(token ?? "")) as unknown as {
        access_token: string;
      };
      headers = {
        ...headers,
        Authorization: `Bearer ${decodedToken.access_token}`,
      };
    }

    const api = axios.create({
      baseURL: process.env.BACKEND_URL!,
      timeout: 0,
      headers,
    });
    const response = await api.request(options);
    return { data: response.data, error: null, validationErrors: null };
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    if (axios.isAxiosError(error)) {
      const backendError: IError<IPayload> = error.response?.data;
      if (backendError.errors) {
        return {
          data: null,
          error: error.message,
          validationErrors: backendError.errors,
        };
      } else {
        return { data: null, error: error.message, validationErrors: null };
      }
    } else {
      return { data: null, error: error.message, validationErrors: null };
    }
  }
}
