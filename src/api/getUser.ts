"use server";
import { createClient } from "@/lib/supabase";
import type { AuthError, UserResponse } from "@supabase/supabase-js";

export default async function getUser(): Promise<{
  data: UserResponse["data"];
  error: string | null;
}> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return { data, error: error?.message || null };
}
