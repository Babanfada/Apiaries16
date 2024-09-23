import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  supply_id: "",
  supply_name: "",
  category: "---",
  quantity: "",
  status: "---",
  storage_location: "---",
  supplier: "",
  minimum_stock_level: "",
  purchase_date: "",
  purchase_cost: "",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const suppliesSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {
    handleChangeSupp: (state, { payload }) => {
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
    },
    handleDateSupp: (state, { payload }) => {
      const { name, date } = payload;
      state[name] = date;
      //   console.log({ purchase_date: state.purchase_date });
    },
    setUpdateSupplies: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const {
  handleChangeSupp,
  resetValues,
  changePage,
  handleDateSupp,
  setUpdateSupplies,
} = suppliesSlice.actions;
export default suppliesSlice.reducer;
