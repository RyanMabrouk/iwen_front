import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteReview from "./deleteReview";
import { useToast } from "@/hooks/useToast";

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (id: string) => await deleteReview(id),
    onSuccess: (data) => {
      toast.success("تم الحذف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return {
    mutation,
    error: mutation.error,
  };
}
