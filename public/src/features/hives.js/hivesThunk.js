import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useHives = () => {
  const { status: isGettingAllHives, data: hives } = useQuery({
    queryKey: ["allhives"],
    queryFn: async () => {
      const { data } = await customFetch.get(`hives`);
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
  return { isGettingAllHives, hives };
};
