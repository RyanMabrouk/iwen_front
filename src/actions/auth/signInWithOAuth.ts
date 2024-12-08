"use server";
import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";

export default async function signInWithOAuth({
  provider,
}: {
  provider: "google" | "facebook";
}) {
  const supabase = createClient();

  const headersList = headers();
  const headerUrl = headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto") || "http";

  const redirectTo = `${proto}://${headerUrl}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    return {
      data: null,
      error: {
        message: "حدث خطأ في أثناء تسجيل الدخول",
        type: `${provider} provider Error`,
      },
    };
  }

  return { data, error: null };
}
