import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { toast } from "react-toastify";
import { handleReset } from "./employeesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const useAllEmployess = () => {
  const {
    first_name,
    last_name,
    employment_type,
    employment_status,
    dob,
    role,
    joining_date,
    salaryRange,
    pages,
    sort,
  } = useSelector((store) => store.employees);
  // console.log(first_name);
  // console.log(
  //   first_name,
  //   last_name,
  //   employment_type,
  //   employment_status,
  //   dob,
  //   role,
  //   joining_date,
  //   salaryRange
  // );

  // Define the numberFilter parameters only when they are selected
  const numberFilterParams = [
    salaryRange[0] !== undefined ? `salary>=${salaryRange[0]}` : "",
    salaryRange[1] !== undefined ? `salary<=${salaryRange[1]}` : "",
    dob ? `dob=${dob}` : "",
    joining_date ? `joining_date=${joining_date}` : "",
  ];

  // Filter out the empty values and join the selected parameters into one string
  const numberFilterString = numberFilterParams
    .filter(Boolean) // This will remove any empty values
    .join(" "); // Join the selected params with space for a clean format

  const url = `employees/?first_name=${first_name}&last_name=${last_name}&role=${role}&numberFilter=${numberFilterString}&employment_type=${employment_type}&employment_status=${employment_status}&pages=${pages}&sort=${sort}`;

  // console.log(url);

  const {
    status: isGettingAllEmployees,
    data: employees,
    refetch,
  } = useQuery({
    queryKey: ["allemployees"],
    queryFn: async () => {
      const { data } = await customFetch.get(url);
      // console.log(data)
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
  return { isGettingAllEmployees, employees, refetch };
};
export const useSingleEmployee = (id) => {
  // console.log(id);
  const {
    status: isGettingSingleEmployee,
    data: singleemployee,
    refetch,
  } = useQuery({
    queryKey: ["singleemployee"],
    queryFn: async () => {
      const { data } = await customFetch.get(`employees/${id}`);
      return data;
    },
    enabled: false,
    onSuccess: (data) => {
      console.log("Query succeeded!", data);
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      console.log(err);
    },
  });
  return { isGettingSingleEmployee, singleemployee, refetch };
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
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("The department || employment type/status fields cannot be empty !!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
      console.log(error);
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
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("The department || employment type/status fields cannot be empty !!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
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

export const useUploadEmployeeImages = (id) => {
  // console.log(id);
  const queryClient = useQueryClient();
  const { mutate: uploadEmployeeImgs, status: isUploadingEmployeeImages } = useMutation({
    mutationFn: async (avatar) => {
      // console.log(avatar);
      const { data } = await customFetch.patch(`employees/uploadavatar/${id}`, avatar);
      return data;
    },
    onSuccess: (res) => {
      // console.log(res);
      queryClient.invalidateQueries({ queryKey: ["allemployees"] });
      toast.success("Avatar uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { uploadEmployeeImgs, isUploadingEmployeeImages };
};
