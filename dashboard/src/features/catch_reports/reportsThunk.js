import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleReset } from "./reportSlice";
import { useSelector } from "react-redux";

export const useReports = () => {
  const {
    pages,
    total_boxes_assigned,
    catch_date,
    catch_status,
    season,
    colonized_boxes,
    uncolonized_boxes,
    sort,
  } = useSelector((store) => store.reports);
  const numberFilterParams = [
    colonized_boxes !== undefined ? `colonized_boxes<=${colonized_boxes}` : "",
    uncolonized_boxes !== undefined ? `uncolonized_boxes<=${uncolonized_boxes}` : "",
    total_boxes_assigned !== undefined ? `total_boxes_assigned<=${total_boxes_assigned}` : "",
    catch_date !== undefined ? `catch_date=${catch_date}` : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `catchreports/?sort=${sort}&pages=${pages}&season=${season}&catch_status=${catch_status}&sort=${sort}&numberFilter=${numberFilterString}`;
  // console.log(url);
  const {
    status: isGettingAllReports,
    data: catch_reports,
    refetch,
  } = useQuery({
    queryKey: ["allreports"],
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
  return { isGettingAllReports, catch_reports, refetch };
};

export const useSingleReport = (id) => {
  const url = `catchreports/${id}`;
  // console.log(url);
  const {
    status: isGettingSingleReport,
    data: singleReport,
    refetch,
  } = useQuery({
    queryKey: ["singlereport"],
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
  return { isGettingSingleReport, singleReport, refetch };
};
export const useCreateReport = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createReport, status: isCreatingReport } = useMutation({
    mutationFn: async (reportDetails) => {
      const { data } = await customFetch.post("catchreports", {
        ...reportDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allreports"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The assigned_hunter or supervisor does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createReport, isCreatingReport };
};
export const useUpdateReport = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateReport, status: isUpdatingReport } = useMutation({
    mutationFn: async ({ reportDetails, id }) => {
      const { data } = await customFetch.patch(`catchreports/${id}`, {
        ...reportDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allreports"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateReport, isUpdatingReport };
};
export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteReport, status: isDeletingReport } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.delete(`catchreports/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allreports"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteReport, isDeletingReport };
};
