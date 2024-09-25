import { useSelector } from "react-redux";
import { handleChangeService } from "../features/services/serviceSlice";
import { useDispatch } from "react-redux";
import {
  GenderInput,
  MultiLineInput,
  RangeSlider,
  UserInput,
} from "../components";
import { handleChangeSetup } from "../features/apiarySetup/setupCompSlice";
import { handleChangeConsultation } from "../features/consultation/consultationSlice";

export const useServiceInputs = () => {
  const dispatch = useDispatch();
  const { service_name, description, numOfTimesRendered, category, sort } =
    useSelector((store) => store.services);
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
  const {
    service_id,
    priceRange,
    component_name,
    description,
    stock,
    price,
    sort,
  } = useSelector((store) => store.setups);
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
        <UserInput
          name={"service_id"}
          value={service_id}
          type={"number"}
          handleChange={getInput}
        />
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
      TextField: (
        <UserInput
          name={"stock"}
          value={stock}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "price",
      TextField: (
        <UserInput
          name={"price"}
          value={price}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "priceRange",
      TextField: (
        <RangeSlider
          name={"priceRange"}
          value={priceRange}
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
  const {
    service_id,
    priceRangeC,
    item_name,
    description,
    numOfTimesRendered,
    price,
    sort,
  } = useSelector((store) => store.consultations);
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
        <UserInput
          name={"service_id"}
          value={service_id}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "item_name",
      TextField: (
        <UserInput
          name={"item_name"}
          value={item_name}
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
      name: "price",
      TextField: (
        <UserInput
          name={"price"}
          value={price}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "priceRangeC",
      TextField: (
        <RangeSlider
          name={"priceRangeC"}
          value={priceRangeC}
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
          gender={[
            "---",
            "high-low",
            "low-high",
            "high-rendered",
            "low-rendered",
          ]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { consultationInputs };
};
