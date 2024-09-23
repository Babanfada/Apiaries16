import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  assigned_supervisor: 0,
  fullname: "",
  phone: "",
  email: "",
  joining_date: "",
  tip: 1000 * 1000,
  employment_status: "---",
  emergency_contact_name: "",
  emergency_contact: "",
  notes: "",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const hunterSlice = createSlice({
  name: "swarm_hunters",
  initialState,
  reducers: {
    handleChangeHunter: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
      // console.log(state.pages)
    },
    handleDateHunter: (state, { payload }) => {
      const { name, date } = payload;
      state[name] = date;
    },
    setUpdateHunter: (state, { payload }) => {
      console.log(state.isEdit);
      return { ...state, ...payload, isEdit: true };
    },
    handlePhoneInput: (state, { payload }) => {
      return {
        ...state,
        phone: payload,
      };
    },
    handleEmerInput: (state, { payload }) => {
      return {
        ...state,
        emergency_contact: payload,
      };
    },
  },
});

export const {
  handleChangeHunter,
  resetValues,
  changePage,
  handleDateHunter,
  setUpdateHunter,
  handlePhoneInput,
  handleEmerInput,
} = hunterSlice.actions;
export default hunterSlice.reducer;
