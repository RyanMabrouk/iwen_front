import { z } from "zod";
import signInWithOPT from "./signInWithOTP";

const forgetPasswordSchema = z.object({
  email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
});

type ForgetPasswordInput = z.infer<typeof forgetPasswordSchema>;

export default async function handleForgetPassword(email: string) {
  const validatedInput: ForgetPasswordInput = forgetPasswordSchema.parse({
    email,
  });

  console.log("handleForgetPassword");

  await signInWithOPT(validatedInput.email);
  return { success: true, message: "OTP sent successfully" };
}
