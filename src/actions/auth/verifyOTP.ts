"use server";

import { createClient } from "@/lib/supabase";

import { AuthResponse } from "@supabase/auth-js";

export default async function verifyOTP(
  email: string,
  otp: string,
): Promise<AuthResponse> {
  const supabase = createClient();
  console.log(email, otp);

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) throw new Error("(OTP) الرمز السري غير صالح");

  if (session) {
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  return { data: { user: session?.user ?? null, session }, error: null };
}
