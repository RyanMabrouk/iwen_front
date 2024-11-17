"use server";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
export default async function updatePassword({
  newPassword,
}: {
  newPassword: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) {
    return {
      error: {
        message: "حدث خطأ في أثناء تغيير كلمة المرور",
        type: "Server Error",
      },
    };
  } else {
    redirect("/home");
  }
}
