import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/users/userSlice";
import employeesReducer from "./src/features/employees/employeesSlice";
import stationReducer from "./src/features/stations/stationSlice";
import equipmentReducer from "./src/features/equuipments/equipmentSlice";
import suppliesReducer from "./src/features/supplies/suppliesSlice";
import nokReducer from "./src/features/nok/nokSlice";
import HarvestReducer from "./src/features/harvest/honey_harvestSlice";
import HunterReducer from "./src/features/hunters/huntersSlice";
import HiveReducer from "./src/features/hives/hiveSlice";
import ReportReducer from "./src/features/catch_reports/reportSlice";
import ServiceReducer from "./src/features/services/serviceSlice";
import SetupReducer from "./src/features/apiarySetup/setupCompSlice";
import ConsultationReducer from "./src/features/consultation/consultationSlice";
const store = configureStore({
  reducer: {
    users: userReducer,
    employees: employeesReducer,
    stations: stationReducer,
    equipments: equipmentReducer,
    supplies: suppliesReducer,
    noks: nokReducer,
    harvests: HarvestReducer,
    hunters: HunterReducer,
    hives: HiveReducer,
    reports: ReportReducer,
    services: ServiceReducer,
    setups: SetupReducer,
    consultations: ConsultationReducer,
  },
});
export default store;
