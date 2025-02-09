"use server";
import axios from "axios";
import { IError } from "@/types";
import { createClient } from "@/lib/supabase";
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
  console.log("🚀 ~ payload:", payload);

  const options = {
    method: method,
    url: url,
    data: payload || {},
  };
  try {
    const supabase = createClient();
    const user = await supabase.auth.getSession();
    const token = user.data.session?.access_token;
    let headers: Record<string, string> = {
      accept: "application/json",
      "content-type": "application/json",
    };
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
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
    if (axios.isAxiosError(error)) {
      const backendError: IError<IPayload> = error.response?.data;
      console.log("🚀 ~ backendError:", backendError);
      if (backendError?.errors) {
        return {
          data: null,
          error: error.message,
          validationErrors: backendError.errors,
        };
      } else {
        return {
          data: null,
          error: backendError.message,
          validationErrors: null,
        };
      }
    } else {
      return { data: null, error: error.message, validationErrors: null };
    }
  }
}
