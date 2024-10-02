import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./setupCompSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useSetupComp = () => {
  const { pages, stock, sort, component_name, priceRange } = useSelector((store) => store.setups);
  const numberFilterParams = [
    stock !== undefined ? `stock<=${stock}` : "",
    priceRange[0] !== undefined ? `price>=${priceRange[0]}` : "",
    priceRange[1] !== undefined ? `price<=${priceRange[1]}` : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `apiarysetupcomponents/?component_name=${component_name}&sort=${sort}&pages=${pages}&numberFilter=${numberFilterString}`;
  // console.log(url);
  const {
    status: isGettingAllSetupComp,
    data: setupComp,
    refetch,
  } = useQuery({
    queryKey: ["allsetupcomp"],
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
  return { isGettingAllSetupComp, setupComp, refetch };
};

export const useCreateSetup = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createSetup, status: isCreatingSetup } = useMutation({
    mutationFn: async (setupDetails) => {
      const { data } = await customFetch.post("apiarysetupcomponents", {
        ...setupDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsetupcomp"] });
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
  return { createSetup, isCreatingSetup };
};
export const useUpdateSetup = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateSetup, status: isUpdatingSetup } = useMutation({
    mutationFn: async ({ setupDetails, id }) => {
      const { data } = await customFetch.patch(`apiarysetupcomponents/${id}`, {
        ...setupDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsetupcomp"] });
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
  return { updateSetup, isUpdatingSetup };
};
export const useDeleteSetup = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSetup, status: isDeletingSetup } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`apiarysetupcomponents/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allsetupcomp"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteSetup, isDeletingSetup };
};
