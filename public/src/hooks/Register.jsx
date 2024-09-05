import React from "react";
import {
  DateRegister,
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
import {
  handelChangeEmp,
  handleDob,
  handlePhoneInputEmp,
} from "../features/employees/employeesSlice";
import { convertToDateOnly } from "../../utils";

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

// function convertToDateOnly(dateString) {
//   return dateString.split("T")[0];
// }
export const useEmployee = () => {
  const {
    email,
    first_name,
    last_name,
    address,
    phone,
    gender,
    role,
    department,
    dob,
    joining_date,
    salary,
    skill,
    notes,
    employment_status,
    employment_type,
  } = useSelector((store) => store.employees);
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
      // if (!isValidEmail) return;
    }
    if (name === "salary") {
      value = Number(e.target.value);
      return dispatch(handelChangeEmp({ name, value }));
    }
    dispatch(handelChangeEmp({ name, value }));
  };
  const getPhoneNumber = (phone) => {
    dispatch(handlePhoneInputEmp(phone));
  };

  ////////

  // const [formData, setFormData] = useState({
  //   startDate: new Date(),
  //   endDate: null,
  // });

  // const handleDateChange = (name, date) => {
  //   setFormData({
  //     ...formData,
  //     [name]: date,
  //   });
  // };

  // const getDob = (name, date) => {
  //   dispatch(handleDob({ name, date }));
  // };
  // console.log({ joining_date, dob });
  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDob({ name, date: formattedDate }));
    // const date = value.getTime(); // Convert Date to timestamp
    // dispatch(handleDob({ name, date }));
  };

  const employeeDetails = [
    {
      name: "first_name",
      TextField: (
        <UserInput
          name={"first_name"}
          value={first_name}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "last_name",
      TextField: (
        <UserInput
          name={"last_name"}
          value={last_name}
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
          gender={["male", "female"]}
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
    {
      name: "dob",
      TextField: <DateRegister name={"dob"} value={dob} onChange={getDob} />,
    },
    {
      name: "joining_date",
      TextField: (
        <DateRegister
          name={"joining_date"}
          value={joining_date}
          onChange={getDob}
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
      name: "role",
      TextField: (
        <UserInput
          name={"role"}
          value={role}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "department",
      TextField: (
        <GenderInput
          name={"department"}
          value={department}
          type={"text"}
          gender={["beekeeping", "operation", "administration"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "salary",
      TextField: (
        <UserInput
          name={"salary"}
          value={salary}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "employment_status",
      TextField: (
        <GenderInput
          name={"employment_status"}
          value={employment_status}
          type={"text"}
          gender={["active", "inactive", "terminated"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "employment_type",
      TextField: (
        <GenderInput
          name={"employment_type"}
          value={employment_type}
          type={"text"}
          gender={["full staff", "contract staff", "station supervisor(ext)"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "skill",
      TextField: (
        <MultiLineInput
          name={"skill"}
          value={skill}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "notes",
      TextField: (
        <MultiLineInput
          name={"notes"}
          value={notes}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { employeeDetails };
};
