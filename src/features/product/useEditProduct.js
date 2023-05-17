import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productsResponse = await axiosInstance.patch(
        `/users/${body.id}`,
        body
      );

      return productsResponse;
    },
    onSuccess,
  });
};
