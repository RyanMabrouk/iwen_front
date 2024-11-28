import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import handleChangePassword from "@/app/(auth)/handlers/auth/handleChangePasswrd";

export default function useChangePassword() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: handleChangePassword,
    onSuccess: () => toast.success("تم تغيير كلمة المرور بنجاح"),
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
