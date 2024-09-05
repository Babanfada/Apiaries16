import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { toast } from "react-toastify";
import { handleReset } from "./employeesSlice";
import { useDispatch } from "react-redux";

export const useAllEmployess = () => {
  const { status: isGettingAllEmployees, data: employees } = useQuery({
    queryKey: ["allemployees"],
    queryFn: async () => {
      const { data } = await customFetch.get(`employees`);
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
  return { isGettingAllEmployees, employees };
};

export const useCreateEmployee = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createEmployee, status: isCreatingEmployee } = useMutation({
    mutationFn: async (empDetails) => {
      console.log(empDetails, "here");
      const { data } = await customFetch.post("employees", { ...empDetails });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allemployees"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { createEmployee, isCreatingEmployee };
};
export const useUpdateEmployee = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateEmployee, status: isUpdatingEmployee } = useMutation({
    mutationFn: async ({ empDetails, id }) => {
      console.log(empDetails, "here");
      const { data } = await customFetch.patch(`employees/${id}`, {
        ...empDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allemployees"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateEmployee, isUpdatingEmployee };
};
export const useDeleteEmployee = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteEmployee, status: isDeletingEmployee } = useMutation({
    mutationFn: async (id) => {
      console.log(id, "here");
      const { data } = await customFetch.delete(`employees/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allemployees"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteEmployee, isDeletingEmployee };
};
