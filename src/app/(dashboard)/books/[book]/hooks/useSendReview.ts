import { useMutation, useQueryClient } from "@tanstack/react-query";
import sendReview from "./sendReview";
import { useToast } from "@/hooks/useToast";

export default function useSendReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const data = useMutation({
    mutationFn: sendReview,
    onSuccess: (data) => {
      toast.success("تم إرسال المراجعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["books", data.data?.book_id],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return {
    data,
    error: data.error,
  };
}
