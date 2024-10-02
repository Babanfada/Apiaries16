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
// import stationTableData from "./data/reportTableData";
// import { changePage } from "features/stations/stationSlice";
// import { resetValues } from "features/stations/stationSlice";
import StationSearchModal from "components copy/searchModals/StationSearchModal";
// import { useSingleStation } from "features/stations/stationsThunk";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import moment from "moment";
import reportTableData from "./data/reportTableData";
import { ReportSearchModal } from "components copy";
import { useCatchReports } from "hooks/DashDetails_2";
import { useUpdateReport } from "features/catch_reports/reportsThunk";
import { useCreateReport } from "features/catch_reports/reportsThunk";
import { resetValues } from "features/catch_reports/reportSlice";
import { changePage } from "features/catch_reports/reportSlice";
// import { useDashDetails_1 } from "hooks/DashDetails";
// import { useCreateStation } from "features/stations/stationsThunk";
// import { useUpdateStation } from "features/stations/stationsThunk";
function Reports() {
  const {
    columns,
    rows,
    numOfPages,
    count,
    refetch,
    isGettingAllReports,
    totalReports,
    totalboxesAssigned,
    totalColonized,
    totalUnColonized,
  } = reportTableData();
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  const {
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    catch_date,
    catch_status,
    season,
    sort,
    pages,
  } = useSelector((store) => store.reports);
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    catch_date,
    catch_status,
    season,
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
                  Reports
                  {count}/{totalReports}
                  <Link onClick={() => dispatch(resetValues())} to="/createupdatereport/add">
                    create report
                  </Link>
                  <ReportSearchModal isGettingAllReports={isGettingAllReports} />
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
export default Reports;


export const CreateUpdateReport = () => {
  const { id } = useParams();
  const { reportInputs } = useCatchReports();
  const { isUpdatingReport, updateReport } = useUpdateReport();
  const { createReport, isCreatingReport } = useCreateReport();
  const {
    hunter_id,
    assigned_supervisor,
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    delivered_to_apiary,
    date_assigned,
    catch_date,
    catch_location,
    catch_status,
    season,
    notes,
    isEdit,
  } = useSelector((store) => store.reports);
  const reportDetails = {
    hunter_id,
    assigned_supervisor,
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    delivered_to_apiary,
    date_assigned,
    catch_date,
    catch_location,
    catch_status,
    season,
    notes,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(reportDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateReport({ reportDetails, id });
    createReport(reportDetails);
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
              <Link to={`/admin/catchreports`}>Go back</Link>

              <form onSubmit={handleSubmit}>
                {reportInputs
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
                  {isCreatingReport === "pending" || isUpdatingReport === "pending" ? (
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
