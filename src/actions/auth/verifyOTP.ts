"use server";

import { createClient } from "@/lib/supabase";

export default async function verifyOTP(email: string, otp: string) {
  const supabase = createClient();
  console.log("verifyOTP");
  console.log("email", email);
  console.log("otp", otp);

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) throw new Error("(OTP) الرمز المميز غير صالح");

  if (session) {
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
    console.log("session", session);
  }

  return { session };
}
