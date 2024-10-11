import { useMutation } from "@tanstack/react-query";
import handleForgetPassword from "../../actions/handleForgetPassword";
import { useToast } from "@/hooks/useToast";

export default function useSendOTP(email: string) {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => handleForgetPassword(email ?? "", ""),
    onSuccess: () => {
      toast.success("OTP re-sent successfully");
    },
    onError: (error) => toast.error(error.message),
  });
}
