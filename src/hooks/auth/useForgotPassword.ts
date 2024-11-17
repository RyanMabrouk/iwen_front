import { useMutation } from "@tanstack/react-query";
import handleForgetPassword from "../../handlers/auth/handleForgetPassword";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function useForgotPassword(email: string) {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async (formData: FormData) =>
      handleForgetPassword(formData.get("email") as string),
    onSuccess: () => {
      toast.success("(OTP) تم إرسال كلمة المرور لمرة واحدة بنجاح ");
      router.push(`/forget_password/token?email=${email}`);
    },
    onError: (error: Error) => {
      try {
        const errorMessages = JSON.parse(error.message);
        if (Array.isArray(errorMessages)) {
          errorMessages.forEach((errorObj) => {
            if (
              errorObj &&
              typeof errorObj === "object" &&
              "message" in errorObj
            ) {
              toast.error(errorObj.message);
            }
          });
        } else {
          toast.error(error.message);
        }
      } catch (e) {
        toast.error(error.message);
      }
    },
  });
}
