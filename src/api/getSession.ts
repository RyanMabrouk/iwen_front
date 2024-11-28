"use server";
import { createClient } from "@/lib/supabase";

export default async function getSession(): Promise<{
  session: { user: any } | null;
  error: any;
}> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return {
    session: user
      ? {
          user,
        }
      : null,
    error,
  };
}
