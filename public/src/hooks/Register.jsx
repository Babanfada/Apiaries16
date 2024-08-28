import React from "react";
import {
  GenderInput,
  MultiLineInput,
  PasswordInput,
  PhoneInputs,
  Subscribe,
  UserInput,
} from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handelChange, handlePhoneInput } from "../features/users/userSlice";

const useRegister = () => {
  const {
    email,
    fullname,
    password,
    address,
    phone,
    gender,
    emailNotification,
  } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const [validationError, setValidationError] = React.useState(false);
  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const getInput = (e) => {
    const { name } = e.target;
    let value;
    value = e.target.value;
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setValidationError(!isValidEmail);
    }
    if (name === "emailNotification") {
      value = e.target.checked;
      return dispatch(handelChange({ name, value }));
    }
    dispatch(handelChange({ name, value }));
  };

  //   const getPhoneNumber = (phone) => {
  //     // console.log(e.target.name)
  //     const { name, value } = e.target;
  //     dispatch(handelChange({ name, value }));
  //   };
  const getPhoneNumber = (phone) => {
    dispatch(handlePhoneInput(phone));
  };
  const status = {
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
  };

  const userDetails = [
    {
      name: "fullname",
      TextField: (
        <UserInput
          name={"fullname"}
          value={fullname}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },

    {
      name: "password",
      TextField: (
        <PasswordInput
          name={"password"}
          value={password}
          type={"password"}
          handleChange={getInput}
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
          gender={["Male", "Female"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "subscribe",
      TextField: (
        <Subscribe
          name={"emailNotification"}
          value={emailNotification}
          type={"checkbox"}
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
  return { status, userDetails };
};

export default useRegister;
