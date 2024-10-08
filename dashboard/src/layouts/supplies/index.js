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
import suppliesTableData from "./data/suppliesTableData";
import { changePage } from "features/supplies/suppliesSlice";
import { resetValues } from "features/supplies/suppliesSlice";
import SuppliesSearchModal from "components copy/searchModals/SupplySearchModal";
import { useSuppliesInputs } from "hooks/DashDetails";
import { useCreateSupply } from "features/supplies/suppliesThunk";
import { useUpdateSupply } from "features/supplies/suppliesThunk";

function Supplies() {
  const dispatch = useDispatch();
  const {
    columns,
    rows,
    numOfPages,
    count,
    refetch,
    isGettingAllSupplies,
    totalSUpplies,
    categoryCount,
    statusCount,
    storageLocationCount,
  } = suppliesTableData();
  const {
    pages,
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
    sort,
  } = useSelector((store) => store.supplies);

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
    sort,
  ]);
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
                  Supplies
                  {count}/{totalSUpplies}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdatesupply/add">
                    create supply
                  </Link>
                  <SuppliesSearchModal isGettingAllSupplies={isGettingAllSupplies} />
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
export default Supplies;



export const CreateUpdateSupply = () => {
  const { suppliesDetails } = useSuppliesInputs();
  const { createSupply, isCreatingSupply } = useCreateSupply();
  const { updateSupply, isUpdatingSupply } = useUpdateSupply();
  const { id } = useParams();
  const {
    isEdit,
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
  } = useSelector((store) => store.supplies);

  const supplyDetails = {
    supply_name,
    category,
    quantity,
    status,
    storage_location,
    supplier,
    minimum_stock_level,
    purchase_date,
    purchase_cost,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(supplyDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!isValid) {
      alert("Please fill out all required fields, especially the dates field if available.");
      return;
    }

    if (isEdit) {
      return updateSupply({ supplyDetails, id });
    }

    createSupply(supplyDetails);
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
              <Link to="/supplies">Go back</Link>
              <form onSubmit={handleSubmit}>
                {suppliesDetails
                  .filter((detail) => detail.name !== "sort")
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
                  {isCreatingSupply === "pending" || isUpdatingSupply === "pending" ? (
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
