import { useMutation, useQueryClient } from "@tanstack/react-query";
import editReview from "./editReview";
import { useToast } from "@/hooks/useToast";

export default function useEditReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (args: {
      id: string;
      data: { content: string; rating: number };
    }) => await editReview(args.id, args.data),
    onSuccess: () => {
      toast.success("تم تعديل المراجعة بنجاح", "success");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return {
    mutation,
    error: mutation.error,
  };
}
