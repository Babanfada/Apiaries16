import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./reviewSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useReviews = () => {
  const { sort, pages, title, rating } = useSelector((store) => store.reviews);
  const numberFilterParams = [rating ? `rating<=${rating}` : ""];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `reviews/?title=${title}&numberFilter=${numberFilterString}&pages=${pages}&sort=${sort}`;
  console.log(url);
  const {
    status: isGettingAllReviews,
    data,
    refetch,
  } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const { data } = await customFetch.get(url);
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
  return { isGettingAllReviews, data, refetch };
};
export const useUpdateReview = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateReview, status: isUpdatingReview } = useMutation({
    mutationFn: async ({ reviewDetails, id }) => {
      const { data } = await customFetch.patch(`reviews/${id}`, {
        ...reviewDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allreviews"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateReview, isUpdatingReview };
};
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteReview, status: isDeletingReview } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`reviews/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allreviews"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteReview, isDeletingReview };
};
