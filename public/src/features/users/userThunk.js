import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";
import { toast } from "react-toastify";

export const useCheckUserOndB = (email) => {
  const {
    isLoading: isCheckingUserOnDb,
    data,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["checkuser", email], // Add an object to hold the email
    enabled: false, // Disable the query from running on component mount
    queryFn: async () => {
      const { data } = await customFetch.post(`authflow/check`, { email });
      //   console.log(data);
      return data;
    },
    onSuccess: ({ data }) => {
      console.log("Query succeeded!", data);
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      console.log(err);
    },
    onSettled: (data, error) => {
      console.log("Query settled");
      if (data) {
        console.log("Query succeeded!", data);
      }
      if (error) {
        console.log("Query failed!", error);
      }
    },
  });
  return { isCheckingUserOnDb, data, isError, isSuccess, refetch };
};

export const useRegisterUser = () => {
  //   const dispatch = useDispatch();
  const { mutate: registerUser, status: isRegisteringUser } = useMutation({
    mutationFn: async (userdetails) => {
      const { data } = await customFetch.post(`authflow/register`, {
        ...userdetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      toast.success(msg);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { registerUser, isRegisteringUser };
};

export const useVerifyUser = () => {
//   const dispatch = useDispatch();
  const {
    mutate: verifyUser,
    status: isVerifyingUser,
    isError,
  } = useMutation({
    mutationFn: async (verificationParams) => {
      const { data } = await customFetch.post(
        "authflow/verify-email",
        verificationParams
      );
      return data;
    },
    onSuccess: ({ msg }) => {
      toast.success(msg);
    //   dispatch(setVerification());
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { verifyUser, isVerifyingUser, isError };
};