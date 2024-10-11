import { z } from "zod";
import updatePassword from "@/actions/auth/updatePassword";
import getUser from "@/api/getUser";

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/,
        "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد، ورقم واحد، وحرف خاص واحد",
      ),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export default async function handleChangePassword(formData: FormData) {
  const rawInput = Object.fromEntries(formData);

  const validatedInput: ChangePasswordInput =
    changePasswordSchema.parse(rawInput);

  const {
    data: { user },
  } = await getUser();
  if (!user) throw new Error("User not found");

  const { error } = await updatePassword({
    newPassword: validatedInput.password,
  });
  if (error) throw new Error(`Error: ${error.message}`);

  return { success: true, message: "Password changed successfully" };
}
