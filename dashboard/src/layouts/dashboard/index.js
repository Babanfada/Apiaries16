/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
// import { useGlobalContext } from "hooks/GlobalContext";
import Loader from "components copy/Loader";
import { CustomCharts } from "components copy";
import React from "react";
import { useAllEmployess } from "features/employees/employeesThunk";
import { usegetAllUser } from "features/users/userThunk";
// import { useCurrentUser } from "features/users/userThunk";
// import { useAllNok } from "features/nok/nokThunk";
import { useStations } from "features/stations/stationsThunk";
import { useHoneyHarvest } from "features/harvest/honey_harvestThunk";
import { useHunters } from "features/hunters/huntersThunk";
import { useHives } from "features/hives/hivesThunk";
import { useOrders } from "features/orders/ordersThunk";
import { useProducts } from "features/products/productthunk";
import { useServices } from "features/services/servicesThunk";

function Dashboard() {
  const { isGettingAllEmployees, employees } = useAllEmployess();
  const { isGettingAllUser, users } = usegetAllUser();
  // const { isCheckingCurrentUser, currentUser } = useCurrentUser();
  // const { isGettingAllNok, noks } = useAllNok();
  const { isGettingStations, stations } = useStations();
  const { isGettingAllHarvest, honey_harvest } = useHoneyHarvest();
  const { isGettingAllHunters, hunters } = useHunters();
  const { isGettingAllHives, hives, refetch: refecthHives } = useHives();
  // const { isGettingAllReports, catch_reports } = useReports();
  // const { isGettingAllequipments, equipments } = useEquipments();
  // const { isGettingAllSupplies, supplies } = useSupplies();
  const { isGettingAllOrders, orders } = useOrders();
  const { isGettingAllProducts, products } = useProducts();
  // const { isGettingAllReviews, reviews } = useReviews();
  const { isGettingAllServices, services } = useServices();
  // const { isGettingAllSetupComp, setupComp } = useSetupComp();
  // const { isGettingAllC_Items, c_items } = useConsultation();
  // const { isGettingAllPolServices, polservices } = usePolServices();
  // const { isGettingAllprovisions, supplyProvision } = useSupplyProvision();

  const totalEmployees = employees?.totalEmployees ?? <Loader />;
  const totalStations = stations?.totalStations ?? <Loader />;
  const totalHives = stations?.totalHives ?? <Loader />;
  const totalUsers = users?.totalUsers ?? <Loader />;
  const salaryData = employees?.salaryData ?? [];
  const totalHarvestQuantity = honey_harvest?.totalHarvestQuantity ?? <Loader />;
  const harvestedVolumeByYear = honey_harvest?.harvestedVolumeByYear ?? [];
  const colonizationCount = hives?.colonizationCount ?? [];
  const stationLocationCount = stations?.stationLocationCount ?? [];
  const hiveCurrentLocationCount = hives?.hiveCurrentLocationCount ?? [];
  const paymentStatusCount = orders?.paymentStatusCount ?? [];
  const deliveryStatusCount = orders?.deliveryStatusCount ?? [];
  const monthlyRevenue = orders?.monthlyRevenue ?? [];
  const totalQuantity = products?.totalQuantity ?? [];
  const totalHunters = hunters?.totalHunters ?? <Loader />;
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="supervised_user_circle"
                title="Employees"
                count={totalEmployees}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="group"
                title=" Users"
                count={totalUsers}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="business"
                title="Apiary Stations"
                count={totalStations}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="hive"
                title="Hives"
                count={totalHives}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="people_alt"
                title="Female"
                count={`${genderCount.length > 0 && genderCount[1] ? genderCount[1].count : "N/A"}`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Male: ${
                    genderCount.length > 0 && genderCount[0] ? genderCount[0].count : "N/A"
                  }`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="local_activity"
                title="Swarm Hunters"
                count={totalHunters}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="emoji_nature"
                title="Total Harvest"
                count={totalHarvestQuantity}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="monetization_on"
                title="Average wage"
                count={`# ${Number(salaryData[0]?.avg_salary).toFixed(2) ?? "N/A"}`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `minimum wage: ${Number(salaryData[0]?.min_salary).toFixed(2) ?? "N/A"}`,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                {/* <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                /> */}
                {harvestedVolumeByYear?.length > 0 ? (
                  <CustomCharts
                    data={procesed_harv_vol}
                    xDataKey="harvest_year"
                    yDataKey="harvested_volume"
                    title="Honey Harvest"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                {/* <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                /> */}
                {colonizationCount?.length > 0 ? (
                  <CustomCharts
                    title="Colonization"
                    data={colonizationCount}
                    xDataKey="colonized"
                    yDataKey="count"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                {/* <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  // chart={colonizationCount}
                  chart={tasks}
                /> */}
                {hiveCurrentLocationCount?.length > 0 ? (
                  <CustomCharts
                    data={hiveCurrentLocationCount}
                    xDataKey="current_location"
                    yDataKey="count"
                    title="Hive location"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                {stationLocationCount?.length > 0 ? (
                  <CustomCharts
                    title="Stations"
                    data={stationLocationCount}
                    xDataKey="location"
                    yDataKey="count"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                {paymentStatusCount?.length > 0 ? (
                  <CustomCharts
                    data={paymentStatusCount}
                    xDataKey="paymentStatus"
                    yDataKey="count"
                    title="Payment"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                {deliveryStatusCount?.length > 0 ? (
                  <CustomCharts
                    data={deliveryStatusCount}
                    xDataKey="deliveryStatus"
                    yDataKey="count"
                    title="Delivery"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                {totalQuantity?.length > 0 ? (
                  <CustomCharts
                    data={totalQuantity}
                    xDataKey="product_type"
                    yDataKey="total_quantity"
                    title="Products"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                {procesed_monthly_rev?.length > 0 ? (
                  <CustomCharts
                    data={procesed_monthly_rev}
                    xDataKey="month"
                    yDataKey="total_revenue"
                    title="Monthly Revenue"
                  />
                ) : (
                  "loading"
                )}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
