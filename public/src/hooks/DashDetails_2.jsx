import React from "react";
import { useDispatch } from "react-redux";
import { handelChangeNok, handlePhoneInputNok } from "../features/nok/nokSlice";
import {
  GenderInput,
  MultiLineInput,
  PhoneInputs,
  UserInput,
} from "../components";
import { useSelector } from "react-redux";
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
