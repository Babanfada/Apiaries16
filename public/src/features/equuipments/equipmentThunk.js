import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./equipmentSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useEquipments = () => {
  const {
    pages,
    tool_name,
    supplier,
    currency,
    status,
    storage_location,
    retired,
    category,
    quantity,
    purchase_cost,
    purchase_date,
    sort,
  } = useSelector((store) => store.equipments);
  //  const numberFilterParams = `quantity<=${quantity}`;
  const numberFilterParams = [
    quantity !== undefined ? `quantity<=${quantity}` : "",
    purchase_cost !== undefined ? `purchase_cost<=${purchase_cost}` : "",
    purchase_date ? `purchase_date=${purchase_date}` : "",
  ];
  const numberFilterString = numberFilterParams
    .filter(Boolean) // This will remove any empty values
    .join(" "); // Join the selected params with space for a clean format

  const url = `equipments/?numberFilter=${numberFilterString}&pages=${pages}&tool_name=${tool_name}&currency=${currency}&supplier=${supplier}&status=${status}&storage_location=${storage_location}&retired=${retired}&category=${category}&sort=${sort}`;
  // console.log(url);
  const {
    status: isGettingAllequipments,
    data: equipments,
    refetch,
  } = useQuery({
    queryKey: ["allequipments"],
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
  return { isGettingAllequipments, equipments, refetch };
};
export const useSingleEquipment = (id) => {
  const url = `equipments/${id}`;
  const {
    status: isGettingSingleEquipment,
    data: singleEquipment,
    refetch,
  } = useQuery({
    queryKey: ["singleequipment"],
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
  return { isGettingSingleEquipment, singleEquipment, refetch };
};
export const useCreateEqupment = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createEquipment, status: isCreatingEquipment } = useMutation({
    mutationFn: async (equipmentDetails) => {
      // console.log(equipmentDetails, "here");
      const { data } = await customFetch.post("equipments", {
        ...equipmentDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allequipments"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { createEquipment, isCreatingEquipment };
};
export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate: updateEquipment, status: isUpdatingEquipment } = useMutation({
    mutationFn: async ({ equipmentdetailsOnEdit, id }) => {
      // console.log(equipmentdetailsOnEdit, id, "here");
      const { data } = await customFetch.patch(`equipments/${id}`, {
        ...equipmentdetailsOnEdit,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allequipments"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateEquipment, isUpdatingEquipment };
};
export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteEquipment, status: isDeletingEquipment } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`equipments/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allequipments"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteEquipment, isDeletingEquipment };
};
