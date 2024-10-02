import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  item_id: 1,
  item_name: "",
  description: "",
  quantity: 100 * 100,
  price: 100 * 100,
  priceRangeSP: [1000, 1000000],
};
const setupSlice = createSlice({
  name: "supply provisions",
  initialState,
  reducers: {
    handleChangeProvision: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateProvision: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateProvision: (state, { payload }) => {
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
    updatePriceRangeProvision: (state, { payload }) => {
      return {
        ...state,
        priceRangeSP: payload,
      };
    },
  },
});

export const {
  handleChangeProvision,
  handleDateProvision,
  handleReset,
  setUpdateProvision,
  resetValues,
  changePage,
  updatePriceRangeProvision,
} = setupSlice.actions;
export default setupSlice.reducer;
