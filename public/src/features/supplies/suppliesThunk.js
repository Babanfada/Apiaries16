import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./suppliesSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useSupplies = () => {
  const { pages } = useSelector((store) => store.supplies);
  const url = `supplies/?pages=${pages}`;
  const {
    status: isGettingAllSupplies,
    data: supplies,
    refetch,
  } = useQuery({
    queryKey: ["allsupplies"],
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
  return { isGettingAllSupplies, supplies, refetch };
};

export const useCreateSupply = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createSupply, status: isCreatingSupply } = useMutation({
    mutationFn: async (supplyDetails) => {
      // console.log(supplyDetails, "here");
      const { data } = await customFetch.post("supplies", {
        ...supplyDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allsupplies"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { createSupply, isCreatingSupply };
};
export const useUpdateSupply = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate: updateSupply, status: isUpdatingSupply } = useMutation({
    mutationFn: async ({ supplyDetails, id }) => {
      // console.log(supplyDetails, id, "here");
      const { data } = await customFetch.patch(`supplies/${id}`, {
        ...supplyDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsupplies"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateSupply, isUpdatingSupply };
};
export const useDeleteSupply = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSupply, status: isDeletingSupply } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`supplies/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsupplies"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteSupply, isDeletingSupply };
};
