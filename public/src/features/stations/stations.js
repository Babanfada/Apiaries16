import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useStations = () => {
  const { status: isGettingStations, data: stations } = useQuery({
    queryKey: ["allstations"],
    queryFn: async () => {
      const { data } = await customFetch.get(`apiarystations`);
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
  return { isGettingStations, stations };
};
