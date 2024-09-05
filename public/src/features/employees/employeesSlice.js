import { createSlice } from "@reduxjs/toolkit";
import { convertToDateOnly } from "../../../utils";
const initialState = {
  email: "",
  first_name: "",
  last_name: "",
  address: "",
  phone: "",
  gender: "",
  role: "",
  department: "",
  dob: "",
  // dob: convertToDateOnly(new Date()),
  joining_date: "",
  salary: "",
  skill: "",
  notes: "",
  employment_status: "",
  employment_type: "",
  isEdit: false,
};
const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    handelChangeEmp: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
      // console.log({
      //   email: state.email,
      //   last_name: state.last_name,
      //   first_name: state.first_name,
      //   skill: state.skill,
      //   role: state.role,
      //   notes: state.notes,
      //   address: state.address,
      //   phone: state.phone,
      //   gender: state.gender,
      //   employment_status: state.employment_status,
      //   employment_type: state.employment_type,
      //   salary: state.salary,
      //   role: state.role,
      //   department: state.department,
      // });
    },
    handlePhoneInputEmp: (state, { payload }) => {
      return {
        ...state,
        phone: payload,
      };
    },

    handleDob: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateEmployee: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const {
  handelChangeEmp,
  handlePhoneInputEmp,
  handleDob,
  handleReset,
  setUpdateEmployee,
} = employeesSlice.actions;
export default employeesSlice.reducer;
