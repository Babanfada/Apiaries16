import React from "react";
import { useAllEmployess } from "../features/employees/employeesThunk";
import { useCurrentUser, usegetAllUser } from "../features/users/userThunk";
import { useAllNok } from "../features/nok/nokThunk";
import { useStations } from "../features/stations/stationsThunk";
import { useHoneyHarvest } from "../features/harvest/honey_harvestThunk";
import { useHunters } from "../features/hunters/hunters";
import { useHives } from "../features/hives.js/hivesThunk";
import { useReports } from "../features/catch_reports/reportsThunk";
import { useEquipments } from "../features/equuipments/equipmentThunk";
import { useSupplies } from "../features/supplies/suppliesThunk";
import { useOrders } from "../features/orders/ordersThunk";
import { useProducts } from "../features/products/productthunk";
import { useReviews } from "../features/reviews/reviewsThunk";
import { useServices } from "../features/services/servicesThunk";
import { useSetupComp } from "../features/apiarySetup/setupCompThunk";
import { useConsultation } from "../features/consultation/consultationThunk";
import { usePolServices } from "../features/pollination/polservicesThunk";
import { useSupplyProvision } from "../features/supplyProvision/supplyprovThunk";
const dataContext = React.createContext({});
const GlobalContext = ({ children }) => {
  const { isGettingAllEmployees, employees } = useAllEmployess();
  const { isGettingAllUser, users } = usegetAllUser();
  const { isCheckingCurrentUser, currentUser } = useCurrentUser();
  const { isGettingAllNok, noks } = useAllNok();
  const { isGettingStations, stations } = useStations();
  const { isGettingAllHarvest, honey_harvest } = useHoneyHarvest();
  const { isGettingAllHunters, hunters } = useHunters();
  const { isGettingAllHives, hives } = useHives();
  const { isGettingAllReports, catch_reports } = useReports();
  const { isGettingAllequipments, equipments } = useEquipments();
  const { isGettingAllSupplies, supplies } = useSupplies();
  const { isGettingAllOrders, orders } = useOrders();
  const { isGettingAllProducts, products } = useProducts();
  const { isGettingAllReviews, reviews } = useReviews();
  const { isGettingAllServices, services } = useServices();
  const { isGettingAllSetupComp, setupComp } = useSetupComp();
  const { isGettingAllC_Items, c_items } = useConsultation();
  const { isGettingAllPolServices, polservices } = usePolServices();
  const { isGettingAllprovisions, supplyProvision } = useSupplyProvision();
  const values = {
    isGettingAllEmployees,
    isGettingAllUser,
    isGettingAllNok,
    isGettingAllHunters,
    isGettingAllHarvest,
    isGettingAllHives,
    isCheckingCurrentUser,
    isGettingAllReports,
    isGettingStations,
    isGettingAllequipments,
    isGettingAllSupplies,
    isGettingAllOrders,
    isGettingAllProducts,
    isGettingAllReviews,
    isGettingAllServices,
    isGettingAllSetupComp,
    isGettingAllC_Items,
    isGettingAllPolServices,
    isGettingAllprovisions,
    supplyProvision,
    polservices,
    c_items,
    setupComp,
    services,
    reviews,
    products,
    orders,
    supplies,
    equipments,
    employees,
    users,
    currentUser,
    noks,
    stations,
    honey_harvest,
    hunters,
    hives,
    catch_reports,
  };

  return (
    <dataContext.Provider value={{ ...values }}>
      {children}
    </dataContext.Provider>
  );
};
export const useGlobalContext = () => {
  return React.useContext(dataContext);
};
export default GlobalContext;
