import React from "react";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { CustomCharts } from "../../components";

const Overview = () => {
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
  //   console.log(honey_harvest);
  const salaryData = employees?.salaryData ?? [];
  const totalHarvestQuantity =
    honey_harvest?.totalHarvestQuantity ?? "Loading...";
  const harvestedVolumeByYear = honey_harvest?.harvestedVolumeByYear ?? [];
  const colonizationCount = hives?.colonizationCount ?? [];
  const stationLocationCount = stations?.stationLocationCount ?? [];
  const hiveCurrentLocationCount = hives?.hiveCurrentLocationCount ?? [];
  const paymentStatusCount = orders?.paymentStatusCount ?? [];
  const deliveryStatusCount = orders?.deliveryStatusCount ?? [];
  const monthlyRevenue = orders?.monthlyRevenue ?? [];
  const totalQuantity = products?.totalQuantity ?? [];
  const totalHunters = hunters?.totalHunters ?? "Loading...";
  const serviceItems = services?.service ?? [];
  const genderCount = users?.genderCount ?? [];
  const verificationCount = users?.verificationCount ?? [];
  const procesed_harv_vol = harvestedVolumeByYear.map((item) => ({
    ...item,
    harvested_volume: Number(item.harvested_volume),
  }));
  const procesed_monthly_rev = monthlyRevenue.map((item) => ({
    ...item,
    total_revenue: Number(item.total_revenue),
  }));
  //   console.log(products);
  return (
    <section>
      
      {salaryData.length > 0 ? (
        <>
          <p>Average Salary: {salaryData[0]?.avg_salary ?? "N/A"}</p>
          <p>Max Salary: {salaryData[0]?.max_salary ?? "N/A"}</p>
          <p>Min Salary: {salaryData[0]?.min_salary ?? "N/A"}</p>
        </>
      ) : (
        <p>Loading salary data...</p>
      )}
      
      <p>Total Harvest Quantity: {totalHarvestQuantity} litres</p>
      <p>Total Hunters: {totalHunters}</p>
      <div>
        Services:
        {serviceItems.length > 0 ? (
          serviceItems.map((item, i) => <p key={i}>{item.service_name}</p>)
        ) : (
          <p>Loading services...</p>
        )}
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      

      {harvestedVolumeByYear?.length > 0 ? (
        <CustomCharts
          data={procesed_harv_vol}
          xDataKey="harvest_year"
          yDataKey="harvested_volume"
        />
      ) : (
        "loading"
      )}
      {colonizationCount?.length > 0 ? (
        <CustomCharts
          data={colonizationCount}
          xDataKey="colonized"
          yDataKey="count"
        />
      ) : (
        "loading"
      )}
      {hiveCurrentLocationCount?.length > 0 ? (
        <CustomCharts
          data={hiveCurrentLocationCount}
          xDataKey="current_location"
          yDataKey="count"
        />
      ) : (
        "loading"
      )}
      {stationLocationCount?.length > 0 ? (
        <CustomCharts
          data={stationLocationCount}
          xDataKey="location"
          yDataKey="count"
        />
      ) : (
        "loading"
      )}
      {paymentStatusCount?.length > 0 ? (
        <CustomCharts
          data={paymentStatusCount}
          xDataKey="paymentStatus"
          yDataKey="count"
        />
      ) : (
        "loading"
      )}
      {deliveryStatusCount?.length > 0 ? (
        <CustomCharts
          data={deliveryStatusCount}
          xDataKey="deliveryStatus"
          yDataKey="count"
        />
      ) : (
        "loading"
      )}
      {totalQuantity?.length > 0 ? (
        <CustomCharts
          data={totalQuantity}
          xDataKey="product_type"
          yDataKey="total_quantity"
        />
      ) : (
        "loading"
      )}
      {procesed_monthly_rev?.length > 0 ? (
        <CustomCharts
          data={procesed_monthly_rev}
          xDataKey="month"
          yDataKey="total_revenue"
        />
      ) : (
        "loading"
      )}
    </section>
  );
};

export default Overview;
