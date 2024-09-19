import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./nokSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useAllNok = () => {
  const {
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
    pages,
  } = useSelector((store) => store.noks);
  const url = `employeesnok/?emp_id=${emp_id}&fullname=${fullname}&pages=${pages}&email=${email}&address=${address}&phone=${phone}&gender=${gender}&relationship=${relationship}`;
  // console.log(url);
  const {
    status: isGettingAllNok,
    data: noks,
    refetch,
  } = useQuery({
    queryKey: ["allnok"],
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
  return { isGettingAllNok, noks, refetch };
};

export const useCreateNok = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createNok, status: isCreatingNok } = useMutation({
    mutationFn: async (nokDetails) => {
      // console.log(nokDetails, "here");
      const { data } = await customFetch.post("employeesnok", {
        ...nokDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allnok"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { createNok, isCreatingNok };
};
export const useUpdateNok = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateNok, status: isUpdatingNok } = useMutation({
    mutationFn: async ({ nokDetails, id }) => {
      // console.log(nokDetails, "here");
      const { data } = await customFetch.patch(`employeesnok/${id}`, {
        ...nokDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allnok"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateNok, isUpdatingNok };
};
export const useDeleteNok = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteNok, status: isDeletingNok } = useMutation({
    mutationFn: async (id) => {
      console.log(id, "here");
      const { data } = await customFetch.delete(`employeesnok/${id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allnok"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteNok, isDeletingNok };
};
