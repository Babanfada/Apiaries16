import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/users/userSlice";
import employeesReducer from "./src/features/employees/employeesSlice";
import stationReducer from "./src/features/stations/stationSlice";
import equipmentReducer from "./src/features/equuipments/equipmentSlice";
import suppliesReducer from "./src/features/supplies/suppliesSlice";
import nokReducer from "./src/features/nok/nokSlice";
import HarvestReducer from "./src/features/harvest/honey_harvestSlice";
const store = configureStore({
  reducer: {
    users: userReducer,
    employees: employeesReducer,
    stations: stationReducer,
    equipments: equipmentReducer,
    supplies: suppliesReducer,
    noks: nokReducer,
    harvests: HarvestReducer,
  },
});
export default store;
