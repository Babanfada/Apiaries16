import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
// import employeesTableData from "layouts/tables/data/employeesTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
// import { useSingleEmployee } from "features/employees/employeesThunk";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Email } from "@mui/icons-material";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Header from "./profile/components/Header";
import PlatformSettings from "./profile/components/PlatformSettings";
import { useDispatch, useSelector } from "react-redux";
// import { useUploadEmployeeImages } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import PaginationControlled from "components copy/component's_Tables/Pagination";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
import apiarySetupTableData from "./data/apiarySetupTableData";
import { resetValues } from "features/apiarySetup/setupCompSlice";
import { SetupSearchModal } from "components copy";
import { useSetupInputs } from "hooks/ServicesDetails";
import { useUpdateSetup } from "features/apiarySetup/setupCompThunk";
import { useCreateSetup } from "features/apiarySetup/setupCompThunk";
import { changePage } from "features/apiarySetup/setupCompSlice";

function Setup() {
  const { columns, rows, numOfPages, count, refetch, isGettingAllSetupComp, totalSetupComp } =
    apiarySetupTableData();
  const dispatch = useDispatch();
  const { service_id, component_name, description, stock, price, sort, pages, priceRange } =
    useSelector((store) => store.setups);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [pages, service_id, component_name, description, stock, price, sort, priceRange]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Setup
                  {count}/{totalSetupComp}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdatesetup/add">
                    create setup
                  </Link>
                  <SetupSearchModal isGettingAllSetupComp={isGettingAllSetupComp} />
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
            <PaginationControlled pageDetails={{ handleChange, numOfPages, pages }} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Setup;

export const CreateUpdateSetup = () => {
  const { id } = useParams();
  const { setupInputs } = useSetupInputs();
  const { isUpdatingSetup, updateSetup } = useUpdateSetup();
  const { createSetup, isCreatingSetup } = useCreateSetup();
  const { service_id, component_name, description, stock, price, isEdit } = useSelector(
    (store) => store.setups
  );
  const setupDetails = {
    service_id,
    component_name,
    description,
    stock,
    price,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(setupDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateSetup({ setupDetails, id });
    createSetup(setupDetails);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox mb={2} /> */}
      {/* <Header info={{ image, first_name, last_name, role }}> */}
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <div>
              <Link to={`/setups`}>Go back</Link>

              <form onSubmit={handleSubmit}>
                {setupInputs
                  .filter((detail) => detail.name !== "sort" && detail.name !== "priceRange")
                  .map((detail) => {
                    const { name, TextField } = detail;
                    return <div key={name}>{TextField}</div>;
                  })}
                <CustomButton
                  background={"#1212121F"}
                  backgroundhover={"#59d9d9"}
                  size={"100%"}
                  height={"3vh"}
                  type="submit"
                  // disabled={!isValid}
                >
                  {isCreatingSetup === "pending" || isUpdatingSetup === "pending" ? (
                    <Loader1 />
                  ) : isEdit ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </CustomButton>
              </form>
            </div>
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
        </Grid>
      </MDBox>
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
};
