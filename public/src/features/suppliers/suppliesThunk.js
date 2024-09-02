import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useSupplies = () => {
  const { status: isGettingAllSupplies, data: supplies } = useQuery({
    queryKey: ["allsupplies"],
    queryFn: async () => {
      const { data } = await customFetch.get(`supplies`);
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
  return { isGettingAllSupplies, supplies };
};
