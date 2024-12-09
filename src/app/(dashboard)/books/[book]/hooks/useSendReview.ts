import { useMutation, useQueryClient } from "@tanstack/react-query";
import sendReview from "./sendReview";

export default function useSendReview() {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: sendReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => console.log(error),
  });
  return {
    data,
    error: data.error,
  };
}
