import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./consultationSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useConsultation = () => {
  const { pages, numOfTimesRendered, sort, item_name, priceRangeC } = useSelector(
    (store) => store.consultations
  );
  const numberFilterParams = [
    numOfTimesRendered !== undefined ? `numOfTimesRendered<=${numOfTimesRendered}` : "",
    priceRangeC[0] !== undefined ? `price>=${priceRangeC[0]}` : "",
    priceRangeC[1] !== undefined ? `price<=${priceRangeC[1]}` : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `consultancyitems/?item_name=${item_name}&sort=${sort}&pages=${pages}&numberFilter=${numberFilterString}`;
  // console.log(url);
  const {
    status: isGettingAllC_Items,
    data: c_items,
    refetch,
  } = useQuery({
    queryKey: ["allitems"],
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
  return { isGettingAllC_Items, c_items, refetch };
};

export const useCreateConsultation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createConsultation, status: isCreatingConsultation } = useMutation({
    mutationFn: async (consultationDetails) => {
      // console.log(consultationDetails);
      const { data } = await customFetch.post("consultancyitems", {
        ...consultationDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allitems"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The service_id does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createConsultation, isCreatingConsultation };
};
export const useUpdateConsultation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateConsultation, status: isUpdatingConsultation } = useMutation({
    mutationFn: async ({ consultationDetails, id }) => {
      const { data } = await customFetch.patch(`consultancyitems/${id}`, {
        ...consultationDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allitems"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The service_id does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateConsultation, isUpdatingConsultation };
};
export const useDeleteConsultation = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteConsultation, status: isDeletingConsultation } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`consultancyitems/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allitems"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteConsultation, isDeletingConsultation };
};
