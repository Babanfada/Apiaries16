import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  harvest_year: 2000,
  station_id: 1,
  station_name: "",
  harvest_date: "",
  quantity_collected: 100 * 100,
  colouration: "",
  unit: "---",
  quality_rating: 5,
  note: "",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const harvestSlice = createSlice({
  name: "honey_harvest",
  initialState,
  reducers: {
    handleChangeHarv: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
      //   console.log({ year: state.harvest_year });
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    handleDateHarv: (state, { payload }) => {
      const { name, date } = payload;
      state[name] = date;
      //   console.log({ purchase_date: state.purchase_date });
    },
    setUpdateHarvest: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const { handleChangeHarv, resetValues, changePage, handleDateHarv, setUpdateHarvest } =
  harvestSlice.actions;
export default harvestSlice.reducer;
