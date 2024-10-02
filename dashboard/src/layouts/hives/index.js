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
import hivesTableData from "./data/hivesTableData";
import { changePage } from "features/hives/hiveSlice";
import { resetValues } from "features/hives/hiveSlice";
import HiveSearchModal from "components copy/searchModals/HiveSearchModal";
import { useSingleHive } from "features/hives/hivesThunk";
import { useUpdateHive } from "features/hives/hivesThunk";
import { useCreateHive } from "features/hives/hivesThunk";
import { useHives } from "hooks/DashDetails_2";

function Hives() {
  const {
    columns,
    rows,
    numOfPages,
    count,
    refetch,
    isGettingAllHives,
    hives,
    totalHives,
    colonizationCount,
    hiveCurrentLocationCount,
    hiveStatusCount,
    hiveTypeCount,
    hiveUseConditionCount,
  } = hivesTableData();
  const dispatch = useDispatch();
  const {
    pages,
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
    sort,
  } = useSelector((store) => store.hives);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
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
                  Hives
                  {count}/{totalHives}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdatehive/add">
                    create hive
                  </Link>
                  <HiveSearchModal isGettingAllHives={isGettingAllHives} />
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
export default Hives;

export function SingleHive() {
  const { id } = useParams();
  const {
    isGettingSingleHive,
    singleHive: {
      hive: {
        hive_id,
        assigned_hunter,
        hive_type,
        num_of_frames,
        colonized,
        status,
        use_condition,
        first_installation,
        current_location,
        last_inspection_date,
        note,
      } = {},
    } = {},
    refetch,
  } = useSingleHive(id);
  React.useEffect(() => {
    refetch();
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image: LogoAsana, hive_type, status }}>
        <MDBox mt={5} mb={3}>
          <Link to="/hives">Go back</Link>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  hive_id,
                  hunter: <Link to={`/hunters/${assigned_hunter}`}>{assigned_hunter}</Link>,
                  hive_type,
                  frames: num_of_frames,
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
                  colonized,
                  status,
                  use_condition,
                  first_installation,
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
                  current_location,
                  inspected_on: last_inspection_date
                    ? moment(last_inspection_date).format("YYYY-MM-DD")
                    : "N/A",
                  note,
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

export const CreateUpdateHive = () => {
  const { id } = useParams();
  const { hiveInputs } = useHives();
  const { isUpdatingHive, updateHive } = useUpdateHive();
  const { createHive, isCreatingHive } = useCreateHive();
  const {
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
    isEdit,
  } = useSelector((store) => store.hives);
  const hiveDetails = {
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(hiveDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateHive({ hiveDetails, id });
    createHive(hiveDetails);
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
              <Link to={`/hives`}>Go back</Link>

              <form onSubmit={handleSubmit}>
                {hiveInputs
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
                  {isCreatingHive === "pending" || isUpdatingHive === "pending" ? (
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
