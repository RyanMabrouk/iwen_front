import verifyOTP from "@/actions/auth/verifyOTP";
import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOTP(
  email: string,
  otp: string,
  setTokenVerified: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async () => verifyOTP(email ?? "", otp),
    onSuccess: ({ session }: { session: any }) => {
      console.log(session);
      toast.success("token verified successfully");
      setTokenVerified(true);
    },
    onError: (error) => toast.error(error.message),
  });
}
