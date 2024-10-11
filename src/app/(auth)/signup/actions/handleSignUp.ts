import signUp from "@/actions/auth/signup";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  name: z.string().min(2, "First name must be at least 2 characters long"),
});

export default async function handleSignUp(formData: FormData) {
  const { email, password, name } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };
  console.log("Sign up attempt with:", { email, password, name });
  const validatedInput = signUpSchema.parse({ email, password, name });

  const { error, data } = await signUp(validatedInput);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
}
