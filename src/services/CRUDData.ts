'use server';
import axios, { Axios } from 'axios';
import { cookies } from 'next/headers';
import { IError } from '@/types';
export type CRUDMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export default async function CRUDData<
  T,
  IPayload extends object = Record<string, string>
>({
  url,
  method,
  payload
}: {
  url: string;
  method: CRUDMethod;
  payload?: Record<string, any>;
}): Promise<{
  data: T | null;
  error: string | null;
  valdiationErrors: IError<IPayload>['errors'] | null;
}> {
  const options = {
    method: method,
    url: url,
    data: payload || {}
  };
  try {
    const token = cookies()
      .get('sb-mqisujmkeqaqwppsnnww-auth-token')
      ?.value.replace('base64-', '')
      .replace(' ', '');
    const decodedToken = JSON.parse(atob(token ?? '')) as unknown as {
      access_token: string;
    };
    const api = axios.create({
      baseURL: process.env.BACKEND_URL!,
      timeout: 0,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${decodedToken.access_token}`
      }
    });
    const response = await api.request(options);
    return { data: response.data, error: null, valdiationErrors: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const backendError: IError<IPayload> = error.response?.data;
      if (backendError.errors) {
        return {
          data: null,
          error: error.message,
          valdiationErrors: backendError.errors
        };
      } else {
        return { data: null, error: error.message, valdiationErrors: null };
      }
    } else {
      return { data: null, error: error.message, valdiationErrors: null };
    }
  }
}
