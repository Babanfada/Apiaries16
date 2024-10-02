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
import huntersTableData from "./data/huntersTableData";
import { resetValues } from "features/hunters/huntersSlice";
import HunterSearchModal from "components copy/searchModals/HunterSearchModal";
import { changePage } from "features/hunters/huntersSlice";
import { useSingleHunter } from "features/hunters/huntersThunk";
import { useHunters } from "hooks/DashDetails_2";
import { useUpdateHunter } from "features/hunters/huntersThunk";
import { useCreateHunter } from "features/hunters/huntersThunk";

function Hunters() {
  const {
    columns,
    rows,
    numOfPages,
    count,
    isGettingAllHunters,
    refetch,
    hunters,
    totalHunters,
    contractStatusCount,
  } = huntersTableData();
  const dispatch = useDispatch();
  const {
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
    isEdit,
    pages,
    sort,
  } = useSelector((store) => store.hunters);

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
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
                  Hunters
                  {count}/{totalHunters}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdatehunter/add">
                    create hunter
                  </Link>
                  <HunterSearchModal isGettingAllHunters={isGettingAllHunters} />
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
export default Hunters;

export function SingleHunter() {
  const { id } = useParams();
  const {
    isGettingSingleHunter,
    singleHunter: {
      hunter: {
        hunter_id,
        assigned_supervisor,
        fullname,
        phone,
        email,
        joining_date,
        tip,
        employment_status,
        emergency_contact_name,
        emergency_contact,
        notes,
        hives = [],
        catch_reports = [],
      } = {},
    } = {},
    refetch,
  } = useSingleHunter(id);

  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image: LogoAsana, fullname, phone }}>
        <MDBox mt={5} mb={3}>
          <Link to="/hunters">Go back</Link>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  hunter_id,
                  fullname,
                  phone,
                  email,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  contracted_on: joining_date ? moment(joining_date).format("YYYY-MM-DD") : "N/A",
                  supervisor: (
                    <Link to={`/employees/${assigned_supervisor}`}>{assigned_supervisor}</Link>
                  ),
                  tip,
                  employment_status,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  e_contact_name: emergency_contact_name,
                  e_contact: emergency_contact,
                  notes,
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export const CreateUpdateHunter = () => {
  const { id } = useParams();
  const { hunterInputs } = useHunters();
  const { isUpdatingHunter, updateHunter } = useUpdateHunter();
  const { createHunter, isCreatingHunter } = useCreateHunter();
  const {
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
    isEdit,
  } = useSelector((store) => store.hunters);
  const hunterDetails = {
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
  };
  //   console.log(hunterDetails);
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(hunterDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateHunter({ hunterDetails, id });
    createHunter(hunterDetails);
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
              <Link to="/hunters">Go back</Link>
              <form onSubmit={handleSubmit}>
                {hunterInputs
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
                >
                  {isCreatingHunter === "pending" || isUpdatingHunter === "pending" ? (
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
