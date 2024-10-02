import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils";

export const useOrders = () => {
  const { status: isGettingAllOrders, data: orders } = useQuery({
    queryKey: ["allorders"],
    queryFn: async () => {
      const { data } = await customFetch.get(`orders`);
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
  return { isGettingAllOrders, orders };
};
