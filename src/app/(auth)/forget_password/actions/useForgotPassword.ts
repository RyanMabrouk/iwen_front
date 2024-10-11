import { useMutation } from "@tanstack/react-query";
import handleForgetPassword from "./handleForgetPassword";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function useForgotPassword(email: string) {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async (formData: FormData) =>
      handleForgetPassword(formData.get("email") as string),
    onSuccess: () => {
      toast.success("OTP sent successfully");
      router.push(`/forget_password/token?email=${email}`);
    },
    onError: (error) => toast.error(`error : ${error.message}`),
  });
}
