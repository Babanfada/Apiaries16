import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./suppliesSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useSupplies = () => {
  const {
    pages,
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
    sort,
  } = useSelector((store) => store.supplies);
  const numberFilterParams = [
    quantity !== undefined ? `quantity<=${quantity}` : "",
    minimum_stock_level !== undefined
      ? ` minimum_stock_level<=${minimum_stock_level}`
      : "",
    purchase_cost !== undefined ? `purchase_cost<=${purchase_cost}` : "",
    purchase_date ? `purchase_date=${purchase_date}` : "",
  ];
  const numberFilterString = numberFilterParams
    .filter(Boolean) // This will remove any empty values
    .join(" "); // Join the selected params with space for a clean format

  const url = `supplies/?numberFilter=${numberFilterString}&pages=${pages}&supplier=${supplier}&supply_name=${supply_name}&status=${status}&storage_location=${storage_location}&category=${category}&sort=${sort}`;
  // console.log(url);
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
export const useSingleSuppply = (id) => {
  const url = `supplies/${id}`;
  const {
    status: isGettingSingleSupply,
    data: singleSupply,
    refetch,
  } = useQuery({
    queryKey: ["singlesupply"],
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
  return { isGettingSingleSupply, singleSupply, refetch };
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
