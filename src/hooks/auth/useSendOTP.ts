import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import handleForgetPassword from "@/app/(auth)/handlers/auth/handleForgetPassword";

export default function useSendOTP(email: string) {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => handleForgetPassword(email ?? ""),
    onSuccess: () => {
      toast.success("(OTP) تمت إعادة إرسال كلمة المرور لمرة واحدة بنجاح");
    },
    onError: (error) => {
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
          // If it's not an array, just show the error message
          toast.error(error.message);
        }
      } catch (e) {
        // If parsing fails, show the original error message
        toast.error(error.message);
      }
    },
  });
}
