import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleReset } from "./hiveSlice";
import { useSelector } from "react-redux";

export const useHives = () => {
  const {
    pages,
    num_of_frames,
    first_installation,
    hive_type,
    colonized,
    status,
    use_condition,
    current_location,
    sort,
  } = useSelector((store) => store.hives);
  const numberFilterParams = [
    num_of_frames !== undefined ? `num_of_frames<=${num_of_frames}` : "",
    first_installation !== undefined
      ? `first_installation=${first_installation}`
      : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `hives/?pages=${pages}&numberFilter=${numberFilterString}&current_location=${current_location}&status=${status}&colonized=${colonized}&use_condition=${use_condition}&hive_type=${hive_type}&sort=${sort}`;
  // console.log(url);
  const {
    status: isGettingAllHives,
    data: hives,
    refetch,
  } = useQuery({
    queryKey: ["allhives"],
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
  return { isGettingAllHives, hives, refetch };
};

export const useSingleHive = (id) => {
  // const { pages } = useSelector((store) => store.stations);
  const url = `hives/${id}`;
  // console.log(url);
  const {
    status: isGettingSingleHive,
    data: singleHive,
    refetch,
  } = useQuery({
    queryKey: ["singlehive"],
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
  return { isGettingSingleHive, singleHive, refetch };
};
export const useCreateHive = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createHive, status: isCreatingHive } = useMutation({
    mutationFn: async (hiveDetails) => {
      // console.log(nokDetails, "here");
      const { data } = await customFetch.post("hives", {
        ...hiveDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhives"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (
        Msg.includes(
          "Cannot add or update a child row: a foreign key constraint fails"
        )
      ) {
        toast.error("The assigned_hunter does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createHive, isCreatingHive };
};
export const useUpdateHive = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateHive, status: isUpdatingHive } = useMutation({
    mutationFn: async ({ hiveDetails, id }) => {
      // console.log(hiveDetails, "here");
      const { data } = await customFetch.patch(`hives/${id}`, {
        ...hiveDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhives"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (
        Msg.includes(
          "Cannot add or update a child row: a foreign key constraint fails"
        )
      ) {
        toast.error("The assigned_hunter does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateHive, isUpdatingHive };
};
export const useDeleteHive = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteHive, status: isDeletingHive } = useMutation({
    mutationFn: async (id) => {
      // console.log(id, "here");
      const { data } = await customFetch.delete(`hives/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhives"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteHive, isDeletingHive };
};
