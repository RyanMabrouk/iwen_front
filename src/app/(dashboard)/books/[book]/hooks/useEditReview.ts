import { useMutation, useQueryClient } from "@tanstack/react-query";
import editReview from "./editReview";

export default function useEditReview() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (args: {
      id: string;
      data: { content: string; rating: number };
    }) => await editReview(args.id, args.data),
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
