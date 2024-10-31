import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { resetValues } from "./ordersSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useOrders = () => {
  const {
    user_id,
    tax,
    shippingFee,
    subTotal,
    total,
    paymentStatus,
    deliveryStatus,
    tx_ref,
    transaction_id,
    sort,
    pages,
  } = useSelector((store) => store.orders);
  const numberFilterParams = [
    tax ? `tax<=${tax}` : "",
    shippingFee ? `shippingFee<=${shippingFee}` : "",
    total ? `total<=${total}` : "",
    subTotal ? `subTotal<=${subTotal}` : "",
    user_id ? `user_id<=${user_id}` : "",
  ];
  const numberFilterString = numberFilterParams.filter(Boolean).join(" ");
  const url = `orders/?paymentStatus=${paymentStatus}&deliveryStatus=${deliveryStatus}&transaction_id=${transaction_id}&numberFilter=${numberFilterString}&pages=${pages}&sort=${sort}&tx_ref=${tx_ref}`;
  // console.log(url);
  const {
    status: isGettingAllOrders,
    data,
    refetch,
  } = useQuery({
    queryKey: ["allorders"],
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
  return { isGettingAllOrders, data, refetch };
};

export const useUpdateOrder = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateOrder, status: isUpdatingOrder } = useMutation({
    mutationFn: async ({ orderdetails, id }) => {
      console.log(orderdetails, "here");
      const { data } = await customFetch.patch(`/orders/${id}`, {
        ...orderdetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      // console.log(msg);
      queryClient.invalidateQueries({ queryKey: ["allorders"] });
      dispatch(resetValues());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { updateOrder, isUpdatingOrder };
};
