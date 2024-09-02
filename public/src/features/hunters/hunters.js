import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useHunters = () => {
  const { status: isGettingAllHunters, data: hunters } = useQuery({
    queryKey: ["allhunters"],
    queryFn: async () => {
      const { data } = await customFetch.get(`swarmhunters`);
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
  return { isGettingAllHunters, hunters };
};
