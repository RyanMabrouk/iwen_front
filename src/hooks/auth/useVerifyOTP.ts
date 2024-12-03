import verifyOTP from "@/actions/auth/verifyOTP";
import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useVerifyOTP(email: string, otp: string) {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => verifyOTP(email ?? "", otp),
    onSuccess: () => {
      toast.success("تم التحقق من الرمز المميز بنجاح");
      router.push(`/change_password`);
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
