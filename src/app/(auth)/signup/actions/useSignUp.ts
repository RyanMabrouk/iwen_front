import { useMutation } from "@tanstack/react-query";
import handleSignUp from "./handleSignUp";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function useSignUp() {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: handleSignUp,
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح", "success :");
      router.push(`/home`);
    },
    onError: (error) => toast.error(error.message, "error"),
  });
}
