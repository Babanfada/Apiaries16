import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  product_name: "",
  product_type: "---",
  description: "",
  quantity: 10000,
  unit: "",
  total_in_stock: 10000,
  harvest_year: "",
  packaging_type: "",
//   numOfTimesSold: 0,
  price: 100 * 100,
  priceRangePP: [1000, 1000000],
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleChangeProducts: (state, { payload }) => {
      //   console.log(payload);
      //   console.log({ name: state.product_name });
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateProducts: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateProduct: (state, { payload }) => {
      const { available } = payload;
      return {
        ...state,
        ...payload,
        isEdit: true,
        available: available ? "available" : "not available",
      };
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    updatePriceRangeProduct: (state, { payload }) => {
      return {
        ...state,
        priceRangePP: payload,
      };
    },
  },
});

export const {
  handleChangeProducts,
  handleDateProducts,
  handleReset,
  setUpdateProduct,
  resetValues,
  changePage,
  updatePriceRangeProduct,
} = productSlice.actions;
export default productSlice.reducer;
