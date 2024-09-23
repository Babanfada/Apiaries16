import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./huntersSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { sortedLastIndexOf } from "lodash";

export const useHunters = () => {
  const {
    pages,
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    sort,
  } = useSelector((store) => store.hunters);
  const numberFilterParams = [
    tip !== undefined ? `tip<=${tip}` : "",
    joining_date !== undefined ? `joining_date=${joining_date}` : "",
  ];
  const numberFilterString = numberFilterParams
    .filter(Boolean) // This will remove any empty values
    .join(" ");
  const url = `swarmhunters/?pages=${pages}&fullname=${fullname}&emergency_contact_name=${emergency_contact_name}&emergency_contact=${
    emergency_contact === undefined ? "" : emergency_contact
  }&phone=${
    phone === undefined ? "" : phone
  }&employment_status=${employment_status}&assigned_supervisor=${assigned_supervisor}&numberFilter=${numberFilterString}&sort=${sort}`;
  // console.log(url);
  const {
    status: isGettingAllHunters,
    data: hunters,
    refetch,
  } = useQuery({
    queryKey: ["allhunters"],
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
  return { isGettingAllHunters, hunters, refetch };
};

export const useSingleHunter = (id) => {
  const url = `swarmhunters/${id}`;
  const {
    status: isGettingSingleHunter,
    data: singleHunter,
    refetch,
  } = useQuery({
    queryKey: ["singlehunter"],
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
  return { isGettingSingleHunter, singleHunter, refetch };
};
export const useCreateHunter = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createHunter, status: isCreatingHunter } = useMutation({
    mutationFn: async (hunterDetails) => {
      // console.log(hunterDetails, "here");
      const { data } = await customFetch.post("/swarmhunters", {
        ...hunterDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhunters"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (
        Msg.includes(
          "Cannot add or update a child row: a foreign key constraint fails"
        )
      ) {
        toast.error("The chosen hunter_id does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createHunter, isCreatingHunter };
};
export const useUpdateHunter = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateHunter, status: isUpdatingHunter } = useMutation({
    mutationFn: async ({ hunterDetails, id }) => {
      // console.log(hunterDetails, "here");
      const { data } = await customFetch.patch(`/swarmhunters/${id}`, {
        ...hunterDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhunters"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateHunter, isUpdatingHunter };
};
export const useDeleteHunter = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteHunter, status: isDeletingHunter } = useMutation({
    mutationFn: async (id) => {
      // console.log(id, "here");
      const { data } = await customFetch.delete(`/swarmhunters/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhunters"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteHunter, isDeletingHunter };
};
