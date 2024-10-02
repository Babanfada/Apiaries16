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
// import stationTableData from "./data/nokTableData";
// import { changePage } from "features/stations/stationSlice";
// import { resetValues } from "features/stations/stationSlice";
// import StationSearchModal from "components copy/searchModals/StationSearchModal";
// import { useSingleStation } from "features/stations/stationsThunk";
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
// import { useDashDetails_1 } from "hooks/DashDetails";
// import { useCreateStation } from "features/stations/stationsThunk";
// import { useUpdateStation } from "features/stations/stationsThunk";
import nokTableData from "./data/nokTableData";
import { changePage } from "features/nok/nokSlice";
import NokSearchModal from "components copy/searchModals/NokSearchModal";
import { useCreateNok } from "features/nok/nokThunk";
import { useUpdateNok } from "features/nok/nokThunk";
import { useNok } from "hooks/DashDetails_2";
import { resetValues } from "features/nok/nokSlice";

function Noks() {
  const {
    isGettingAllNok = false, // Default value to prevent errors
    employeesNOK = [], // Ensure default is an empty array
    genderTypeCount = 0,
    numOfPages = 1,
    totalEmployeesNOK = 0,
    count = 0,
    relationshipTypeCount = 0,
    refetch,
    columns = [], // Default to an empty array
    rows = [], // Default to an empty array
  } = nokTableData() || {}; // Ensure nokTableData() returns something

  const {
    pages = 1,
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
    sort,
  } = useSelector((store) => store.noks) || {};

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
  }, [emp_id, fullname, email, address, phone, gender, relationship, pages, sort, refetch]);

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
                  Next of Kin
                  {count}/{totalEmployeesNOK}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdatenok/add">
                    create nok
                  </Link>
                  <NokSearchModal isGettingAllNok={isGettingAllNok} />
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

export default Noks;

export const CreateUpdateNok = () => {
  const { id } = useParams();
  const { createNok, isCreatingNok } = useCreateNok();
  const { updateNok, isUpdatingNok } = useUpdateNok();
  const { nokDetails: nokInput } = useNok();
  const { emp_id, fullname, email, address, phone, gender, relationship, isEdit } = useSelector(
    (store) => store.noks
  );
  const nokDetails = {
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(nokDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateNok({ nokDetails, id });
    createNok(nokDetails);
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
              <Link to="/noks">Go back</Link>
              <form onSubmit={handleSubmit}>
                {nokInput
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
                  {isCreatingNok === "pendiNokuseCreateNok " || isUpdatingNok === "pending" ? (
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
