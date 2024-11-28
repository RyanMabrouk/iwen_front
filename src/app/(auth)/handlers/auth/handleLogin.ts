import { z } from "zod";
import login from "@/actions/auth/login";

const loginSchema = z.object({
  email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
  password: z.string(),
});

type LoginInput = z.infer<typeof loginSchema>;

export default async function handleLogIn({ email, password }: LoginInput) {
  const validatedInput = loginSchema.parse({ email, password });
  const { error } = await login({
    email: validatedInput.email,
    password: validatedInput.password,
  });
  if (error !== null) {
    throw new Error(error.message);
  }
}
