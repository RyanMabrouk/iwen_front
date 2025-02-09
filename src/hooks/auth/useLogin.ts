import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import handleLogIn from "@/app/(auth)/handlers/auth/handleLogin";

export default function useLogin() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) =>
      handleLogIn({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/");
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
