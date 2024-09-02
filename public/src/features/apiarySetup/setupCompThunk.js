import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useSetupComp = () => {
  const { status: isGettingAllSetupComp, data: setupComp } = useQuery({
    queryKey: ["allsetupcomp"],
    queryFn: async () => {
      const { data } = await customFetch.get(`apiarysetupcomponents`);
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
  return { isGettingAllSetupComp, setupComp };
};
