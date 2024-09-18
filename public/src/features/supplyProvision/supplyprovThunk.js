import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useSupplyProvision = () => {
  const { status: isGettingAllprovisions, data: supplyProvision } = useQuery({
    queryKey: ["allsupplyprovisions"],
    queryFn: async () => {
      const { data } = await customFetch.get(`supplyprovisionitems`);
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
  return { isGettingAllprovisions, supplyProvision };
};