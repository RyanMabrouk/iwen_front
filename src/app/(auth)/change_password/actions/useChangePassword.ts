import { useMutation } from "@tanstack/react-query";
import React from "react";
import handleChangePassword from "./handleChangePasswrd";
import { useToast } from "@/hooks/useToast";

export default function useChangePassword() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: handleChangePassword,
    onSuccess: () => toast.success("password changed successfully"),
    onError: (error) => toast.error(`error : ${error.message}`),
  });
}
