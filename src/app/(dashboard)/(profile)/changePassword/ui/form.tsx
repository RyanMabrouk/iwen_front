"use client";
import { z } from "zod";
import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import updatePassword from "@/actions/auth/updatePassword";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import { useToast } from "@/hooks/useToast";

export default function PasswordChangeForm() {
  const { data: user } = useCurrentUser();
  const passwordSchema = z
    .object({
      newPassword: z
        .string()
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
      confirmPassword: z.string().nonempty("الرجاء تأكيد كلمة المرور"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "كلمة المرور وتأكيدها يجب أن تكون متطابقة",
    });
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null); 

  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const updatePasswordMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const currentPassword = String(formData.get("currentPassword"));
      const newPassword = String(formData.get("newPassword"));
      const confirmPassword = String(formData.get("confirmPassword"));

      const input = { newPassword, confirmPassword };
      const result = passwordSchema.safeParse(input);

      if (!result.success) {
        result.error.errors.forEach((error) => {
          toast.error(error.message,);
        });
        throw new Error("Validation error");
      }

      const updateResult = await updatePassword({
        currentPassword,
        newPassword,
        email: user?.data?.email ?? "",
      });

      if (updateResult?.error) {
        throw new Error(updateResult.error.message);
      }
    },
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح");
      formRef.current?.reset();
    },
    onError: (error: any) => {
      toast.error( error.message || "حدث خطأ أثناء تغيير كلمة المرور",);
    },
  });
  return (
    <form
      dir="rtl"
      ref={formRef} 
      className="w-full space-y-6"
      action={updatePasswordMutation.mutate}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="current-password"
            className="block text-right text-lg"
          >
            أدخل كلمة المرور الحالية*
          </Label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password" className="block text-right text-lg">
            أدخل كلمة المرور الجديدة*
          </Label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="block text-right text-lg"
          >
            التثبت من كلمة المرور الجديدة*
          </Label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 ">
      <button
            type="submit"
            disabled={updatePasswordMutation.isPending}
            className="bg-color1 text-lg p-2 px-4 rounded-md text-white opacity-100 hover:opacity-50"
          >
            {updatePasswordMutation.isPending ? "جاري التحديث..." : "احفظ التغيير"}
          </button>
      </div>
    </form>
  );
}
