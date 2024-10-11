import { useMutation, UseMutationResult } from "@tanstack/react-query";
import handleSignUp from "../../actions/auth/handleSignUp";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function useSignUp() {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: handleSignUp,
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح", "success : ");
      router.push(`/account_created`);
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
              toast.error(errorObj.message, "error : ");
            }
          });
        } else {
          toast.error(error.message, "error : ");
        }
      } catch (e) {
        toast.error(error.message, "error : ");
      }
    },
  });
}
