import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useServices = () => {
  const { status: isGettingAllServices, data: services } = useQuery({
    queryKey: ["allservices"],
    queryFn: async () => {
      const { data } = await customFetch.get(`services`);
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
  return { isGettingAllServices, services };
};
