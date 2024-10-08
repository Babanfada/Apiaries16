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
// import { useEmployee } from "hooks/Register";
// import { useCreateEmployee } from "features/employees/employeesThunk";
// import { useUpdateEmployee } from "features/employees/employeesThunk";
import { useDispatch, useSelector } from "react-redux";
// import { useUploadEmployeeImages } from "features/employees/employeesThunk";
import { Link } from "react-router-dom";
// import { InputFileUpload } from "components copy";
import { CustomButton } from "components copy";
import { Loader1 } from "components copy/Loader";
// import { handleReset } from "features/employees/employeesSlice";
// import EmployeeSearchModal from "components copy/searchModals/EmployeeSearchModal";
import PaginationControlled from "components copy/component's_Tables/Pagination";
// import { changePage } from "features/employees/employeesSlice";
import usersTableData from "./data/usersTableData";
import { changePage } from "features/users/userSlice";
import { UserSearchModal } from "components copy";
import { useSingleUser } from "features/users/userThunk";

function Users() {
  const {
    columns,
    rows,
    numOfPages,
    count,
    totalUsers,
    genderCount,
    verificationCount,
    refetch,
    isGettingAllUser,
    blacklisting,
  } = usersTableData();
  const dispatch = useDispatch();
  const {
    gendersearch,
    isVerified,
    blacklisted,
    subscribed,
    sort,
    pages,
    email,
    fullname,
    phone,
    gender,
  } = useSelector((store) => store.users);

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };

  React.useEffect(() => {
    refetch();
  }, [
    gendersearch,
    isVerified,
    blacklisted,
    subscribed,
    sort,
    pages,
    email,
    fullname,
    phone,
    gender,
    blacklisting,
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
                  Users {count}/{totalUsers}
                  <UserSearchModal isGettingAllUser={isGettingAllUser} />
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
export default Users;

export function SingleUser() {
  const { id } = useParams();
  const { isGettingSingleUser, singleuser, refetch } = useSingleUser(id);
  const { user, deliveryStatusCount = [], paymentStatusCount = [] } = singleuser || {};
  const {
    address,
    blacklisted,
    email,
    emailNotification,
    fullname,
    gender,
    image,
    isVerified,
    phone,
    role,
    user_id,
  } = user ?? {};
  React.useEffect(() => {
    refetch();
  }, [id]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header info={{ image, fullname, address, role }}>
        <MDBox mt={5} mb={3}>
          <Link to="/users">Go back</Link>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title=""
                description=""
                info={{
                  fullname,
                  id: user_id,
                  email,
                  mobile: phone,
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
                  address,
                  gender,
                  blacklisted: blacklisted ? "YES" : "No",
                  Notification: emailNotification ? "YES" : "No",
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
                  Verified: isVerified ? "YES" : "No",
                  ...(paymentStatusCount.length > 0 && {
                    paymentStatusCount: paymentStatusCount
                      .map(
                        ({ paymentStatus, count }, index) =>
                          `Order ${index + 1}: Status: ${paymentStatus}, Number: ${count}`
                      )
                      .join(" | "), // Join them as a single string with a separator like " | " or "\n"
                  }),
                  ...(deliveryStatusCount.length > 0 && {
                    deliveryStatusCount: deliveryStatusCount
                      .map(
                        ({ deliveryStatus, count }, index) =>
                          `delivery ${index + 1}: Status: ${deliveryStatus}, Number: ${count}`
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
