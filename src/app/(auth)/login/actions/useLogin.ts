import { useMutation } from "@tanstack/react-query";
import handleLogIn from "./handleLogin";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async (formData: FormData) =>
      handleLogIn({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }),
    onSuccess: () => {
      toast.success("تم تسجيل الدخول بنجاح", "success");
      router.push("/home");
    },
    onError: (error) => toast.error("error"),
  });
}
