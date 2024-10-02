import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import employeesReducer from "./features/employees/employeesSlice";
import stationReducer from "./features/stations/stationSlice";
import equipmentReducer from "./features/equuipments/equipmentSlice";
import suppliesReducer from "./features/supplies/suppliesSlice";
import nokReducer from "./features/nok/nokSlice";
import HarvestReducer from "./features/harvest/honey_harvestSlice";
import HunterReducer from "./features/hunters/huntersSlice";
import HiveReducer from "./features/hives/hiveSlice";
import ReportReducer from "./features/catch_reports/reportSlice";
import ServiceReducer from "./features/services/serviceSlice";
import SetupReducer from "./features/apiarySetup/setupCompSlice";
import ConsultationReducer from "./features/consultation/consultationSlice";
import PolServReducer from "./features/pollination/polservicesSlice";
import ProvisionReducer from "./features/supplyProvision/supplyProvSlice";
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
    polservices: PolServReducer,
    provisions: ProvisionReducer,
  },
});
export default store;
