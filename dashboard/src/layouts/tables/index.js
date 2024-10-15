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
import employeesTableData from "layouts/tables/data/employeesTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useSingleEmployee } from "features/employees/employeesThunk";
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
import { useEmployee } from "hooks/Register";
import { useCreateEmployee } from "features/employees/employeesThunk";
import { useUpdateEmployee } from "features/employees/employeesThunk";
import { useDispatch, useSelector } from "react-redux";
import { useUploadEmployeeImages } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
import { InputFileUpload } from "components copy";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
import { handleReset } from "features/employees/employeesSlice";
import EmployeeSearchModal from "components copy/searchModals/EmployeeSearchModal";
import PaginationControlled from "components copy/component's_Tables/Pagination";
import { changePage } from "features/employees/employeesSlice";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//style
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
function Empoloyees() {
  const {
    columns,
    rows,
    numOfPages,
    totalEmployees,
    count,
    salaryData,
    newHires,
    newHiresCount,
    employeesGenderCount,
    departmentCount,
    employmentStatusCount,
    employmentTypeCount,
    isGettingAllEmployees,
    pages,
  } = employeesTableData();
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
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
                    <MDTypography color="white">Employees</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalEmployees}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <Link
                      onClick={() => dispatch(handleReset())}
                      to="/admin/createupdateemployees/add"
                    >
                      <AddIcon
                        sx={{ fill: "white" }}
                        fontSize="medium"
                        titleAccess="add employee"
                      />
                    </Link>
                    <EmployeeSearchModal isGettingAllEmployees={isGettingAllEmployees} />
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
export default Empoloyees;

export function SingleEmployee() {
  const { id } = useParams();
  const { isGettingSingleEmployee, singleemployee, refetch } = useSingleEmployee(id);
  const { employee } = singleemployee || {};
  const {
    catch_reports = [],
    employee_nok = {},
    externallySupervising = [],
    internallySupervising = [],
    swarm_hunters = [],
    emp_id,
    first_name,
    last_name,
    gender,
    email,
    dob,
    phone,
    image,
    role,
    address,
    department,
    employment_type,
    employment_status,
    salary,
    joining_date,
    skill,
    notes,
  } = employee ?? {};
  React.useEffect(() => {
    refetch();
  }, [id]);
  // console.log(
  //   catch_reports,
  //   employee_nok,
  //   externallySupervising,
  //   internallySupervising,
  //   swarm_hunters
  // );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image, first_name, last_name, role }}>
        <MDBox mt={5} mb={3}>
          <Link to="/employees">
            {" "}
            <ArrowBackIcon />
          </Link>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  emp_id,
                  fullName: `${first_name} ${last_name}`,
                  mobile: `${phone}`,
                  address,
                  employment_type,
                  gender,
                  department,
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
                  salary,
                  joining_date,
                  dob,
                  email,
                  skill,
                  notes,
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
                  ...(Object.keys(employee_nok).length > 0 && {
                    nok: employee_nok.fullname,
                    nok_id: employee_nok.nok_id,
                  }),
                  ...(externallySupervising.length > 0 && {
                    [`supervised_station${externallySupervising.length > 0 ? "s" : ""}`]:
                      externallySupervising.map((station) => station.station_id).join(", "),
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
export function CreateUpdateEmployee() {
  const { id } = useParams();
  const { employeeDetails } = useEmployee();
  // const dispatch = useDispatch();
  const { createEmployee, isCreatingEmployee } = useCreateEmployee();
  const { updateEmployee, isUpdatingEmployee } = useUpdateEmployee();

  const {
    email,
    first_name,
    last_name,
    address,
    phone,
    gender,
    role,
    department,
    dob,
    joining_date,
    salary,
    skill,
    notes,
    employment_status,
    employment_type,
    isEdit,
  } = useSelector((store) => store.employees);
  const empDetails = {
    email,
    first_name,
    last_name,
    address: address.trim(),
    phone,
    gender,
    role,
    department,
    dob,
    joining_date,
    salary,
    skill,
    notes: notes.trim(),
    employment_status,
    employment_type,
  };
  // const image = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(empDetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isEdit) return updateEmployee({ empDetails, id });
    createEmployee(empDetails);
  };
  const { uploadEmployeeImgs, isUploadingEmployeeImages } = useUploadEmployeeImages(id);

  const uploadEmployeeAvatar = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    const formData = new FormData();
    if (file) {
      formData.append("image", file); // Append only one file with key "image"
      uploadEmployeeImgs(formData);
      // console.log(file, formData);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      {/* <Header info={{ image, first_name, last_name, role }}> */}
      <MDBox mt={5} mb={3}>
        <Grid className={styling.wrapper} container spacing={1}>
          {/* <Grid className={styling.wrapper} item xs={12} md={6} xl={4} sx={{ display: "flex" }}> */}
          {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
          <div>
            <div>
              <Link to="/employees">
                <ArrowBackIcon />
              </Link>
              <h6>{isEdit ? `Update ${first_name} ${last_name} details` : "Create Employee"} </h6>
              <div>
                {isEdit ? (
                  <InputFileUpload
                    name={"image"}
                    handleChange={uploadEmployeeAvatar}
                    uploading={isUploadingEmployeeImages}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {employeeDetails.map((detail) => {
                const { name, TextField } = detail;
                return <div key={name}>{TextField}</div>;
              })}
              <CustomButton
                background={"inherit"}
                // background={"#1212121F"}
                backgroundhover={"grey"}
                size={"100%"}
                height={"3vh"}
                type="submit"
                // disabled={!isValid}
              >
                {isCreatingEmployee === "pending" || isUpdatingEmployee === "pending" ? (
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
}
