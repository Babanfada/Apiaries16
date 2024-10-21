import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { useDispatch } from "react-redux";
import { handleReset } from "./productsSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const useProducts = () => {
  const {
    product_name,
    product_type,
    quantity,
    total_in_stock,
    harvest_year,
    packaging_type,
    priceRangePP,
    pages,
    sort,
    // product_id,
    // unit,
    // price,
    // averageRating,
    // product_images,
    // description,
    // numOfReviews,
    // numOfTimesSold,
  } = useSelector((store) => store.products);
  const numberFilterParams = [
    priceRangePP[0] !== undefined ? `price>=${priceRangePP[0]}` : "",
    priceRangePP[1] !== undefined ? `price<=${priceRangePP[1]}` : "",
    harvest_year ? `harvest_year=${harvest_year}` : "",
    quantity ? `quantity<=${quantity}` : "",
    total_in_stock ? `total_in_stock<=${total_in_stock}` : "",
  ];
  const numberFilterString = numberFilterParams
    .filter(Boolean) 
    .join(" "); 
  const url = `products/?product_name=${product_name}&product_type=${product_type}&packaging_type=${packaging_type}&numberFilter=${numberFilterString}&pages=${pages}&sort=${sort}`;
  console.log(url);
  const {
    status: isGettingAllProducts,
    data,
    refetch,
  } = useQuery({
    queryKey: ["allproducts"],
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
  return { isGettingAllProducts, data, refetch };
};
export const useSinglProduct = (id) => {
  // console.log(id);
  const {
    status: isGettingSingleProduct,
    data: singleproduct,
    refetch,
  } = useQuery({
    queryKey: ["singleproduct"],
    queryFn: async () => {
      const { data } = await customFetch.get(`products/${id}`);
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
  return { isGettingSingleProduct, singleproduct, refetch };
};
export const useCreateProduct = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createProduct, status: isCreatingProduct } = useMutation({
    mutationFn: async (productdetails) => {
      console.log(productdetails);
      const { data } = await customFetch.post("products", {
        ...productdetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allproducts"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column ")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The product does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { createProduct, isCreatingProduct };
};
export const useUpdateProduct = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: updateProduct, status: isUpdatingProduct } = useMutation({
    mutationFn: async ({ productdetails, id }) => {
      const { data } = await customFetch.patch(`products/${id}`, {
        ...productdetails,
      });
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allproducts"] });
      dispatch(handleReset());
      toast.success(msg);
    },
    onError: (error) => {
      console.log(error);
      const Msg = error.response?.data?.msg;
      if (Msg.includes("Data truncated for column")) {
        toast.error("you have not select one or more fields !!!!");
      } else if (Msg.includes("Cannot add or update a child row: a foreign key constraint fails")) {
        toast.error("The product does not exist !!!!");
      } else {
        toast.error(error.response?.data?.msg || "An error occurred.");
      }
    },
  });
  return { updateProduct, isUpdatingProduct };
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, status: isDeletingProduct } = useMutation({
    mutationFn: async (product_id) => {
      console.log(product_id);
      const { data } = await customFetch.delete(`products/${product_id}`);
      return data;
    },
    onSuccess: ({ msg }) => {
      queryClient.invalidateQueries({ queryKey: ["allproducts"] });
      toast.error(msg);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.msg || "An error occurred.");
    },
  });
  return { deleteProduct, isDeletingProduct };
};
