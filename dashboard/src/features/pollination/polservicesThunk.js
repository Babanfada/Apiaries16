import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./polservicesSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const usePolServices = () => {
  const { pages, rendered, sort, crop_type, priceRangeP } = useSelector(
    (store) => store.polservices
  );
  const numberFilterParams = [
    rendered !== undefined ? `rendered<=${rendered}` : "",
    priceRangeP[0] !== undefined ? `price>=${priceRangeP[0]}` : "",
    priceRangeP[1] !== undefined ? `price<=${priceRangeP[1]}` : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `pollinationservices/?crop_type=${crop_type}&sort=${sort}&pages=${pages}&numberFilter=${numberFilterString}`;
  // console.log(url);
  const {
    status: isGettingAllPolServices,
    data: polservices,
    refetch,
  } = useQuery({
    queryKey: ["allpolservices"],
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
  return { isGettingAllPolServices, polservices, refetch };
};

export const useCreatePolServices = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createPolService, status: isCreatingPolservice } = useMutation({
    mutationFn: async (polServiceDetails) => {
      // console.log(polServiceDetails);
      const { data } = await customFetch.post("pollinationservices", {
        ...polServiceDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allpolservices"] });
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
  return { createPolService, isCreatingPolservice };
};
export const useUpdatePolServices = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updatePolService, status: isUpdatingPolservices } = useMutation({
    mutationFn: async ({ polServiceDetails, id }) => {
      const { data } = await customFetch.patch(`pollinationservices/${id}`, {
        ...polServiceDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allpolservices"] });
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
  return { updatePolService, isUpdatingPolservices };
};
export const useDeletePolServices = () => {
  const queryClient = useQueryClient();
  const { mutate: deletePolService, status: isDeletingPolServices } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`pollinationservices/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allpolservices"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deletePolService, isDeletingPolServices };
};
