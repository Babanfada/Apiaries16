import React from "react";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../../hooks/AdminRelated";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/GlobalContext";
// import { DisplaySettings } from "@mui/icons-material";

const Home = () => {
  const { adminLinks } = useAdmin();
  //   const { isGettingAllprovisions, supplyProvision } = useGlobalContext();
  //   console.log(isGettingAllprovisions, supplyProvision);
  return (
    <section>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Display />
        {adminLinks.map((item, i) => {
          const { name, link } = item;
          return (
            <Link key={i} to={link}>
              {name}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </section>
  );
};
const Display = () => {
  const {
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
  } = useGlobalContext();

  const totalEmployees = employees?.totalEmployees ?? "Loading...";
  const salaryData = employees?.salaryData ?? [];
  const totalStations = stations?.totalStations ?? "Loading...";
  const totalHives = stations?.totalHives ?? "Loading...";
  const totalHarvestQuantity =
    honey_harvest?.totalHarvestQuantity ?? "Loading...";
  const totalHunters = hunters?.totalHunters ?? "Loading...";
  const serviceItems = services?.service ?? [];
  const genderCount = users?.genderCount ?? [];
  const verificationCount = users?.verificationCount ?? [];
  const totalUsers = users?.totalUsers ?? "Loading...";

  return (
    <section>
      <p>Total Employees: {totalEmployees}</p>
      {salaryData.length > 0 ? (
        <>
          <p>Average Salary: {salaryData[0]?.avg_salary ?? "N/A"}</p>
          <p>Max Salary: {salaryData[0]?.max_salary ?? "N/A"}</p>
          <p>Min Salary: {salaryData[0]?.min_salary ?? "N/A"}</p>
        </>
      ) : (
        <p>Loading salary data...</p>
      )}
      <p>Total Stations: {totalStations}</p>
      <p>Total Hives: {totalHives}</p>
      <p>Total Harvest Quantity: {totalHarvestQuantity} litres</p>
      <p>Total Hunters: {totalHunters}</p>
      <p>
        Services:
        {serviceItems.length > 0 ? (
          serviceItems.map((item, i) => <p key={i}>{item.service_name}</p>)
        ) : (
          <p>Loading services...</p>
        )}
      </p>
      <p>
        Gender:
        {genderCount.length > 0 ? (
          genderCount.map((item, i) => (
            <p key={i}>
              {item.gender}: {item.count}
            </p>
          ))
        ) : (
          <p>Loading gender count...</p>
        )}
      </p>
      <p>
        Verified Users:
        {verificationCount.length > 0 ? (
          verificationCount.map((item, i) => (
            <p key={i}>
              {item.isVerified ? "Verified" : "Not Verified"}: {item.count}
            </p>
          ))
        ) : (
          <p>Loading verification count...</p>
        )}
      </p>
      <p>Total Users: {totalUsers}</p>
    </section>
  );
};

export default Home;
