import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/users/userSlice";
import employeesReducer from "./src/features/employees/employeesSlice";
const store = configureStore({
  reducer: {
    users: userReducer,
    employees: employeesReducer,
  },
});
export default store;
