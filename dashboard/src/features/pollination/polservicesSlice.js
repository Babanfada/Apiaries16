import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  service_id: 1,
  crop_type: "",
  service_description: "",
  rendered: 100 * 100,
  price: 100 * 100,
  priceRangeP: [1000, 1000000],
};
const setupSlice = createSlice({
  name: "pollination service",
  initialState,
  reducers: {
    handleChangePolServ: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDatePolServ: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdatePolServ: (state, { payload }) => {
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
    updatePriceRangePolServ: (state, { payload }) => {
      return {
        ...state,
        priceRangeP: payload,
      };
    },
  },
});

export const {
  handleChangePolServ,
  handleDatePolServ,
  handleReset,
  setUpdatePolServ,
  resetValues,
  changePage,
  updatePriceRangePolServ,
} = setupSlice.actions;
export default setupSlice.reducer;
