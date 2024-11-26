"use server";
import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";
import { AuthResponse } from "@supabase/supabase-js";

export default async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  data: AuthResponse["data"] | null;
  error: { message: string; type: string } | null;
}> {
  const headersList = headers();
  const header_url = headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto") || "http";

  const supabase = createClient();
  const { data, error: signUpErr } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${proto}://${header_url}/auth/callback`,
    },
  });
  if (signUpErr) {
    console.log("🚀 ~ signUpErr:", signUpErr)
    return {
      data: null,
      error: {
        message: "حدث خطأ أثناء انشاء الحساب",
        type: "SignUp Error",
      },
    };
  }
  if (data?.user?.identities?.length === 0) {
    return {
      data: null,
      error: {
        message: "هذا الحساب موجود بالفعل",
        type: "SignUp Error",
      },
    };
  }
  return { data, error: null };
}
