import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useReports = () => {
  const { status: isGettingAllReports, data: catch_reports } = useQuery({
    queryKey: ["allreports"],
    queryFn: async () => {
      const { data } = await customFetch.get(`catchreports`);
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
  return { isGettingAllReports, catch_reports };
};
