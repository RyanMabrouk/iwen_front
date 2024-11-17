import { useMutation } from "@tanstack/react-query";
import handleSignUp from "../../handlers/auth/handleSignUp";
import { useToast } from "@/hooks/useToast";

export default function useSignUp(
  setter: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();
  return useMutation({
    mutationFn: handleSignUp,
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح", "success : ");
      setter(true);
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
