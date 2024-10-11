import { z } from "zod";
import login from "@/actions/auth/login";

const loginSchema = z.object({
  email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
  password: z.string().min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default async function handleLogIn({ email, password }: LoginInput) {
  const validatedInput = loginSchema.parse({ email, password });
  console.log("Login attempt with:", validatedInput);
  const { error } = await login({
    email: validatedInput.email,
    password: validatedInput.password,
  });
  if (error !== null) throw new Error(`${error.type}: ${error.message}`);
}
