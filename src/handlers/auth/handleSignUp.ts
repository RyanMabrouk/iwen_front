import signUp from "@/actions/auth/signup";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
  password: z.string().min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"),
  // .regex(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/,
  //   "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد، ورقم واحد، وحرف خاص واحد",
  // )
  name: z.string().min(2, "يجب أن يتكون الاسم الأول من حرفين على الأقل"),
});

export default async function handleSignUp(formData: FormData) {
  const { email, password, name, confirmPassword } = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const validatedInput = signUpSchema.parse({ email, password, name });
  if (password !== confirmPassword) {
    throw new Error("كلمة المرور و تأكيدها غير متطابقين");
  }

  const { error, data } = await signUp(validatedInput);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
}
