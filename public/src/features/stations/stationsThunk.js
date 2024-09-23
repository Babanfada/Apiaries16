import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetValues } from "./stationSlice";

export const useStations = () => {
  const {
    pages,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    status,
    station_size,
    number_of_hive_boxes,
    sort,
    // last_inspection_date,
    // next_inspection_date,
  } = useSelector((store) => store.stations);

  const numberFilterParams = `number_of_hive_boxes>=${number_of_hive_boxes}`;
  const url = `apiarystations/?numberFilter=${numberFilterParams}&pages=${pages}&location=${location}&status=${status}&station_size=${station_size}&supervisor_int=${supervisor_int}&supervisor_ext=${supervisor_ext}&station_name=${station_name}&sort=${sort}`;
  // console.log(url);
  const {
    status: isGettingStations,
    data: stations,
    refetch,
  } = useQuery({
    queryKey: ["allstations"],
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
  return { isGettingStations, stations, refetch };
};
export const useSingleStation = (id) => {
  // const { pages } = useSelector((store) => store.stations);
  const url = `apiarystations/${id}`;
  // console.log(url);
  const {
    status: isGettingSingleStation,
    data: singleStation,
    refetch,
  } = useQuery({
    queryKey: ["singlestation"],
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
  return { isGettingSingleStation, singleStation, refetch };
};

export const useCreateStation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createStation, status: isCreatingStation } = useMutation({
    mutationFn: async (stationDetails) => {
      // console.log(stationDetails, "here");
      const { data } = await customFetch.post("apiarystations", {
        ...stationDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allstations"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (
        Msg.includes(
          "Cannot add or update a child row: a foreign key constraint fails"
        )
      ) {
        toast.error(
          "The chosen supervisor_ext or supervisor_int does not exist !!!!"
        );
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createStation, isCreatingStation };
};
export const useUpdateStation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateStation, status: isUpdatingStation } = useMutation({
    mutationFn: async ({ stationdetailsOnEdit, id }) => {
      // console.log(stationdetailsOnEdit, id, "here");
      const { data } = await customFetch.patch(`apiarystations/${id}`, {
        ...stationdetailsOnEdit,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allstations"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (
        Msg.includes(
          "Cannot add or update a child row: a foreign key constraint fails"
        )
      ) {
        toast.error(
          "The chosen supervisor_ext or supervisor_int does not exist !!!!"
        );
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateStation, isUpdatingStation };
};
export const useDeleteStation = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteStation, status: isDeletingStation } = useMutation({
    mutationFn: async (id) => {
      console.log(id, "here");
      const { data } = await customFetch.delete(`apiarystations/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allstations"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteStation, isDeletingStation };
};
