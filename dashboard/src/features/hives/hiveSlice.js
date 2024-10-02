import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  assigned_hunter: 0,
  hive_type: "---",
  num_of_frames: 20,
  colonized: "---",
  status: "---",
  use_condition: "---",
  first_installation: "",
  current_location: "---",
  last_inspection_date: "",
  note: "",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const hiveSlice = createSlice({
  name: "hives",
  initialState,
  reducers: {
    handleChangeHive: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
      console.log({
        status: state.status,
        use_condition: state.use_condition,
        current_location: state.current_location,
        colonized: state.colonized,
        hive_type: state.hive_type,
      });
    },

    handleDateHive: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateHive: (state, { payload }) => {
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
  handleChangeHive,
  handleDateHive,
  handleReset,
  setUpdateHive,
  resetValues,
  changePage,
} = hiveSlice.actions;
export default hiveSlice.reducer;
