import { useMutation, useQueryClient } from "@tanstack/react-query";
import sendReview from "./sendReview";
import { useToast } from "@/hooks/useToast";

export default function useSendReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const data = useMutation({
    mutationFn: sendReview,
    onSuccess: () => {
      toast.success("تم إرسال المراجعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return {
    data,
    error: data.error,
  };
}
