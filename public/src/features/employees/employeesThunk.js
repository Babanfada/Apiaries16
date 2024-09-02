import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useAllEmployess = () => {
  const { status: isGettingAllEmployees, data: employees } = useQuery({
    queryKey: ["allemployees"],
    queryFn: async () => {
      const { data } = await customFetch.get(`employees`);
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
  return { isGettingAllEmployees, employees };
};
