import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  item_id: 1,
  item_name: "",
  description: "",
  numOfTimesRendered: 100 * 100,
  price: 100 * 100,
  priceRangeC: [1000, 1000000],
};
const setupSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    handleChangeConsultation: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateConsultation: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateConsultation: (state, { payload }) => {
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
    updatePriceRangeConsultation: (state, { payload }) => {
      return {
        ...state,
        priceRangeC: payload,
      };
    },
  },
});

export const {
  handleChangeConsultation,
  handleDateConsultation,
  handleReset,
  setUpdateConsultation,
  resetValues,
  changePage,
  updatePriceRangeConsultation,
} = setupSlice.actions;
export default setupSlice.reducer;
