import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./supplyProvSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useSupplyProvision = () => {
  const { pages, quantity, sort, item_name, priceRangeSP } =
    useSelector((store) => store.provisions);
  const numberFilterParams = [
    quantity !== undefined
      ? `quantity<=${quantity}`
      : "",
    priceRangeSP[0] !== undefined ? `price_NGN>=${priceRangeSP[0]}` : "",
    priceRangeSP[1] !== undefined ? `price_NGN<=${priceRangeSP[1]}` : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `supplyprovisionitems/?item_name=${item_name}&sort=${sort}&pages=${pages}&numberFilter=${numberFilterString}`;
  // console.log(url);
  const {
    status: isGettingAllprovisions,
    data: supplyProvision,
    refetch,
  } = useQuery({
    queryKey: ["allsupplyprovisions"],
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
  return { isGettingAllprovisions, supplyProvision, refetch };
};

export const useCreateProvision = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createProvision, status: isCreatingProvision } = useMutation({
    mutationFn: async (provisionDetails) => {
      console.log(provisionDetails);
      const { data } = await customFetch.post("supplyprovisionitems", {
        ...provisionDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsupplyprovisions"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log()
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (
        Msg.includes(
          "Cannot add or update a child row: a foreign key constraint fails"
        )
      ) {
        toast.error("The service_id does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createProvision, isCreatingProvision };
};
export const useUpdateProvision = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateProvision, status: isUpdatingProvision } = useMutation({
    mutationFn: async ({ provisionDetails, id }) => {
      const { data } = await customFetch.patch(`supplyprovisionitems/${id}`, {
        ...provisionDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsupplyprovisions"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (
        Msg.includes(
          "Cannot add or update a child row: a foreign key constraint fails"
        )
      ) {
        toast.error("The service_id does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateProvision, isUpdatingProvision };
};
export const useDeleteProvision = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProvision, status: isDeletingProvision } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`supplyprovisionitems/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsupplyprovisions"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteProvision, isDeletingProvision };
};
