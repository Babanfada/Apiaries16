import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  user_id: 100 * 100,
  tax: 100 * 100,
  shippingFee: 100 * 1000,
  subTotal: 100 * 1000,
  total: 100 * 1000,
  paymentStatus: "---",
  deliveryStatus: "---",
  tx_ref: "",
  transaction_id: "",
};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    handleChangeOrder: (state, { payload }) => {
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
      // console.log(state.pages)
    },
    // handleDateHunter: (state, { payload }) => {
    //   const { name, date } = payload;
    //   state[name] = date;
    // },
    setUpdateOrder: (state, { payload }) => {
      console.log(state.isEdit);
      return { ...state, ...payload, isEdit: true };
    },
    // handlePhoneInput: (state, { payload }) => {
    //   return {
    //     ...state,
    //     phone: payload,
    //   };
    // },
    // handleEmerInput: (state, { payload }) => {
    //   return {
    //     ...state,
    //     emergency_contact: payload,
    //   };
    // },
  },
});

export const {
  handleChangeOrder,
  resetValues,
  changePage,
  //   handleDateHunter,
  setUpdateOrder,
  //   handlePhoneInput,
  //   handleEmerInput,
} = orderSlice.actions;
export default orderSlice.reducer;
