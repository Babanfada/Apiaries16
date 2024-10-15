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
import moment from "moment";
import harvestTableData from "./data/harvestTableData";
import { changePage } from "features/harvest/honey_harvestSlice";
import { HarvestSearchModal } from "components copy";
import { resetValues } from "features/harvest/honey_harvestSlice";
import { useHarvest } from "hooks/DashDetails_2";
import { useUpdateHarvest } from "features/harvest/honey_harvestThunk";
import { useCreateHarvest } from "features/harvest/honey_harvestThunk";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Harvests() {
  const {
    columns = [], // Default to an empty array
    rows = [], // Default to an empty array
    harvest,
    numOfPages,
    count,
    refetch,
    isGettingAllHarvest,
    totalHarvestQuantity,
    harvestedVolumeByYear,
    qualityRatingCount,
    totalHarvest,
  } = harvestTableData() || {}; // Ensure nokTableData() returns something

  const {
    pages,
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
    sort,
  } = useSelector((store) => store.harvests) || {};
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };

  // Always call useEffect unconditionally
  React.useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [
    pages,
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
    sort,
    refetch,
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
                <MDTypography className={styles.wrapper} variant="h6" color="white">
                  <MDBox className={styles.inner}>
                    <MDTypography color="white"> Honey Harvest</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalHarvest}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link onClick={() => dispatch(resetValues())} to="/createupdateharvest/add">
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add next of kin"
                      />
                    </Link>
                    <HarvestSearchModal isGettingAllHarvest={isGettingAllHarvest} />
                  </MDBox>
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

export default Harvests;

export const CreateUpdateHarvest = () => {
  const { id } = useParams();
  const { harvestInputs } = useHarvest();
  const { isUpdatingHarvest, updateHarvest } = useUpdateHarvest();
  const { createHarvest, isCreatingHarvest } = useCreateHarvest();
  const {
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
    isEdit,
  } = useSelector((store) => store.harvests);
  const harvestDetails = {
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(harvestDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateHarvest({ harvestDetails, id });
    createHarvest(harvestDetails);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox mb={2} /> */}
      {/* <Header info={{ image, first_name, last_name, role }}> */}
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          {/* <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
          <div>
            {/* <Link to={`/harvests`}>Go back</Link> */}
            <div>
              <Link to="/harvests">
                <ArrowBackIcon />
              </Link>
              <h6>
                {isEdit ? `Update harvest details for ${station_name}` : `Create harvest details`}{" "}
              </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {harvestInputs
                .filter((detail) => detail.name !== "sort")
                .map((detail) => {
                  const { name, TextField } = detail;
                  return <div key={name}>{TextField}</div>;
                })}
              <CustomButton
                background={"inherit"}
                backgroundhover={"grey"}
                size={"100%"}
                height={"3vh"}
                type="submit"
                // disabled={!isValid}
              >
                {isCreatingHarvest === "pending" || isUpdatingHarvest === "pending" ? (
                  <Loader1 />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </CustomButton>
            </form>
          </div>
          {/* <Divider orientation="vertical" sx={{ mx: 0 }} /> */}
          {/* </Grid> */}
        </Grid>
      </MDBox>
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
};
