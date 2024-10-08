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
import { changePage } from "features/supplyProvision/supplyProvSlice";
import { resetValues } from "features/supplyProvision/supplyProvSlice";
import { ProvisionSearchModal } from "components copy";
import provisionsTableData from "./data/provisionsTableData";
import { useProvisionInputs } from "hooks/ServicesDetails";
import { useUpdateProvision } from "features/supplyProvision/supplyprovThunk";
import { useCreateProvision } from "features/supplyProvision/supplyprovThunk";

function Provisions() {
  const dispatch = useDispatch();
  const { rows, numOfPages, refetch, count, columns, isGettingAllprovisions, totalProvisions } =
    provisionsTableData();

  const { item_id, item_name, description, quantity, price, sort, pages, priceRangeSP } =
    useSelector((store) => store.provisions);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [pages, item_id, item_name, description, quantity, price, sort, priceRangeSP]);

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
                  Provisions
                  {count}/{totalProvisions}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdateprovision/add">
                    create provision
                  </Link>
                  <ProvisionSearchModal isGettingAllprovisions={isGettingAllprovisions} />
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
export default Provisions;

export const CreateUpdateProvision = () => {
  const { id } = useParams();
  const { provisionInputs } = useProvisionInputs();
  const { isUpdatingProvision, updateProvision } = useUpdateProvision();
  const { createProvision, isCreatingProvision } = useCreateProvision();
  const { service_id, item_name, description, quantity, price_NGN, isEdit } = useSelector(
    (store) => store.provisions
  );
  const provisionDetails = {
    service_id,
    item_name,
    description,
    quantity,
    price_NGN,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(provisionDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateProvision({ provisionDetails, id });
    createProvision(provisionDetails);
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
              <Link to={`/provisions`}>Go back to provisions</Link>

              <form onSubmit={handleSubmit}>
                {provisionInputs
                  .filter((detail) => detail.name !== "sort" && detail.name !== "priceRangeSP")
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
                  {isCreatingProvision === "pending" || isUpdatingProvision === "pending" ? (
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
