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
// import { changePage } from "features/pollination/polservicesSlice";
// import { resetValues } from "features/pollination/polservicesSlice";
// import { usePolServiceInputs } from "hooks/ServicesDetails";
// import { useUpdatePolServices } from "features/pollination/polservicesThunk";
// import { useCreatePolServices } from "features/pollination/polservicesThunk";
// import { PolServSearchModal } from "components copy";
// import pollinationTableData from "./data/productsTableData";
import styles from "../styles/thead.module.scss";
import styling from "../styles/createupdate.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import productsTableData from "./data/ordersTableData";
// import { changePage } from "features/products/productsSlice";
// import { resetValues } from "features/products/productsSlice";
// import { useProductsInputs } from "hooks/DashDetails";
// import ProductSearchModal from "components copy/searchModals/ProductSearchModal";
import ordersTableData from "./data/ordersTableData";
import { useUpdateOrder } from "features/orders/ordersThunk";
import { useOrderInputs } from "hooks/ServicesDetails";
import OrderSearchModal from "components copy/searchModals/OrderSearchModal";
import { changePage } from "features/orders/ordersSlice";
// import { useUpdateProduct } from "features/products/productthunk";
// import { useCreateProduct } from "features/products/productthunk";
// import { useSinglProduct } from "features/products/productthunk";
// import { useUploadProductImages } from "features/products/productthunk";
// import { InputFileUpload } from "components copy";
// import { ColorPicker } from "components copy/TextField";
// import { updateProductColors } from "features/products/productthunk";
function Orders() {
  const dispatch = useDispatch();
  const { rows, numOfPages, refetch, count, columns, totalOrders, isGettingAllOrders } =
    ordersTableData();
  const {
    sort,
    pages,
    user_id,
    tax,
    shippingFee,
    subTotal,
    total,
    paymentStatus,
    deliveryStatus,
    tx_ref,
    transaction_id,
  } = useSelector((store) => store.orders);
  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(changePage(value));
  };
  React.useEffect(() => {
    refetch();
  }, [
    pages,
    sort,
    user_id,
    tax,
    shippingFee,
    subTotal,
    total,
    paymentStatus,
    deliveryStatus,
    tx_ref,
    transaction_id,
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
                    <MDTypography color="white">Orders</MDTypography>
                    <MDTypography color="white">
                      {count}/{totalOrders}
                    </MDTypography>
                  </MDBox>
                  <MDBox className={styles.inner}>
                    <OrderSearchModal isGettingAllOrders={isGettingAllOrders} />
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
export default Orders;

export const UpdateOrder = () => {
  const { id } = useParams();
  const { orderInputs } = useOrderInputs();
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();
  const { isEdit, paymentStatus, deliveryStatus } = useSelector((store) => store.orders);
  const orderdetails = {
    // paymentStatus,
    deliveryStatus,
  };

  const handleSubmit = (e) => {
    console.log(isEdit);
    e.preventDefault();
    if (!isEdit) {
      return;
    }
    const isValid = Object.values(orderdetails).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }
    return updateOrder({ orderdetails, id });
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
            <div>
              <Link to="/orders">
                <ArrowBackIcon />
              </Link>
              <h6> Update Order details </h6>
              <div></div>
            </div>
            <form className={styling.form} onSubmit={handleSubmit}>
              {orderInputs
                .filter((detail) => detail.name === "deliveryStatus")
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
                {isUpdatingOrder === "pending" ? <Loader1 /> : "Update"}
              </CustomButton>
            </form>
          </div>
          {/* <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid> */}
        </Grid>
      </MDBox>
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
};
