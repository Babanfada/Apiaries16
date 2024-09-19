import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./honey_harvestSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { Pages } from "@mui/icons-material";

export const useHoneyHarvest = () => {
  const {
    pages,
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    quality_rating,
  } = useSelector((store) => store.harvests);
  const numberFilterParams = [
    quality_rating !== undefined ? `quality_rating<=${quality_rating}` : "",
    quantity_collected !== undefined
      ? `quantity_collected<=${quantity_collected}`
      : "",
    harvest_date !== undefined ? `harvest_date=${harvest_date}` : "",
  ];
  const numberFilterString = numberFilterParams
    .filter(Boolean) // This will remove any empty values
    .join(" "); // Join the selected params with space for a clean format

  const url = `honeyharvest/?numberFilter=${numberFilterString}&pages=${pages}&station_id=${station_id}&station_name=${station_name}&harvest_year=${harvest_year}&colouration=${colouration}`;
  // console.log(url);
  const {
    status: isGettingAllHarvest,
    data: honey_harvest,
    refetch,
  } = useQuery({
    queryKey: ["allhoneyharvest"],
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
  return { isGettingAllHarvest, honey_harvest, refetch };
};

export const useCreateHarvest = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createHarvest, status: isCreatingHarvest } = useMutation({
    mutationFn: async (harvestDetails) => {
      // console.log(harvestDetails, "here");
      const { data } = await customFetch.post("/honeyharvest", {
        ...harvestDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhoneyharvest"] });
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
        toast.error("The chosen station_id does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createHarvest, isCreatingHarvest };
};
export const useUpdateHarvest = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateHarvest, status: isUpdatingHarvest } = useMutation({
    mutationFn: async ({ harvestDetails, id }) => {
      // console.log(harvestDetails, "here");
      const { data } = await customFetch.patch(`/honeyharvest/${id}`, {
        ...harvestDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhoneyharvest"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateHarvest, isUpdatingHarvest };
};
export const useDeleteHarvest = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteHarvest, status: isDeletingHarvest } = useMutation({
    mutationFn: async (id) => {
      // console.log(id, "here");
      const { data } = await customFetch.delete(`/honeyharvest/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allhoneyharvest"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteHarvest, isDeletingHarvest };
};
