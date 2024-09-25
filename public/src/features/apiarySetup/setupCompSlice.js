import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  service_id: 0,
  component_name: "",
  description: "",
  stock: 100 * 100,
  price: 100 * 100,
  priceRange: [1000, 1000000],
};
const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    handleChangeSetup: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateSetup: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateSetup: (state, { payload }) => {
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
    updatePriceRange: (state, { payload }) => {
      return {
        ...state,
        priceRange: payload,
      };
    },
  },
});

export const {
  handleChangeSetup,
  handleDateSetup,
  handleReset,
  setUpdateSetup,
  resetValues,
  changePage,
  updatePriceRange,
} = setupSlice.actions;
export default setupSlice.reducer;
