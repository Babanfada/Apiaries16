import { useSelector } from "react-redux";
import { handleChangeService } from "../features/services/serviceSlice";
import { useDispatch } from "react-redux";
import { GenderInput, MultiLineInput, RangeSlider, UserInput } from "../components copy";
// import { GenderInput, MultiLineInput, RangeSlider, UserInput } from "../components copy";
import { handleChangeSetup } from "../features/apiarySetup/setupCompSlice";
import { handleChangeConsultation } from "../features/consultation/consultationSlice";
import { handleChangePolServ } from "../features/pollination/polservicesSlice";
import { handleChangeProvision } from "../features/supplyProvision/supplyProvSlice";
import { handleChangeOrder } from "features/orders/ordersSlice";
import { handleChangeReviews } from "features/reviews/reviewSlice";

export const useServiceInputs = () => {
  const dispatch = useDispatch();
  const { service_name, description, numOfTimesRendered, category, sort } = useSelector(
    (store) => store.services
  );
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["numOfTimesRendered"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeService({ name, value: processedValue }));
  };
  const serviceInputs = [
    {
      name: "service_name",
      TextField: (
        <UserInput
          name={"service_name"}
          value={service_name}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "description",
      TextField: (
        <MultiLineInput
          name={"description"}
          value={description}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "numOfTimesRendered",
      TextField: (
        <UserInput
          name={"numOfTimesRendered"}
          value={numOfTimesRendered}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "category",
      TextField: (
        <GenderInput
          name={"category"}
          value={category}
          type={"text"}
          gender={[
            "---",
            "Consultancy",
            "Apiary Setup",
            "Supply Provision",
            "Pollination",
            "Other",
          ]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { serviceInputs };
};
export const useSetupInputs = () => {
  const dispatch = useDispatch();
  const { service_id, priceRange, component_name, description, stock, price, sort } = useSelector(
    (store) => store.setups
  );
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["stock", "price", "service_id"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeSetup({ name, value: processedValue }));
  };
  const setupInputs = [
    {
      name: "service_id",
      TextField: (
        <UserInput name={"service_id"} value={service_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "component_name",
      TextField: (
        <UserInput
          name={"component_name"}
          value={component_name}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "description",
      TextField: (
        <MultiLineInput
          name={"description"}
          value={description}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "stock",
      TextField: <UserInput name={"stock"} value={stock} type={"number"} handleChange={getInput} />,
    },
    {
      name: "price",
      TextField: <UserInput name={"price"} value={price} type={"number"} handleChange={getInput} />,
    },
    {
      name: "priceRange",
      TextField: (
        <RangeSlider name={"priceRange"} value={priceRange} min={1000} max={100000} step={1000} />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high", "high-stock", "low-stock"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { setupInputs };
};
export const useConsultationInputs = () => {
  const dispatch = useDispatch();
  const { service_id, priceRangeC, item_name, description, numOfTimesRendered, price, sort } =
    useSelector((store) => store.consultations);
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["numOfTimesRendered", "price", "service_id"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeConsultation({ name, value: processedValue }));
  };
  const consultationInputs = [
    {
      name: "service_id",
      TextField: (
        <UserInput name={"service_id"} value={service_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "item_name",
      TextField: (
        <UserInput name={"item_name"} value={item_name} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "description",
      TextField: (
        <MultiLineInput
          name={"description"}
          value={description}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "numOfTimesRendered",
      TextField: (
        <UserInput
          name={"numOfTimesRendered"}
          value={numOfTimesRendered}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "price",
      TextField: <UserInput name={"price"} value={price} type={"number"} handleChange={getInput} />,
    },
    {
      name: "priceRangeC",
      TextField: (
        <RangeSlider name={"priceRangeC"} value={priceRangeC} min={1000} max={100000} step={1000} />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high", "high-rendered", "low-rendered"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { consultationInputs };
};
export const usePolServiceInputs = () => {
  const dispatch = useDispatch();
  const { service_id, priceRangeP, price, sort, crop_type, service_description, rendered } =
    useSelector((store) => store.polservices);
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["rendered", "price", "service_id"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangePolServ({ name, value: processedValue }));
  };
  const polServiceInputs = [
    {
      name: "service_id",
      TextField: (
        <UserInput name={"service_id"} value={service_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "crop_type",
      TextField: (
        <UserInput name={"crop_type"} value={crop_type} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "service_description",
      TextField: (
        <MultiLineInput
          name={"service_description"}
          value={service_description}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "rendered",
      TextField: (
        <UserInput name={"rendered"} value={rendered} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "price",
      TextField: <UserInput name={"price"} value={price} type={"number"} handleChange={getInput} />,
    },
    {
      name: "priceRangeP",
      TextField: (
        <RangeSlider name={"priceRangeP"} value={priceRangeP} min={1000} max={100000} step={1000} />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high", "high-rendered", "low-rendered"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { polServiceInputs };
};
export const useProvisionInputs = () => {
  const dispatch = useDispatch();
  const { service_id, priceRangeSP, price_NGN, sort, item_name, description, quantity } =
    useSelector((store) => store.provisions);
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["quantity", "price_NGN", "service_id"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeProvision({ name, value: processedValue }));
  };
  const provisionInputs = [
    {
      name: "service_id",
      TextField: (
        <UserInput name={"service_id"} value={service_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "item_name",
      TextField: (
        <UserInput name={"item_name"} value={item_name} type={"name"} handleChange={getInput} />
      ),
    },
    {
      name: "description",
      TextField: (
        <MultiLineInput
          name={"description"}
          value={description}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "quantity",
      TextField: (
        <UserInput name={"quantity"} value={quantity} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "price_NGN",
      TextField: (
        <UserInput name={"price_NGN"} value={price_NGN} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "priceRangeSP",
      TextField: (
        <RangeSlider
          name={"priceRangeSP"}
          value={priceRangeSP}
          min={1000}
          max={100000}
          step={1000}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high", "high-quantity", "low-quantity"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { provisionInputs };
};
export const useOrderInputs = () => {
  const dispatch = useDispatch();
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
  } = useSelector((store) => store.orders);
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["sippingFee", "subTotal", "total", "user_id", "tax"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeOrder({ name, value: processedValue }));
  };
  const orderInputs = [
    {
      name: "user_id",
      TextField: (
        <UserInput name={"user_id"} value={user_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "tax",
      TextField: <UserInput name={"tax"} value={tax} type={"number"} handleChange={getInput} />,
    },
    {
      name: "shippingFee",
      TextField: (
        <UserInput
          name={"shippingFee"}
          value={shippingFee}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "subTotal",
      TextField: (
        <UserInput name={"subTotal"} value={subTotal} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "total",
      TextField: <UserInput name={"total"} value={total} type={"number"} handleChange={getInput} />,
    },
    {
      name: "tx_ref",
      TextField: <UserInput name={"tx_ref"} value={tx_ref} type={"text"} handleChange={getInput} />,
    },
    {
      name: "transaction_id",
      TextField: (
        <UserInput
          name={"transaction_id"}
          value={transaction_id}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "paymentStatus",
      TextField: (
        <GenderInput
          name={"paymentStatus"}
          value={paymentStatus}
          type={"text"}
          gender={["---", "pending", "failed", "successful", "canceled"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "deliveryStatus",
      TextField: (
        <GenderInput
          name={"deliveryStatus"}
          value={deliveryStatus}
          type={"text"}
          gender={["---", "pending", "failed", "delivered", "canceled"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { orderInputs };
};
export const useReviewInputs = () => {
  const dispatch = useDispatch();
  const { product_id, user_id, rating, title, comment, sort } = useSelector(
    (store) => store.reviews
  );
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["rating", "product_id"];
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeReviews({ name, value: processedValue }));
  };
  const reviewInputs = [
    {
      name: "user_id",
      TextField: (
        <UserInput name={"user_id"} value={user_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "tax",
      TextField: (
        <UserInput name={"product_id"} value={product_id} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "rating",
      TextField: (
        <UserInput name={"rating"} value={rating} type={"number"} handleChange={getInput} />
      ),
    },
    {
      name: "title",
      TextField: <UserInput name={"title"} value={title} type={"text"} handleChange={getInput} />,
    },
    {
      name: "comment",
      TextField: (
        <MultiLineInput
          name={"comment"}
          value={comment}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { reviewInputs };
};
