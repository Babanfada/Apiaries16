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
import consultationTableData from "./data/consultationTableData";
import { changePage } from "features/consultation/consultationSlice";
import ConsultationSearchModal from "components copy/searchModals/ConsultationSearchModal";
import { useConsultationInputs } from "hooks/ServicesDetails";
import { useUpdateConsultation } from "features/consultation/consultationThunk";
import { useCreateConsultation } from "features/consultation/consultationThunk";
import { resetValues } from "features/consultation/consultationSlice";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Consultation() {
  const { columns, rows, numOfPages, count, refetch, isGettingAllC_Items, totalCitems } =
    consultationTableData();
  const dispatch = useDispatch();
  const { item_id, item_name, description, numOfTimesRendered, price, sort, pages, priceRangeC } =
    useSelector((store) => store.consultations);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [pages, item_id, item_name, description, numOfTimesRendered, price, sort, priceRangeC]);
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
                    <MDTypography color="white">Consultations</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalCitems}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link
                      onClick={() => dispatch(resetValues())}
                      to="/createupdateconsultation/add"
                    >
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add a new consultation details"
                      />
                    </Link>
                    <ConsultationSearchModal isGettingAllC_Items={isGettingAllC_Items} />
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
export default Consultation;

export const CreateUpdateConsultation = () => {
  const { id } = useParams();
  const { consultationInputs } = useConsultationInputs();
  const { isUpdatingConsultation, updateConsultation } = useUpdateConsultation();
  const { createConsultation, isCreatingConsultation } = useCreateConsultation();
  const { service_id, item_name, description, numOfTimesRendered, price, isEdit } = useSelector(
    (store) => store.consultations
  );
  const consultationDetails = {
    service_id,
    item_name,
    description,
    numOfTimesRendered,
    price,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(consultationDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateConsultation({ consultationDetails, id });
    createConsultation(consultationDetails);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox mb={2} /> */}
      {/* <Header info={{ image, first_name, last_name, role }}> */}
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          {/* <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}> */}
          {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
          <div>
            {/* <Link to={`/consultations`}>Go back</Link> */}
            <div>
              <Link to={`/consultations`}>
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update ${item_name} details` : "Create Service"} </h6>
              <div></div>
            </div>
            <form onSubmit={handleSubmit}>
              {consultationInputs
                .filter((detail) => detail.name !== "sort" && detail.name !== "priceRangeC")
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
                {isCreatingConsultation === "pending" || isUpdatingConsultation === "pending" ? (
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
