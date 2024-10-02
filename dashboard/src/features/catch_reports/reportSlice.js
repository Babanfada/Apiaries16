import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  hunter_id: 0,
  assigned_supervisor: 0,
  total_boxes_assigned: 10 * 10,
  colonized_boxes: 10 * 10,
  uncolonized_boxes: 10 * 10,
  delivered_to_apiary: "---",
  date_assigned: "",
  catch_date: "",
  catch_location: "",
  catch_status: "---",
  season: "---",
  sort: "---",
  notes: "",
  isEdit: false,
  pages: 1,
};
const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    handleChangeReport: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateReport: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateReport: (state, { payload }) => {
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
  handleChangeReport,
  handleDateReport,
  handleReset,
  setUpdateReport,
  resetValues,
  changePage,
} = reportSlice.actions;
export default reportSlice.reducer;
