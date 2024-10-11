import { z } from "zod";
import { signInWithOPT } from "@/actions/auth/signInWithOTP";

// Define the Zod schema for forget password validation
const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Type inference from the Zod schema
type ForgetPasswordInput = z.infer<typeof forgetPasswordSchema>;

export default async function handleForgetPassword(email: string) {
  // Validate the input using the Zod schema
  const validatedInput: ForgetPasswordInput = forgetPasswordSchema.parse({
    email,
  });

  console.log("handleForgetPassword");

  await signInWithOPT(validatedInput.email);
  console.log("OTP sent");
  return { success: true, message: "OTP sent successfully" };
}
