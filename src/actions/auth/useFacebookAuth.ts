import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import signInWithOAuth from "./signInWithOAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

export default function useFacebookAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await signInWithOAuth({ provider: "facebook" });
      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data?.url) {
        router.push(data.url);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
