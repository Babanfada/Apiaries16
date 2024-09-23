import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  station_name: "",
  supervisor_int: 0,
  supervisor_ext: 0,
  location: "",
  longitude: "",
  latitude: "",
  station_size: "---",
  number_of_hive_boxes: 0,
  status: "---",
  station_maintainace_history: "",
  last_inspection_date: "",
  next_inspection_date: "",
  notes: "",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const stationSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    handelChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
      //   console.log({
      //     station_name: state.station_name,
      //     location: state.location,
      //     longitude: state.longitude,
      //     latitude: state.latitude,
      //     status: state.status,
      //     notes: state.notes,
      //     number_of_hive_boxes: state.number_of_hive_boxes,
      //     supervisor_int: state.supervisor_int,
      //     supervisor_ext: state.supervisor_ext,
      //     station_size:state.station_size
      //   });
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    handleDob: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    setUpdateStation: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const {
  handelChange,
  resetValues,
  changePage,
  handleDob,
  setUpdateStation,
} = stationSlice.actions;
export default stationSlice.reducer;
