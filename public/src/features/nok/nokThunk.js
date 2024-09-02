import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useAllNok = () => {
  const { status: isGettingAllNok, data: noks } = useQuery({
    queryKey: ["allnok"],
    queryFn: async () => {
      const { data } = await customFetch.get(`employeesnok`);
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
  return { isGettingAllNok, noks };
};
