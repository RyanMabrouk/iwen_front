import signInWithOPT from "@/actions/auth/signInWithOTP";
import { z } from "zod";

const forgetPasswordSchema = z.object({
  email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
});

type ForgetPasswordInput = z.infer<typeof forgetPasswordSchema>;

export default async function handleForgetPassword(email: string) {
  const validatedInput: ForgetPasswordInput = forgetPasswordSchema.parse({
    email,
  });

  const { error } = await signInWithOPT(validatedInput.email);
  if (error) throw new Error(error);
  return { success: true, message: "" };
}
