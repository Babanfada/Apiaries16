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
import stationTableData from "./data/stationTableData";
import { changePage } from "features/stations/stationSlice";
import { resetValues } from "features/stations/stationSlice";
import StationSearchModal from "components copy/searchModals/StationSearchModal";
import { useSingleStation } from "features/stations/stationsThunk";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
import { useDashDetails_1 } from "hooks/DashDetails";
import { useCreateStation } from "features/stations/stationsThunk";
import { useUpdateStation } from "features/stations/stationsThunk";
function Stations() {
  const {
    columns,
    rows,
    numOfPages,
    count,
    totalStations,
    totalHives,
    isGettingStations,
    refetch,
  } = stationTableData();
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  const {
    pages,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    status,
    station_size,
    number_of_hive_boxes,
    last_inspection_date,
    next_inspection_date,
    sort,
  } = useSelector((store) => store.stations);
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    status,
    station_size,
    number_of_hive_boxes,
    last_inspection_date,
    next_inspection_date,
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
                  Stations
                  {count}/{totalStations}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdatestation/add">
                    create station
                  </Link>
                  <StationSearchModal isGettingStations={isGettingStations} />
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
export default Stations;

export function SingleStation() {
  const { id } = useParams();
  const {
    isGettingSingleStation,
    singleStation: {
      station: {
        honey_harvests = [],
        last_inspection_date,
        latitude,
        location,
        longitude,
        next_inspection_date,
        notes,
        number_of_hive_boxes,
        station_id,
        station_maintainace_history,
        station_name,
        station_size,
        status,
        supervisor_ext,
        supervisor_int,
      } = {},
    } = {},
    refetch,
  } = useSingleStation(id);
  React.useEffect(() => {
    refetch();
  }, [id]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image: LogoAsana, station_name, location }}>
        <MDBox mt={5} mb={3}>
          <Link to="/stations">Go back</Link>
          <Link to="/harvests">back to harvest</Link>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  station_id,
                  station_Name: station_name,
                  location,
                  station_size,
                  status,
                  hive_boxes: number_of_hive_boxes,
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
                  longitude: Number(longitude)?.toFixed(2) || "N/A",
                  latitude: Number(latitude)?.toFixed(2) || "N/A",

                  internal_supervisor: (
                    <Link to={`/employees/${supervisor_int}`}>{supervisor_int}</Link>
                  ),
                  external_supervisor: (
                    <Link to={`/employees/${supervisor_ext}`}>{supervisor_ext}</Link>
                  ),
                  last_inspection: last_inspection_date
                    ? moment(last_inspection_date).format("YYYY-MM-DD")
                    : "N/A",
                  next_inspection: next_inspection_date
                    ? moment(next_inspection_date).format("YYYY-MM-DD")
                    : "N/A",
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
                  maintaince: station_maintainace_history,
                  notes,
                  ...(honey_harvests.length > 0 && {
                    honey_harvests: honey_harvests
                      .map(
                        (
                          { harvest_year, harvest_date, quantity_collected, unit, quality_rating },
                          index
                        ) =>
                          `Harvest ${
                            index + 1
                          }: Year: ${harvest_year}, Date: ${harvest_date}, Quantity: ${quantity_collected} ${unit}, Rating: ${quality_rating}/5`
                      )
                      .join(" | "), // Join them as a single string with a separator like " | " or "\n"
                  }),
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

export const CreateUpdateStation = () => {
  const { id } = useParams();
  const { station_details } = useDashDetails_1();
  const { createStation, isCreatingStation } = useCreateStation();
  const { updateStation, isUpdatingStation } = useUpdateStation();
  const {
    isEdit,
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    status,
    station_maintainace_history,
    last_inspection_date,
    next_inspection_date,
    notes,
    pages,
  } = useSelector((store) => store.stations);
  const stationDetails = {
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    status,
    station_maintainace_history,
    notes,
  };

  const stationdetailsOnEdit = {
    station_name,
    supervisor_int,
    supervisor_ext,
    location,
    longitude,
    latitude,
    station_size,
    number_of_hive_boxes,
    status,
    station_maintainace_history,
    last_inspection_date,
    next_inspection_date,
    notes,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Conditionally include inspection dates in the validation check if isEdit is true
    const detailsToValidate = isEdit ? stationdetailsOnEdit : stationDetails;

    const isValid = Object.values(detailsToValidate).every(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!isValid) {
      alert("Please fill out all required fields,especially the dates field if available.");
      return;
    }

    if (isEdit) {
      return updateStation({ stationdetailsOnEdit, id });
    }

    createStation(stationDetails);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox mb={2} /> */}
      {/* <Header info={{ image, first_name, last_name, role }}> */}
      <MDBox mt={5} mb={3}>
        <Link to="/stations"> back to stations</Link>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <div>
              <form onSubmit={handleSubmit}>
                {station_details
                  .filter((detail) => {
                    if (
                      detail.name === "sort" ||
                      (!isEdit &&
                        (detail.name === "next_inspection_date" ||
                          detail.name === "last_inspection_date"))
                    ) {
                      return false; // Exclude these fields in edit mode
                    }
                    return true; // Include all other fields
                  })
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
                  {isCreatingStation === "pending" || isUpdatingStation === "pending" ? (
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
