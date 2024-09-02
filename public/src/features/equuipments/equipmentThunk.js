import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils";

export const useEquipments = () => {
  const { status: isGettingAllequipments, data: equipments } = useQuery({
    queryKey: ["allequipments"],
    queryFn: async () => {
      const { data } = await customFetch.get(`equipments`);
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
  return { isGettingAllequipments, equipments };
};
