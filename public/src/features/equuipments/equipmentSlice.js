import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tool_name: "",
  category: "---",
  quantity: "",
  status: "---",
  storage_location: "---",
  supplier: "",
  purchase_date: "",
  purchase_cost: "",
  currency: "",
  last_maintanace_date: "",
  next_maintanace_date: "",
  retired: "---",
  note: "",
  isEdit: false,
  pages: 1,
};
const equipmentSlice = createSlice({
  name: "equipments",
  initialState,
  reducers: {
    handleChangeEquip: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
      console.log({
        //     tool_name: state.tool_name,
        //     category: state.category,
        //     quantity: state.quantity,
        //     status: state.status,
        //     storage_location: state.storage_location,
        //     note: state.note,
        //     supplier: state.supplier,
        //     purchase_date: state.purchase_date,
        //     purchase_cost: state.purchase_cost,
        currency: state.currency,
        retired: state.retired,
        //     last_maintanace_date: state.last_maintanace_date,
        //     next_maintanace_date: state.next_maintanace_date,
        //     isEdit: state.currency,
      });
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    handleDate: (state, { payload }) => {
      const { name, date } = payload;
      state[name] = date;
      //   console.log({ purchase_date: state.purchase_date });
    },
    setUpdateEquipment: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const {
  handleChangeEquip,
  resetValues,
  changePage,
  handleDate,
  setUpdateEquipment,
} = equipmentSlice.actions;
export default equipmentSlice.reducer;
