"use server";
import { createClient } from "@/lib/supabase";
export default async function updatePassword({
  newPassword,
}: {
  newPassword: string;
}): Promise<{
  error: {
    message: string;
  } | null;
}> {
  const supabase = createClient();
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (updateError) {
    return {
      error: {
        message: `${updateError.message}`,
      },
    };
  }
  return { error: null };
}
