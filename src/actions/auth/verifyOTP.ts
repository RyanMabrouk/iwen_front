"use server";

import { createClient } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";

export default async function verifyOTP(
  email: string,
  otp: string,
): Promise<{
  error: AuthError | null;
}> {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) return { error };

  if (session) {
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  return { error: null };
}
