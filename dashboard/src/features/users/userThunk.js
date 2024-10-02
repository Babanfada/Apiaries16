import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// user authentication
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
      const { data } = await customFetch.post("authflow/verify-email", verificationParams);
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
      const { data } = await customFetch.patch("authflow/resetPassword", resetDetails);
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

// user  admin management

export const usegetAllUser = () => {
  const { gendersearch, isVerified, blacklisted, subscribed, sort, pages, email, fullname, phone } =
    useSelector((store) => store.users);
  // const url1 = `users/?pages=${pages}&sort=${sort}&email=${email}&fullname=${fullname}&gender=${gendersearch}&phone=${phone || ""}`;
  const url = `users/?pages=${pages}&sort=${sort}&email=${email}&fullname=${fullname}&gender=${gendersearch}&isVerified=${
    isVerified === "verified" ? true : isVerified === "not verified" ? false : "---"
  }&blacklisted=${
    blacklisted === "blacklisted" ? true : blacklisted === "not blacklisted" ? false : "---"
  }&emailNotification=${
    subscribed === "subscribed" ? true : subscribed === "not subscribed" ? false : "---"
  }&phone=${phone || ""}`;

  // console.log(url);
  const {
    status: isGettingAllUser,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
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
  return { isGettingAllUser, users, refetch };
};

export const useSingleUser = (id) => {
  // console.log(id);
  const {
    status: isGettingSingleUser,
    data: singleuser,
    refetch,
  } = useQuery({
    queryKey: ["singleuser"],
    queryFn: async () => {
      const { data } = await customFetch.get(`users/${id}`);
      return data;
    },
    enabled: false,
    onSuccess: (data) => {
      console.log("Query succeeded!", data);
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      // console.log(err);
    },
  });
  return { isGettingSingleUser, singleuser, refetch };
};

export const useUpdateUser = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateUser, status: isUpdatingUser } = useMutation({
    mutationFn: async ({ userDetails, id }) => {
      console.log(userDetails, "here");
      const { data } = await customFetch.patch(`users/${id}`, {
        ...userDetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allusers"] });
      // dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateUser, isUpdatingUser };
};
export const useBlacklistUser = (id) => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: blacklistUser, status: blacklisting } = useMutation({
    mutationFn: async (blacklistDetails) => {
      console.log(blacklistDetails, "here");
      const { data } = await customFetch.patch(`authflow/blacklist/${id}`, blacklistDetails);
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      // queryClient.invalidateQueries({ queryKey: ["allusers", "singleuser"] });
      queryClient.invalidateQueries({ queryKey: ["allusers", "singleuser"] });
      // dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { blacklistUser, blacklisting };
};
export const useSubscribeUser = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: subscribeUser, status: subscribing } = useMutation({
    mutationFn: async ({ subscribe, id }) => {
      console.log(subscribe, "here");
      const { data } = await customFetch.patch(`users/subscribe/${id}`, {
        subscribe,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allusers"] });
      // dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { subscribeUser, subscribing };
};
export const useUnsubscribeUser = () => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: unSubscribeUser, status: unSubscribing } = useMutation({
    mutationFn: async ({ unSubscribe, id }) => {
      console.log(unSubscribe, "here");
      const { data } = await customFetch.patch(`users/unsubscribe/${id}`, {
        unSubscribe,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allusers"] });
      // dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { unSubscribeUser, unSubscribing };
};
