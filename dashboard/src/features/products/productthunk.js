import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils";

export const useProducts = () => {
  const { status: isGettingAllProducts, data: products } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const { data } = await customFetch.get(`products`);
      return data;
    },
    onSuccess: ({ data }) => {
      console.log("Query succeeded!", data);
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      console.log(err);
    },
  });
  return { isGettingAllProducts, products };
};
