import { z } from "zod";
import updatePassword from "@/actions/auth/updatePassword";
import getUser from "@/api/getUser";

// Define the Zod schema for password change validation
const changePasswordSchema = z
  .object({
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
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

// Type inference from the Zod schema
type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export default async function handleChangePassword(formData: FormData) {
  // Extract form data
  const rawInput = Object.fromEntries(formData);

  // Validate the input using the Zod schema
  const validatedInput: ChangePasswordInput =
    changePasswordSchema.parse(rawInput);

  // Get user
  const {
    data: { user },
  } = await getUser();
  if (!user) throw new Error("User not found");

  // Update password
  const { error } = await updatePassword({
    newPassword: validatedInput.password,
  });
  if (error) throw new Error(`Error: ${error.message}`);

  return { success: true, message: "Password changed successfully" };
}
