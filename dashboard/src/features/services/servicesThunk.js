import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./serviceSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useServices = () => {
  const { service_name, pages, numOfTimesRendered, sort, category } = useSelector(
    (store) => store.services
  );
  const numberFilterParams = [
    numOfTimesRendered !== undefined ? `numOfTimesRendered<=${numOfTimesRendered}` : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `services/?category=${category}&sort=${sort}&pages=${pages}&service_name=${service_name}&numberFilter=${numberFilterString}`;
  // console.log(url);
  const {
    status: isGettingAllServices,
    data: services,
    refetch,
  } = useQuery({
    queryKey: ["allservices"],
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
  return { isGettingAllServices, services, refetch };
};

export const useCreateService = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createService, status: isCreatingService } = useMutation({
    mutationFn: async (serviceDetails) => {
      const { data } = await customFetch.post("services", {
        ...serviceDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allservices"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { createService, isCreatingService };
};
export const useUpdateService = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateService, status: isUpdatingService } = useMutation({
    mutationFn: async ({ serviceDetails, id }) => {
      const { data } = await customFetch.patch(`services/${id}`, {
        ...serviceDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allservices"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateService, isUpdatingService };
};
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteService, status: isDeletingService } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`services/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allservices"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteService, isDeletingService };
};
