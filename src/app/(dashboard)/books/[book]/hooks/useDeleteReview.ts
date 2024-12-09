import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteReview from "./deleteReview";

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => await deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => console.log(error),
  });
  return {
    mutation,
    error: mutation.error,
  };
}
