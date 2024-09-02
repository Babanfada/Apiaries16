import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const usePolServices = () => {
  const { status: isGettingAllPolServices, data: polservices } = useQuery({
    queryKey: ["allpolservices"],
    queryFn: async () => {
      const { data } = await customFetch.get(`pollinationservices`);
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
  return { isGettingAllPolServices, polservices };
};
