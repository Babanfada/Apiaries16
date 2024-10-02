import { useQuery } from "@tanstack/react-query";
import customFetch from "../../utils";

export const useReviews = () => {
  const { status: isGettingAllReviews, data: reviews } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const { data } = await customFetch.get(`reviews`);
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
  return { isGettingAllReviews, reviews };
};
