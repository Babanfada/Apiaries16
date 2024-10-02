import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  service_name: "",
  description: "",
  numOfTimesRendered: 10000,
  category: "---",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    handleChangeService: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateService: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateService: (state, { payload }) => {
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
  handleChangeService,
  handleDateService,
  handleReset,
  setUpdateService,
  resetValues,
  changePage,
} = serviceSlice.actions;
export default serviceSlice.reducer;
