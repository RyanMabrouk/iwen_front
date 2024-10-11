import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import signInWithOAuth from "../../actions/auth/signInWithOAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

export default function useGoogleAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await signInWithOAuth({ provider: "google" });
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
          // If it's not an array, just show the error message
          toast.error(error.message, "error : ");
        }
      } catch (e) {
        // If parsing fails, show the original error message
        toast.error(error.message, "error : ");
      }
    },
  });
}
