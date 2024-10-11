"use server";

import { createClient } from "@/lib/supabase";

const supabase = createClient();

export default async function signInWithOPT(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  if (error) return { error: "حدث خطأ أثناء تسجيل الدخول" };
  return { error: null };
}
