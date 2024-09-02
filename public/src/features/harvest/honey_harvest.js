import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useHoneyHarvest = () => {
  const { status: isGettingAllHarvest, data: honey_harvest } = useQuery({
    queryKey: ["allhoneyharvest"],
    queryFn: async () => {
      const { data } = await customFetch.get(`honeyharvest`);
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
  return { isGettingAllHarvest, honey_harvest };
};
