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
export const useCurrentUser = () => {
  const {
    status: isCheckingCurrentUser,
    data: currentUser,
    refetch,
  } = useQuery({
    queryKey: ["currentuser"],
    // enabled: false, // Disable the query from running on component mount
    queryFn: async () => {
      const { data } = await customFetch.get(`authflow/showme`);
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
  return { isCheckingCurrentUser, currentUser };
};
export const usegetAllUser = () => {
  const { status: isGettingAllUser, data: users } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const { data } = await customFetch.get(`users`);
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
  return { isGettingAllUser, users };
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

export const useLoginUser = () => {
  //   const dispatch = useDispatch();
  const { mutate: loginUser, status: isLoginIn } = useMutation({
    mutationFn: async (userDetails) => {
      const { data } = await customFetch.post("authflow/login", userDetails);
      return data;
    },
    onSuccess: ({ msg }) => {
      //   dispatch(setLoginDetails(msg));
      //   console.log(msg);
      toast.success(msg);
    },
    onError: (error) => {
      // console.log(error.response)
      toast.error(error.response.data.msg);
    },
  });
  return { loginUser, isLoginIn };
};

export const useForgetPassword = () => {
  //   const dispatch = useDispatch();
  const {
    mutate: forgetPassword,
    status: isForgetingPassword,
    isError,
  } = useMutation({
    mutationFn: async (email) => {
      const { data } = await customFetch.post("authflow/forgotpassword", email);
      return data;
    },
    onSuccess: ({ msg }) => {
      toast.success(msg);
      //   dispatch(setforgetPassword());
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { forgetPassword, isForgetingPassword, isError };
};

export const useResetPassword = () => {
  //   const dispatch = useDispatch();
  const {
    mutate: resetPassword,
    status: isResetingPassword,
    isError,
  } = useMutation({
    mutationFn: async (resetDetails) => {
      const { data } = await customFetch.patch(
        "authflow/resetPassword",
        resetDetails
      );
      return data;
    },
    onSuccess: ({ msg }) => {
      toast.success(msg);
      //   dispatch(setResetPassword());
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { resetPassword, isResetingPassword, isError };
};

export const useLogOutUser = () => {
  const { mutate: logOutUser, status: isLoginOut } = useMutation({
    mutationFn: async () => {
      const { data } = await customFetch.delete("authflow/logout");
      return data;
    },
    onSuccess: ({ msg }) => {
      toast.error(msg);
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { logOutUser, isLoginOut };
};
