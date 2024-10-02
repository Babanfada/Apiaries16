import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  emp_id: 0,
  fullname: "",
  email: "",
  address: "",
  phone: "",
  gender: "---",
  relationship: "---",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const nokSlice = createSlice({
  name: "nok",
  initialState,
  reducers: {
    handelChangeNok: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    handlePhoneInputNok: (state, { payload }) => {
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
    setUpdateNok: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
  },
});

export const {
  handelChangeNok,
  handlePhoneInputNok,
  handleDob,
  handleReset,
  setUpdateNok,
  resetValues,
  changePage,
} = nokSlice.actions;
export default nokSlice.reducer;
