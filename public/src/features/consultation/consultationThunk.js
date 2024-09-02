import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useConsultation = () => {
  const { status: isGettingAllC_Items, data: c_items } = useQuery({
    queryKey: ["allitems"],
    queryFn: async () => {
      const { data } = await customFetch.get(`consultancyitems`);
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
  return { isGettingAllC_Items, c_items };
};
