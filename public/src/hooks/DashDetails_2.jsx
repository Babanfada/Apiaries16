import React from "react";
import { useDispatch } from "react-redux";
import { handelChangeNok, handlePhoneInputNok } from "../features/nok/nokSlice";
import {
  DateRegister,
  GenderInput,
  MultiLineInput,
  PhoneInputs,
  UserInput,
} from "../components";
import { useSelector } from "react-redux";
import {
  handleChangeHarv,
  handleDateHarv,
} from "../features/harvest/honey_harvestSlice";
import { convertToDateOnly } from "../../utils";
export const useNok = () => {
  const { emp_id, fullname, email, address, phone, gender, relationship } =
    useSelector((store) => store.noks);
  const dispatch = useDispatch();
  const [validationError, setValidationError] = React.useState(false);
  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["emp_id"];
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 1) {
      processedValue = 1;
    }
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setValidationError(!isValidEmail);
    }
    dispatch(handelChangeNok({ name, value: processedValue }));
  };

  const getPhoneNumber = (phone) => {
    dispatch(handlePhoneInputNok(phone));
  };
  const nokDetails = [
    {
      name: "emp_id",
      TextField: (
        <UserInput
          name={"emp_id"}
          value={emp_id}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "fullname",
      TextField: (
        <UserInput
          name={"fullname"}
          value={fullname}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "email",
      TextField: (
        <UserInput
          name={"email"}
          value={email}
          type={"email"}
          handleChange={getInput}
          validationError={validationError}
          message={"Please provide a valid email address"}
        />
      ),
    },
    {
      name: "address",
      TextField: (
        <MultiLineInput
          name={"address"}
          value={address}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "gender",
      TextField: (
        <GenderInput
          name={"gender"}
          value={gender}
          type={"text"}
          gender={["---", "male", "female"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "relationship",
      TextField: (
        <GenderInput
          name={"relationship"}
          value={relationship}
          type={"text"}
          gender={["---", "spouse", "parent", "guardian", "sibling"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "phone",
      TextField: (
        <PhoneInputs
          name={"phone"}
          value={phone}
          type={"tel"}
          handleChange={getPhoneNumber}
        />
      ),
    },
  ];
  return { nokDetails };
};

export const useHarvest = () => {
  const {
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
  } = useSelector((store) => store.harvests);
  const dispatch = useDispatch();
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "station_id",
      "quantity_collected",
      "quality_rating",
      "harvest_year",
    ];
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 1) {
      processedValue = 1;
    }
    if (name === "quality_rating") {
      if (processedValue < 1) {
        processedValue = 1;
      } else if (processedValue > 5) {
        processedValue = 5;
      }
    }
    dispatch(handleChangeHarv({ name, value: processedValue }));
  };

  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDateHarv({ name, date: formattedDate }));
  };
  const harvestInputs = [
    {
      name: "harvest_year",
      TextField: (
        <UserInput
          name={"harvest_year"}
          value={harvest_year}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "station_id",
      TextField: (
        <UserInput
          name={"station_id"}
          value={station_id}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "station_name",
      TextField: (
        <UserInput
          name={"station_name"}
          value={station_name}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "harvest_date",
      TextField: (
        <DateRegister
          name={"harvest_date"}
          value={harvest_date}
          onChange={getDob}
        />
      ),
    },
    {
      name: "quantity_collected",
      TextField: (
        <UserInput
          name={"quantity_collected"}
          value={quantity_collected}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "colouration",
      TextField: (
        <UserInput
          name={"colouration"}
          value={colouration}
          type={"colouration"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "unit",
      TextField: (
        <GenderInput
          name={"unit"}
          value={unit}
          type={"text"}
          gender={["---", "litres", "kg"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "quality_rating",
      TextField: (
        <UserInput
          name={"quality_rating"}
          value={quality_rating}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "note",
      TextField: (
        <MultiLineInput
          name={"note"}
          value={note}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { harvestInputs };
};
